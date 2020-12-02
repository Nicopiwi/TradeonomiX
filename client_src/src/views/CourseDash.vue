<template>
 <v-app id="inspire" dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list >
           <v-toolbar flat class="warning">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="http://www.allfinancialservices.net/wp-content/uploads/2014/01/user_icon.png">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{datosUsuarios.primerNombre}} {{datosUsuarios.apellido}}</v-list-tile-title>
              <v-list-tile-title>@{{datosUsuarios.username}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

        <v-list-tile @click="" to="/dashboard">
          <v-list-tile-action >
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="" to="/settings"q>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Ajustes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="" to="/courses">
          <v-list-tile-action>
            <v-icon>book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>courses</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile to="" v-on:click="logout()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>TradedonomiX</v-toolbar-title>
       
    </v-toolbar>
      <v-btn flat v-if="datosUsuarios.CreatorStatus != false" to="/coursecreator">
        crear un curso
        <v-icon>create</v-icon>
      </v-btn>
    <mycourses/>
    <catalog/>
    <br>
    <br>
    <br>
       
    <v-footer app fixed>
      <span>TradedonomiX&copy; 2018 , all courses are powered by gutenberg.eth </span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
import sidenav from '../components/sidenav'
import catalog from '../components/courseCatalog'
import mycourses from '../components/myCourses'
export default {
    name: 'CourseDashboard' ,
    
     components: {
        
        sidenav,
        catalog,
        mycourses
    },
    data: () => ({
      drawer: true,
       datosUsuarios:[],

    }),
    props: {
      source: String
    },
    mounted () {
        this.getUserData()
    },
   methods: {
        getUserData(){
              axios.get('http://localhost:3000/api/usuarios/' + sessionStorage.getItem('userId') +'?access_token=' + sessionStorage.getItem('accToken')).then(response =>{
                
                   console.log(response.data)
                  this.datosUsuarios = response.data
               })
         },
       logout(active){
           axios.post('http://localhost:3000/api/usuarios/logout?access_token=' + sessionStorage.getItem("accToken")).then(response =>{
            this.active = false;
            sessionStorage.clear("accToken");
            sessionStorage.clear("userId");
            active = false;
             this.$router.replace('/landing')
             window.reload();
           })
         } 
   }

}
</script>

<style>

</style>
