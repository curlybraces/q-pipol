import { LocalStorage } from 'quasar';

export default function() {
  return {
    loading: false,
    error: false,
    errorMessage: null,
    user: null,
    id: null,
    me: {},
    loggedIn: LocalStorage.getItem('loggedIn') || false,
    token: LocalStorage.getItem('token') || '',
    email: null,
    name: LocalStorage.getItem('name') || '',
    image_url: LocalStorage.getItem('image_url'),
    operating_unit: null,
    contact_number: null,
    position: null,
    role: LocalStorage.getItem('role') || '',
    userLoaded: false,
    notifications: [],
    unreadNotifications: [],
    verified: LocalStorage.getItem('verified') || false,
    showValidateEmailReminder:
      LocalStorage.getItem('showValidateEmailReminder') || false
  };
}
