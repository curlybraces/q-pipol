import { client } from '@/boot/apollo';
import {
  CREATE_PROJECT_MUTATION
} from '@/graphql/mutations';
import { PAGINATED_PROJECTS } from '@/graphql/queries'
import {
  showErrorNotification,
  showSuccessNotification
} from '@/functions/function-show-notifications';
import { INITIAL_STATE } from './state';
import { Loading } from 'quasar';
import { projectService } from '@/services'

export function createProject({}, payload) {
  Loading.show();

  client
    .mutate({
      mutation: CREATE_PROJECT_MUTATION,
      variables: payload,
      update: (cache, { data: { createProject } }) => {
        console.log('created project: ', createProject);

        const data = cache.readQuery({
          query: PAGINATED_PROJECTS,
          variables: {
            first: 10,
            page: 1
          }
        });

        console.log('relay projects: ', data.paginatedProjects);

        const newNode = {
          node: createProject,
          __typename: 'Project'
        };

        console.log('newNode: ', newNode);

        data.paginatedProjects.data.unshift(newNode);

        console.log('data with the newNode: ', data);

        // this is throwing a warning that field is not defined
        // not anymore
        cache.writeQuery({
          query: PAGINATED_PROJECTS,
          variables: {
            first: 10,
            page: 1
          },
          data
        });

        console.log('cache: ', cache);
      }
    })
    .then(({ data }) => {
      showSuccessNotification({
        message: 'Successfully created project.'
      });

      console.log('new project created: ', data.createProject.id);

      this.$router.push('/projects');
    })
    .catch(err => {
      showErrorNotification({
        message: err.message
      });
    })
    .finally(() => {
      Loading.hide();
    });
}

