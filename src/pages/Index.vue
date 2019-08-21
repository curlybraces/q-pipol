<template>
  <q-page padding>
    <p>Home</p>

    <div class="q-col-gutter-y-md">

      <card-group></card-group>

      <new-thinking></new-thinking>

    </div>

    <welcome-dialog />

    <fab-component link="/projects/add"></fab-component>

  </q-page>
</template>

<script>
import WelcomeDialog from "../components/Dashboard/WelcomeDialog";
import CardGroup from "../components/Dashboard/CardGroup";
import NewThinking from "../components/Dashboard/NewThinking";
import FabComponent from "../components/UI/FabComponent";

export default {
  name: "PageIndex",
  components: {
    WelcomeDialog,
    CardGroup,
    NewThinking,
    FabComponent
  }
};
</script>
