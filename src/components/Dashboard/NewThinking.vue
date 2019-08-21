<template>
  <div class="row q-col-gutter-md">
    <div class="col">
      <q-card square flat>
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
    </div>
  </div>
</template>

<script>
import newThinkings from "../../statics/json/new_thinkings.json";

export default {
  name: "NewThinking",
  data() {
    return {
      slide: 1,
      newThinkings: newThinkings
    };
  }
}
</script>

<style lang="stylus" scoped>
.custom-caption
  text-align center
  padding 12px
  color white
  background-color rgba(0, 0, 0, .6)
</style>
