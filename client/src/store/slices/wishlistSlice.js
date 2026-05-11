import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from '../../services'

export const fetchWishlistThunk = createAsyncThunk('wishlist/fetch', async (_, { rejectWithValue }) => {
  try { const res = await userService.getWishlist(); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const addToWishlistThunk = createAsyncThunk('wishlist/add', async (productId, { rejectWithValue }) => {
  try { const res = await userService.addToWishlist(productId); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const removeFromWishlistThunk = createAsyncThunk('wishlist/remove', async (productId, { rejectWithValue }) => {
  try { const res = await userService.removeFromWishlist(productId); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchWishlistThunk.fulfilled, (s, a) => { s.items = a.payload.products || [] })
      .addCase(addToWishlistThunk.fulfilled, (s, a) => { s.items = a.payload.wishlist || [] })
      .addCase(removeFromWishlistThunk.fulfilled, (s, a) => { s.items = a.payload.wishlist || [] })
  },
})
export default wishlistSlice.reducer
