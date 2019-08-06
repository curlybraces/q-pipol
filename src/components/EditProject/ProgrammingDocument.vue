<template>
    <card-component title="Project for Inclusion in Which Programming Document">
        <template v-slot:content>
            <select-component
                    label="PIP Category"
                    :options="pip_types"
                    v-model="project.pip_type_id"
            ></select-component>

            <select-component
                    label="CIP Category"
                    :options="cip_types"
                    v-model="project.cip_type_id"
            ></select-component>

            <options-component
                    label="TRIP"
                    :options="[{ label: 'TRIP', value: 1 }, { label: 'No', value: 0 }]"
                    v-model="project.trip"
            ></options-component>

            <options-component
                    label="RDIP"
                    :options="[{ label: 'RDIP', value: 1 }, { label: 'No', value: 0 }]"
                    v-model="project.rdip"
            ></options-component>
        </template>
    </card-component>
</template>

<script>
    export default {
    	name: 'ProgrammingDocument'
    }
</script>