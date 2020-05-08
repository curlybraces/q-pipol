import { LocalStorage, Dark } from 'quasar';

export default function() {
  return {
    dense: LocalStorage.getItem('dense') || false,
    dark: LocalStorage.getItem('dark') || false,
    appVersion: '0.1.0-beta'
  };
}
