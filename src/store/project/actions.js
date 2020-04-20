import {
  CREATE_PROJECT_MUTATION,
  FETCH_PROJECT_QUERY,
  UPDATE_PROJECT_MUTATION
} from '../../graphql/mutations';
import { convertToNumber } from '../../functions/function-convert-to-number';
import {
  showErrorNotification,
  showSuccessNotification
} from '../../functions/function-show-notifications';

import { apolloClient } from '../../boot/apollo-boost';
import { RELAY_PROJECTS_QUERY } from '../../graphql/queries';

export function createFullProject({ state, getters, commit }) {
  commit('SET_LOADING', true);

  const { project } = state;

  const payload = {
    pip: project.pip,
    cip: project.cip,
    trip: project.trip,
    rdip: project.rdip,
    pcip: project.pcip,
    afmip: project.afmip,
    title: project.title,
    type_id: project.type_id,
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
    total_project_cost: convertToNumber(project.total_project_cost),
    implementation_risk: project.implementation_risk,
    mitigation_strategy: project.mitigation_strategy,
    income_increase: project.income_increase,
    gad_score: project.gad_score,
    estimated_project_life: project.estimated_project_life,
    financial_benefit_cost_ratio: project.financial_benefit_cost_ratio,
    financial_internal_rate_return: project.financial_internal_rate_return,
    financial_net_present_value: project.financial_net_present_value,
    economic_benefit_cost_ratio: project.economic_benefit_cost_ratio,
    economic_internal_rate_return: project.economic_internal_rate_return,
    economic_net_present_value: project.economic_net_present_value,
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
    investment_target_2016: convertToNumber(project.investment_target_2016),
    investment_target_2017: convertToNumber(project.investment_target_2017),
    investment_target_2018: convertToNumber(project.investment_target_2018),
    investment_target_2019: convertToNumber(project.investment_target_2019),
    investment_target_2020: convertToNumber(project.investment_target_2020),
    investment_target_2021: convertToNumber(project.investment_target_2021),
    investment_target_2022: convertToNumber(project.investment_target_2022),
    investment_target_2023: convertToNumber(project.investment_target_2023),
    investment_target_total: convertToNumber(project.investment_target_total),
    infrastructure_target_2016: convertToNumber(
      project.infrastructure_target_2016
    ),
    infrastructure_target_2017: convertToNumber(
      project.infrastructure_target_2017
    ),
    infrastructure_target_2018: convertToNumber(
      project.infrastructure_target_2018
    ),
    infrastructure_target_2019: convertToNumber(
      project.infrastructure_target_2019
    ),
    infrastructure_target_2020: convertToNumber(
      project.infrastructure_target_2020
    ),
    infrastructure_target_2021: convertToNumber(
      project.infrastructure_target_2021
    ),
    infrastructure_target_2022: convertToNumber(
      project.infrastructure_target_2022
    ),
    infrastructure_target_2023: convertToNumber(
      project.infrastructure_target_2023
    ),
    infrastructure_target_total: convertToNumber(
      project.infrastructure_target_total
    ),
    nep_2016: convertToNumber(project.nep_2016),
    nep_2017: convertToNumber(project.nep_2017),
    nep_2018: convertToNumber(project.nep_2018),
    nep_2019: convertToNumber(project.nep_2019),
    nep_2020: convertToNumber(project.nep_2020),
    nep_2021: convertToNumber(project.nep_2021),
    nep_2022: convertToNumber(project.nep_2022),
    nep_2023: convertToNumber(project.nep_2023),
    nep_total: convertToNumber(getters.nep_total),
    gaa_2016: convertToNumber(project.gaa_2016),
    gaa_2017: convertToNumber(project.gaa_2017),
    gaa_2018: convertToNumber(project.gaa_2018),
    gaa_2019: convertToNumber(project.gaa_2019),
    gaa_2020: convertToNumber(project.gaa_2020),
    gaa_2021: convertToNumber(project.gaa_2021),
    gaa_2022: convertToNumber(project.gaa_2022),
    gaa_2023: convertToNumber(project.gaa_2023),
    gaa_total: convertToNumber(getters.gaa_total),
    disbursement_2016: convertToNumber(project.disbursement_2016),
    disbursement_2017: convertToNumber(project.disbursement_2017),
    disbursement_2018: convertToNumber(project.disbursement_2018),
    disbursement_2019: convertToNumber(project.disbursement_2019),
    disbursement_2020: convertToNumber(project.disbursement_2020),
    disbursement_2021: convertToNumber(project.disbursement_2021),
    disbursement_2022: convertToNumber(project.disbursement_2022),
    disbursement_2023: convertToNumber(project.disbursement_2023),
    disbursement_total: convertToNumber(getters.disbursement_total),
    bases: {
      connect: project.selected_bases
    },
    regions: {
      connect: project.regions
    },
    provinces: {
      connect: project.selected_provinces
    },
    districts: {
      connect: project.selected_districts
    },
    technical_readinesses: {
      connect: project.selected_technical_readinesses
    },
    funding_sources: project.funding_sources,
    updates: project.updates,
    updates_date: project.updates_date
  };

  apolloClient
    .mutate({
      mutation: CREATE_PROJECT_MUTATION,
      variables: payload,
      update: (cache, { data: { createProject } }) => {
        console.log(cache, createProject);

        // read query we want to update
        const data = cache.readQuery({
	        query: RELAY_PROJECTS_QUERY,
	        variables: {
	        	first: 10,
		        after: ''
	        }
        });

        const newProject = {
        	node: createProject
        }
        
        // create updated data
        data.relayProjects.edges.push(newProject);

        console.log(data);
        
        // update the query
        cache.writeQuery({
          query: RELAY_PROJECTS_QUERY,
	        variables: {
		        first: 10,
		        after: ''
	        },
          data
        });
      }
    })
    .then(({ data }) => {
      commit('CLEAR_PROJECT');

      const id = data.createProject.id;

      if (!id) {
        Promise.reject();
      } else {
        showSuccessNotification({
          message: 'Successfully created project.'
        });
        // this.$router.push('/projects/' + id + '/edit');
      }

      this.$router.push('/projects');
    })
    .catch(err => {
      showErrorNotification({
        message: err.message
      });
    })
    .finally(() => {
      commit('SET_LOADING', false);
    });
}

