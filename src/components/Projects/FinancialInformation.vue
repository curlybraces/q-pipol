<template>
	<div>
		<q-item>
			<single-select
				v-model="implementation_mode_id"
				label="Implementation Mode"
				:dense="dense"
				:options-dense="dense"
				:options="implementation_modes"
			/>
		</q-item>

		<target-investment></target-investment>

		<funding-sources :dense="dense" />

		<region-financial></region-financial>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import RegionFinancial from './RegionFinancial/RegionFinancial';
import FundingSources from './FundingSources/FundingSources';
import TargetInvestment from './TargetInvestment';
import SingleSelect from '../FormInputs/SingleSelect';

export default {
	components: {
		SingleSelect,
		RegionFinancial,
		FundingSources,
		TargetInvestment
	},
	name: 'FinancialInformation',
	computed: {
		...mapState('options',['implementation_modes'])
	}
}
</script>