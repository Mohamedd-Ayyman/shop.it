// Seed script (Blueprint §16 Seed Data)
// Creates admin/customer users, categories, products, and coupons
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('dotenv').config();

async function seed() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/shopit';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const User = require('../../features/users/userModel');
  const Category = require('../../features/categories/categoryModel');
  const Product = require('../../features/products/productModel');
  const Coupon = require('../../features/coupons/couponModel');

  // Clear existing
  await Promise.all([User.deleteMany({}), Category.deleteMany({}), Product.deleteMany({}), Coupon.deleteMany({})]);

  // Users
  const hash = await bcrypt.hash('Admin123!', 12);
  const [admin] = await User.create([{ name: 'Admin', email: 'admin@shop.it', password: hash, role: 'admin' }]);
  const [customer] = await User.create([{ name: 'Customer', email: 'user@shop.it', password: hash, role: 'customer' }]);
  console.log(`Created admin: ${admin.email}, customer: ${customer.email}`);

  // Categories
  const cats = await Category.create([
    { name: 'Tops', slug: 'tops', order: 1 },
    { name: 'Bottoms', slug: 'bottoms', order: 2 },
    { name: 'Dresses', slug: 'dresses', order: 3 },
    { name: 'Accessories', slug: 'accessories', order: 4 },
    { name: 'Shoes', slug: 'shoes', order: 5 },
  ]);
  console.log(`Created ${cats.length} categories`);

  // Products
  const products = [];
  const productData = [
    { name: 'Classic White T-Shirt', slug: 'classic-white-tshirt', price: 29.99, category: 0, stock: 50 },
    { name: 'Black Denim Jacket', slug: 'black-denim-jacket', price: 89.99, category: 0, stock: 30 },
    { name: 'Slim Fit Chinos', slug: 'slim-fit-chinos', price: 59.99, category: 1, stock: 40 },
    { name: 'Wool Blend Sweater', slug: 'wool-blend-sweater', price: 79.99, category: 0, stock: 25 },
    { name: 'Ripped Skinny Jeans', slug: 'ripped-skinny-jeans', price: 69.99, category: 1, stock: 35 },
    { name: 'Summer Floral Dress', slug: 'summer-floral-dress', price: 49.99, category: 2, stock: 20 },
    { name: 'Leather Crossbody Bag', slug: 'leather-crossbody-bag', price: 45.99, category: 3, stock: 15 },
    { name: 'Aviator Sunglasses', slug: 'aviator-sunglasses', price: 19.99, category: 3, stock: 60 },
    { name: 'Canvas Sneakers', slug: 'canvas-sneakers', price: 54.99, category: 4, stock: 45 },
    { name: 'Cocktail Heels', slug: 'cocktail-heels', price: 89.99, category: 4, stock: 20 },
    { name: 'Striped Button-Down', slug: 'striped-button-down', price: 44.99, category: 0, stock: 30 },
    { name: 'Cashmere Scarf', slug: 'cashmere-scarf', price: 39.99, category: 3, stock: 25 },
    { name: 'Leather Belt', slug: 'leather-belt', price: 34.99, category: 3, stock: 40 },
    { name: 'Denim Shorts', slug: 'denim-shorts', price: 39.99, category: 1, stock: 35 },
    { name: 'Silk Blouse', slug: 'silk-blouse', price: 64.99, category: 0, stock: 20, salePrice: 49.99 },
    { name: 'Wide Leg Trousers', slug: 'wide-leg-trousers', price: 74.99, category: 1, stock: 20 },
    { name: 'Knit Polo Shirt', slug: 'knit-polo-shirt', price: 49.99, category: 0, stock: 30 },
    { name: 'Platform Sneakers', slug: 'platform-sneakers', price: 79.99, category: 4, stock: 25 },
    { name: 'Hoop Earrings', slug: 'hoop-earrings', price: 14.99, category: 3, stock: 50 },
    { name: 'Trench Coat', slug: 'trench-coat', price: 129.99, category: 0, stock: 15 },
  ];

  for (const p of productData) {
    products.push({
      name: p.name, slug: p.slug, description: `High-quality ${p.name.toLowerCase()} — perfect for any wardrobe.`, price: p.price,
      salePrice: p.salePrice || null, category: cats[p.category]._id, tags: ['fashion', 'trending'],
      images: [{ url: `https://via.placeholder.com/600x600?text=${encodeURIComponent(p.name)}`, alt: p.name, isPrimary: true }],
      stock: p.stock, isFeatured: products.length < 8,
    });
  }
  const created = await Product.create(products);
  console.log(`Created ${created.length} products`);

  // Coupons
  await Coupon.create([
    { code: 'WELCOME10', type: 'percentage', value: 10, minOrderAmount: 50, maxDiscount: 25, usageLimit: 100, validFrom: new Date(), validUntil: new Date(Date.now() + 365 * 86400000) },
    { code: 'FREESHIP', type: 'freeShipping', value: 0, minOrderAmount: 30, usageLimit: 50, validFrom: new Date(), validUntil: new Date(Date.now() + 90 * 86400000) },
  ]);
  console.log('Created 2 coupons');

  await mongoose.disconnect();
  console.log('Seed complete');
}

seed().catch(err => { console.error(err); process.exit(1); });
