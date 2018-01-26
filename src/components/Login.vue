<template>
<v-layout justify-center align-center class="mb-5">
	<v-flex d-flex xs12 sm7 md5 class="mb-5">
		<v-card color="grey lighten-2" class="mb-5">
			<v-card-text>
				<h2>{{resources.header}}</h2>
				<v-form v-model="valid" ref="form" :lazy-validation="true">
					<v-text-field :label="resources.username" :value="username" :rules="usernameRules" validate-on-blur autofocus></v-text-field>
					<v-text-field :label="resources.password" :value="password" :rules="passwordRules" validate-on-blur type="password"></v-text-field>
					<p class="text-xs-right"><a href="#">{{resources.passwordRecovery}}</a></p>
					<v-btn color="primary" @click="submit" :disabled="!valid">{{resources.login}}</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
    <v-alert :type="feedbackType" v-model="showFeedback" dismissible transition="scale-transition">
				{{feedbackMessage}}
			</v-alert>
	</v-flex>
</v-layout>
</template>
<script>
import resources from '@/lenguagesResources/login'
import {
	required
} from '@/helpers/validationHelpers'

export default {
	data() {
		return {
			valid: false,
			username: null,
			password: null,
      feedbackType: 'success'
      feedbackMessage:null
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
			if (this.$refs.form.validate()) {
        this.$proxy('api/User/UserLogin',{
          this.username,
          this.password
        })
        .then()
			}
		}
	}
}
</script>
