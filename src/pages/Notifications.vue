<template>
    <q-page padding>
        <p>Your Notifications</p>
        <q-separator/>
        <q-list>
            <template v-for="notif in notifications">
                <q-item
                    :key="notif.id"
                    :class=" !(notif.read_at) ? 'red-2' : '' "
                    clickable
                    :to=" '/projects/' + notif.data.project_id ">
                    <q-item-section avatar>
                        <q-avatar>
                            <q-icon name="notifications" />
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        {{ notif.data.message }}
                        <q-item-label caption>
                            <q-icon name="access_time"></q-icon>
                            {{ notif.created_at }}
                        </q-item-label>
                    </q-item-section>
                    <q-item-section top side>
                        <q-btn flat round color="red" icon="delete"></q-btn>
                    </q-item-section>
                </q-item>
            </template>
        </q-list>
    </q-page>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
    	name: 'Notifications',
        methods: {
            ...mapActions('notifications',['loadNotifications'])
        },
        computed: {
          ...mapState('notifications',['notifications'])
        },
        mounted() {
    		this.loadNotifications()
        }
    }
</script>

<style scoped>
    .red-2 {
        background: #ffebee
    }
</style>