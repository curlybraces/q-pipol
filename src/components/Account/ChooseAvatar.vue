<template>
  <q-card>
    <q-toolbar>
      Choose Avatar
      <q-space />
      <q-btn icon="close" size="sm" flat round dense @click="$emit('close')" />
    </q-toolbar>
    <q-separator></q-separator>
    <div class="q-ma-sm q-pa-sm bg-red-1" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="row q-pa-sm q-col-gutter-md bg-white">
      <template v-for="(avatar, index) in AVATARS">
        <div class="col-3" :key="index">
          <q-img
            :src="`statics/avatar/${avatar}.svg`"
            @click="select(avatar)"
            class="cursor-pointer"
            :class="selectedAvatar == avatar ? 'active' : void 0"
          />
          <div class="q-mt-sm text-center">{{ avatar }}</div>
        </div>
      </template>
    </div>
    <q-card-actions align="right">
      <q-btn flat dense label="cancel" @click="$emit('close')" />
      <q-btn
        dense
        color="primary"
        label="Save"
        @click="saveAvatar"
        :loading="loading"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { AVATARS } from '../../data/avatars';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ChooseAvatar',
  props: ['avatar'],
  computed: {
    ...mapState('auth', ['image_url'])
  },
  data() {
    return {
      AVATARS,
      selectedAvatar: '',
      loading: false,
      error: ''
    };
  },
  methods: {
    ...mapActions('auth', ['setImageUrl']),
    select(avatar) {
      this.selectedAvatar = avatar;
    },
    saveAvatar() {
      this.error = '';
      this.loading = true;
      if (this.selectedAvatar === '') {
        this.loading = false;
        this.error = 'Please select avatar.';
      } else {
        this.setImageUrl(this.selectedAvatar);
        setTimeout(() => {
          this.$emit('close');
          this.loading = false;
        }, 1000);
      }
    }
  },
  mounted() {
    if (this.$props.avatar) {
      this.selectedAvatar = this.$props.avatar;
    }
  }
};
</script>

<style>
.q-img.active {
  -moz-box-shadow: 0px 0px 2px 3px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 2px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 2px 3px rgba(0, 0, 0, 0.3);
}
</style>
