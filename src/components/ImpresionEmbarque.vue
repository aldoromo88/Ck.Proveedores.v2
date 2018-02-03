<template>
<v-container fluid>
	<v-layout column>
		<h1>{{resources.title}}</h1>

		<v-form v-model="isMasterDataValid" ref="form" :lazy-validation="true">
			<v-layout row wrap>
				<v-flex xs12 sm6 md4 lg3 order-sm1 order-lg1 pa-1 class="condense">
					<v-select v-bind:items="facilities" v-model="facility" :label="resources.facility" item-value="idPlant" item-text="name" :disabled="isDetailOpen"></v-select>
				</v-flex>
				<v-flex xs12 sm6 md4 lg3 order-sm3 order-lg2 pa-1 class="condense">
					<v-text-field v-model="invoice" :label="resources.invoice"></v-text-field>
				</v-flex>
				<v-flex xs12 sm6 md4 lg3 order-sm2 order-lg3 pa-1 d-inline-flex class="condense">
					<v-select v-bind:items="resources.statuses" v-model="status" :label="resources.status" item-value="id" item-text="name" :rules="rules.status"></v-select>
					<v-btn color="primary" class="inlineBtn" :disabled="!isMasterDataValid" @click="onSearchClick">
						<v-icon class="pa-0">search</v-icon>
					</v-btn>
				</v-flex>
			</v-layout>
		</v-form>

		<transition-group name="details-showed" mode="out-in">
			<v-card flat v-show="isDetailOpen" key="details">
				<v-card-text>
					<v-data-table :headers="headers" :items="results" :rows-per-page-items="[-1]" :loading="$store.getters.IsLoading">
						<template slot="items" slot-scope="props">
	           <tr>
						 	 <td>{{props.item.tentativeDeliveryDate}}</td>
							 <td>{{props.item.shippingDate}}</td>
               <td>{{props.item.invoice}}</td>
               <td>{{props.item.internalName}}</td>
               <td>{{props.item.totalItem}}</td>
               <td>{{props.item.totalQuantity}}</td>
               <td>
                 <v-btn @click="print(props.item.idShipping)">{{props.item.printStatus===1? resources.print: resources.reprint}}</v-btn>
                 <v-btn @click="getPendingToShipDetail(props.item.idShipping)">{{resources.detail}}</v-btn>
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
					<v-data-table :headers="headers" :items="details" :rows-per-page-items="[-1]" :loading="$store.getters.IsLoading">
						<template slot="items" slot-scope="props">
					 <tr>
					 	<td>{{props.item.releaseNumber}}</td>
						<td>{{props.item.partNumber}}</td>
						<td>{{props.item.description}}</td>
						<td>{{props.item.purchaseOrder}}</td>
						<td>{{props.item.line}}</td>
						<td>{{props.item.snp}}</td>
						<td>{{props.item.quantityToShip}}</td>
					 </tr>
				 </template>
					</v-data-table>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" dark small @click.native="dialog = false">{{resources.close}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</v-container>
</template>
<script>
import resources from '@/lenguagesResources/impresionEmbarque';
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
			facilities: [],
			facility: null,
			resultsRaw: [],
			status: null,
			detailsRaw: [],
			dialog: false,
			details: []
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
			return resources[this.$store.getters.Lenguage];
		},
		headers() {
			return this.resources.headers || []
		},
		detailHeaders() {
			return this.resources.detailHeaders || []
		},
		results() {
			return this.resultsRaw.filter(
				d => (!this.facility || d.idPlant === this.facility) &&
				(!this.status || d.printStatus === this.status)
			);
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
			this.dialog = true
			this.$post('api/Transaction/GetShippingDetail', id).then(d => this.details = d);
		},
		print(idShiping) {
			this.$get(`api/Transaction/GetPrintDocument?idShiping=${idShiping}`)
				.then(d => {
					const file = new File([d], "label.pdf", {
						type: 'application/octet-stream'
					});
					fileSaver.saveAs(file);
				});
		}
	},
	mounted() {
		this.$post('api/Common/GetPlants').then(d => this.facilities = d);
	}
}
</script>
<style>
.inlineBtn {
	min-width: 0px!important;
	width: 36px!important;
	margin: 13px 0;
}

.condense {
	height: 50px!important;
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
