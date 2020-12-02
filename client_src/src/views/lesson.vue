<template>
  <v-app id="inspire" dark>
  
      

    <v-toolbar app fixed clipped-left>
      
      <v-toolbar-title>TradedonomiX</v-toolbar-title>
    </v-toolbar>
        <br>
        <br>
        <br>
       <lessonBody xs12 sm5 md5 offset-xs0 offset-lg2 />
    <v-footer app fixed>
      <span>TradedonomiX&copy; 2018 , all courses are powered by gutenberg.eth </span>
    </v-footer>
  </v-app>
</template>

<script>
import lessonBody from '../components/lessonBody'
import axios from 'axios'
export default {
    
    name: 'cousemain',
    components:{
        lessonBody
        
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
