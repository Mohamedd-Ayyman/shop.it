// Product service (Blueprint §7 Products)
const productRepo = require('./productRepository');

module.exports = {
  async list(query) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.limit) || 12, 1);
    const [products, total] = await productRepo.list({ ...query, page, pageSize });
    return { products, total };
  },

  async featured() {
    return productRepo.featured();
  },

  async getBySlug(slug) {
    const product = await productRepo.findBySlug(slug);
    if (!product) { const e = new Error('Product not found'); e.status = 404; throw e; }
    const related = await productRepo.related(product);
    return { product, related };
  },

  async create(data) {
    return productRepo.create(data);
  },

  async update(id, data) {
    const product = await productRepo.update(id, data);
    if (!product) { const e = new Error('Product not found'); e.status = 404; throw e; }
    return product;
  },

  async remove(id) {
    const product = await productRepo.softDelete(id);
    if (!product) { const e = new Error('Product not found'); e.status = 404; throw e; }
  },
};
