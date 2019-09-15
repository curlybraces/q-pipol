import { Loading, QSpinner } from "quasar";

Loading.setDefaults({
  message: "Processing your request",
  messageColor: "primary",
  spinner: QSpinner,
  spinnerColor: "primary"
});
