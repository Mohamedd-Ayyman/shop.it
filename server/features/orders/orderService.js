// Order service (Blueprint §7 Orders)
const orderRepo = require('./orderRepository');
const cartRepo = require('../cart/cartRepository');
const notifRepo = require('../notifications/notificationRepository');
const { emitToUser, emitToAdmin } = require('../../shared/utils/socket');

module.exports = {
  async place(userId, { shippingAddress, shippingMethod, paymentDetails, couponCode }) {
    const cart = await cartRepo.findByUser(userId);
    if (!cart || !cart.items.length) { const e = new Error('Cart is empty'); e.status = 400; throw e; }
    const subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shippingCost = shippingMethod === 'express' ? 15 : shippingMethod === 'overnight' ? 25 : 5;
    const discount = cart.couponDiscount || 0;
    const total = subtotal + shippingCost - discount;
    // Build order number
    const now = new Date();
    const orderNumber = `ORD-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${String(Math.floor(Math.random()*9999)).padStart(4,'0')}`;
    const order = await orderRepo.create({
      orderNumber, user: userId, items: cart.items.map(i => ({ product: i.product, name: i.name, image: i.image, price: i.price, size: i.size, color: i.color, quantity: i.quantity })),
      subtotal, shippingCost, discount, total, status: 'pending',
      shippingAddress, shippingMethod, paymentMethod: paymentDetails?.method || 'card', paymentStatus: 'paid',
      couponCode, statusHistory: [{ status: 'pending', timestamp: new Date() }],
    });
    // Clear cart
    cart.items = []; cart.couponCode = null; cart.couponDiscount = 0;
    await cartRepo.save(cart);
    // Notify
    const notif = await notifRepo.create({ user: userId, type: 'order', title: 'Order Placed', message: `Order #${order.orderNumber} confirmed.`, link: `/shop/orders/${order.orderNumber}` });
    emitToUser(userId, 'new_notification', notif);
    emitToAdmin('admin_notification', { type: 'new_order', orderNumber: order.orderNumber });
    return order;
  },

  async listByUser(userId, query) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.limit) || 10, 1);
    const [orders, total] = await orderRepo.listByUser(userId, { page, pageSize, status: query.status });
    return { orders, total };
  },

  async listAll(query) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.limit) || 20, 1);
    const [orders, total] = await orderRepo.listAll({ page, pageSize, status: query.status });
    return { orders, total };
  },

  async getByOrderNumber(orderNumber) {
    const order = await orderRepo.findByOrderNumber(orderNumber);
    if (!order) { const e = new Error('Order not found'); e.status = 404; throw e; }
    return order;
  },

  async cancel(orderNumber, userId) {
    const order = await orderRepo.findByOrderNumber(orderNumber);
    if (!order) { const e = new Error('Order not found'); e.status = 404; throw e; }
    if (order.user.toString() !== userId.toString()) { const e = new Error('Forbidden'); e.status = 403; throw e; }
    if (['shipped', 'delivered', 'cancelled'].includes(order.status)) { const e = new Error('Cannot cancel order in current status'); e.status = 400; throw e; }
    const updated = await orderRepo.updateStatus(order._id, 'cancelled', 'Cancelled by customer');
    const notif = await notifRepo.create({ user: userId, type: 'order', title: 'Order Cancelled', message: `Order #${order.orderNumber} has been cancelled.` });
    emitToUser(userId, 'new_notification', notif);
    return updated;
  },

  async updateStatus(orderNumber, { status, trackingNumber, note }) {
    const order = await orderRepo.findByOrderNumber(orderNumber);
    if (!order) { const e = new Error('Order not found'); e.status = 404; throw e; }
    const validTransitions = { pending: ['processing', 'cancelled'], processing: ['shipped', 'cancelled'], shipped: ['delivered'], delivered: ['refunded'], cancelled: [] };
    if (!validTransitions[order.status]?.includes(status)) { const e = new Error(`Cannot transition from ${order.status} to ${status}`); e.status = 400; throw e; }
    const updated = await orderRepo.updateStatus(order._id, status, note);
    if (trackingNumber) updated.trackingNumber = trackingNumber;
    await updated.save();
    // Notify customer
    const notif = await notifRepo.create({ user: order.user, type: 'order', title: 'Order Updated', message: `Order #${order.orderNumber} is now ${status}.`, link: `/shop/orders/${order.orderNumber}` });
    emitToUser(order.user.toString(), 'new_notification', notif);
    return updated;
  },

  async refund(orderNumber) {
    const order = await orderRepo.findByOrderNumber(orderNumber);
    if (!order) { const e = new Error('Order not found'); e.status = 404; throw e; }
    if (order.paymentStatus === 'refunded') { const e = new Error('Already refunded'); e.status = 400; throw e; }
    order.paymentStatus = 'refunded';
    const updated = await orderRepo.updateStatus(order._id, order.status, 'Refund issued');
    const notif = await notifRepo.create({ user: order.user, type: 'order', title: 'Refund Issued', message: `Refund for order #${order.orderNumber} has been processed.` });
    emitToUser(order.user.toString(), 'new_notification', notif);
    return updated;
  },
};
