<template>
<v-card>
	<v-card-title class="headline">{{resources.title}} </v-card-title>
	<v-card-text>
		<v-layout>
			<v-flex sm6 md5 lg3 d-inline-flex class="condense pa-1">
				<v-text-field v-model="filter.partNumber" :label="resources.partNumber"></v-text-field>
				<v-btn :loading="isLoading" color="primary" class="inlineBtn" @click="clearFilter">
					<v-icon class="pa-1">clear</v-icon>
				</v-btn>
			</v-flex>
		</v-layout>
		<v-data-table :headers="headers" :items="itemsFiltered" :rows-per-page-items="[-1]" style="max-height:400px; overflow:auto">
			<template slot="items" slot-scope="props">
         <tr>
					 <td v-for="h in headers" v-if="props.item[h.value]!==null">{{props.item[h.value]}} </td>
         </tr>
       </template>
		</v-data-table>
	</v-card-text>
	<v-card-actions>
		<v-spacer></v-spacer>
		<v-btn :loading="isLoading" color="green darken-1" dark small @click.native="$emit('close')">{{resources.close}}</v-btn>
	</v-card-actions>
	<!-- <v-speed-dial v-model="fab" top right direction="left" hover transition="slide-y-transition"> -->
	<div style="position:absolute; right:16px; top:16px">
		<!-- <v-btn :loading="isLoading" slot="activator" small color="blue darken-2" dark fab hover v-model="fab">
			<v-icon>file_download</v-icon>
			<v-icon>close</v-icon>
		</v-btn> -->
		<v-btn v-if="hasPermissionToEdi" :loading="isLoading" fab dark small color="red" @click="downloadEdi">
			EDI
		</v-btn>
		<v-btn :loading="isLoading" fab dark small color="indigo" @click="downloadCsv">
			<v-icon>insert_drive_file</v-icon>
		</v-btn>
		<v-btn :loading="isLoading" fab dark small color="green" @click="downloadXslx">
			<v-icon>library_books</v-icon>
		</v-btn>
	</div>
	<!-- </v-speed-dial> -->
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
			filter: {
				partNumber: null,
			},
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
		},
		hasPermissionToEdi() {
			const type = this.$store.getters.User.Type;
			return type === 'WEB' || type === 'CON';
		},
		itemsFiltered() {
			return this.items.filter(d => !this.filter.partNumber || d.partNumber.toUpperCase().includes(this.filter.partNumber.toUpperCase()));
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
			}), 'Data.xlsx');
			this.$post('api/Transaction/UpdateEdiFileDownload', this.idVendorEdi);
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
			this.$post('api/Transaction/UpdateEdiFileDownload', this.idVendorEdi);
		},
		downloadEdi() {
			if (!this.hasPermissionToEdi) {
				return;
			}
			this.$get(`api/Transaction/GetEdiDocument?idVendorEdi=${this.idVendorEdi}`)
				.then(d => fileSaver.saveAs(d, 'data.edi'))
				.then(()=> this.$post('api/Transaction/UpdateEdiFileDownload', this.idVendorEdi))
				.catch(e => {
					console.log(e);
				});
		},
		clearFilter() {
			this.filter.partNumber = null;
		},
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
