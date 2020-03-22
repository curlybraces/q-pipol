import { LocalStorage } from 'quasar';

export default function() {
  return {
    me: {},
    id: null,
    loggedIn: LocalStorage.getItem('loggedIn') || false,
    token: null,
    email: null,
    name: null,
    image_url: null,
    operating_unit: null,
    contact_number: null,
    position: null,
    role: null,
    userLoaded: false,
    notifications: [],
    unreadNotifications: [],
    verified: false
  };
}
