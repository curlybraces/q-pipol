<template functional>
	<q-btn
    outline
    :label="props.label"
    color="primary"
    @click="listeners['click']"
  />
</template>