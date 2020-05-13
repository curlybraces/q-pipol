<template functional>
	<q-item @click="listeners['click']" clickable>
    <q-item-section avatar>
      <q-avatar>
        <q-img :src="props.image"/>
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ props.label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>