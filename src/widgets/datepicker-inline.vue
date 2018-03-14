<template>
<v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :disabled="disabled">
	<v-text-field slot="activator" :label="label" :rules="rules" :value="value" prepend-icon="event" readonly :disabled="disabled"></v-text-field>
	<v-date-picker :value="value" @input="(d)=>$emit('input', d)" :allowed-dates="allowedDates" no-title scrollable actions :disabled="disabled">
		<template slot-scope="{ save, cancel }">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="isLoading" flat color="primary" @click="cancel">Cancel</v-btn>
          <v-btn :loading="isLoading" flat color="primary" @click="save">OK</v-btn>
        </v-card-actions>
      </template>
	</v-date-picker>
</v-menu>
</template>
<script>
export default {
	name: 'ck-datepicker',
	props: ['value', 'label', 'rules', 'disabled', 'min', 'max', 'allowedDates'],
	data() {
		return {
			menu: false,
		}
	}
}
</script>
