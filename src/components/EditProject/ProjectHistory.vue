<template>
    <q-list
        bordered
        separator>
        <q-item
            v-for="item in backups"
            :key="item.id"
            clickable
            @click="showPreviousVersion(item.id)">
            <q-item-section top>
                <q-item-label overline>
                    Changes
                </q-item-label>
                <q-item-label lines="3">
                    {{ item.changes }}
                </q-item-label>
            </q-item-section>

            <q-item-section top side>
                <div class="column text-right">
                    <div class="text-weight-bold">Last modified</div>
                    <div>{{ item.modified_by.name }}</div>
                    <div>{{ item.updated_at }}</div>
                </div>
            </q-item-section>
        </q-item>
    </q-list>
</template>

<script>
    export default {
        name: "ProjectHistory",
        props: {
          backups: Array
        }
    }
</script>