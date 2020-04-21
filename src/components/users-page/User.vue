<template>
  <q-item
    flat
    bordered
    :class="user.role && user.role.name === 'guest' ? 'bg-red-1' : ''"
  >
    <q-item-section avatar>
      <q-avatar class="text-white text-uppercase">
        <q-img
          :src="
            user.image_url ? user.image_url : 'statics/avatar-placeholder.png'
          "
        />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <span class="text-uppercase">
          {{ user.name }}
        </span>
      </q-item-label>
      <q-item-label v-if="user.operating_unit">
        {{ user.operating_unit ? user.operating_unit.acronym : '' }}
      </q-item-label>
      <q-item-label>
        {{ user.position }}
      </q-item-label>
      <q-item-label caption>
        {{ user.email }}
        <q-icon
          name="done_outline"
          color="green"
          v-if="user.verified"
          class="cursor-pointer"
        >
          <q-tooltip>This user has verified email.</q-tooltip>
        </q-icon>
      </q-item-label>
    </q-item-section>
    <q-item-section class="text-center">
      <q-item-label>
        <div class="q-gutter-xs">
          <template v-for="ou in user.reviews">
            <q-badge :key="ou.id" color="orange-10">
              {{ ou.acronym }}
            </q-badge>
          </template>
        </div>
      </q-item-label>
    </q-item-section>
    <q-separator vertical></q-separator>
    <q-item-section side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn
          flat
          round
          icon="apps"
          @click="assignOUDialog = true"
          :disable="
            user.role &&
              user.role.name !== 'reviewer' &&
              user.role.name !== 'viewer'
          "
        >
          <q-tooltip>Assign Operating Units to Review</q-tooltip>
        </q-btn>

        <q-btn
          round
          flat
          dense
          icon="account_box"
          @click="assignRoleDialog = true"
          :disable="user.role && user.role.name === 'superadmin'"
        >
          <q-tooltip>Assign Roles</q-tooltip>
        </q-btn>
      </div>
    </q-item-section>

    <q-dialog
      v-model="assignOUDialog"
      full-height
      :position="$q.screen.xs ? void 0 : 'right'"
      persistent
      :maximized="$q.screen.xs"
      transition-show="jump-left"
      transition-hide="jump-right"
    >
      <assign-ous :id="user.id" @close="assignOUDialog = false"></assign-ous>
    </q-dialog>

    <q-dialog
      v-model="assignRoleDialog"
      full-height
      :position="$q.screen.xs ? void 0 : 'right'"
      persistent
      :maximized="$q.screen.xs"
      transition-show="jump-left"
      transition-hide="jump-right"
    >
      <assign-roles
        :role="roleId"
        :id="user.id"
        @close="assignRoleDialog = false"
      ></assign-roles>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    'assign-roles': () => import('.//AssignRoles.vue'),
    'assign-ous': () => import('.//AssignOus.vue')
  },
  name: 'User',
  props: ['id', 'user', 'value'],
  computed: {
    ...mapGetters('settings', ['avatarColor']),
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    roleId() {
      return this.user.role ? this.user.role.id : null;
    }
  },
  methods: {
    ...mapActions('users', ['setSearch'])
  },
  data() {
    return {
      assignRoleDialog: false,
      loading: false,
      assignOUDialog: false
    };
  }
};
</script>
