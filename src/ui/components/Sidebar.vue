<template>
	<q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
		<q-list padding separator>
			<template v-for="({ to, label, children, icon }, index) in filteredTabs">
        <q-expansion-item
          :key="index"
          label="Projects"
          v-if="children"
          class="text-capitalize"
          icon="list"
        >
        	<template v-slot:header>
	          <q-item-section avatar>
	            <q-avatar icon="list" color="secondary" text-color="white" />
	          </q-item-section>

	          <q-item-section>
	            Projects
	          </q-item-section>
	        </template>
          <q-list separator>
            <q-item
              v-for="{ id, name, count_projects } in children"
              :key="id"
              clickable
              :to="`/projects/${name}`"
            >
              <q-item-section class="text-capitalize">
              	{{
	                name
	              }}
	            </q-item-section>
              <q-item-section avatar side>
                <q-avatar class="bg-grey-6 text-white" size="sm">{{
                  count_projects
                }}</q-avatar>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-item
          v-else
          :key="index"
          :to="to"
          :label="$q.screen.gt.xs ? label : void 0"
          class="text-capitalize"
          exact
          clickable
        >
        	<q-item-section avatar>
        		<q-avatar color="secondary" text-color="white">
        			<q-icon :name="icon"></q-icon>
        		</q-avatar>
        	</q-item-section>
	        <q-item-section>
	        	<q-item-label>{{ label }}</q-item-label>
	        </q-item-section>
	      </q-item>
      </template>
	  </q-list>
	</q-scroll-area>
</template>

<script>
	export default {
		name: 'AppSidebar',
		props: ['filteredTabs']
	}
</script>