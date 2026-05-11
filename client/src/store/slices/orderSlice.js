import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { orderService } from '../../services'

export const createOrderThunk = createAsyncThunk('orders/create', async (data, { rejectWithValue }) => {
  try { const res = await orderService.place(data); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const fetchOrdersThunk = createAsyncThunk('orders/fetch', async (params, { rejectWithValue }) => {
  try { const res = await orderService.list(params); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const fetchOrderThunk = createAsyncThunk('orders/fetchOne', async (orderNumber, { rejectWithValue }) => {
  try { const res = await orderService.getByNumber(orderNumber); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const cancelOrderThunk = createAsyncThunk('orders/cancel', async (orderNumber, { rejectWithValue }) => {
  try { const res = await orderService.cancel(orderNumber); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})

const orderSlice = createSlice({
  name: 'orders',
  initialState: { orders: [], currentOrder: null, total: 0, page: 1, pages: 1, loading: false, error: null },
  reducers: { setPage(s, a) { s.page = a.payload } },
  extraReducers: (b) => {
    b.addCase(createOrderThunk.pending, (s) => { s.loading = true })
      .addCase(createOrderThunk.fulfilled, (s) => { s.loading = false })
      .addCase(createOrderThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message })
      .addCase(fetchOrdersThunk.fulfilled, (s, a) => { s.orders = a.payload.orders; s.total = a.payload.total; s.pages = a.payload.pages; s.page = a.payload.page })
      .addCase(fetchOrderThunk.fulfilled, (s, a) => { s.currentOrder = a.payload.order })
      .addCase(cancelOrderThunk.fulfilled, (s, a) => { s.currentOrder = a.payload.order })
  },
})
export const { setPage } = orderSlice.actions
export default orderSlice.reducer
