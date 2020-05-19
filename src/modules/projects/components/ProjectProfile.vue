<template>
	<div v-if="!$apollo.project">
		<div class="row q-pa-sm">
	    <q-img 
	    :src="project.image_url ? project.image_url : 'http://www.fao.org/uploads/pics/NFQCS_banner.png'" 
	    height="240px" 
	    alt="project banner">
	      <q-btn 
	      	v-if="isEncoder" 
	      	flat 
	      	round 
	      	class="absolute all-pointer-events bg-grey-10" 
	      	icon="camera_alt" 
	      	size="md" color="white" 
	      	style="bottom: 3px; right: 3px">
	        <q-tooltip>
	          Upload Image
	        </q-tooltip>
	      </q-btn>
	    </q-img>
	  </div>

	  <div class="row q-col-gutter-sm q-pa-sm">
	    <!-- Left side -->
	    <div class="col-9 text-blue-grey-10">
	      <div class="text-h5 q-mb-md text-cyan">
	        {{ project.title }}
	        <q-badge>
	          {{ project.type ? project.type.name: 'Not specified.' }}
	        </q-badge>
	        <q-badge color="red" v-if="project.infrastructure">
	          Infrastructure
	        </q-badge>
	      </div>

	      <div class="column q-mb-sm">
	        <div class="text-weight-lighter text-subtitle1">
		        DESCRIPTION
		      </div>
	        <div class="text-body2">
	          {{ project.description }}
	        </div>
	      </div>
	      <q-separator spaced/>
	      <div class="column q-mb-sm">
	        <div class="text-weight-lighter text-subtitle1">PURPOSE</div>
	        <div class="text-body2">
	          {{ project.purpose }}
	        </div>
	      </div>
	      <q-separator spaced/>
	      <div class="column q-mb-sm">
	        <div class="text-weight-lighter text-subtitle1">EXPECTED OUTPUTS</div>
	        <div class="text-body2">
	          {{ project.expected_outputs }}
	        </div>
	      </div>
	      <q-separator spaced/>
	      <div class="column q-mb-sm">
	        <div class="text-weight-lighter text-subtitle1">UPDATES</div>
	        <div class="text-body2" v-if="project.updates">
	          As of {{ project.updates_date | formatDate }},
	          {{ project.updates }}
	        </div>
	        <div class="text-body2" v-else>
	          No updates.
	        </div>
	      </div>

	      <q-separator spaced/>

	      <div class="column">
	        <div class="text-weight-lighter text-subtitle1">INVESTMENTS</div>
	        <q-markup-table class="col q-pa-sm bg-transparent" flat>
	          <thead>
	            <tr>
	              <th>Year</th>
	              <th>Total</th>
	              <th>Infrastructure</th>
	              <th>NEP</th>
	              <th>GAA</th>
	              <th>Disbursement</th>
	            </tr>
	          </thead>
	          <tbody>
	          	<tr>
	            <!-- <tr v-if="project.target_start_year <= 2016 && project.target_end_year >= 2016"> -->
	              <td>2016 &amp; Prior</td>
								<table-data :value="project.investment_target_2016"></table-data>
								<table-data :value="project.infrastructure_target_2016"></table-data>
								<table-data :value="project.nep_2016"></table-data>
								<table-data :value="project.gaa_2016"></table-data>
								<table-data :value="project.disbursement_2016"></table-data>
	            </tr>
	            <!-- <tr v-if="project.target_start_year <= 2017 && project.target_end_year >= 2017"> -->
            	<tr>
	              <td>2017</td>
	              <table-data :value="project.investment_target_2017" />
	              <table-data :value="project.infrastructure_target_2017" />
	              <table-data :value="project.nep_2017" />
	              <table-data :value="project.gaa_2017" />
	              <table-data :value="project.disbursement_2017" />
	            </tr>
	            <!-- <tr v-if="project.target_start_year <= 2018 && project.target_end_year >= 2018"> -->
	            <tr>
	              <td>2018</td>
	              <table-data :value="project.investment_target_2018" />
	              <table-data :value="project.infrastructure_target_2018" />
	              <table-data :value="project.nep_2018" />
	              <table-data :value="project.gaa_2018" />
	              <table-data :value="project.disbursement_2018" />
	            </tr>
	            <!-- <tr v-if="project.target_start_year <= 2019 && project.target_end_year >= 2019"> -->
	            <tr>
	              <td>2019</td>
	              <table-data :value="project.investment_target_2019" />
	              <table-data :value="project.infrastructure_target_2019" />
	              <table-data :value="project.nep_2019" />
	              <table-data :value="project.gaa_2019" />
	              <table-data :value="project.disbursement_2019" />
	            </tr>
	            <!-- <tr v-if="project.target_start_year <= 2020 && project.target_end_year >= 2020"> -->
	            <tr>
	              <td>2020</td>
	              <table-data :value="project.investment_target_2020" />
	              <table-data :value="project.infrastructure_target_2020" />
	              <table-data :value="project.nep_2020" />
	              <table-data :value="project.gaa_2020" />
	              <table-data :value="project.disbursement_2020" />
	            </tr>
	            <!-- <tr v-if="project.target_start_year <= 2021 && project.target_end_year >= 2021"> -->
	            <tr>
	              <td>2021</td>
	              <table-data :value="project.investment_target_2021" />
	              <table-data :value="project.infrastructure_target_2021" />
	              <table-data :value="project.nep_2021" />
	              <table-data :value="project.gaa_2021" />
	              <table-data :value="project.disbursement_2021" />
	            </tr>
	            <!-- <tr v-if="project.target_start_year <= 2022 && project.target_end_year >= 2022"> -->
	            <tr>
	              <td>2022</td>
	              <table-data :value="project.investment_target_2022" />
	              <table-data :value="project.infrastructure_target_2022" />
	              <table-data :value="project.nep_2022" />
	              <table-data :value="project.gaa_2022" />
	              <table-data :value="project.disbursement_2022" />
	            </tr>
	            <!-- <tr v-if="project.target_start_year <= 2023 && project.target_end_year >= 2023"> -->
            	<tr>
	              <td>2023 &amp; Beyond</td>
	              <table-data :value="project.investment_target_2023" />
	              <table-data :value="project.infrastructure_target_2023" />
	              <table-data :value="project.nep_2023" />
	              <table-data :value="project.gaa_2023" />
	              <table-data :value="project.disbursement_2023" />
	            </tr>
	            <tr>
	              <td>Total</td>
	              <table-data :value="project.investment_target_total" />
	              <table-data :value="project.infrastructure_target_total" />
	              <table-data :value="project.nep_total" />
	              <table-data :value="project.gaa_total" />
	              <table-data :value="project.disbursement_total" />
	            </tr>
	          </tbody>
	        </q-markup-table>
	      </div>
	    </div>

	    <!-- Right side -->
	    <div class="col-3">
				<div class="column bg-fao">
					<q-item-label header class="text-uppercase text-subtitle1">Key Facts</q-item-label>
					<q-item>
						<q-item-section>
							<q-item-label caption>
								Fund Source/Institution
							</q-item-label>
							<q-item-label class="text-body2">
								{{ project.main_funding_source ?  project.main_funding_source.name : 'Not specified' }}
								<span v-if="project.main_funding_source_id === '2' || project.main_funding_source_id === '3'">
									{{ project.funding_institution ? `>> ${project.funding_institution.name}` : '' }}
								</span>
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-item-label caption>
								Total Project Cost
							</q-item-label>
							<q-item-label class="text-body2">
								{{ project.currency ? project.currency.name : 'PHP' }}
								{{ project.total_project_cost | formatMoney }}
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-item-label caption>
								Duration
							</q-item-label>
							<q-item-label class="text-body2">
								{{ project.target_start_year + ' - ' + project.target_end_year }}
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-item-label caption>
								Beneficiaries
							</q-item-label>
							<q-item-label class="text-body2">
								{{ project.beneficiaries ? project.beneficiaries : 'Not specified' }}
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-item-label caption>
								Coverage
							</q-item-label>
							<q-item-label class="text-body2">
								{{ project.spatial_coverage ? project.spatial_coverage.name : 'Not specified' }}
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-item-label caption>
								Status
							</q-item-label>
							<q-item-label class="text-body2">
								{{ project.project_status ? project.project_status.name : 'Not specified' }}
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-item-label caption>
								Created
							</q-item-label>
							<q-item-label class="text-body2">
								{{ project.created_at | formatDateTime }}
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-item-label caption>
								Last Updated
							</q-item-label>
							<q-item-label class="text-body2">
								{{ project.updated_at | formatDateTime }}
							</q-item-label>
						</q-item-section>
					</q-item>
				</div>
	    </div>
	  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_PROJECT_QUERY } from '@/graphql/queries'
import TableData from './TableData'
import { date } from 'quasar'

export default {
	components: {TableData},
	name: 'ProjectProfile',
	props: ['id'],
	apollo: {
		project: {
			query: FETCH_PROJECT_QUERY,
			variables() {
				return {
					id: this.$props.id
				}
			},
			result({ data }) {
				if (data.project === null) {
					this.$q.dialog({
						title: 'Project not found',
						message: 'It\'s either you don\'t have access or it has been deleted.'
					})
					.onDismiss(() => this.$router.push('/projects'))
				}
			}
		}
	},
	computed: {
		...mapGetters('auth',['isEncoder'])
	},
	data() {
		return {
			project: {}
		}
	},
	filters: {
    formatDate(val) {
      // let newDate = new Date(val)
      if (!val) {
        return '';
      }

      return date.formatDate(val, 'MMM D, YYYY (ddd)')
    },
		formatDateTime(val) {
    	if (!val) {
    		return '';
			}
    	return date.formatDate(val, 'MMM DD YYYY HH:mm:ss A')
		},
		formatMoney(val) {
    	if (val) {
    		return val.toLocaleString('en-GB', { maximumFractionDigits: 2 })
			}
    	return 0.00
		}
  }
}
</script>