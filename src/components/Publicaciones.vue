<template>
<v-layout column>
  <h1>Publicaciones</h1>
  <v-layout row style="height:50px">
    <v-flex xs5 sm4 md2>
      <v-select v-bind:items="releaseTypes" v-model="selectedReleaseType" :label="resources.type" item-value="id" item-text="name"></v-select>
    </v-flex>
    <v-flex xs5 sm4 md2 offset-xs1>
      <v-select v-bind:items="statuses" v-model="selectedStatus" :label="resources.status" item-value="id" item-text="name"></v-select>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-data-table :headers="headers" :items="items" :rows-per-page-items="[-1]">
      <template slot="items" slot-scope="props">
           <tr>
             <td>{{getReleaseTypeName(props.item.type)}}</td>
             <td>{{props.item.releaseNumber}}</td>
             <td>{{props.item.date}}</td>
             <td><v-chip :color="props.item.status==1?'green':'gray'" small text-color="white">{{getStatusName(props.item.status)}}</v-chip> </td>
             <td>
               <v-btn flat icon color="blue" @click.native.stop="loadDetail(props.item.releaseNumber)">
                 <v-icon>search</v-icon>
              </v-btn>
             </td>
           </tr>
         </template>
    </v-data-table>
  </v-layout>

  <v-dialog v-model="dialogOpen">
    <PublicacionesDetalle :items="details" v-on:close="closeDialog"></PublicacionesDetalle>
  </v-dialog>
</v-layout>
</template>
<script>
import resources from '@/lenguagesResources/publicaciones'

import PublicacionesDetalle from '@/components/PublicacionesDetalle'

export default {
  data() {
    return {
      selectedReleaseType: 0,
      selectedStatus: 0,
      dialogOpen: false,
      rawItems: [{
          type: 1,
          releaseNumber: 123456,
          date: '2017/12/21',
          status: 1
        },
        {
          type: 2,
          releaseNumber: 789012,
          date: '2018/01/10',
          status: 1
        },
        {
          type: 3,
          releaseNumber: 345678,
          date: '2018/02/14',
          status: 2
        },
        {
          type: 4,
          releaseNumber: 44456,
          date: '2018/02/14',
          status: 2
        },
        {
          type: 5,
          releaseNumber: 123657,
          date: '2018/02/14',
          status: 2
        },
      ],
      details: [{
          location: 'SF',
          partNumber: '27040CB2A',
          description: 'Meter',
          releaseNumber: '123456',
          order: '602547',
          line: '2',
          quantity: 400
        },
        {
          location: 'SF',
          partNumber: 'PB450120',
          description: 'Audio',
          releaseNumber: '123456',
          order: '61245',
          line: '1',
          quantity: 300
        }
      ]
    }
  },
  computed: {
    resources() {
      if (!this.$store.getters.Lenguage) {
        return {}
      }
      return resources[this.$store.getters.Lenguage];
    },
    releaseTypes() {
      return this.resources.releaseTypes || []
    },
    statuses() {
      return this.resources.statuses || []
    },
    selectedReleaseTypeName() {
      return this.getReleaseTypeName(this.selectedReleaseType)
    },
    selectedStatusName() {
      return this.getStatusName(this.selectedStatus)
    },
    headers() {
      return this.resources.headers || []
    },
    items() {
      return this.rawItems.filter(i =>
        (this.selectedReleaseType == 0 || this.selectedReleaseType == i.type) &&
        (this.selectedStatus == 0 || this.selectedStatus == i.status)
      )
    }
  },
  methods: {
    getReleaseTypeName(id) {
      let selectedRelease = this.releaseTypes.filter(r => r.id == id)
      if (selectedRelease.length > 0) {
        return selectedRelease[0].name
      }
      return ''
    },
    getStatusName(id) {
      let selectedStatus = this.statuses.filter(r => r.id == id)
      if (selectedStatus.length > 0) {
        return selectedStatus[0].name
      }
      return ''
    },
    closeDialog() {
      this.dialogOpen = false
    },
    loadDetail(releaseNumber) {
      //TODO cargar detalle correspondiente
      this.dialogOpen = true
    }
  },
  components: {
    PublicacionesDetalle
  }
}
</script>
