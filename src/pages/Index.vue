<template>
  <q-page padding>
    <p>Home</p>

    <welcome-dialog />

      <q-card square>
          <q-card-section class="bg-primary text-white text-uppercase" style="padding:5px">
            <div class="text-h6">New Thinking in Agriculture</div>
          </q-card-section>
        <q-carousel
          animated
          infinite
          v-model="slide"
          autoplay
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          class="q-mb-md">
          <q-carousel-slide v-for="item in new_thinkings" :name="item.id" :img-src=" 'statics/' + item.image"
                            :key="item.id">
              <div class="absolute-bottom custom-caption">
                  <div class="text-h6">{{ item.id + '. ' + item.name }}</div>
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
    import { mapState, mapActions } from "vuex";
import WelcomeDialog from "../components/Dashboard/WelcomeDialog";

export default {
  name: "PageIndex",
  components: {
    WelcomeDialog
  },
  data() {
    return {
        slide: 1
    };
  },
  computed: {
      ...mapState("new_thinkings",["new_thinkings"])
  },
  methods: {
      ...mapActions("new_thinkings",["loadNewThinkings"])
  },
  mounted() {
      this.loadNewThinkings();
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