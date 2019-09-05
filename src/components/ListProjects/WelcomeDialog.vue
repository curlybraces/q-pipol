<template>
  <q-dialog v-model="dialog" persistent>
    <q-carousel
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      arrows
      :control-color="color"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      v-model="slide"
      class="bg-primary"
      :fullscreen="true"
    >
      <q-carousel-slide
        :name="index"
        class="column no-wrap flex-center"
        v-for="(item, index) in slides"
        :key="index"
      >
        <q-icon :name="item.icon" :color="color" size="128px" />
        <div class="q-mt-md text-center text-white text-h6">
          {{ item.message }}
        </div>
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control
          position="top-right"
          :offset="[18, 18]"
          class="text-white"
        >
          <q-btn
            flat
            round
            dense
            dark
            icon="close"
            color="white"
            @click="closeDialog"
          />
        </q-carousel-control>

        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
          class="q-gutter-xs"
        >
          <q-checkbox
            dense
            text-color="white"
            v-model="dontShowAgain"
            label="Don't show this again"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </q-dialog>
</template>

<script>
import { LocalStorage } from "quasar";

export default {
  name: "WelcomeDialog",
  data() {
    return {
      color: "white",
      dialog: !LocalStorage.getItem("dontShowAgain"),
      dontShowAgain: false,
      slide: 0,
      slides: [
        {
          icon: "phonelink",
          message: "Welcome to DA-iPMS."
        },
        {
          icon: "add_box",
          message: "Add, edit and delete projects with a few clicks."
        },
        {
          icon: "cloud_queue",
          message: "Access your projects anywhere, anytime."
        },
        {
          icon: "notifications",
          message: "Be notified when projects are added, updated or deleted."
        },
        {
          icon: "send",
          message: "Ready?"
        }
      ],
      carousel: true
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    }
  },
  watch: {
    dontShowAgain(newDontShowAgain) {
      LocalStorage.set("dontShowAgain",newDontShowAgain);
    }
  }
};
</script>
