import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cartService } from '../../services'

export const fetchCartThunk = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try { const res = await cartService.getCart(); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const addToCartThunk = createAsyncThunk('cart/add', async (data, { rejectWithValue }) => {
  try { const res = await cartService.addItem(data); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const updateCartItemThunk = createAsyncThunk('cart/update', async ({ itemId, quantity }, { rejectWithValue }) => {
  try { const res = await cartService.updateItem(itemId, quantity); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const removeFromCartThunk = createAsyncThunk('cart/remove', async (itemId, { rejectWithValue }) => {
  try { const res = await cartService.removeItem(itemId); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const applyCouponThunk = createAsyncThunk('cart/coupon', async (code, { rejectWithValue }) => {
  try { const res = await cartService.applyCoupon(code); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], subtotal: 0, discount: 0, coupon: null, loading: false, error: null },
  reducers: {
    clearCart(s) { s.items = []; s.subtotal = 0; s.discount = 0; s.coupon = null },
    removeCouponLocal(s) { s.coupon = null; s.discount = 0 },
  },
  extraReducers: (b) => {
    b.addCase(fetchCartThunk.fulfilled, (s, a) => { s.items = a.payload.cart.items; s.subtotal = a.payload.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0); s.discount = a.payload.cart.couponDiscount || 0; s.coupon = a.payload.cart.couponCode })
      .addCase(addToCartThunk.fulfilled, (s, a) => { s.items = a.payload.cart.items })
      .addCase(updateCartItemThunk.fulfilled, (s, a) => { s.items = a.payload.cart.items })
      .addCase(removeFromCartThunk.fulfilled, (s, a) => { s.items = a.payload.cart.items })
      .addCase(applyCouponThunk.fulfilled, (s, a) => { s.coupon = a.payload.coupon?.code; s.discount = a.payload.cart.couponDiscount || 0 })
      .addCase(applyCouponThunk.rejected, (s, a) => { s.error = a.payload?.message })
  },
})
export const { clearCart, removeCouponLocal } = cartSlice.actions
export default cartSlice.reducer
