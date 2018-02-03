<template>
<v-container fluid fill-height>
	<v-layout justify-center align-center class="mb-5">
		<v-flex d-flex xs12 sm7 md5 class="mb-5">

			<v-card color="grey lighten-2" class="mb-5">
				<v-card-text>
					<h2>{{resources.header}}</h2>
					<v-form v-model="valid" ref="form" :lazy-validation="true">
						<v-text-field :label="resources.username" v-model="username" :rules="usernameRules" validate-on-blur autofocus></v-text-field>
						<v-text-field :label="resources.password" v-model="password" :rules="passwordRules" validate-on-blur type="password"></v-text-field>
						<p class="text-xs-right"><a href="#">{{resources.passwordRecovery}}</a></p>
						<ck-alert :type="feedbackType" :message="feedbackMessage" @close="()=>feedbackMessage = null"></ck-alert>
						<v-btn color="primary" @click="submit" :disabled="!valid">{{resources.login}}</v-btn>
					</v-form>
				</v-card-text>
			</v-card>



		</v-flex>

	</v-layout>
</v-container>
</template>
<script>
import resources from '@/lenguagesResources/login';
import auth from '@/services/auth';
import {
	required
} from '@/helpers/validationHelpers';

export default {
	data() {
		return {
			valid: false,
			username: null,
			password: null,
			feedbackType: 'success',
			feedbackMessage: null
		}
	},
	computed: {
		resources() {
			if (!this.$store.getters.Lenguage) {
				return {}
			}
			return resources[this.$store.getters.Lenguage];
		},
		usernameRules() {
			return [required(this.resources.usernameRequired)]
		},
		passwordRules() {
			return [required(this.resources.passwordRequired)]
		},
	},
	methods: {
		submit() {
			this.feedbackMessage = null;
			if (this.$refs.form.validate()) {
				auth.authenticate(this.username, this.password)
					.then(c => this.$goTo('/'))
					.catch(e => {
						if (e.response.status === 401) {
							this.feedbackType = 'orange';
							this.feedbackMessage = this.resources.invalidAccess;
						} else {
							this.feedbackType = 'error';
							this.feedbackMessage = e.message;
						}
					})
			}
		}
	}
}
</script>
