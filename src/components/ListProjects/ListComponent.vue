<template>
  <div>
    <q-list bordered separator class="rounded-borders">
      <q-item
        v-for="item in items"
        :key="item.id"
        @click="goTo(item.id)"
        clickable
      >
        <q-item-section class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">{{
            item.operating_unit.name
          }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{ item.title }}</span>
          </q-item-label>
          <q-item-label caption lines="2">
            {{ item.description }}
          </q-item-label>
          <q-item-label caption lines="1">
            [ {{ item.implementation_start + " - " + item.implementation_end }} ]
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label>
            PhP {{ Number(item.total_cost).toLocaleString() }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn
              class="gt-xs"
              size="12px"
              flat
              dense
              round
              icon="edit"
              color="green"
              :to="'/projects/' + item.id"
            />
            <q-btn
              class="gt-xs"
              size="12px"
              flat
              dense
              round
              icon="delete"
              color="red"
              @click.stop="promptToDelete(item.id)"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <dialog-component/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DialogComponent from 'DialogComponent';

export default {
  name: "ListComponent",
  components: {
    DialogComponent
  },
  props: {
    items: Array
  },
  data() {
    return {
      prompt: false
    };
  },
  methods: {
    ...mapActions("projects", ["deleteProject"]),
    goTo(id) {
      this.$router.push("/projects/" + id);
    },
    promptToDelete(id) {
      console.log(id)
    }
  }
};
</script>

<style></style>
