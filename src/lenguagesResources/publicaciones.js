import commons from './commons';
import shell from './shell';

export default {
	eng: {
		...commons.eng,
		title: shell.eng.releases,
		type: 'Release Type',
		status: 'Status',
		statuses: [{id: 0, name: 'All'}, {id: 1, name: 'New'}, {id: 2, name: 'Readed'}],
		headers: [
			{text: 'Type', value: 'idEdiType', align: 'left'},
			{text: '#', value: 'releaseNumber', align: 'left'},
			{text: 'Date', value: 'generationDate', align: 'left'},
			{text: 'Status', value: 'status', align: 'left'},
			{text: 'Opions', align: 'left', sortable: false}
		]
	},
	esp: {
		...commons.esp,
		title: shell.esp.releases,
		type: 'Tipo de Publicación',
		status: 'Estatus',
		statuses: [{id: 0, name: 'Todos'}, {id: 1, name: 'Nuevo'}, {id: 2, name: 'Leido'}],
		headers: [
			{text: 'Tipo', value: 'idEdiType', align: 'left'},
			{text: '#', value: 'releaseNumber', align: 'left'},
			{text: 'Fecha', value: 'generationDate', align: 'left'},
			{text: 'Estatus', value: 'status', align: 'left'},
			{text: 'Opciones', align: 'left', sortable: false}
		]
	}
};
