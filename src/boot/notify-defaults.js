import { Notify } from 'quasar';

Notify.setDefaults({
  position: 'top',
  timeout: 0,
  textColor: 'white',
  color: 'orange',
  icon: 'announcement',
  actions: [{ icon: 'close', color: 'white', round: true }]
});

export const NOTIFY_SUCCESS = (payload) => {
  console.log(payload);
  Notify.create({
    message: payload.message,
    color: 'green',
    timeout: 5000,
    icon: payload.icon,
    position: 'bottom-right'
  });
}
