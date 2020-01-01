<template>
  <div class="row q-my-md">
    <q-item-label class="text-weight-bold">{{
      title.toUpperCase()
    }}</q-item-label>
    <q-scroll-area
      horizontal
      style="height: 200px; width: 100%;"
      :visible="false"
    >
      <div class="row q-mt-xs q-col-gutter-md no-wrap">
        <template v-for="{ label } in list">
          <div class="col-1" :key="label">
            <q-card style="height:120px;min-width:80px;">
              <q-img src="https://via.placeholder.com/80x120">
                <div class="absolute-full text-subtitle2 flex flex-center">
                  {{ label }}
                </div>
              </q-img>
            </q-card>
          </div>
        </template>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
export default {
  name: "ScrollingCard",
  props: {
    title: String,
    list: Array
  }
};
</script>
