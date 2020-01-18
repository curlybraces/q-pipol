<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="row q-col-gutter-x-md q-gutter-y-md">
      <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
        <q-card>
          <q-list separator>
            <q-item-label header>NAVIGATION</q-item-label>
            <q-item
              v-for="item in steps"
              :key="item.step"
              clickable
              @click="jumpTo(item.step)"
              :active="item.step == step"
            >
              <q-item-section top avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  :icon="item.icon"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="col-lg-10 col-md-9 col-sm-8 col-xs-12">
        <q-form ref="form" @submit="handleSubmit">
          <q-stepper v-model="step" vertical color="primary" animated>
            <q-step
              :name="1"
              title="General Information"
              icon="settings"
              :done="step > 1"
            >
              <general-information
                v-bind:generalInformation.sync="generalInformation"
              />
              <q-stepper-navigation>
                <q-btn color="primary" label="Continue" @click="step++" />
              </q-stepper-navigation>
            </q-step>

<<<<<<< HEAD
      <q-step :name="2" title="Investment Cost" icon="attach_money">
        This step won't show up because it is disabled.
        <q-stepper-navigation>
          <q-btn @click="step++" color="primary" label="Continue" />
          <q-btn
            flat
            @click="step--"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Save Program/Project" icon="save">
        Try out different ad text to see what brings in the most customers, and
        learn how to enhance your ads using features like ad extensions. If you
        run into any problems with your ads, find out how to tell if they're
        running and how to resolve approval issues.

        <q-stepper-navigation>
          <q-btn color="primary" label="Finish" />
          <q-btn
            flat
            @click="step--"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
=======
            <q-step :name="2" title="Investment Cost" icon="attach_money">
              This step won't show up because it is disabled.
              <q-stepper-navigation>
                <q-btn @click="step++" color="primary" label="Continue" />
                <q-btn
                  flat
                  @click="step--"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="3" title="Rationale and Justification" icon="help">
              <q-input
                v-model="rationale"
                label="Rationale and Justification"
                type="textarea"
                stack-label
                outlined
                dense
                counter
                maxlength="1000"
                hint="Please provide rationale and justification for the program/project in less than 1000 characters."
              />
              <q-stepper-navigation>
                <q-btn @click="step++" color="primary" label="Continue" />
                <q-btn
                  flat
                  @click="step--"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="4" title="Save Program/Project" icon="save">
              Try out different ad text to see what brings in the most
              customers, and learn how to enhance your ads using features like
              ad extensions. If you run into any problems with your ads, find
              out how to tell if they're running and how to resolve approval
              issues.

              <q-stepper-navigation>
                <q-btn type="submit" color="primary" label="Save" />
                <q-btn
                  flat
                  @click="step--"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-form>
      </div>
    </div>
>>>>>>> 44052da005922a2a68ad491802688bac5c8980b1
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs.vue";
import GeneralInformation from "../components/AddEditProject/GeneralInformation";

import { createProject } from "../functions/function-create-project";

export default {
  components: { PageBreadcrumbs, GeneralInformation },
  name: "AddProject",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "PIP",
          url: "/pip"
        },
        {
          title: "Add Project"
        }
      ],
      steps: [
        {
          icon: "edit",
          label: "General Information",
          step: 1
        },
        {
          icon: "attach_money",
          label: "Investment Cost",
          step: 2
        },
        {
          icon: "help",
          label: "Rationale and Justification",
          step: 3
        },
        {
          icon: "save",
          label: "Save Program/Project",
          step: 4
        }
      ],
      step: 1,
      rationale: "",
      id: null,
      generalInformation: {
        title: null,
        classification: null,
        implementing_agency: null,
        description: null,
        expected_outputs: null,
        spatial_coverage: null,
        regions: [],
        provinces: [],
        implementation_start_date: null,
        implementation_end_date: null,
        total_project_cost: null,
        status_update: null
      }
    };
  },
  computed: {
    isActive() {
      return this.val == this.step;
    }
  },
  methods: {
    jumpTo(step) {
      this.step = step;
    },
    handleSubmit() {
      this.$refs.form.validate().then(success => {
        if (success) {
          createProject(this.generalInformation).then(id => {
            this.id = id;
          });
        } else {
          alert("error");
        }
      });
    }
  }
};
</script>
