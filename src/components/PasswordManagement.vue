<template>
<v-container fluid fill-height>
	<v-layout justify-center align-center class="mb-5">
		<v-flex d-flex xs12 sm7 md5 class="mb-5">

			<v-card color="grey lighten-2" class="mb-5">
				<v-card-text>
					<h2>{{resources.header}}</h2>
					<v-form v-model="valid" ref="form" :lazy-validation="true">

						<v-text-field :label="resources.oldPassword" v-model="oldPassword" :rules="oldPasswordRules" validate-on-blur type="password"></v-text-field>
						<v-text-field :label="resources.password" v-model="password" :rules="passwordRules" validate-on-blur type="password"></v-text-field>
						<v-text-field :label="resources.confirmPassword" v-model="confirmPassword" :rules="confirmPasswordRules" validate-on-blur type="password"></v-text-field>

						<ck-alert :type="feedbackType" :message="feedbackMessage" @close="()=>feedbackMessage = null"></ck-alert>
						<v-btn :loading="isLoading" color="primary" @click="submit" :disabled="!valid">{{resources.login}}</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</v-container>
</template>
<script>
import resources from '@/lenguagesResources/passwordManagement';
import auth from '@/services/auth';
import {
	required,
	match
} from '@/helpers/validationHelpers';

export default {
	data() {
		return {
			valid: false,
			oldPassword: null,
			password: null,
			confirmPassword: null,
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
		oldPasswordRules() {
			return [required(this.resources.oldPasswordRules)];
		},
		passwordRules() {
			return [required(this.resources.passwordRequired)];
		},
		confirmPasswordRules() {
			return [match(this.password, this.resources.confirmPasswordRule)];
		}
	},
	methods: {
		submit() {
			this.feedbackMessage = null;
			if (this.$refs.form.validate()) {
				this.$post('api/User/ChangeUserPassword', {
					oldPassword: this.oldPassword,
					newPassword: this.password
				}).then(d => {
					this.feedbackType = d.hasError ? 'error' : 'success';
					this.feedbackMessage = this.resources[d.message];
				});
			}
		}
	},
	mounted() {
		this.$store.commit('CHANGE_TITLE', this.resources.title);
	}
}
</script>
