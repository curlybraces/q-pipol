<template>
    <card-component title="Spatial Coverage">
        <template v-slot:content>
            <select-component
                    label="Spatial Coverage"
                    :options="spatial_coverages"
                    v-model="project.spatial_coverage_id"
            ></select-component>

            <select-component
                    label="Region/s"
                    :options="regions"
                    v-model="project.region_id"
            ></select-component>

            <select-component
                    label="Province/s"
                    v-model="project.province_id"
            ></select-component>

            <select-component
                    label="City and Municipalities"
                    v-model="project.city_municipality_id"
            ></select-component>
        </template>
    </card-component>
</template>

<script>
    export default {
    	name: 'SpatialCoverage'
    }
</script>