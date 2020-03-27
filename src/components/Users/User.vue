<template>
  <q-item flat bordered :class="user.role.name === 'guest' ? 'bg-red-1' : ''">
    <q-item-section avatar>
      <q-avatar class="text-white text-uppercase">
        <img
          :src="'statics/avatars/avatar-' + user.image_url + '.svg'"
          v-if="user.image_url"
        />
        <img src="statics/avatar-placeholder.png" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <span class="text-uppercase">
          {{ user.name }}
        </span>
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
        {{ user.operating_unit ? user.operating_unit.name : '' }}
      </q-item-label>
    </q-item-section>
    <q-item-section class="text-center">
      <q-item-label>
        <q-badge
          color="green-7"
          @click="setSearch(user.role.name)"
          class="cursor-pointer"
          v-if="user.role"
        >
          {{ user.role ? user.role.name : '' }}
        </q-badge>
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
          :disable="user.role.name !== 'reviewer'"
        >
          <q-tooltip>Assign Operating Units to Review</q-tooltip>
        </q-btn>

        <q-btn
          round
          flat
          dense
          icon="account_box"
          @click="assignRoleDialog = true"
          :disable="user.role.name === 'superadmin'"
        >
          <q-tooltip>Assign Roles</q-tooltip>
        </q-btn>
      </div>
    </q-item-section>

    <q-dialog
      v-model="assignOUDialog"
      transition-hide="fade"
      transition-show="fade"
      persistent
    >
      <assign-ous :id="user.id" @close="assignOUDialog = false"></assign-ous>
    </q-dialog>

    <q-dialog
      v-model="assignRoleDialog"
      transition-hide="fade"
      transition-show="fade"
      persistent
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
    'assign-roles': () => import('../Users/AssignRoles.vue'),
    'assign-ous': () => import('../Users/AssignOus.vue')
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
    ...mapActions('users', ['activateUser', 'deactivateUser', 'setSearch']),
    toggleUserActivation() {
      const { id, active } = this.$props.user;

      const payload = {
        id: id,
        active: !active
      };

      this.$q
        .dialog({
          title: active ? 'Deactivate user' : 'Activate user',
          message: 'You are about to toggle activation status of user #' + id,
          persistent: true,
          cancel: true,
          transitionShow: 'fade',
          transitionHide: 'fade'
        })
        .onOk(() => {
          this.loading = true;
          if (!active) {
            this.activateUser(payload)
              .then(data => console.log(data))
              .finally(() => (this.loading = false));
          } else {
            this.deactivateUser(payload)
              .then(data => console.log(data))
              .finally(() => (this.loading = false));
          }
        });
    }
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
