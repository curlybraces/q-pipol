<template>
	<div>
		<div class="row">
	    <q-item-label header class="q-px-none q-pb-sm q-mt-md"
	      >Shortcuts</q-item-label
	    >
	  </div>

	  <div class="row">
	    <template v-for="(link, index) in filteredLinks">
	      <div class="col-6" :key="index">
	        <q-card flat square class="fit" bordered>
	          <q-item clickable :to="link.url" v-ripple>
	            <q-item-section>
	              <q-item-label
	                >{{ link.label }} {{ link.visible }}</q-item-label
	              >
	            </q-item-section>
	            <q-item-section side top>
	              <q-icon :name="link.icon" size="xl" :color="link.color" />
	            </q-item-section>
	          </q-item>
	        </q-card>
	      </div>
	    </template>
	  </div>
	</div>
</template>

<script>
	export default {
		name: 'ShortCuts',
		computed: {
			isEncoder() {
				return this.$store.getters['auth/isEncoder']
			},
			filteredLinks() {
	      let filteredLinks = [];
	      if (this.isEncoder) {
	        filteredLinks = this.links;
	      } else {
	        filteredLinks = this.links.filter(link => link.encoder === undefined);
	      }
	      return filteredLinks;
	    }
		},
		data() {
			return {
				links: [
        {
          label: 'Profile',
          icon: 'person',
          url: '/profile',
          color: 'primary'
        },
        {
          label: 'View Projects',
          icon: 'list',
          url: '/projects',
          color: 'blue'
        },
        {
          label: 'Add Project',
          icon: 'playlist_add',
          url: '/projects/add',
          color: 'secondary',
          encoder: true
        },
        {
          label: 'Directory',
          icon: 'call',
          url: '/directory',
          color: 'purple'
        },
        {
          label: 'Settings',
          icon: 'settings',
          url: '/settings',
          color: 'pink'
        }
      ]
			}
		}
	}
</script>