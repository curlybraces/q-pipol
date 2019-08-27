import { Notify } from "quasar";

Notify.setDefaults({
  position: "top",
  timeout: 2500,
  textColor: "white",
  color: "secondary",
  actions: [{ icon: "close", color: "white" }]
});
