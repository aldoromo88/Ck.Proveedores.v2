<template>
<v-layout column>
  <h1>Captura de embarque</h1>
  <v-layout row style="height:50px">
    <v-flex xs12 sm6 md4>
      <ck-datepicker v-model="deliveryDate" :label="resources.deliveryDate"></ck-datepicker>
    </v-flex>
    <v-flex xs12 sm6 md4 offset-xs1>
      <ck-datepicker v-model="shipmentDate" :label="resources.shipmentDate"></ck-datepicker>
    </v-flex>
  </v-layout>
</v-layout>
</template>
<script>

import resources from '@/lenguagesResources/capturaEmbarque';
import datepicker from '@/widgets/datepicker-inline';

export default {
  data() {
    return {
      deliveryDate: null,
      shipmentDate: null,
      invoice: null,
    }
  },
  computed: {
    resources() {
      if (!this.$store.getters.Lenguage) {
        return {}
      }
      return resources[this.$store.getters.Lenguage];
    }
  },
  components: {
    'ck-datepicker':datepicker
  }
}
</script>
