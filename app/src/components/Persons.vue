<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>

<template>
  <div>
    <img src="./Persons/assets/logo.png" alt="electron-vue">
    <br/>
    <br/>
    <!-- md-input type="text" name="name" value=""></md-input -->

    <md-button class="md-raised md-primary" v-on:click.native="loadSheet()">Datei laden</md-button>
    <md-button class="md-raised md-primary" v-on:click.native="saveSheet()" v-if="Object.keys(personsList).length !== 0">Datei speichern</md-button>
    <input id="csvInput" type="file" v-on:change="xslFileLoad" hidden>
    <div class="field-group">
      <!-- md-input-container>
        <label for="usedGridColumns">Spalten</label>
        <md-select  v-md-theme="'default'" name="usedGridColumns" id="usedGridColumns" multiple v-model="usedGridColumns">
          <md-option v-for="col in personsProperties" :value="col"> {{col}} </md-option>
        </md-select>
      </md-input-container -->
    </div>
    <br/>
    <section>
      <vuetable v-if="Object.keys(personsList).length !== 0"
        :sheet-name="sheetName"
        :data="personsList"
        :columns="personsProperties"
        :filter-key="searchQuery"
        :column-options="{addColumn: addColumn, editColumn: editColumn, deleteColumn: deleteColumn, addRow: addRow}"
        :button-options="[{name:'edit', fn:editPerson},{name:'delete', fn:deletePerson}]">
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
          'personsList',
          'personsProperties'
        ])
      },
      methods: {
      addColumn: function(colName){
        this.addPropertyPerson(colName);
      },
      editColumn: function(colNameNew, colNameOld){
        this.changePropertyPerson([colNameNew, colNameOld]);
      },
      deleteColumn: function(colName){
        this.deletePropertyPerson(colName);
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
               this.setPersons(pers);
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
           let objectsToSave = stringify([Object.keys(this.personsList['0'])].concat(Object.keys(this.personsList).map((k)=>{return Object.values(this.personsList[k]);})), function(err, output){
             fs.writeFile(fileName, output, (err) => {
               if (err) throw err;
               console.log('It\'s saved!');
             })
           });
         });
      },
      editPerson: function(person) {
       this.$router.push("/person/" + person.id);
     }, addRow: function () {
       let person = {};
       this.personsProperties.map(function functionName(prop) {
         person[prop] = '';
       })
       this.createPerson(person);
       this.$router.push("/person/" + (this.personsList.length -1));
     }, ...mapActions([
         'deletePerson',
         'createPerson',
         'updatePerson',
         'setPersons',
         'addPropertyPerson',
         'changePropertyPerson',
         'deletePropertyPerson'
       ])
     },
    name: 'landing-page'
  }
</script>
