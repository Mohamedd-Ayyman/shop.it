import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productService } from '../../services'

export const fetchProductsThunk = createAsyncThunk('products/fetch', async (params, { rejectWithValue }) => {
  try { const res = await productService.list(params); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const fetchProductThunk = createAsyncThunk('products/fetchOne', async (slug, { rejectWithValue }) => {
  try { const res = await productService.getBySlug(slug); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const fetchFeaturedThunk = createAsyncThunk('products/fetchFeatured', async (_, { rejectWithValue }) => {
  try { const res = await productService.featured(); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], currentProduct: null, relatedProducts: [], total: 0, page: 1, pages: 1, loading: false, error: null },
  reducers: { setPage(s, a) { s.page = a.payload } },
  extraReducers: (b) => {
    b.addCase(fetchProductsThunk.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchProductsThunk.fulfilled, (s, a) => { s.loading = false; s.items = a.payload.products; s.total = a.payload.total; s.pages = a.payload.pages; s.page = a.payload.page })
      .addCase(fetchProductsThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message })
      .addCase(fetchProductThunk.pending, (s) => { s.loading = true })
      .addCase(fetchProductThunk.fulfilled, (s, a) => { s.loading = false; s.currentProduct = a.payload.product; s.relatedProducts = a.payload.relatedProducts })
      .addCase(fetchProductThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message })
      .addCase(fetchFeaturedThunk.fulfilled, (s, a) => { s.items = a.payload.products })
  },
})
export const { setPage } = productSlice.actions
export default productSlice.reducer
