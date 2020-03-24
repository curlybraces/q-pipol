import { Notify } from "quasar";

export const showSuccessNotification = ({
  message = 'Success',
  icon = 'check'
}) => {
  Notify.create({
    icon: icon,
    position: 'bottom-right',
    color: 'green',
    message: message,
    timeout: 3000,
    progress: true
  });
};

export const showErrorNotification = ({
  message = 'An error occurred.',
  icon = 'close'
}) => {
  Notify.create({
    icon: icon,
    position: 'bottom-right',
    color: 'red',
    message: message,
    timeout: 3000,
    progress: true
  });
};
