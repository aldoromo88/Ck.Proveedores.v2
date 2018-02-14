import shell from './shell';

export default{
	eng: {
		title: shell.eng.print,
		invoice: 'Invoice',
		facility: 'Facility',
		status: 'Status',
		print: 'Print',
		reprint: 'Reprint',
		detail: 'Detail',
		close: 'Close',
		shipmentDetail: 'Shipment Detail',

		rules: {
			status: 'Status is required'
		},
		headers: [
			{text: 'Tentative delivery date', value: 'tentativeDeliveryDate', align: 'left'},
			{text: 'Shipment date', value: 'shippingDate', align: 'left'},
			{text: 'Invoice', value: 'invoice', align: 'left'},
			{text: 'Facility', value: 'facility', align: 'left'},
			{text: 'Total Items in Shipment', value: 'totalItem', align: 'left'},
			{text: 'Qty to Ship', value: 'totalQuantity', align: 'left'}
		],
		detailHeaders: [
			{text: '# Release', value: 'releaseNumber', align: 'left'},
			{text: '# Part', value: 'partNumber', align: 'left'},
			{text: 'Description', value: 'description', align: 'left'},
			{text: 'Purchase Order', value: 'purchaseOrder', align: 'left'},
			{text: 'Line', value: 'line', align: 'left'},
			{text: 'SNP', value: 'snp', align: 'left'},
			{text: 'Qty to Ship', value: 'quantityToShip', align: 'left'}
		],
		statuses: [{id: 1, name: 'Not printed'}, {id: 2, name: 'Printed'}]
	},
	esp: {
		title: shell.esp.print,
		invoice: 'Factura',
		facility: 'Planta',
		status: 'Estatus',
		print: 'Imprimir',
		reprint: 'Reimprimir',
		detail: 'Detalle',
		shipmentDetail: 'Detalle de Embarque',
		close: 'Cerrar',
		rules: {
			status: 'Estatus es requerido'
		},
		headers: [
			{text: 'Fecha tentativa de entrega', value: 'tentativeDeliveryDate', align: 'left'},
			{text: 'Factura de embarque', value: 'shippingDate', align: 'left'},
			{text: 'Factura', value: 'invoice', align: 'left'},
			{text: 'Planta', value: 'facility', align: 'left'},
			{text: 'Total de Articulos en Embarque', value: 'totalItem', align: 'left'},
			{text: 'Cantidad a Embarcar', value: 'totalQuantity', align: 'left'}
		],
		detailHeaders: [
			{text: '# Embarque', value: 'releaseNumber', align: 'left'},
			{text: '# Parte', value: 'partNumber', align: 'left'},
			{text: 'Descripción', value: 'description', align: 'left'},
			{text: 'Orden de Compra', value: 'purchaseOrder', align: 'left'},
			{text: 'Línea', value: 'line', align: 'left'},
			{text: 'SNP', value: 'snp', align: 'left'},
			{text: 'Ctd a Embarcar', value: 'quantityToShip', align: 'left'}
		],
		statuses: [{id: 1, name: 'Sin imprimir'}, {id: 2, name: 'Impresos'}]
	}
};
