import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { sidebarOpen: false, cartDrawerOpen: false, theme: 'light', globalLoading: false },
  reducers: {
    toggleSidebar(s) { s.sidebarOpen = !s.sidebarOpen },
    toggleCartDrawer(s) { s.cartDrawerOpen = !s.cartDrawerOpen },
    setTheme(s, a) { s.theme = a.payload },
    setGlobalLoading(s, a) { s.globalLoading = a.payload },
  },
})
export const { toggleSidebar, toggleCartDrawer, setTheme, setGlobalLoading } = uiSlice.actions
export default uiSlice.reducer
