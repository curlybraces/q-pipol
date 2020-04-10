<template>
  <q-card style="width:400px;">
    <q-toolbar>
      Choose Avatar
      <q-space />
      <q-btn icon="close" size="sm" flat round dense @click="$emit('close')" />
    </q-toolbar>
    <q-separator></q-separator>
    <div class="q-ma-sm q-pa-sm bg-red-1" v-if="error">
      <p>{{ error }}</p>
    </div>
    <q-scroll-area style="height:400px;">
      <div class="row q-pa-sm q-col-gutter-md bg-white">
        <template v-for="i in 40">
          <div class="col-3" :key="i">
            <q-img
              :src="`statics/avatars/avatar-${i}.svg`"
              @click="select(i)"
              class="cursor-pointer"
              :class="selectedAvatar == i ? 'active' : void 0"
            />
          </div>
        </template>
      </div>
      <div class="row q-pa-sm text-caption">
        Icons made by &nbsp;<a
          href="https://www.flaticon.com/authors/freepik"
          title="Freepik"
          >Freepik</a
        >
        &nbsp;from &nbsp;<a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com</a
        >.
      </div>
    </q-scroll-area>
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
    select(i) {
      this.selectedAvatar = i;
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
