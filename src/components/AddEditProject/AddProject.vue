<template>
  <div class="row q-pa-sm">
    <div class="col-4 q-pa-sm">
      <pre>
				{{ project }}
			</pre
      >
    </div>

    <div class="col-8 q-pa-sm">
      <q-card square>
				Add Edit Project Mounted
<!--        <add-edit-project></add-edit-project>-->
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { mapState, mapActions } from 'vuex';
// import AddEditProject from './shared/AddEditProject';

export default {
  // components: { AddEditProject },
  name: 'AddProject',
  methods: {
    // ...mapActions('project', ['createProject']),
    // validateAndCreate() {
    //   this.$refs.form.validate().then(success => {
    //     if (success) {
    //       this.createProject();
    //     }
    //   });
    // }
  },
  computed: {
  	...mapState('project',['project'])
    ...mapState('project', ['project', 'loading'])
  },
  data() {
    return {
      expanded: false,
      filteredProvinces: [],
      step: 1
    };
  }
};
</script>
