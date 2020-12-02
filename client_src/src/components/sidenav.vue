<template lang="html">

  <div id="parentx">

    <vs-button @click.stop="active=!active" vs-color="grey" vs-type="filled"><i class="fas fa-bars"></i></vs-button>
    <vs-sidebar parent="body" default-index="1"  color="warning" class="sidebarx " spacer v-model="active">

      <div class="header-sidebar" slot="header">
        <vs-avatar  size="70px" src="http://www.bakhtar.edu.af/CMS-Content/User%20Place%20HOlder.png"/>

        <h4>
          {{datosUsuarios.primerNombre}} {{datosUsuarios.apellido}}

          
        </h4>
        <span> @{{datosUsuarios.username}}</span>

      </div>
      <vs-sidebar-item index="1" icon="home">
         <router-link @click="hideNav()" to="dashboard">Home</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item index="2" icon="settings">
        Configuración
      </vs-sidebar-item>
      <vs-sidebar-item index="3" icon="collections_bookmark">
        <router-link to="courses" @click="hideNav()" >Cursos</router-link>
      </vs-sidebar-item>
      

      
    
     

      <div class="footer-sidebar text-center" slot="footer">
        <vs-button vs-icon="reply" vs-color="danger" vs-type="flat" v-on:click="logout()" @click.stop="active=!active" >Log out</vs-button>
  
      </div>

    </vs-sidebar>
  </div>

</template>

<script>
import axios from 'axios'
export default {
    name: 'sidenav',
  data:()=>({
    active:false,
    datosUsuarios:[],
    avatar:''
  }),
  mounted(){
this.getUserData()
  },
  methods:{
         getUserData(){
              axios.get('http://localhost:3000/api/usuarios/' + sessionStorage.getItem('userId') +'?access_token=' + sessionStorage.getItem('accToken')).then(response =>{
                
                   console.log(response.data)
                  this.datosUsuarios = response.data
               })
         },
         hideNav(active){
           active = false;
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

<style lang="stylus">
.header-sidebar
  display flex
  align-items center
  justify-content center
  flex-direction column
  width 100%
  h4
    display flex
    align-items center
    justify-content center
    width 100%
    > button
      margin-left 10px
.footer-sidebar
  display flex
  align-items center
  justify-content space-between
  width 100%
  > button
      border 0px solid rgba(0,0,0,0) !important
      border-left 1px solid rgba(0,0,0,.07) !important
      border-radius 0px !important
</style>