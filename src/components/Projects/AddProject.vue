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

			<text-input
				v-model="projectToSubmit.title"
				label="Program/Project Title"
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

			<text-input
				v-model="projectToSubmit.description"
				label="Description"
				type="textarea"
				:dense="dense"
				hint="Description of the program/project (e.g. location, components, design, etc.)"
			/>

			<text-input
				v-model="projectToSubmit.goals"
				label="Goals"
				type="textarea"
				:dense="dense"
			/>

			<text-input
				v-model="projectToSubmit.outcomes"
				label="Outcomes"
				type="textarea"
				:dense="dense"
				hint="Desired outcome of the program/project (e.g. Increase productivity)"
			/>

			<text-input
				v-model="projectToSubmit.purpose"
				label="Purpose"
				type="textarea"
				:dense="dense"
			/>

			<multi-select
				label="Implementation Bases"
				v-model="projectToSubmit.bases"
				:options-dense="dense"
				:options="IMPLEMENTATION_BASES"
			></multi-select>

			<text-input
				v-model="projectToSubmit.expected_outputs"
				label="Expected Outputs"
				type="textarea"
				:dense="dense"
				hint="Physical deliverables of the project (indicate unit)"
			/>

			<text-input
				label="Beneficiaries"
				v-model="projectToSubmit.beneficiaries"
			/>

			<text-input
				outlined
				stack-label
				label="Employment Generated"
				v-model="projectToSubmit.employment_generated"
			/>

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
				:readonly="projectToSubmit.spatial_coverage_id == '1'"
			/>

			<text-input
				type="textarea"
				label="Cities and Municipalities"
				v-model="projectToSubmit.cities_municipalities"
			/>

			<multi-select
				label="Technical Readiness"
				v-model="projectToSubmit.technical_readinesses"
				:options="[]"
			></multi-select>

			<q-checkbox v-model="projectToSubmit.clearinghouse" :val="true"
				>Approved by DA Clearinghouse</q-checkbox
			>

			<date-input
				label="Date Approved by Clearinghouse Committee"
				v-model="projectToSubmit.clearinghouse_date"
			/>

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
				:dense="dense"
				hint="Indicate what year the project is expected to start."
			/>

			<date-input
				v-model="projectToSubmit.implementation_end_date"
				mask="date"
				label="Implementation End Date"
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

			<number-input
				label="GAD Score"
				type="number"
				v-model="projectToSubmit.gad_score"
			/>

			<money-input
				label="Total Project Cost"
				outlined
				prefix="PhP"
				v-model="projectToSubmit.total_project_cost"
				:dense="dense"
				hint="Indicative project cost in absolute PhP"
			></money-input>

			<text-input
				label="Implementation Risks"
				type="textarea"
				v-model="projectToSubmit.implementation_risk"
			/>

			<text-input
				label="Mitigation Strategies"
				type="textarea"
				v-model="projectToSubmit.mitigation_strategy"
			/>

			<text-input
				label="Updates"
				type="textarea"
				v-model="projectToSubmit.updates[0].updates"
			/>

			<date-input
				label="As Date"
				v-model="projectToSubmit.updates[0].update_date"
			></date-input>

			<money-input
				label="Financial Net Present Value (FNPV)"
				v-model="projectToSubmit.financial_net_present_value"
				:dense="dense"
			></money-input>

			<number-input
				label="Financial Benefit-Cost Ratio (FBCR)"
				v-model="projectToSubmit.financial_benefit_cost_ratio"
				:dense="dense"
				hint="Indicative project cost in absolute PhP"
			/>

			<number-input
				label="Financial Internal Rate of Return (FIRR)"
				v-model="projectToSubmit.financial_internal_rate_return"
				:dense="dense"
				suffix="%"
			/>

			<money-input
				label="Economic Net Present Value (ENPV)"
				v-model="projectToSubmit.economic_net_present_value"
				:dense="dense"
				hint="Indicative project cost in absolute PhP"
			></money-input>

			<number-input
				label="Economic Benefit-Cost Ratio (EBCR)"
				v-model="projectToSubmit.economic_benefit_cost_ratio"
				:dense="dense"
				hint="Indicative project cost in absolute PhP"
			/>

			<number-input
				label="Economic Internal Rate Return (EIRR)"
				v-model="projectToSubmit.economic_internal_rate_return"
				:dense="dense"
				suffix="%"
			/>

			<q-btn @click="addRegion" label="Add Region" color="primary"/>

			<q-markup-table>
				<thead>
					<th>Region</th>
					<th>2016</th>
					<th>2017</th>
					<th>2018</th>
					<th>2019</th>
					<th>2020</th>
					<th>2021</th>
					<th>2022</th>
					<th>2023</th>
					<th>Total</th>
				</thead>
				<tbody>
					<template v-if="projectToSubmit.regions.length > 1">
						<tr v-for="region in projectToSubmit.regions" :key="region.id">
							<th>{{ region.id }}</th>
							<th>{{ region.target_2016 }}</th>
							<th>{{ region.target_2017 }}</th>
							<th>{{ region.target_2018 }}</th>
							<th>{{ region.target_2019 }}</th>
							<th>{{ region.target_2020 }}</th>
							<th>{{ region.target_2021 }}</th>
							<th>{{ region.target_2022 }}</th>
							<th>{{ region.target_2023 }}</th>
							<th>{{ region.target_total }}</th>
						</tr>
					</template>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</q-markup-table>

			<q-dialog v-model="addRegionDialog">
				<q-card>
					<div style="width:300px;" class="q-pa-md q-gutter-md">
						<q-input></q-input>
						<q-input></q-input>
						<q-input></q-input>
						<q-input></q-input>
						<q-input></q-input>
						<q-input></q-input>
						<q-input></q-input>
						<q-input></q-input>
						<q-input></q-input>
						<q-input></q-input>
						<div class="q-ml-md">
							<q-btn class="full-width" color="primary">Add</q-btn>
						</div>
					</div>
				</q-card>
			</q-dialog>

		</div>

		<card-actions>Actions</card-actions>
	</q-card>
</template>

<script>
import {
	IMPLEMENTATION_BASES,
	IMPLEMENTATION_MODES,
	SPATIAL_COVERAGES,
	STATUSES,
	TIERS,
	TYPES,
	TYPOLOGIES,
	OPERATING_UNITS,
	YEARS
	} from "../../data/dropdown-values";

export default {
	components: {
		"card-header": () => import("./Shared/CardHeader.vue"),
		"card-actions": () => import("./Shared/CardActions.vue"),
		"single-select": () => import("../FormInputs/SingleSelect.vue"),
		"multi-select": () => import("../FormInputs/MultiSelect.vue"),
		"date-input": () => import("../FormInputs/DateInput.vue"),
		"money-input": () => import("../FormInputs/MoneyInput.vue"),
		"number-input": () => import("../FormInputs/NumberInput.vue"),
		"text-input": () => import("../FormInputs/TextInput.vue")
	},
	name: "AddProject",
	props: ["project"],
	data() {
		return {
			IMPLEMENTATION_BASES,
			IMPLEMENTATION_MODES,
			OPERATING_UNITS,
			SPATIAL_COVERAGES,
			STATUSES,
			TIERS,
			TYPES,
			TYPOLOGIES,
			YEARS,
			filteredProvinces: [],
			dense: false,
			addRegionDialog: true
		}
	},
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
	methods: {
		addRegion() {
			console.log("add region");
			this.addRegionDialog = true;
		}
	}
}
</script>