<template>
  <div class="col">
    <div class="column q-my-md">
      <div class="row">
        <q-item class="col">
          <q-item-section>
            <q-item-label class="text-weight-bold">
              {{ title.toUpperCase() }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            Show more >
          </q-item-section>
        </q-item>
      </div>
      <div class="row q-col-gutter-md">
        <template v-for="{ label } in menu">
          <div class="col-lg-1 col-md-2 col-sm-3 col-xs-4" :key="label">
            <q-card>
              <q-img src="https://via.placeholder.com/80x120">
                <div
                  class="absolute-full text-subtitle2 flex flex-center text-center"
                >
                  {{ label }}
                </div>
              </q-img>
            </q-card>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollingCard",
  props: {
    title: String,
    list: Array
  },
  data() {
    return {
      menu: []
    };
  },
  mounted() {
    const { list } = this;
    this.menu = list;
  }
};
</script>
