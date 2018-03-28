<template>
<v-container fluid>
  <v-layout column>
    <v-form v-model="isMasterDataValid" ref="form" :lazy-validation="true">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 pa-1 class="condense">
          <v-select v-bind:items="facilities" v-model="facility" :label="resources.facility" item-value="idPlant" item-text="name"></v-select>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3 pa-1 class="condense">
          <v-text-field v-model="invoice" :label="resources.invoice"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3 pa-1 d-inline-flex class="condense">
          <v-select v-bind:items="resources.statuses" v-model="status" :label="resources.status" item-value="id" item-text="name" :rules="rules.status"></v-select>
          <v-btn :loading="isLoading" color="primary" class="inlineBtn" :disabled="!isMasterDataValid" @click="onSearchClick">
            <v-icon class="pa-0">search</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>

    <transition-group name="details-showed" mode="out-in">
      <v-card flat v-show="isDetailOpen" key="details">
        <v-card-text>
          <v-data-table :headers="headers" :items="results" :rows-per-page-items="[-1]" :loading="$store.getters.IsLoading" style="max-height:400px; overflow:auto">
            <template slot="items" slot-scope="props">
	           <tr>
						 	 <td>{{props.item.tentativeDeliveryDate}}</td>
							 <td>{{props.item.shippingDate}}</td>
               <td>{{props.item.invoice}}</td>
               <td>{{props.item.internalName}}</td>
               <td>{{props.item.totalItem}}</td>
               <td>{{props.item.totalQuantity}}</td>
               <td>
                 <v-btn :loading="isLoading" @click="print(props.item)">{{props.item.printStatus===1? resources.print: resources.reprint}}</v-btn>
                 <v-btn :loading="isLoading" @click="getPendingToShipDetail(props.item.idShipping)">{{resources.detail}}</v-btn>
               </td>
	           </tr>
	         </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </transition-group>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title class="headline">{{resources.shipmentDetail}}</v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex sm6 md5 lg3 d-inline-flex class="condense pa-1">
              <v-text-field v-model="filter.partNumber" :label="resources.partNumber"></v-text-field>
              <v-btn :loading="isLoading" color="primary" class="inlineBtn" @click="clearFilter">
                <v-icon class="pa-1">clear</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-data-table :headers="detailHeaders" :items="details" :rows-per-page-items="[-1]" :loading="$store.getters.IsLoading" style="max-height:400px; overflow:auto">
            <template slot="items" slot-scope="props">
						<tr>
	 					 <td v-for="h in detailHeaders" v-if="props.item[h.value]!==null">{{props.item[h.value]}} </td>
						 <td>
							 <!-- <v-btn :loading="isLoading" @click="print(props.item)">{{props.item.printStatus===1? resources.print: resources.reprint}}</v-btn> -->
							 <v-btn :loading="isLoading" @click="print(props.item)">{{resources.print}}</v-btn>
						 </td>
	          </tr>
				 </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="isLoading" color="green darken-1" dark small @click.native="closeDetail">{{resources.close}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</v-container>
</template>
<script>
import resources from '@/lenguagesResources/impresionEmbarque';
import commonResources from '@/lenguagesResources/commons'
import fileSaver from 'file-saver';
import {
  required
} from '@/helpers/validationHelpers';

export default {
  data() {
    return {
      isMasterDataValid: true,
      isDetailOpen: false,
      invoice: null,
      facilitiesRaw: [],
      facility: 0,
      resultsRaw: [],
      status: null,
      detailsRaw: [],
      dialog: false,
      detailsRaw: [],
      idShipping: 0,
      filter: {
        partNumber: null,
      },
    }
  },
  computed: {
    rules() {
      return {
        status: [required(this.resources.rules.status)],
      }
    },
    resources() {
      if (!this.$store.getters.Lenguage) {
        return {}
      }
      const r = resources[this.$store.getters.Lenguage];
      r.common = commonResources[this.$store.getters.Lenguage];
      return r;
    },
    headers() {
      return this.resources.headers || []
    },
    detailHeaders() {
      return this.resources.detailHeaders || []
    },
    facilities() {
      return [{
        idPlant: 0,
        name: this.resources.common.all
      }].concat(this.facilitiesRaw);
    },
    results() {
      return this.resultsRaw.filter(
        d => (this.facility === 0 || d.idPlant === this.facility) &&
        (d.printStatus === this.status)
      );
    },
    details() {
      return this.detailsRaw.filter(d => !this.filter.partNumber || d.partNumber.toUpperCase().includes(this.filter.partNumber.toUpperCase()));
    }
  },
  methods: {
    onSearchClick() {
      if (this.$refs.form.validate()) {
        this.getShippingByVendor();
        this.isDetailOpen = true;
      }
    },
    getShippingByVendor() {
      this.$post('api/Transaction/GetShippingByVendor', this.status).then(d => this.resultsRaw = d);
    },
    getPendingToShipDetail(id) {
      this.idShipping = id;
      this.dialog = true
      this.$post('api/Transaction/GetShippingDetail', id).then(d => this.detailsRaw = d);
    },
    closeDetail() {
      this.dialog = false;
      this.getShippingByVendor();
    },
    print(data) {
      this.$downloadFile(`api/Transaction/GetPrintDocument?IdShiping=${data.idShipping||this.idShipping}&IdShipingDetail=${data.idShippingDetail||0}`)
        .then(d => {
          fileSaver.saveAs(d, 'label.pdf');
          this.getShippingByVendor();
        })
        .catch(e => {
          console.log(e);
        });
    },
    clearFilter() {
      this.filter.partNumber = null;
    }
  },
  mounted() {
    this.$post('api/Common/GetPlants').then(d => this.facilitiesRaw = d);
    this.$store.commit('CHANGE_TITLE', this.resources.title);
  }
}
</script>
<style>
.inlineBtn {
  min-width: 0px !important;
  width: 36px !important;
  margin: 13px 0;
}

.condense {
  height: 50px !important;
}

.details-showed-enter-active,
.list-leave-active {
  transition: all 1s;
}

.details-showed-enter,
.list-leave-to
/* .list-leave-active below version 2.1.8 */

  {
  opacity: 0;
  transform: translateX(150px);
}
</style>
