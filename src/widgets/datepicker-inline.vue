<template>
<v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
  <v-text-field slot="activator" :label="label" :rules="rules" v-model="date" prepend-icon="event" readonly :disabled="disabled"></v-text-field>
  <v-date-picker v-model="date" @input="$emit('input', date)" no-title scrollable actions :disabled="disabled">
    <template slot-scope="{ save, cancel }">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
          <v-btn flat color="primary" @click="save">OK</v-btn>
        </v-card-actions>
      </template>
  </v-date-picker>
</v-menu>
</template>
<script>
export default {
  name: 'ck-datepicker',
  props: ['value', 'label','rules','disabled'],
  data() {
    return {
      date: null,
      menu: false,
    }
  }
}
</script>
