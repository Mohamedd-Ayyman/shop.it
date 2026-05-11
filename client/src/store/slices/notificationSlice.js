import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { notificationService } from '../../services'

export const fetchNotificationsThunk = createAsyncThunk('notifications/fetch', async (params, { rejectWithValue }) => {
  try { const res = await notificationService.list(params); return res.data } catch (e) { return rejectWithValue(e.response?.data || e.message) }
})

const notifSlice = createSlice({
  name: 'notifications',
  initialState: { items: [], unreadCount: 0, loading: false },
  reducers: {
    addNotification(s, a) { s.items.unshift(a.payload); s.unreadCount += 1 },
    markAsRead(s, a) { const n = s.items.find(i => i._id === a.payload); if (n) { n.isRead = true; s.unreadCount = Math.max(0, s.unreadCount - 1) } },
    markAllAsRead(s) { s.items.forEach(i => i.isRead = true); s.unreadCount = 0 },
    setUnreadCount(s, a) { s.unreadCount = a.payload },
  },
  extraReducers: (b) => {
    b.addCase(fetchNotificationsThunk.fulfilled, (s, a) => { s.items = a.payload.notifications; s.unreadCount = a.payload.unreadCount })
  },
})
export const { addNotification, markAsRead, markAllAsRead, setUnreadCount } = notifSlice.actions
export default notifSlice.reducer
