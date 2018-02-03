<template>
<v-card>
	<v-card-title class="headline">{{resources.title}} </v-card-title>
	<v-card-text>
		<v-data-table :headers="headers" :items="items" :rows-per-page-items="[-1]">
			<template slot="items" slot-scope="props">
           <tr class="compact">
             <td v-if="props.item.controlNumber!==null">{{props.item.controlNumber}}</td>
             <td v-if="props.item.facilityCode!==null">{{props.item.facilityCode}}</td>
             <td v-if="props.item.warehouseCode!==null">{{props.item.warehouseCode}}</td>
             <td v-if="props.item.vendorCode!==null">{{props.item.vendorCode}}</td>
             <td v-if="props.item.releaseNumber!==null">{{props.item.releaseNumber}}</td>
             <td v-if="props.item.generationDate!==null">{{props.item.generationDate}}</td>
             <td v-if="props.item.generationTime!==null">{{props.item.generationTime}}</td>
             <td v-if="props.item.partNumber!==null">{{props.item.partNumber}}</td>
             <td v-if="props.item.description!==null">{{props.item.description}}</td>
             <td v-if="props.item.requiredQuantity!==null">{{props.item.requiredQuantity}}</td>
             <td v-if="props.item.snp!==null">{{props.item.snp}}</td>
             <td v-if="props.item.requiredDate!==null">{{props.item.requiredDate}}</td>
             <td v-if="props.item.unitOfMeasure!==null">{{props.item.unitOfMeasure}}</td>
             <td v-if="props.item.ran!==null">{{props.item.ran}}</td>
             <td v-if="props.item.purchaseOrder!==null">{{props.item.purchaseOrder}}</td>
             <td v-if="props.item.line!==null">{{props.item.line}}</td>
             <td v-if="props.item.transitQuantity!==null">{{props.item.transitQuantity}}</td>
             <td v-if="props.item.confirmedQuantity!==null">{{props.item.confirmedQuantity}}</td>
             <td v-if="props.item.differenceQuantity!==null">{{props.item.differenceQuantity}}</td>
             <td v-if="props.item.error!==null">{{props.item.error}}</td>
           </tr>
         </template>
		</v-data-table>
	</v-card-text>
	<v-card-actions>
		<v-spacer></v-spacer>
		<v-btn color="green darken-1" dark small @click.native="$emit('close')">{{resources.close}}</v-btn>
	</v-card-actions>
	<v-speed-dial v-model="fab" top right direction="left" hover transition="slide-y-transition">
		<v-btn slot="activator" small color="blue darken-2" dark fab hover v-model="fab">
			<v-icon>file_download</v-icon>
			<v-icon>close</v-icon>
		</v-btn>
		<v-btn fab dark small color="red" @click="downloadEdi">
			EDI
		</v-btn>
		<v-btn fab dark small color="indigo" @click="downloadCsv">
			<v-icon>insert_drive_file</v-icon>
		</v-btn>
		<v-btn fab dark small color="green" @click="downloadXslx">
			<v-icon>library_books</v-icon>
		</v-btn>
	</v-speed-dial>
</v-card>
</template>
<script>
import resources from '@/lenguagesResources/publicacionesDetalle';
import fileSaver from 'file-saver';
import xlsx from 'xlsx';

export default {
	//name: 'ck-publicacion-detalle',
	props: {
		items: {
			type: Array,
			default () {
				return []
			}
		},
		idVendorEdi: Number
	},
	data() {
		return {
			fab: false
		}
	},
	methods: {
		downloadXslx() {
			var worksheet = xlsx.utils.aoa_to_sheet(this.dataForDownload);
			var new_workbook = xlsx.utils.book_new();
			xlsx.utils.book_append_sheet(new_workbook, worksheet, "Data");

			const wopts = {
				bookType: 'xlsx',
				bookSST: false,
				type: 'array'
			};

			const wbout = xlsx.write(new_workbook, wopts);

			fileSaver.saveAs(new Blob([wbout], {
				type: 'application/octet-stream'
			}), 'Data.xlsx')
		},
		downloadCsv() {
			let csvContent = "";
			this.dataForDownload.forEach(row => {
				let rowContent = row.join(",");
				csvContent += rowContent + "\r\n";
			});

			const file = new File([csvContent], "data.csv", {
				type: "data:text/csv;charset=utf-8"
			});
			fileSaver.saveAs(file);
		},
		downloadEdi() {
			this.$get(`api/Transaction/GetEdiDocument?idVendorEdi=${this.idVendorEdi}`)
				.then(d => {
					const file = new File([d], "data.edi", {
						type: "data:text;charset=utf-8"
					});
					fileSaver.saveAs(file);
				}).catch(e => {
					debugger;
					console.log(e);
				});
		}
	},
	computed: {
		resources() {
			if (!this.$store.getters.Lenguage) {
				return {}
			}
			return resources[this.$store.getters.Lenguage];
		},

		headers() {
			const headers = this.resources.headers || []
			const firstItem = this.items.length > 0 ? this.items[0] : undefined;

			if (!firstItem) return [];
			return headers.filter(p => firstItem[p.value] !== null);
		},
		dataForDownload() {

			const headersValues = this.headers.map(h => h.value);
			const headers = [this.headers.map(h => h.text)];
			return headers.concat(this.items.map(row => headersValues.map(k => row[k])));
		}
	}
}
</script>
<style >
.card .speed-dial {
	position: absolute;
}

.card .btn--floating {
	position: relative;
}
</style>
