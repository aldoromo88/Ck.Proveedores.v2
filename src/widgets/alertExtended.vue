<tempalte>
  <v-alert :type="type" v-model="showFeedback" dismissible transition="scale-transition">
    {{message}}
  </v-alert>
</tempalte>
<script>
export default {
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
