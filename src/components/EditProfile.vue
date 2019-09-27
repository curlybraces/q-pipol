<template>
  <q-card style="max-width:400px">
    <div>
      <q-toolbar>
        <q-btn flat round icon="close" v-close-popup dense />
        <q-toolbar-title>
          <div class="font-weight-bold text-h6">
            Edit Profile
          </div>
        </q-toolbar-title>
        <q-btn dense label="Save" color="primary" />
      </q-toolbar>
      <q-separator />
      <q-card-section>
        <q-img src="statics/masaganang-ani-mataas-na-kita.png" />
      </q-card-section>
      <q-card-section>
        <q-list separator>
          <q-item>
            <q-input
              v-model="user.displayName"
              label="Name"
              class="col"
              borderless
              filled
              stack-label
              counter
              maxlength="20"
            />
          </q-item>
          <q-item>
            <q-input
              v-model="user.bio"
              label="Short Biography"
              class="col"
              borderless
              filled
              stack-label
              counter
              maxlength="160"
            />
          </q-item>
          <q-item>
            <q-input
              v-model="user.position"
              label="Position"
              class="col"
              borderless
              filled
              stack-label
              counter
              maxlength="30"
            />
          </q-item>
        </q-list>
      </q-card-section>
    </div>
  </q-card>
</template>

<script>
export default {
  name: "EditProfile",
  data() {
    return {
      user: {
        displayName: "",
        bio: "",
        position: ""
      }
    };
  }
};
</script>
