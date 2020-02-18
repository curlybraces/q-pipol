import { Notify } from "quasar";

Notify.setDefaults({
  position: "top",
  timeout: 0,
  textColor: "white",
  color: "orange",
  icon: "announcement",
  actions: [{ icon: "close", color: "white", round: true }]
});
