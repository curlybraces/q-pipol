<template>
  <q-page padding>
    <p>Home</p>

    <welcome-dialog />

    <q-card square>
      <q-card-section class="bg-primary" style="padding:5px">
        <q-item class="text-white text-center">
          <q-item-section>
            <q-item-label>
              <div class="text-h5">The "New Thinking" for Agriculture</div>
            </q-item-label>
            <q-item-label>
              <div class="text-h6">
                8 Paradigms for a Food-Secure Philippines
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-carousel
        animated
        infinite
        v-model="slide"
        autoplay
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        class="q-mb-md"
      >
        <q-carousel-slide
          v-for="item in newThinkings"
          :name="item.id"
          :img-src="'statics/' + item.image"
          :key="item.id"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h6">{{ item.id + ". " + item.name }}</div>
            <div class="text-caption">{{ item.description }}</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-card>

    <div class="row q-col-gutter-sm">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-card class="col bg-primary" dark>
          <q-card-section>
            <q-item dense>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Total Projects</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="text-h2">
                  10
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-card class="col bg-secondary" dark>
          <q-card-section>
            <q-item dense>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>My Projects</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="text-h2">
                  10
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-card class="col bg-red" dark>
          <q-card-section>
            <q-item dense>
              <q-item-section avatar>
                <q-icon name="delete" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Total Projects</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="text-h2">
                  10
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-card class="col bg-accent" dark>
          <q-card-section>
            <q-item dense>
              <q-item-section avatar>
                <q-icon name="notifications" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Notifications</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="text-h2">
                  10
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import newThinkings from "../statics/json/new_thinkings.json";
import WelcomeDialog from "../components/Dashboard/WelcomeDialog";

export default {
  name: "PageIndex",
  components: {
    WelcomeDialog
  },
  data() {
    return {
      slide: 1,
      newThinkings: newThinkings
    };
  }
};
</script>

<style lang="stylus" scoped>
.custom-caption
  text-align center
  padding 12px
  color white
  background-color rgba(0, 0, 0, .6)
</style>
