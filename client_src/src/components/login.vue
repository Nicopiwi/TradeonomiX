<template>
    <div>
        <div class="container my-5">  
            <div  class="row justify-content-center">
                
                    <div class="col-6">
                         <v-alert :value="alert" color="deep-orange darken-1" type="warning">This is a warning alert. </v-alert>
                            <div class="card mb-5">
                                    
                                <div class="card-body text-white bg-dark">
                                       <div class="d-flex justify-content-between" id="registerWith"> 
                                           
                                        <p class="text-muted" style="font-weight:700;">Entra con: </p>
                                        <ul class="list-unstyled list-inline text-center">
                                          
                                          <li class="list-inline-item">
                                            <button class="text-white btn-circle mx-1 facebook">
                                              <i class="fab fa-facebook-f fa-lg"> </i>
                                            </button>
                                          </li>
                                          <li class="list-inline-item">
                                            <button class="text-white btn-circle mx-1 twitter">
                                              <i class="fab fa-twitter fa-lg"> </i>
                                            </button>
                                          </li>
                                          <li class="list-inline-item">
                                            <button class="text-white btn-circle mx-1 google">
                                              <i class="fab fa-google-plus-g fa-lg"></i>
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                      <vs-divider>
                                           <p class="text-muted text-center">or</p>
                                    </vs-divider>
                                      
                                    <h3 class="text-center text-white bg-dark">Iniciar Sesión </h3>
                                    <div class="form-gorup mb-3">
                                        <input type="email" v-on:submit="login" name="" class="form-control text-white bg-dark border-warning squared" placeholder="Email" v-model="email">
                                    </div>
                                    <div class="form-gorup mb-3">
                                        <input type="password" v-on:submit="login" name="" class="form-control text-white bg-dark border-warning squared" placeholder="Contraseña" v-model="password">
                                    </div>
                                    <v-alert
                                      :value="error"
                                      type="error"
                                      icon="error"
                                    >
                                      Email o contraseña incorrectos
                                    </v-alert>
                                    <button class="btn btn.lg btn-warning align-center squared" v-on:click="login">Iniciar Sesión</button>
                                    <br>
                                    <span class="text-white bg-dark">Si no tenés cuenta registrate  <router-link class="primario" to="registro">Aca</router-link></span>
                                    <br>
                                     
                                </div>
                            </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'login' ,
    data () {
        return {
            email:"",
            password:"",
            token: sessionStorage.getItem('accToken'),
            alert: false,
            error: false
        }
    },


    methods: {
        login(){
            const credentials = {
                email: this.email,
                password: this.password
            }
            
          
                axios.post('http://localhost:3000/api/usuarios/login', credentials).then(response => {
                    console.log('hola');
               
                
                 
                
                this.token = response.data.id
                this.usuarioID = response.data.userId
                sessionStorage.setItem('userId' , this.usuarioID),
                sessionStorage.setItem('accToken' , this.token),
                this.$router.replace('/dashboard')
                
               
                    })
                .catch(e => {
                    this.error = true;
                    this.password = "";
                })
            }
            
            
            
            
        },
        watch: {
            password: function(newVal, oldVal) {
                if (newVal != ''){
                    console.log(oldVal);
                    console.log(newVal);
                    this.error=false;
                }
            
        }
    }
}
</script>

<style>


.facebook{
    background-color: #3B5998;
} 
.twitter{
    background-color: #00aced;
}
.google{
    background-color: #db3236;
}
.vs-divider-text{
    background-color: transparent!important;
}
#registerWith{
  padding-bottom: 3px;
  margin-bottom: 10px;
  
}
</style>
