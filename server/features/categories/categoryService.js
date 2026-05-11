// Category service (Blueprint §7 Categories)
const catRepo = require('./categoryRepository');

module.exports = {
  async list() { return catRepo.list(); },
  async getBySlug(slug) {
    const category = await catRepo.findBySlug(slug);
    if (!category) { const e = new Error('Category not found'); e.status = 404; throw e; }
    return category;
  },
  async create(data) { return catRepo.create(data); },
  async update(id, data) {
    const cat = await catRepo.update(id, data);
    if (!cat) { const e = new Error('Category not found'); e.status = 404; throw e; }
    return cat;
  },
  async remove(id) {
    const count = await catRepo.productCount(id);
    if (count > 0) { const e = new Error(`Cannot delete: ${count} products linked`); e.status = 400; throw e; }
    const cat = await catRepo.softDelete(id);
    if (!cat) { const e = new Error('Category not found'); e.status = 404; throw e; }
  },
};
