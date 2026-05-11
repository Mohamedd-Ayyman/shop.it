import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services'

export const loginThunk = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try { const res = await authService.login(data); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const registerThunk = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try { const res = await authService.register(data); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})
export const getMeThunk = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
  try { const res = await authService.getMe(); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false, accessToken: null, loading: false, error: null },
  reducers: {
    logout(state) { state.user = null; state.isAuthenticated = false; state.accessToken = null; localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken') },
    clearError(state) { state.error = null },
  },
  extraReducers: (b) => {
    b.addCase(loginThunk.pending, (s) => { s.loading = true; s.error = null })
      .addCase(loginThunk.fulfilled, (s, a) => { s.loading = false; s.isAuthenticated = true; s.user = a.payload.user; s.accessToken = a.payload.accessToken; localStorage.setItem('accessToken', a.payload.accessToken); localStorage.setItem('refreshToken', a.payload.refreshToken) })
      .addCase(loginThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message || 'Login failed' })
      .addCase(registerThunk.pending, (s) => { s.loading = true; s.error = null })
      .addCase(registerThunk.fulfilled, (s, a) => { s.loading = false; s.isAuthenticated = true; s.user = a.payload.user; s.accessToken = a.payload.accessToken; localStorage.setItem('accessToken', a.payload.accessToken); localStorage.setItem('refreshToken', a.payload.refreshToken) })
      .addCase(registerThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message || 'Registration failed' })
      .addCase(getMeThunk.pending, (s) => { s.loading = true })
      .addCase(getMeThunk.fulfilled, (s, a) => { s.loading = false; s.isAuthenticated = true; s.user = a.payload.user })
      .addCase(getMeThunk.rejected, (s) => { s.loading = false; s.isAuthenticated = false; s.user = null })
  },
})
export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
