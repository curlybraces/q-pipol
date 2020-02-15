<template>
  <div id="q-app" class="bg-grey-1">
    <router-view />

    <cookie-law
      theme="blood-orange"
      buttonText="I understand"
      position="bottom"
      transitionName="fade"
    >
    </cookie-law>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CookieLaw from "vue-cookie-law";
import gql from "graphql-tag";

export default {
  components: {
    CookieLaw
  },
  name: "App",
  // apollo: {
  //   $subscribe: {
  //     projectCreated: {
  //       query: gql`
  //         subscription testCreated {
  //           testCreated {
  //             id
  //             name
  //           }
  //         }
  //       `,
  //       result(data) {
  //         console.log(data);
  //       }
  //     }
  //   }
  // },
  computed: {
    ...mapState("auth", ["userLoaded"])
  },
  methods: {
    ...mapActions("auth", ["populateUser"])
  },
  created() {
    this.$q.addressbarColor.set("primary");
    if (!this.userLoaded) {
      this.$apollo
        .query({
          query: gql`
            query {
              me {
                name
                email
                profile {
                  operating_unit {
                    name
                    image
                  }
                  unit
                  position
                }
                roles {
                  name
                }
              }
            }
          `
        })
        .then(res => this.populateUser(res.data.me))
        .catch(err => console.log(err.message));
    }
  }
};
</script>
