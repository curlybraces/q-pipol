import { LocalStorage } from 'quasar';

export default function() {
  return {
    me: {},
    id: null,
    loggedIn: LocalStorage.getItem('loggedIn') || false,
    token: LocalStorage.getItem('token') || '',
    email: null,
    name: null,
    image_url: null,
    operating_unit: null,
    contact_number: null,
    position: null,
    role: LocalStorage.getItem('role') || '',
    userLoaded: false,
    notifications: [],
    unreadNotifications: [],
    verified: LocalStorage.getItem('verified') || true
  };
}
