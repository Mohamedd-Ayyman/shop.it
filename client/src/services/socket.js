import { io } from 'socket.io-client'
import { store } from '../store/store'
import { addNotification, setUnreadCount } from '../store/slices/notificationSlice'

let socket = null

export function connectSocket() {
  const token = localStorage.getItem('accessToken')
  if (!token || socket?.connected) return

  socket = io('/', {
    auth: { token },
    transports: ['websocket', 'polling'],
  })

  socket.on('connect', () => console.log('Socket connected'))

  socket.on('new_notification', (notification) => {
    store.dispatch(addNotification(notification))
  })

  socket.on('disconnect', () => console.log('Socket disconnected'))
}

export function disconnectSocket() {
  if (socket) { socket.disconnect(); socket = null }
}

export function getSocket() { return socket }
