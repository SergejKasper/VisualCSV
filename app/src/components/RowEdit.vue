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
    <section>
      <form novalidate @submit.stop.prevent="submit">
        <div v-for="(value, key) in row" v-if="key != 'id'" class="">
        <md-input-container>
          <label>{{key}}</label>
          <md-input v-model="row[key]"></md-input>
        </md-input-container>
        </div>
        <router-link to="/foo" tag="div"><md-button class="md-raised md-primary">Zurück</md-button></router-link>
      </form>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    components: {},
    watch: {
      '$route': 'fetchData'
    },
    methods: {
    },
    ready() {
      this.fetchData()
    },
      computed: {
      row: function(){
        return this.rowsList[this.$route.params.id];
      },
      ...mapGetters([
        'rowsList'
      ])
      },
      methods: mapActions([
        'deletePerson',
        'updatePerson'
      ]),
    name: 'row-page'
  }
</script>
