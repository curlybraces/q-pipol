<template>
  <q-card class="fit" flat bordered square>
    <q-list>
      <q-item>
        <q-item-section avatar>
          <q-avatar @click="$emit('upload')" class="cursor-pointer">
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

      <q-item>
        <q-item-section avatar>
          <q-icon color="primary" name="portrait" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ ou.agency_head_name }}</q-item-label>
          <q-item-label caption>{{ ou.agency_head_designation }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon color="red" name="call" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ ou.telephone_number }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon color="blue" name="print" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ ou.fax_number }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon color="amber" name="email" />
        </q-item-section>

        <q-item-section>
          <q-item-label :lines="1">{{ ou.email }}</q-item-label>
        </q-item-section>
      </q-item>
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
						<q-item v-for="focal in ou.focals" :key="focal.id">
							<q-item-section avatar>
								<q-avatar>
									<q-icon name="person"/>
								</q-avatar>
							</q-item-section>
							<q-item-section>
								<q-item-label>
									{{ focal.name }}
								</q-item-label>
								<q-item-label caption>
									{{ focal.position }}
								</q-item-label>
							</q-item-section>
						</q-item>
					</template>
					<template v-else>
						<q-item>
							<q-item-section>
								<q-item-label>
									No users yet.
								</q-item-label>
							</q-item-section>
						</q-item>
					</template>
					<q-item-label header class="text-uppercase">Reviewers</q-item-label>
					<q-separator/>
					<template v-if="ou.reviewers.length">
						<q-item v-for="reviewer in ou.reviewers" :key="reviewer.id">
							<q-card-section>{{ reviewer.name }}</q-card-section>
							<q-card-section></q-card-section>
						</q-item>
					</template>
					<template v-else>
						<q-item>
							<q-item-section>
								<q-item-label>
									No reviewers assigned.
								</q-item-label>
							</q-item-section>
						</q-item>
					</template>
				</q-list>

			</q-card>
		</q-dialog>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DirectoryItem',
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
