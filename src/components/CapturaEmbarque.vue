<template>
	<v-container fluid>
		<v-layout column>
			<v-form v-model="isMasterDataValid" ref="form" :lazy-validation="true">
				<v-layout row wrap>
					<v-flex xs12 class="condense text-xs-right">
						<v-btn :loading="isLoading" dark small color="indigo" @click="downloadOpenLines">
							{{resources.downloadOpenLines}}
						</v-btn>
					</v-flex>
					<v-flex xs12 sm6 md5 lg3 order-sm1 order-lg1 pa-1 class="condense">
						<ck-datepicker v-model="shipmentDate" :allowedDates="allowedShipmentDates" :label="resources.shipmentDate" :rules="rules.shipmentDate" validate-on-blur :disabled="isDetailOpen"></ck-datepicker>
					</v-flex>
					<v-flex xs12 sm6 md5 lg3 order-sm3 order-lg2 pa-1 class="condense">
						<ck-datepicker v-model="deliveryDate" :allowedDates="allowedDeliveryDates" :label="resources.deliveryDate" :rules="rules.deliveryDate" validate-on-blur :disabled="isDetailOpen"></ck-datepicker>
					</v-flex>
					<v-flex xs12 sm6 md5 lg3 order-sm2 order-lg3 pa-1 class="condense">
						<v-select v-bind:items="facilities" v-model="facility" :label="resources.facility" item-value="idPlant" item-text="name" :rules="rules.facility" validate-on-blur :disabled="isDetailOpen"></v-select>
					</v-flex>
					<v-flex xs12 sm6 md5 lg3 pa-1 order-sm4 order-lg4 d-inline-flex class="condense">
						<v-text-field v-model="invoice" :label="resources.invoice" :rules="rules.invoice" validate-on-blur :disabled="isDetailOpen"></v-text-field>
						<v-btn :loading="isLoading" color="primary" class="inlineBtn" :disabled="!isMasterDataValid ||isDetailOpen " @click="onSearchClick">
							<v-icon class="pa-0">search</v-icon>
						</v-btn>
					</v-flex>
				</v-layout>

			</v-form>
			<v-dialog v-model="invoiceExists" persistent>
				<v-card>
					<v-card-title class="headline">{{resources.invoiceExists}}</v-card-title>
					<v-card-text>
						<v-data-table :headers="headers" :items="repeteadInvoice" :rows-per-page-items="[-1]" :loading="$store.getters.IsLoading" style="max-height:400px; overflow:auto">
							<template slot="items" slot-scope="props">
								<tr>
									<td>{{props.item.requiredDate}}</td>
									<td>{{props.item.releaseNumber}}</td>
									<td>{{props.item.partNumber}}</td>
									<td>{{props.item.purchaseOrder}}</td>
									<td>{{props.item.line}}</td>
									<td>{{props.item.requiredQuantity}}</td>
									<td>{{props.item.transitQuantity}}</td>
									<td>{{props.item.confirmedQuantity}}</td>
									<td>{{props.item.pendingToShip}}</td>
									<td>{{props.item.snp}}</td>
									<td>{{props.item.quantityToShip}}</td>
								</tr>
							</template>
						</v-data-table>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn :loading="isLoading" color="red darken-1" dark small @click="cancelShipment">{{resources.cancel}}</v-btn>
						<v-btn :loading="isLoading" color="green darken-1" dark small @click="invoiceExists = false">{{resources.continue}}</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>


			<h3 v-show="isDetailOpen" class="mt-2" key="filterTitle">{{resources.filter}}</h3>
			<v-layout row wrap v-show="isDetailOpen" key="filter">
				<!-- <v-flex sm6 md5 lg3 d-inline-flex class="condense pa-1">
				<ck-datepicker v-model="filter.from" :label="resources.from"></ck-datepicker>
			</v-flex> -->
			<v-flex sm6 md5 lg3 d-inline-flex class="condense pa-1">
				<ck-datepicker v-model="filter.to" :label="resources.to"></ck-datepicker>
			</v-flex>

			<v-flex sm6 md5 lg3 d-inline-flex class="condense pa-1">
				<v-text-field v-model="filter.partNumber" :label="resources.partNumber"></v-text-field>
			</v-flex>
			<v-flex sm6 md5 lg3 d-inline-flex class="condense pa-1">
				<v-text-field v-model="filter.purchaseOrder" :label="resources.purchaseOrder"></v-text-field>
				<v-btn :loading="isLoading" color="primary" class="inlineBtn" @click="clearFilter">
					<v-icon class="pa-1">clear</v-icon>
				</v-btn>
			</v-flex>
		</v-layout>
		<v-card flat v-show="isDetailOpen" key="details">
			<v-card-text>
				<v-data-table :headers="headers" :items="details" :rows-per-page-items="[-1]" :loading="$store.getters.IsLoading" :pagination.sync="pagination" style="max-height:400px; overflow:auto">
					<template slot="items" slot-scope="props">
						<tr>
							<td>{{props.item.requiredDate}}</td>
							<td>{{props.item.releaseNumber}}</td>
							<td>{{props.item.partNumber}}</td>
							<td>{{props.item.purchaseOrder}}</td>
							<td>{{props.item.line}}</td>
							<td>{{props.item.requiredQuantity}}</td>
							<td>{{props.item.transitQuantity}}</td>
							<td>{{props.item.confirmedQuantity}}</td>
							<td>{{props.item.pendingToShip}}</td>
							<td><v-text-field v-model="props.item.snp" hide-details style="padding: 3px 0; width:80px" maxlength="4"></v-text-field></td>
							<td><v-text-field v-model="props.item.quantityToShip" hide-details style="padding: 3px 0; width:80px"></v-text-field></td>
						</tr>
					</template>
				</v-data-table>

			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn :loading="isLoading" color="error" :disabled="!isMasterDataValid" @click="cancelShipment">
					{{resources.cancelShipment}}
				</v-btn>
				<v-btn :loading="isLoading" :disabled="!isMasterDataValid" @click="fillAll">
					{{resources.fillAll}}
				</v-btn>
				<v-btn :loading="isLoading" :disabled="!isMasterDataValid" @click="clearAll">
					{{resources.clearAll}}
				</v-btn>
				<v-btn :loading="isLoading" color="primary" :disabled="!isMasterDataValid" @click="createShipment">
					{{resources.createShipment}}
				</v-btn>
			</v-card-actions>
		</v-card>
		<ck-alert :type="feedbackType" :message="feedbackMessage" @close="()=>feedbackMessage = null"></ck-alert>
	</v-layout>
