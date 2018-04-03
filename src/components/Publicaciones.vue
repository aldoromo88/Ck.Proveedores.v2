<template>
<v-container fluid>
  <v-layout column>
    <v-layout row>
      <v-flex xs5 sm4 md2>
        <v-select v-bind:items="releaseTypes" v-model="selectedReleaseType" :label="resources.type" item-value="id" item-text="name"></v-select>
      </v-flex>
      <v-flex xs5 sm4 md2 offset-xs1>
        <v-select v-bind:items="statuses" v-model="selectedStatus" :label="resources.status" item-value="id" item-text="name"></v-select>
      </v-flex>
    </v-layout>
    <v-card>
      <v-card-text>
        <v-data-table :headers="headers" :items="items" :rows-per-page-items="[-1]" :loading="$store.getters.IsLoading" style="max-height:400px; overflow:auto">
          <template slot="items" slot-scope="props">
           <tr>
             <td>{{getReleaseTypeName(props.item.idEdiType)}}</td>
             <td>{{props.item.releaseNumber}}</td>
             <td>{{props.item.generationDate}}</td>
             <td><v-chip :color="props.item.status==1?'green':'gray'" small text-color="white">{{getStatusName(props.item.status)}}</v-chip> </td>
             <td>
               <v-btn :loading="isLoading" flat icon color="blue" @click.native.stop="loadDetail(props.item.idVendorEdi)">
                 <v-icon>search</v-icon>
               </v-btn>
               <v-btn v-if="props.item.idEdiType===1" :loading="isLoading" flat icon color="blue" @click.native.stop="openDialogComment(props.item)">
                 <v-icon>insert_drive_file</v-icon>
               </v-btn>
             </td>
           </tr>
         </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-if="selectedItem" v-model="dialogCommentOpen" width="500">
      <v-card>
        <v-card-title>
          <h3>Comentarios para Firme {{selectedItem.releaseNumber}}</h3>
        </v-card-title>
        <v-card-text>
          <div style="height:120px; position:relative" class="ml-3 mr-3">
            <textarea v-model="comment" tabindex="0" rows="5" style="border:solid #888 1px; width:100%"></textarea>
          </div>
          <ck-alert type="error" :message="commentFeedback" @close="()=>commentFeedback = null"></ck-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="isLoading" color="red darken-1" dark small @click="dialogCommentOpen=false">{{resources.cancel}}</v-btn>
          <v-btn :loading="isLoading" color="green darken-1" dark small @click="sendComment">{{resources.send}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog scrollable v-model="dialogDetailWindowOpen">
      <PublicacionesDetalle :items="details" :idVendorEdi="idVendorEdi" v-on:close="closeDialog"></PublicacionesDetalle>
    </v-dialog>
  </v-layout>
</v-container>
</template>
<script>
import resources from '@/lenguagesResources/publicaciones'
import commonResources from '@/lenguagesResources/commons'
import PublicacionesDetalle from '@/components/PublicacionesDetalle'

export default {
  data() {
    return {
      selectedReleaseType: 0,
      releaseTypesRaw: [],
      selectedStatus: 0,
      dialogDetailWindowOpen: false,
      dialogCommentOpen: false,
      details: [],
      rawItems: [],
      idVendorEdi: 0,
      selectedItem: null,
      comment: '',
      commentFeedback: null
    }
  },
  computed: {
    resources() {
      if (!this.$store.getters.Lenguage) {
        return {}
      }
      const r = resources[this.$store.getters.Lenguage];
      r.common = commonResources[this.$store.getters.Lenguage];
      return r;
    },
    releaseTypes() {
      const all = [{
        id: 0,
        name: this.resources.common.all
      }];
      return all.concat(this.releaseTypesRaw.map(r => ({
        id: r.idReleaseType,
        name: this.$store.getters.Lenguage === "eng" ? r.ediTypeUs : r.ediType
      })));
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
        (this.selectedReleaseType == 0 || this.selectedReleaseType == i.idEdiType) &&
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
      return '';
    },
    closeDialog() {
      this.dialogDetailWindowOpen = false;
      this.loadEdiInfo();
    },
    loadDetail(idVendorEdi) {
      this.idVendorEdi = idVendorEdi;
      this.dialogDetailWindowOpen = true;
      this.$post('api/Transaction/GetAllEdiInfoDetail', idVendorEdi).then(d => this.details = d);
    },
    loadEdiInfo() {
      this.$post('api/Transaction/GetAllEdiInfo').then(d => this.rawItems = d);
    },
    openDialogComment(item) {
      this.dialogCommentOpen = true;
      this.selectedItem = item;
    },
    sendComment() {
      this.commentFeedback = null;
      this.$post('api/Transaction/UpdateEdiComments', {
        idVendorEdi: this.selectedItem.idVendorEdi,
        comments: this.comment
      }).then(d => {
        if (d) {
          this.commentFeedback = d;
        } else {
          this.comment = '';
          this.dialogCommentOpen = false;
        }
      });
    }
  },
  mounted() {
    this.$post('api/Common/GetReleaseTypes').then(d => this.releaseTypesRaw = d);
    this.loadEdiInfo();
    this.$store.commit('CHANGE_TITLE', this.resources.title);
  },
  components: {
    PublicacionesDetalle
  }
}
</script>
