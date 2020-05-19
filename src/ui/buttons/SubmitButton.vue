<template functional>
	<q-btn
    :label="props.label"
    color="primary"
    @click="listeners['click']"
  />
</template>