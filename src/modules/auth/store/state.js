import { LocalStorage } from 'quasar';

export default function() {
  return {
    user: LocalStorage.getItem('user') || null,
    loading: false,
    error: null,
    loggedIn: LocalStorage.getItem('loggedIn') || false,
    token: LocalStorage.getItem('token') || '',
    role: LocalStorage.getItem('role') || ''
  };
}
