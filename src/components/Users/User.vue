<template>
  <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 flex">
    <q-card class="fit" flat bordered :class="!user.active ? 'bg-red-1' : ''">
      <q-item>
        <q-item-section avatar>
          <q-avatar class="text-white text-uppercase" :color="avatarColor">
            <img
              :src="'statics/avatar/' + user.image_url + '.svg'"
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
          <q-item-label>
            <q-badge
              color="orange-10"
              class="cursor-pointer"
              v-if="user.operating_unit"
            >
              {{ user.operating_unit ? user.operating_unit.name : '' }}
            </q-badge>
            &nbsp;
            <q-badge
              :color="avatarColor"
              @click="setSearch(user.role.name)"
              class="cursor-pointer"
              v-if="user.role"
            >
              {{ user.role ? user.role.name : '' }}
            </q-badge>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            round
            flat
            dense
            icon="check"
            color="green"
            @click="toggleUserActivation"
            v-if="!user.active"
            :loading="loading"
          >
            <q-tooltip>Activate User</q-tooltip>
          </q-btn>

          <q-btn
            round
            flat
            dense
            icon="close"
            color="red"
            @click="toggleUserActivation"
            :loading="loading"
            v-else
          >
            <q-tooltip>Deactivate User</q-tooltip>
          </q-btn>

          <q-btn
            round
            flat
            dense
            icon="settings"
            @click="assignRoleDialog = true"
          >
            <q-tooltip>Assign Roles</q-tooltip>
          </q-btn>
        </q-item-section>

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
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    'assign-roles': () => import('../Users/AssignRoles.vue')
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
      loading: false
    };
  }
};
</script>
