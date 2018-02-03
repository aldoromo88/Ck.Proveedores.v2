<template>
  <v-alert :type="type" v-model="showFeedback" dismissible transition="scale-transition">
    {{message}}
  </v-alert>
</template>
<script>
export default {
	name: 'ck-alert',
	props: ['type', 'message'],
	computed: {
		showFeedback: {
			get() {
				return this.message !== null;
			},
			set(flag) {
				if (!flag) {
					this.$emit('close');
				}
			}
		}
	}
}
</script>
