export default {
  eng: {
    type: 'Release Type',
    releaseTypes: [{ id: 0, name: 'All' }, { id: 1, name: 'Forecast' }, { id: 2, name: 'Firm' }, { id: 3, name: 'Secuential' }, { id: 4, name: 'Received Confirmation' }, { id: 5, name: 'Shipment' }],
    status: 'Status',
    statuses: [{ id: 0, name: 'All' }, { id: 1, name: 'New' }, { id: 2, name: 'Readed'}],
    headers: [
      { text: 'Type', value: 'type',  align: 'left' },
      { text: '#', value: 'releaseNumber',  align: 'left' },
      { text: 'Date', value: 'date' ,  align: 'left'},
      { text: 'Status', value: 'status' ,  align: 'left'},
      { text: 'Opions',  align: 'left', sortable: false },
    ]
  },
  esp: {
    type: 'Tipo de Publicación',
    releaseTypes: [{ id: 0, name: 'Todos' }, { id: 1, name: 'Anuncio' }, { id: 2, name: 'Firme' }, { id: 3, name: 'Secuenciado' }, { id: 4, name: 'Confirmación de Recibido' }, { id: 5, name: 'Embarque' }],
    status: 'Estatus',
    statuses: [{ id: 0, name: 'Todos' }, { id: 1, name: 'Nuevo' }, { id: 2, name: 'Leido' }],
    headers: [
      { text: 'Tipo', value: 'type',  align: 'left' },
      { text: '#', value: 'releaseNumber',  align: 'left' },
      { text: 'Fecha', value: 'date',  align: 'left' },
      { text: 'Estatus', value: 'status',  align: 'left' },
      { text: 'Opciones',  align: 'left', sortable: false },
    ]
  }
}
