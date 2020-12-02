<template>
 <div>
        <div class="container my-5 ">  
            <div class="row justify-content-center">
                    <div class="col-6">
                            <div class="card mb-5 squared">
                                <div class="card-body text-white bg-dark">

                                    
                                    <div class="d-flex justify-content-between" id="registerWith"> 
                                        <h3 class="text-center text-white bg-dark">Registrate con:</h3>
                                        <ul class="list-unstyled list-inline text-center">
                                          
                                          <li class="list-inline-item">
                                            <a class="text-white btn-circle facebook mx-1">
                                              <i class="fab fa-facebook-f fa-lg"> </i>
                                            </a>
                                          </li>
                                          <li class="list-inline-item">
                                            <a class="text-white btn-circle twitter mx-1">
                                              <i class="fab fa-twitter fa-lg"> </i>
                                            </a>
                                          </li>
                                          <li class="list-inline-item">
                                            <a class="text-white btn-circle google mx-1">
                                              <i class="fab fa-google-plus-g fa-lg"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    <vs-divider>
                                           <p class="text-muted text-center">or</p>
                                    </vs-divider>
                                     <div class="form-gorup mb-3">
                                        <input type="primerNombre" name="" class="form-control text-white bg-dark border-warning squared" placeholder="Nombre" v-model="primerNombre">
                                    </div>
                                     <div class="form-gorup mb-3">
                                        <input type="apellido" name="" class="form-control text-white bg-dark border-warning squared" placeholder="Apellido" v-model="apellido">
                                    </div>
                                    <div class="form-gorup mb-3">
                                        <input type="email" name="" class="form-control text-white bg-dark border-warning squared" placeholder="Email" v-model="email">
                                    </div>
                                     <div class="form-gorup mb-3 squared">
                                        <input type="username" name="" class="form-control text-white bg-dark border-warning" placeholder="Username" v-model="username">
                                    </div>
                                    <div class="form-gorup mb-3">
                                        <input type="password" name="" class="form-control text-white bg-dark border-warning squared" placeholder="Contraseña" v-model="password1">
                                    </div>
                                    <div class="form-gorup mb-3">
                                        <input type="password" name="" class="form-control text-white bg-dark border-warning squared" placeholder="Repite la contraseña" v-model="password2">
                                    </div>
                                    <div class="d-flex justify-content-around">
                                      <button class="btn btn-warning align-center squared" v-on:click="login">Registrate</button>
                                      <router-link class="btn btn-outline-warning align-center squared" to="landing">Cancelar</router-link>
                                    </div>
                                    
                                    <br>
                                    <span> <router-link class="primario" to="login">Ya tengo Cuenta</router-link></span> <br>
                                    <!--span> <router-link to="landing">Cancelar</router-link></span-->
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


    name: 'registro',

    data(){
        return{

            email:"",
            password1:"",
            password2:"",
            primerNombre: "",
            apellido: "",
            username:"",
            mensaje: ""            
        }
    },
    methods : {
        login(){
            const credentials = {
                primerNombre: this.primerNombre,
                apellido: this.apellido,
                username: this.username,
                email: this.email,
                password: this.password1,
                courses:[]
            }
            axios.post('http://localhost:3000/api/usuarios', credentials).then(response => {
               console.log(response)
               this.$router.replace('login')
            })
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

    #registerWith{
  padding-bottom: 3px;
  margin-bottom: 10px;
  
}
</style>

