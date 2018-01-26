<template>
<v-card>
  <v-card-title class="headline">{{resources.title}} </v-card-title>
  <v-card-text>
    <v-data-table :headers="headers" :items="items" :rows-per-page-items="[-1]">
      <template slot="items" slot-scope="props">
           <tr>
             <td>{{props.item.location}}</td>
             <td>{{props.item.partNumber}}</td>
             <td>{{props.item.description}}</td>
             <td>{{props.item.releaseNumber}}</td>
             <td>{{props.item.order}}</td>
             <td>{{props.item.line}}</td>
             <td>{{props.item.quantity}}</td>
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
    <v-btn fab dark small color="red">
      EDI
    </v-btn>
    <v-btn fab dark small color="indigo">
      <v-icon>insert_drive_file</v-icon>
    </v-btn>
    <v-btn fab dark small color="green">
      <v-icon>library_books</v-icon>
    </v-btn>


  </v-speed-dial>
</v-card>
</template>
<script>
import resources from '@/lenguagesResources/publicacionesDetalle'
export default {
  //name: 'ck-publicacion-detalle',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      fab: false
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
      return this.resources.headers || []
    }

  }
}
</script>
<style >
/* This is for documentation purposes and will not be needed in your application */

.card .speed-dial {
  position: absolute;
}

.card .btn--floating {
  position: relative;
}
</style>
