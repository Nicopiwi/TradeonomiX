<template>
  <v-app id="inspire" dark class="dashboard">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      temporary
      dark
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
        <v-list-tile @click="" to="/settings">
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
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>TradedonomiX</v-toolbar-title>
    </v-toolbar>
   
      
    <div class="row" style="margin-top:75px">
      <div class="col-md-7 col-lg-7 col-xl-7 col-sm-12 col-xs-12">
      <gamedash/>
    </div>
      <div class="col-md-5 col-lg-5 col-xl-5 hidden-sm hidden-xs">
      <news/>
      </div>
      
    </div>


       
  
  </v-app>
</template>

<script>
import axios from 'axios'
import news from '../components/news'
import gamedash from '../components/gamedashboard'
import sidenav from '../components/sidenav'
export default {
 name: 'Dashboard',
 components: {
        news ,
        gamedash,
        sidenav
    },
      data: () => ({
      drawer: false,
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


<style scoped>
.v-toolbar{

  border-bottom: 3px black solid;
}
.dashboard{
  overflow-x:hidden;
}
#logout{
  position: fixed;
}
.v-navigation-drawer a:hover{
  color:#2fbdbd!important;
}
.v-navigation-drawer .v-list__tile a:hover{
    color:#2fbdbd!important;
    text-decoration: none;

}
.v-navigation-drawer .v-list__tile--active{
    border-right:5px solid #2fbdbd!important;
}
</style>
