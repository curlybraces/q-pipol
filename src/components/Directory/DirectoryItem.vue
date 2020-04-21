<template>
  <q-card class="fit">
    <q-list>
      <q-item>
        <q-item-section avatar>
          <q-avatar @click="$emit('upload')" class="cursor-pointer">
            <q-img :src="ou.image" placeholder-src="/statics/placeholder.webp">
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
          <q-item-label>
            <span class="text-caption">Tel. no. </span
            >{{ ou.telephone_number }}</q-item-label
          >
          <q-item-label
            ><span class="text-caption">Fax. no. </span
            >{{ ou.fax_number }}</q-item-label
          >
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="amber" name="email" />
        </q-item-section>

        <q-item-section>
          <q-item-label :lines="1">{{ ou.email }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-slide-transition>
      <div>
        <q-separator />
        <q-card-section class="text-subitle2">
          More information
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
export default {
  name: 'DirectoryItem',
  props: ['ou']
};
</script>
