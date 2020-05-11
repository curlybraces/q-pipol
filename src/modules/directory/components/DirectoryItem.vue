<template>
  <q-card class="fit" flat bordered square>
    <q-list>
      <q-item>
        <q-item-section avatar>
          <q-avatar @click="$emit('upload')" class="cursor-pointer" :clickable="isAdmin">
            <q-img :src="ou.image" placeholder-src="/statics/placeholder.jpg">
              <template v-slot:error>
                <q-img src="/statics/placeholder.jpg" />
              </template>
            </q-img>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{ ou.acronym }}
          </q-item-label>

          <q-item-label caption :lines="1">
            {{ ou.name }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            v-if="isAdmin"
            flat
            round
            icon="edit"
            @click="$emit('edit')"
            color="primary"
          ></q-btn>
        </q-item-section>
      </q-item>

      <q-separator />

			<item-info color="primary" icon="portrait" :label="ou.agency_head_name" :caption="ou.agency_head_designation"></item-info>

			<item-info color="red" icon="call" :label="ou.telephone_number"></item-info>

			<item-info color="blue" icon="print" :label="ou.fax_number"></item-info>

			<item-info color="amber" icon="email" :label="ou.email"></item-info>

      <q-separator />
      <q-item clickable @click="showMore = true">
        <q-item-section>
          <q-item-label>
            More information
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_down"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>

		<q-dialog v-model="showMore">
			<q-card style="width:400px;">
				<q-toolbar>
					<q-toolbar-title>
						{{ ou.name }}
					</q-toolbar-title>
					<q-space/>
					<q-btn flat round icon="close" @click="showMore = false"/>
				</q-toolbar>

				<q-list>
					<q-item-label header class="text-uppercase">Focals</q-item-label>
					<q-separator/>
					<template v-if="ou.focals.length">
						<template v-for="focal in ou.focals" >
							<item-info :key="focal.id" icon="person" :label="focal.name" :caption="focal.position"></item-info>
						</template>
					</template>
					<template v-else>
						<item-info color="red" icon="error" label="No users assigned."></item-info>
					</template>
					<q-item-label header class="text-uppercase">Reviewers</q-item-label>
					<q-separator/>
					<template v-if="ou.reviewers.length">
						<template v-for="reviewer in ou.reviewers" >
							<item-info :key="reviewer.id" icon="person" :label="reviewer.name" :caption="reviewer.position"></item-info>
						</template>
					</template>
					<template v-else>
						<item-info color="red" icon="error" label="No reviewers assigned."></item-info>
					</template>
				</q-list>

			</q-card>
		</q-dialog>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex';
import ItemInfo from './ItemInfo'

export default {
  name: 'DirectoryItem',
	components: {ItemInfo},
	props: ['ou'],
	data() {
  	return {
		  showMore: false
		}
	},
  computed: {
    ...mapGetters('auth', ['isAdmin'])
  }
};
</script>
