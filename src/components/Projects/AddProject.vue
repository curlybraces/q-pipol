<template>
	<q-card square flat>

		<card-header>Add Project</card-header>

		<div class="q-pa-md q-gutter-md">

        <q-item-label header>GENERAL INFORMATION</q-item-label>

        <div class="row justify-around">
          <q-checkbox v-model="projectToSubmit.pip" :val="true">PIP</q-checkbox>
          <q-checkbox v-model="projectToSubmit.cip" :val="true">CIP</q-checkbox>
          <q-checkbox v-model="projectToSubmit.trip" :val="true">TRIP</q-checkbox>
          <q-checkbox v-model="projectToSubmit.rdip" :val="true">RDIP</q-checkbox>
          <q-checkbox v-model="projectToSubmit.pcip" :val="true">PCIP</q-checkbox>
        </div>

        <q-input
          v-model="projectToSubmit.title"
          label="Program/Project Title"
          filled
          stack-label
          outlined
          :dense="dense"
          hint="The title of the program or project"
          maxlength="250"
          required
        />

        <q-option-group
          v-model="projectToSubmit.type_id"
          label="Type"
          :options="TYPES"
          inline
          :dense="dense"
        ></q-option-group>

        <single-select
          v-model="projectToSubmit.operating_unit_id"
          label="Implementing Agency"
          :dense="dense"
          :options-dense="dense"
          :options="OPERATING_UNITS"
          hint="Proponent of the program/project"
        />

        <single-select
          v-model="projectToSubmit.implementation_mode_id"
          label="Implementation Mode"
          :dense="dense"
          :options-dense="dense"
          :options="IMPLEMENTATION_MODES"
        ></single-select>

        <single-select
          v-model="projectToSubmit.tier_id"
          label="Tier"
          :dense="dense"
          :options-dense="dense"
          :options="TIERS"
        ></single-select>

        <single-select
          v-model="projectToSubmit.typology_id"
          label="Typology"
          :dense="dense"
          :options-dense="dense"
          :options="TYPOLOGIES"
        ></single-select>

        <q-input
          v-model="projectToSubmit.description"
          label="Description"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
          hint="Description of the program/project (e.g. location, components, design, etc.)"
          clearable
          counter
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-input
          v-model="projectToSubmit.goals"
          label="Goals"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
          clearable
          counter
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-input
          v-model="projectToSubmit.outcomes"
          label="Outcomes"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
          hint="Desired outcome of the program/project (e.g. Increase productivity)"
          clearable
          counter
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-input
          v-model="projectToSubmit.purpose"
          label="Purpose"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
          clearable
          counter
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <multi-select
          label="Implementation Bases"
          v-model="projectToSubmit.bases"
          :options-dense="dense"
          :options="IMPLEMENTATION_BASES"
        ></multi-select>

        <q-input
          v-model="projectToSubmit.expected_outputs"
          label="Expected Outputs"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
          hint="Physical deliverables of the project (indicate unit)"
          clearable
          counter
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-input
          outlined
          stack-label
          label="Beneficiaries"
          v-model="projectToSubmit.beneficiaries"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-input
          outlined
          stack-label
          label="Employment Generated"
          v-model="projectToSubmit.employment_generated"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <single-select
          v-model="projectToSubmit.spatial_coverage_id"
          label="Spatial Coverage"
          :dense="dense"
          :options-dense="dense"
          :options="SPATIAL_COVERAGES"
        />

        <multi-select
          v-model="projectToSubmit.provinces"
          label="Province/s"
          :options="filteredProvinces"
          :dense="dense"
          :options-dense="dense"
          :readonly="spatial_coverage_id == '1'"
        />

        <q-input
          outlined
          type="textarea"
          label="Cities and Municipalities"
          stack-label
          v-model="projectToSubmit.cities_municipalities"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <multi-select
          stack-label
          label="Technical Readiness"
          v-model="projectToSubmit.technical_readinesses"
          :options="[]"
        ></multi-select>

        <q-checkbox v-model="projectToSubmit.clearinghouse" :val="true"
          >Approved by DA Clearinghouse</q-checkbox
        >

        <q-input
          outlined
          stack-label
          label="Date Approved by Clearinghouse Committee"
          type="date"
          v-model="projectToSubmit.clearinghouse_date"
        ></q-input>

        <single-select
          v-model="projectToSubmit.target_start_year"
          label="Target Start Year"
          :options="YEARS"
          :dense="dense"
          :options-dense="dense"
        >
        </single-select>

        <single-select
          v-model="projectToSubmit.target_end_year"
          label="Target Completion Year"
          :options="YEARS"
          :dense="dense"
          :options-dense="dense"
        >
        </single-select>

        <date-input
          v-model="projectToSubmit.implementation_start_date"
          mask="date"
          label="Implementation Start Date"
          stack-label
          outlined
          :dense="dense"
          hint="Indicate what year the project is expected to start."
        />

        <date-input
          v-model="projectToSubmit.implementation_end_date"
          mask="date"
          label="Implementation End Date"
          stack-label
          outlined
          :dense="dense"
          hint="Indicate the date when the project is expected to start."
        />

        <single-select
          v-model="projectToSubmit.project_status_id"
          label="Status"
          :dense="dense"
          :options-dense="dense"
          :options="STATUSES"
        />

        <q-input
          outlined
          stack-label
          label="GAD Score"
          type="number"
          v-model="projectToSubmit.gad_score"
        ></q-input>

        <money-input
          label="Total Project Cost"
          outlined
          prefix="PhP"
          v-model="projectToSubmit.total_project_cost"
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
        ></money-input>

        <q-input
          outlined
          stack-label
          label="Implementation Risks"
          type="textarea"
          v-model="projectToSubmit.implementation_risk"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-input
          outlined
          stack-label
          label="Mitigation Strategies"
          type="textarea"
          v-model="projectToSubmit.mitigation_strategy"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-input
          outlined
          stack-label
          label="Updates"
          type="textarea"
          v-model="projectToSubmit.updates[0].updates"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

				<date-input
          outlined
          stack-label
          label="As Date"
          type="date"
          v-model="projectToSubmit.updates[0].update_date"
        ></date-input>

        <money-input
          label="Financial Net Present Value (FNPV)"
          outlined
          v-model="projectToSubmit.financial_net_present_value"
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
        ></money-input>

        <q-input
          outlined
          stack-label
          label="Financial Benefit-Cost Ratio (FBCR)"
          v-model="projectToSubmit.financial_benefit_cost_ratio"
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="Financial Internal Rate of Return (FIRR)"
          v-model="financial_internal_rate_return"
          :dense="dense"
          suffix="%"
          hint="Indicative project cost in absolute PhP"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="Economic Benefit-Cost Ratio (EBCR)"
          v-model="projectToSubmit.economic_benefit_cost_ratio"
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="Economic Internal Rate Return (EIRR)"
          v-model="projectToSubmit.economic_internal_rate_return"
          :dense="dense"
          suffix="%"
        ></q-input>

        <money-input
          label="Economic Net Present Value (ENPV)"
          outlined
          v-model="projectToSubmit.economic_net_present_value"
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
        ></money-input>
		</div>

		<card-actions>Actions</card-actions>
	</q-card>
</template>

<script>
export default {
	components: {
		"card-header": () => import("./Shared/CardHeader.vue"),
		"card-actions": () => import("./Shared/CardActions.vue"),
		"single-select": () => import("../FormInputs/SingleSelect.vue"),
		"multi-select": () => import("../FormInputs/MultiSelect.vue"),
		"date-input": () => import("../FormInputs/DateInput.vue"),
	},
	name: "AddProject",
	props: ["project"],
	computed: {
		projectToSubmit: {
			get() {
				return this.project;
			},
			set(projectToSubmit) {
				this.$emit('update',projectToSubmit);
			}
		}
	},
	mounted() {
		this.projectToSubmit = Object.assign({}, this.project);
	}
}
</script>