</v-container>
</template>
<script>
import resources from '@/lenguagesResources/capturaEmbarque';
import fileSaver from 'file-saver';
import { required } from '@/helpers/validationHelpers';



const orderBy = name=>{
	return function (a, b){
		if(a[name]> b[name]){
			return 1;
		}
		if(a[name]< b[name]){
			return -1;
		}
		return 0;
	}
}

const d = new Date();
const today = (d.getFullYear() * 10000) + (d.getMonth() + 1) * 100 + d.getDate()

export default {
	data() {
		return {
			isMasterDataValid: true,
			isDetailOpen: false,
			deliveryDate: null,
			shipmentDate: null,
			invoiceExists: false,
			invoice: null,
			facilities: [],
			facility: null,
			detailsRaw: [],
			repeteadInvoice: [],
			pagination: {
				sortBy: 'requiredDate',
				descending: true
			},
			filter: {
				from: null,
				to: null,
				partNumber: null,
				purchaseOrder: null
			},
			feedbackType: 'error',
			feedbackMessage: null
		}
	},
	computed: {
		rules() {
			return {
				deliveryDate: [required(this.resources.rules.deliveryDate)],
				shipmentDate: [required(this.resources.rules.shipmentDate)],
				invoice: [required(this.resources.rules.invoice)],
				facility: [required(this.resources.rules.facility)]
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
		details() {
			const from = this.filter.from ? parseInt(this.filter.from.replace(/-/g, '')) : undefined;
			const to = this.filter.to ? parseInt(this.filter.to.replace(/-/g, '')) : undefined;
			return this.detailsRaw.filter(
				d => (!this.filter.partNumber || d.partNumber.toUpperCase().includes(this.filter.partNumber.toUpperCase())) &&
				(!this.filter.purchaseOrder || ('' + d.purchaseOrder).toUpperCase().includes(this.filter.purchaseOrder.toUpperCase())) &&
				(!from || d.requiredDate >= from) &&
				(!to || d.requiredDate <= to)
			);
		},
		shipmentDateNumeric() {
			return this.shipmentDate ? parseInt(this.shipmentDate.replace(/-/g, '')) : undefined;
		},
		deliveryDateNumeric() {
			return this.deliveryDate ? parseInt(this.deliveryDate.replace(/-/g, '')) : undefined;
		}
	},
	methods: {
		onSearchClick() {
			if (this.$refs.form.validate()) {
				this.getDetail();
				this.isDetailOpen = true;
				this.feedbackMessage = null;
				this.clearFilter();
			}
		},
		cancelShipment() {
			this.isDetailOpen = false;
			this.deliveryDate = null;
			this.shipmentDate = null;
			this.invoiceExists = false;
			this.invoice = null;
			this.facility = null;
			this.$refs.form.reset();
			this.clearFilter();
		},
		getDetail() {
			this.$post('api/Transaction/GetPendingToShipDetail', { idPlant: this.facility, invoice: this.invoice })
			.then(d => {
				this.invoiceExists = d.invoiceExists;
				this.repeteadInvoice = d.repeteadInvoice;
				this.detailsRaw = d.pendingToShip;
			});
		},
		fillAll() {
			this.details.forEach(d => d.quantityToShip = d.pendingToShip);
		},
		clearAll() {
			this.detailsRaw.forEach(d => d.quantityToShip = 0);
		},
		clearFilter() {
			this.filter.to = null;
			this.filter.from = null;
			this.filter.partNumber = null;
			this.filter.purchaseOrder = null;
		},
		createShipment() {
			let purchaseOrders = {};

			//Convertir valores de input text a enteros, y agrupar por purchase order
			const detail = this.detailsRaw.map(c=>{
				const d = {...c}

				purchaseOrders[d.purchaseOrder] = purchaseOrders[d.purchaseOrder] || [];

				d.quantityToShip = parseInt(d.quantityToShip);
				d.snp = parseInt(d.snp);
				d.pendingToShip = parseInt(d.pendingToShip);

				purchaseOrders[d.purchaseOrder].push(d);
				return d;
			})


			//De cada purchase order ordenar por numero de linea
			const purchaseOrdersLines = Object.values(purchaseOrders);
			for (var i = 0; i < purchaseOrdersLines.length; i++) {
				const lines =  purchaseOrdersLines[i];
				lines.sort(orderBy('line'));

				let lineIncomplete = false;
				for (var j = 0; j < lines.length; j++) {
					const line = lines[j];
					//console.log(`Incomplete: ${lineIncomplete}  PO:${line.purchaseOrder} Line:${line.line} Pending:${line.pendingToShip} Qty${line.quantityToShip}`)
					if(lineIncomplete && line.quantityToShip>0){
						this.feedbackMessage = `#${line.partNumber} Line ${line.line} : ${this.resources.poLineIncomplete}`;
						return;
					}

					if(line.pendingToShip>line.quantityToShip){
						lineIncomplete = true;
					}
				}
			}



			const data = {
				tentativeDeliveryDate: this.deliveryDate,
				shippingDate: this.shipmentDate,
				invoice: this.invoice,
				shippingTo: this.facility,
				detail: detail.filter(d => parseInt(d.quantityToShip) > 0)
			}

			this.feedbackType = 'info'
			if (!data.detail.length) {
				this.feedbackMessage = this.resources.noQuantitySelected;
				return;
			}
			for (var i = 0; i < data.detail.length; i++) {
				const d = data.detail[i];
				if (d.snp <= 0) {
					this.feedbackMessage = `#${d.partNumber} : ${this.resources.noSnpSelected}`;
					return;
				} else if ((d.quantityToShip / d.snp) > 999) {
					this.feedbackMessage = `#${d.partNumber} : ${this.resources.quantityLimit}`;
					return;
				} else if (d.quantityToShip > d.pendingToShip) {
					this.feedbackMessage = `#${d.partNumber} : ${this.resources.quantityToShipBiggerThanPending}`;
					return;
				}
			}

			data.detail = data.detail.map(d => ({
				idVendorEdiDetail: d.idVendorEdiDetail,
				snp: parseInt(d.snp),
				quantity: parseInt(d.quantityToShip)
			}))

			this.$post('api/Transaction/CreateShipping', data)
			.then(d => {
				this.feedbackType = d.hasError ? 'error' : 'success';
				this.feedbackMessage = this.resources[d.message];
				this.cancelShipment();
			});
		},
		allowedShipmentDates(date) {
			const d = parseInt(date.replace(/-/g, ''));
			return d >= today && (!this.deliveryDateNumeric || d <= this.deliveryDateNumeric);
		},
		allowedDeliveryDates(date) {
			const d = parseInt(date.replace(/-/g, ''));
			return d >= today && (!this.shipmentDateNumeric || d >= this.shipmentDateNumeric);
		},
		downloadOpenLines(){
			const fileName = `${today}${new Date().toLocaleTimeString().replace(/:/g,'')}.xlsx`;

			this.$downloadFile(`api/Transaction/GetOpenLines?idVendorCode=${this.$store.getters.User.IdUser}`)
				.then(d => fileSaver.saveAs(d, fileName))
				.catch(e => console.log(e));
		}
	},
	mounted() {
		this.$post('api/Common/GetPlants').then(d => this.facilities = d);
		this.$store.commit('CHANGE_TITLE', this.resources.title);
		this.cancelShipment();
		this.feedbackMessage = null;
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
