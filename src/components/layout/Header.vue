<template>
  <div>
    <q-toolbar>
      <img
        src="~assets/app-logo-128x128.png"
        height="35px;"
        @click="$router.push({ name: 'home' })"
        class="cursor-pointer"
      />

      <q-toolbar-title
        class="app-title"
        :class="dark ? 'text-white' : 'text-black'"
      >
        I<span class="gt-md">nvestment </span>P<span class="gt-md"
          >rogramming and </span
        >M<span class="gt-md">anagement </span>S<span class="gt-md">ystem</span>
      </q-toolbar-title>
      <q-space />

      <q-btn
        flat
        round
        icon="notifications"
        class="q-mr-md text-grey-6"
        @click="$emit('showDrawer')"
				:loading="loading"
      >
        <q-badge
          color="red"
          floating
          v-if="!loading && user.unreadNotifications.length"
        >
          {{ user.unreadNotifications.length }}
        </q-badge>
      </q-btn>

      <q-btn
        :class="dark ? 'bg-purple-4' : 'bg-primary'"
        text-color="white"
        flat
        round
        @mouseenter="menu = true"
        size="sm"
      >
        <q-avatar size="42px">
          <img :src="imageUrl" />
        </q-avatar>
        <dropdown-menu v-model="menu" />
      </q-btn>
    </q-toolbar>

    <q-separator
      :color="dark ? 'purple-2' : 'primary'"
      class="header-separator"
    />

    <q-tabs
      align="left"
      :class="dark ? 'bg-grey-9 text-white' : 'bg-white text-grey-9'"
    >
      <template v-for="({ to, label, icon }, index) in tabs">
        <q-route-tab
          :key="index"
          :to="to"
          :label="$q.screen.gt.sm ? label : void 0"
          :icon="$q.screen.lt.md ? icon : void 0"
          class="text-capitalize"
          exact
        />
      </template>
    </q-tabs>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import DropdownMenu from './Dropdown';

export default {
  components: { DropdownMenu },
  name: 'AppHeader',
  computed: {
    ...mapState('settings', ['dark']),
		...mapState('auth',['user']),
    ...mapGetters('auth', ['imageUrl','loading'])
  },
  data() {
    return {
      tabs: [
        {
          label: 'Home',
          icon: 'home',
          to: '/'
        },
        {
          label: 'Projects',
          icon: 'list',
          to: '/projects'
        },
        {
          label: 'Reports',
          icon: 'bubble_chart',
          to: '/reports'
        },
        {
          label: 'Resources',
          icon: 'attach_file',
          to: '/resources'
        },
        {
          label: 'Directory',
          icon: 'phone',
          to: '/directory'
        }
      ],
      menu: false
    };
  }
};
</script>

<style>
.app-title {
  font-family: logoFont;
}

.app-title .gt-md {
  font-family: logoFont;
}
</style>
