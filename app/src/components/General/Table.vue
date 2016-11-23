<style>
/*table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
  margin: auto;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: auto;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

.md-button-c2a > .md-input-container {
  display: inline-block;
  min-width: 50px;
}*/
.md-menu-col{
  min-width: 50%;
}
.md-table .md-table-head-text{
  overflow: visible;
}
.md-table-edit {
  min-width: 50px;
}
</style>
<template>
<md-table-card>
  <md-toolbar>
    <h1 class="md-title" v-text="sheetName"></h1>
    <md-menu md-size="5">
      <md-button class="md-icon-button" md-menu-trigger>
        <md-icon>filter_list</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item v-for="col in columns">
          <div class="md-menu-col">
            <md-checkbox :id="'toggle-' +  col" name="my-test1" v-model="colVisible[col]">{{col}}</md-checkbox>
          </div>
          <md-button class="md-fab md-primary md-mini" @click="columnOptions.deleteColumn(col)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-menu-item>
        <md-menu-item disabled>
          <md-input-container>
            <md-input class="md-raised md-primary" v-model="colName" placeholder="Neue Spalte"></md-input>
          </md-input-container>
          <md-button class="md-fab md-primary md-mini" @click="columnOptions.addColumn(colName)">
            <md-icon>add</md-icon>
          </md-button>
        </md-menu-item>
      </md-menu-content>
    </md-menu>

    <md-input-container md-inline>
      <md-input  v-model="filterKey" placeholder="Suchfilter"></md-input>
    </md-input-container>
  </md-toolbar>
  <md-table @sort="sortBy">
      <md-table-header>
        <md-table-row>
          <md-table-head v-for="(value, key) in visibleColumns" :md-sort-by="value">

            <md-table-edit
            :md-name="'comment' + key"
            :md-id="'comment' + key"
            :md-placeholder="value"
            md-maxlength="12"
            v-on:input="columnOptions.editColumn($event, value)">{{ value | capitalize }}</md-table-edit>
          </md-table-head>
          <!-- th v-for="key in columns"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }">
            {{ key | capitalize }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th -->
          <md-table-head>
          </md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="entry in filteredData">
          <md-table-cell v-for="key in visibleColumns">
            {{entry[key]}}
          </md-table-cell>
          <md-table-cell>
            <md-button  v-for="c2a in buttonOptions" class="md-icon-button" @click="c2a.fn(entry)"><md-icon>{{c2a.name}}</md-icon></md-button>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </md-table-card>
</template>

<script>

  export default {
    replace: true,
    props: {
      data: Array,
      columns: Array,
      buttonOptions: Array,
      columnOptions: Object,
      sheetName: String
    },
    data: function () {
      var sortOrders = {}
      var colVisible = {}
      this.columns.forEach(function (key) {
        sortOrders[key] = 1
      })
      this.columns.forEach(function (key) {
        colVisible[key] = true
      })
      return {
        sortKey: '',
        sortOrders: sortOrders,
        colName: '',
        colVisible: colVisible,
        filterKey: ''
      }
    },
    computed: {
      visibleColumns: function() {
        var cols = this.columns;
        var visibles = this.colVisible;
        return cols.filter((col) => {
          if(typeof visibles[col] === 'undefined' ) this.$set(this.colVisible, col, true);
          return visibles[col];
        })
      },
      filteredData: function () {
        var sortKey = this.sortKey
        var filterKey = this.filterKey && this.filterKey.toLowerCase()
        var order = this.sortOrders[sortKey] || 1
        var data = this.data
        if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      }
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    methods: {
      sortBy: function (sort) {
        this.sortKey = sort.name
        if(typeof this.sortOrders[sort.name] === 'undefined') this.$set(this.sortOrders, sort.name, -1);
        this.sortOrders[sort.name] = this.sortOrders[sort.name] * -1
      }
    }
  }
</script>