export function updateProject({ dispatch }, project) {
  // strip __typename from array
  const region_financials = project.region_financials.map(
    ({
      id,
      region_id,
      target_2016,
      target_2017,
      target_2018,
      target_2019,
      target_2020,
      target_2021,
      target_2022,
      target_2023
    }) => ({
      id,
      region_id,
      target_2016,
      target_2017,
      target_2018,
      target_2019,
      target_2020,
      target_2021,
      target_2022,
      target_2023
    })
  );

  console.log(region_financials);

  const funding_source_financials = project.funding_source_financials.map(
    ({
      id,
      funding_source_id,
      target_2016,
      target_2017,
      target_2018,
      target_2019,
      target_2020,
      target_2021,
      target_2022,
      target_2023
    }) => ({
      id,
      funding_source_id,
      target_2016,
      target_2017,
      target_2018,
      target_2019,
      target_2020,
      target_2021,
      target_2022,
      target_2023
    })
  );

  console.log(funding_source_financials);
  
  const payload = {
	  id: project.id,
	  pip: project.pip,
	  cip: project.cip,
	  trip: project.trip,
	  rdip: project.rdip,
	  pcip: project.pcip,
	  afmip: project.afmip,
	  title: project.title,
	  type_id: project.type_id,
	  infrastructure: project.infrastructure,
	  operating_unit_id: project.operating_unit_id,
	  implementation_mode_id: project.implementation_mode_id,
	  project_status_id: project.project_status_id,
	  typology_id: project.typology_id,
	  tier_id: project.tier_id,
	  spatial_coverage_id: project.spatial_coverage_id,
	  cities_municipalities: project.cities_municipalities,
	  description: project.description,
	  components: project.components,
	  goals: project.goals,
	  outcomes: project.outcomes,
	  purpose: project.purpose,
	  expected_outputs: project.expected_outputs,
	  beneficiaries: project.beneficiaries,
	  employment_generated: project.employment_generated,
	  target_start_year: project.target_start_year,
	  target_end_year: project.target_end_year,
	  implementation_start_date: project.implementation_start_date,
	  implementation_end_date: project.implementation_end_date,
	  clearinghouse: project.clearinghouse,
	  clearinghouse_date: project.clearinghouse_date,
	  neda_submission: project.neda_submission,
	  neda_submission_date: project.neda_submission_date,
	  neda_secretariat_review: project.neda_secretariat_review,
	  neda_secretariat_review_date: project.neda_secretariat_review_date,
	  icc_endorsed: project.icc_endorsed,
	  icc_endorsed_date: project.icc_endorsed_date,
	  icc_approved: project.icc_approved,
	  icc_approved_date: project.icc_approved_date,
	  neda_board: project.neda_board,
	  neda_board_date: project.neda_board_date,
	  currency_id: project.currency_id,
	  total_project_cost: project.total_project_cost,
	  implementation_risk: project.implementation_risk,
	  mitigation_strategy: project.mitigation_strategy,
	  income_increase: project.income_increase,
	  gad_id: project.gad_id,
	  estimated_project_life: project.estimated_project_life,
	  financial_benefit_cost_ratio: project.financial_benefit_cost_ratio,
	  financial_internal_rate_return: project.financial_internal_rate_return,
	  financial_net_present_value: project.financial_net_present_value,
	  economic_benefit_cost_ratio: project.economic_benefit_cost_ratio,
	  economic_internal_rate_return: project.economic_internal_rate_return,
	  economic_net_present_value: project.economic_net_present_value,
	  main_funding_source_id: project.main_funding_source_id,
	  funding_institution_id: project.funding_institution_id,
	  has_fs: project.has_fs,
	  has_row: project.has_row,
	  has_rap: project.has_rap,
	  fs_target_2017: project.fs_target_2017,
	  fs_target_2018: project.fs_target_2018,
	  fs_target_2019: project.fs_target_2019,
	  fs_target_2020: project.fs_target_2020,
	  fs_target_2021: project.fs_target_2021,
	  fs_target_2022: project.fs_target_2022,
	  fs_target_total: project.fs_target_total,
	  row_target_2017: project.row_target_2017,
	  row_target_2018: project.row_target_2018,
	  row_target_2019: project.row_target_2019,
	  row_target_2020: project.row_target_2020,
	  row_target_2021: project.row_target_2021,
	  row_target_2022: project.row_target_2022,
	  row_target_total: project.row_target_total,
	  row_affected_2017: project.row_affected_2017,
	  row_affected_2018: project.row_affected_2018,
	  row_affected_2019: project.row_affected_2019,
	  row_affected_2020: project.row_affected_2020,
	  row_affected_2021: project.row_affected_2021,
	  row_affected_2022: project.row_affected_2022,
	  rap_target_2017: project.rap_target_2017,
	  rap_target_2018: project.rap_target_2018,
	  rap_target_2019: project.rap_target_2019,
	  rap_target_2020: project.rap_target_2020,
	  rap_target_2021: project.rap_target_2021,
	  rap_target_2022: project.rap_target_2022,
	  rap_target_total: project.rap_target_total,
	  rap_affected_2017: project.rap_affected_2017,
	  rap_affected_2018: project.rap_affected_2018,
	  rap_affected_2019: project.rap_affected_2019,
	  rap_affected_2020: project.rap_affected_2020,
	  rap_affected_2021: project.rap_affected_2021,
	  rap_affected_2022: project.rap_affected_2022,
	  investment_target_2016: project.investment_target_2016,
	  investment_target_2017: project.investment_target_2017,
	  investment_target_2018: project.investment_target_2018,
	  investment_target_2019: project.investment_target_2019,
	  investment_target_2020: project.investment_target_2020,
	  investment_target_2021: project.investment_target_2021,
	  investment_target_2022: project.investment_target_2022,
	  investment_target_2023: project.investment_target_2023,
	  investment_target_total: project.investment_target_total,
	  infrastructure_target_2016: project.infrastructure_target_2016,
	  infrastructure_target_2017: project.infrastructure_target_2017,
	  infrastructure_target_2018: project.infrastructure_target_2018,
	  infrastructure_target_2019: project.infrastructure_target_2019,
	  infrastructure_target_2020: project.infrastructure_target_2020,
	  infrastructure_target_2021: project.infrastructure_target_2021,
	  infrastructure_target_2022: project.infrastructure_target_2022,
	  infrastructure_target_2023: project.infrastructure_target_2023,
	  infrastructure_target_total: project.infrastructure_target_total,
	  nep_2016: project.nep_2016,
	  nep_2017: project.nep_2017,
	  nep_2018: project.nep_2018,
	  nep_2019: project.nep_2019,
	  nep_2020: project.nep_2020,
	  nep_2021: project.nep_2021,
	  nep_2022: project.nep_2022,
	  nep_2023: project.nep_2023,
	  // nep_total: getters.nep_total,
	  gaa_2016: project.gaa_2016,
	  gaa_2017: project.gaa_2017,
	  gaa_2018: project.gaa_2018,
	  gaa_2019: project.gaa_2019,
	  gaa_2020: project.gaa_2020,
	  gaa_2021: project.gaa_2021,
	  gaa_2022: project.gaa_2022,
	  gaa_2023: project.gaa_2023,
	  // gaa_total: getters.gaa_total,
	  disbursement_2016: project.disbursement_2016,
	  disbursement_2017: project.disbursement_2017,
	  disbursement_2018: project.disbursement_2018,
	  disbursement_2019: project.disbursement_2019,
	  disbursement_2020: project.disbursement_2020,
	  disbursement_2021: project.disbursement_2021,
	  disbursement_2022: project.disbursement_2022,
	  disbursement_2023: project.disbursement_2023,
	  // disbursement_total: getters.disbursement_total,
	  bases: {
		  sync: project.selected_bases
	  },
	  region_id: project.region_id,
	  province_id: project.province_id,
	  district_id: project.district_id,
	  city_municipality_id: project.city_municipality_id,
	  regions: {
		  sync: project.selected_regions
	  },
	  provinces: {
		  sync: project.selected_provinces
	  },
	  districts: {
		  sync: project.selected_districts
	  },
	  ten_point_agenda: {
		  sync: project.ten_point_agenda
	  },
	  funding_sources: project.funding_sources,
	  updates: project.updates,
	  updates_date: project.updates_date,
	  region_financials: {
		  upsert: region_financials,
		  delete: project.deleteRegionRows ? project.deleteRegionRows : []
	  },
	  funding_source_financials: {
		  upsert: funding_source_financials,
		  delete: project.deleteFundingSourceRows
			  ? project.deleteFundingSourceRows
			  : []
	  }
  }
  
  return projectService
	  .update(payload)
    .then(res => {
      showSuccessNotification({
        message: 'Project successfully updated'
      });

      console.log(res);

      dispatch('clearProject');
      
      return true
    })
    .catch(err => {
      console.log(err.message);
      
      return false
    });
}

export function fetchProject({ commit }, id) {
  Loading.show();
	
  return projectService
	  .show({ id: id })
	  .then(res => {
	  	commit('SET_PROJECT', res.project)
	  })
	  .catch(err => {
	  	console.log(err.message)
	  })
}

export function clearProject({ commit }) {
  commit('SET_PROJECT', INITIAL_STATE);
}
