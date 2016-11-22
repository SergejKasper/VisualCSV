<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>

<template>
  <div>
    <img src="./Persons/assets/logo.png" alt="electron-vue">
    <h1>Welcome.</h1>
    <br/>
    <section>
      <form novalidate @submit.stop.prevent="submit">
        <div v-for="(value, key) in person" v-if="key != 'id'" class="">
        <md-input-container>
          <label>{{key}}</label>
          <md-input v-model="person[key]"></md-input>
        </md-input-container>
        </div>
      </form>
      <router-link to="/foo" tag="div"><md-button class="md-raised md-primary">Zurück</md-button></router-link>
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
    data(){
      return {
        person: {}
      }
    },
    ready() {
      this.fetchData()
    },
      computed: {
      person: function(){
        return this.personsList[this.$route.params.id];
      },
      ...mapGetters([
        'personsList'
      ])
      },
      methods: mapActions([
        'deletePerson',
        'updatePerson'
      ]),
    name: 'person-page'
  }
</script>