export function createProject({ commit }, payload) {
  commit('SET_LOADING', true);

  apolloClient
    .mutate({
      mutation: CREATE_PROJECT_MUTATION,
      variables: payload,
	    update: (store, { data: { createProject } } ) => {
      	console.log('created project: ', createProject);
      	
        const data = store.readQuery({
	        query: RELAY_PROJECTS_QUERY,
	        variables: {
	        	first: 10,
		        after: ''
	        }
        })
		
		    console.log('relay projects: ', data.relayProjects)
		    
		    const newNode = {
        	node: createProject,
			    __typeName: 'ProjectEdge'
		    }
		    
		    console.log('newNode: ', newNode);
		    
		    data.relayProjects.edges.unshift(newNode)
		    
		    console.log('data with the newNode: ', data);
		    
		    // this is throwing a warning that field is not defined
		    store.writeQuery({
			    query: RELAY_PROJECTS_QUERY,
			    variables: {
				    first: 10,
				    after: ''
			    },
			    data
		    })
		
		    console.log('store: ', store);
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
      commit('SET_LOADING', false);
    });
}

export function updateProject({ state, getters, dispatch }) {
  const { project } = state;
  apolloClient
    .mutate({
      mutation: UPDATE_PROJECT_MUTATION,
      variables: {
        id: project.id,
        pip: project.pip,
        cip: project.cip,
        trip: project.trip,
        rdip: project.rdip,
        pcip: project.pcip,
        afmip: project.afmip,
        title: project.title,
        type_id: project.type_id,
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
        total_project_cost: convertToNumber(project.total_project_cost),
        implementation_risk: project.implementation_risk,
        mitigation_strategy: project.mitigation_strategy,
        income_increase: project.income_increase,
        gad_score: project.gad_score,
        estimated_project_life: project.estimated_project_life,
        financial_benefit_cost_ratio: project.financial_benefit_cost_ratio,
        financial_internal_rate_return: project.financial_internal_rate_return,
        financial_net_present_value: project.financial_net_present_value,
        economic_benefit_cost_ratio: project.economic_benefit_cost_ratio,
        economic_internal_rate_return: project.economic_internal_rate_return,
        economic_net_present_value: project.economic_net_present_value,
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
        nep_total: getters.nep_total,
        gaa_2016: project.gaa_2016,
        gaa_2017: project.gaa_2017,
        gaa_2018: project.gaa_2018,
        gaa_2019: project.gaa_2019,
        gaa_2020: project.gaa_2020,
        gaa_2021: project.gaa_2021,
        gaa_2022: project.gaa_2022,
        gaa_2023: project.gaa_2023,
        gaa_total: getters.gaa_total,
        disbursement_2016: project.disbursement_2016,
        disbursement_2017: project.disbursement_2017,
        disbursement_2018: project.disbursement_2018,
        disbursement_2019: project.disbursement_2019,
        disbursement_2020: project.disbursement_2020,
        disbursement_2021: project.disbursement_2021,
        disbursement_2022: project.disbursement_2022,
        disbursement_2023: project.disbursement_2023,
        disbursement_total: getters.disbursement_total,
        bases: {
          sync: project.selected_bases
        },
        regions: {
          sync: project.regions
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
        updates_date: project.updates_date
      }
    })
    .then(data => {
      console.log(data);
      dispatch('CLEAR_PROJECT');
    })
    .catch(err => {
      console.log(err.message);
    })
    .finally(() => {
      console.log('done');
    });
}

export function fetchProject({ commit }, id) {
  commit('SET_LOADING', true);

  return apolloClient
    .query({
      query: FETCH_PROJECT_QUERY,
      variables: {
        id: id
      }
    })
    .then(({ data }) => {
      commit('SET_PROJECT', data.project);
    })
    .catch(err => console.log(err))
    .finally(() => commit('SET_LOADING', false));
}

export function clearProject({ commit }) {
  commit('CLEAR_PROJECT');
}
