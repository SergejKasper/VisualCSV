<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>

<template>
  <div>
    <img src="./CSV/assets/logo.png" alt="electron-vue">
    <br/>
    <br/>
    <!-- md-input type="text" name="name" value=""></md-input -->
    <md-button class="md-raised md-primary" v-on:click.native="loadSheet()">Datei laden</md-button>
    <md-button class="md-raised md-primary" v-on:click.native="saveSheet()" v-if="Object.keys(rowsList).length !== 0">Datei speichern</md-button>
    <input id="csvInput" type="file" v-on:change="xslFileLoad" hidden>
    <br/>
    <section>
      <vuetable v-if="Object.keys(rowsList).length !== 0"
        :sheet-name="sheetName"
        :data="rowsList"
        :columns="rowsProperties"
        :filter-key="searchQuery"
        :column-options="{addColumn: addColumn, editColumn: editColumn, deleteColumn: deleteColumn, addRow: addRow}"
        :button-options="[{name:'edit', fn:editRow},{name:'delete', fn:deleteRow}]">
      </vuetable>
    </section>
  </div>
</template>

<script>
  import CsvParse from 'csv-parse/lib/sync'
  import stringify from 'csv-stringify'
  import fs from 'fs'
  import Vuetable from './General/Table'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  var app = require('electron').remote;
  var dialog = app.dialog;

  export default {
    components: {
      Vuetable
    },
    data(){
      return {
        sheetName: '',
        searchQuery: '',
        usedGridColumns: ['Name']
      }
    },
      computed: {
        ...mapGetters([
          'rowsList',
          'rowsProperties'
        ])
      },
      methods: {
      addColumn: function(colName){
        this.addPropertyRow(colName);
      },
      editColumn: function(colNameNew, colNameOld){
        this.changePropertyRow([colNameNew, colNameOld]);
      },
      deleteColumn: function(colName, e){
        debugger;
        e.preventDefault();
        this.deletePropertyRow(colName);
      },
      xslFileLoad: function (event) {
        var files = event.target.files || event.dataTransfer.files;
        if (!files.length) return;
        fs.readFile(files[0].path, (err1, data) => {
            if (err1) {
               console.error(err1);
            } else {
               var pers = CsvParse(data, {columns: true, delimiter: ','});
               console.log(pers);
               this.sheetName = files[0].name;
               this.setRows(pers);
            }
        });
      },
      loadSheet: function(){
        document.getElementById("csvInput").click();
      },
      saveSheet: function(){
        dialog.showSaveDialog((fileName) => {
           if (fileName === undefined){
                console.log("You didn't save the file");
                return;
           }
           let objectsToSave = stringify([Object.keys(this.rowsList['0'])].concat(Object.keys(this.rowsList).map((k)=>{return Object.values(this.rowsList[k]);})), function(err, output){
             fs.writeFile(fileName, output, (err) => {
               if (err) throw err;
               console.log('It\'s saved!');
             })
           });
         });
      },
      editRow: function(row) {
       this.$router.push("/row-edit/" + row.id);
     }, addRow: function () {
       let row = {};
       this.rowsProperties.map(function functionName(prop) {
         row[prop] = '';
       })
       this.createRow(row);
       this.$router.push("/row-edit/" + (this.rowsList.length -1));
     }, ...mapActions([
         'deleteRow',
         'createRow',
         'setRows',
         'addPropertyRow',
         'changePropertyRow',
         'deletePropertyRow'
       ])
     },
    name: 'csv'
  }
</script>
