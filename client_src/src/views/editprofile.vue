<template>
  <v-app id="inspire" dark>
  

        <v-container
        fluid
        grid-list-md
      >
        <v-layout  align-center justify-center row >
           <v-flex xs5 >
                <form>
    <v-text-field
      v-validate="'required|max:30'"
      v-model="Nombre"
      :counter="10"
      :error-messages="errors.collect('Nombre')"
      label="Nombre"
      data-vv-Nombre="Nombre"
      required
    ></v-text-field>
     <v-text-field
      v-validate="'required|max:30'"
      v-model="Apellido"
      :counter="10"
      :error-messages="errors.collect('Apellido')"
      label="Apellido"
      data-vv-name="Apellido"
      required
    ></v-text-field>
     <v-text-field
      v-validate="'required|max:30'"
      v-model="username"
      :counter="10"
      :error-messages="errors.collect('username')"
      label="Username"
      data-vv-name="username"
      required
    ></v-text-field>
    <v-text-field
      v-validate="'required|email'"
      v-model="email"
      :error-messages="errors.collect('email')"
      label="E-mail"
      data-vv-name="email"
      required
    ></v-text-field>
  


    <v-btn @click="submit">Aceptar cambios</v-btn>
    
  </form>
          </v-flex>
        </v-layout>
      </v-container>
   


  
  </v-app>
</template>

<script>
import axios from 'axios'
  import Vue from 'vue'
import VeeValidate from 'vee-validate'

  Vue.use(VeeValidate)
export default {
     $_veeValidate: {
      validator: 'new'
    },

    Nombre:'editprofile',
       data: () => ({
      drawer: true,
       datosUsuarios:[],
       Nombre: '',
       Apellido:'',
       username:'',

      email: '',


      dictionary: {
        attributes: {
          email: 'E-mail'
          // custom attributes
        },
        custom: {
          Nombre: {
            required: () => 'Nombre can not be empty',
            max: 'The Nombre field may not be greater than 10 characters'
            // custom messages
          },
          select: {
            required: 'Select field is required'
          }
        }
      }

    }),
    props: {
      source: String
    },
    mounted () {
        this.getUserData()
        this.$validator.localize('en', this.dictionary)
    },
   methods: {
        getUserData(){
              axios.get('http://localhost:3000/api/usuarios/' + sessionStorage.getItem('userId') +'?access_token=' + sessionStorage.getItem('accToken')).then(response =>{
                
                   console.log(response.data)
                  this.datosUsuarios = response.data
                  this.email = this.datosUsuarios.email
                  this.Nombre = this.datosUsuarios.primerNombre
                  this.Apellido = this.datosUsuarios.apellido
                  this.username = this.datosUsuarios.username
                

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
         } ,
         submit () {
        const updateData ={
          email: this.email,
          primerNombre: this.Nombre,
          apellido: this.Apellido,
          username: this.username
        }
        
        axios.patch('http://localhost:3000/api/usuarios/'+ sessionStorage.getItem('userId')+'?access_token='+ sessionStorage.getItem('accToken'), updateData).then(response =>{
            this.$router.replace('/dashboard')
        }) 
      },

      
   }

}
</script>

<style>

</style>
