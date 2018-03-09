import shell from './shell';

export default{
	eng: {
		title: shell.eng.newCapture,
		deliveryDate: 'Tentative delivery date',
		shipmentDate: 'Shipment date',
		invoice: 'Invoice',
		facility: 'Facility',
		fillAll: 'Fill All',
		clearAll: 'Clear All',
		createShipment: 'Create Shipment',
		cancelShipment: 'Cancel Shipment',
		purchaseOrder: 'Purchase Order',
		partNumber: '# Part',
		noQuantitySelected: 'No quantity, please input at least one quantity bigger than 0',
		noSnpSelected: 'All elements must have SNP bigger than 0',
		quantityLimit: 'Quantity limit exceded, please decrease quantity to ship',
		filter: 'Filter',
		'MESSAGES.REQUEST_SUCCESS': 'Shippment created successfully',
		'MESSAGE.ERROR_DB': 'Error on data base while creating shippment',
		'MESSAGE.ERROR_API': 'Error on server while creating shippment',
		rules: {
			deliveryDate: 'Tentative delivery date is required',
			shipmentDate: 'Shipment date is required',
			invoice: 'Invoice is reuired',
			facility: 'Facility is required'
		},
		headers: [
			{text: '# Control', value: 'controlNumber', align: 'left'},
			{text: '# Release', value: 'releaseNumber', align: 'left'},
			{text: '# Part', value: 'partNumber', align: 'left'},
			{text: 'Purchase Order', value: 'purchaseOrder', align: 'left'},
			{text: 'Line', value: 'line', align: 'left'},
			{text: 'Required Qty', value: 'requiredQuantity', align: 'left'},
			{text: 'Transit Qty', value: 'transitQuantity', align: 'left'},
			{text: 'Confirmed Qty', value: 'confirmedQuantity', align: 'left'},
			{text: 'Difference Qty', value: 'pendingToShip', align: 'left'},
			{text: 'SNP', value: 'snp', align: 'left'},
			{text: 'Qty to Ship', value: 'quantityToShip', align: 'left'}
		]
	},
	esp: {
		title: shell.esp.newCapture,
		deliveryDate: 'Fecha tentativa de entrega',
		shipmentDate: 'Fecha de embarque',
		invoice: 'Factura',
		facility: 'Planta',
		fillAll: 'Completar Todos',
		clearAll: 'Borrar Todos',
		createShipment: 'Crear Embarque',
		cancelShipment: 'Cancelar Embarque',
		purchaseOrder: 'Orden de Compra',
		partNumber: '# Parte',
		noQuantitySelected: 'Sin cantidad, ingrese al menos una cantidad mayor que 0',
		noSnpSelected: 'Todos los elementos deben tener SNP mayor que 0',
		quantityLimit: 'Límite de cantidad excedido, por favor disminuya la cantidad a embarcar',
		filter: 'Filtro',
		'MESSAGES.REQUEST_SUCCESS': 'Embarque creado correctamente',
		'MESSAGE.ERROR_DB': 'Error en base de datos al crear embarque',
		'MESSAGE.ERROR_API': 'Error en servidor al crear embarque',
		rules: {
			deliveryDate: 'Fecha tentativa de entrega es requerida',
			shipmentDate: 'Fecha de embarque es requerida',
			invoice: 'Factura es requerida',
			facility: 'Planta es requerida'
		},
		headers: [
			{text: '# Control', value: 'controlNumber', align: 'left'},
			{text: '# Embarque', value: 'releaseNumber', align: 'left'},
			{text: '# Parte', value: 'partNumber', align: 'left'},
			{text: 'Orden de Compra', value: 'purchaseOrder', align: 'left'},
			{text: 'Línea', value: 'line', align: 'left'},
			{text: 'Ctd Requirida', value: 'requiredQuantity', align: 'left'},
			{text: 'Ctd Tránsito', value: 'transitQuantity', align: 'left'},
			{text: 'Ctd Confirmada', value: 'confirmedQuantity', align: 'left'},
			{text: 'Ctd Diferencia', value: 'pendingToShip', align: 'left'},
			{text: 'SNP', value: 'snp', align: 'left'},
			{text: 'Ctd a Embarcar', value: 'quantityToShip', align: 'left'}
		]
	}
};
