<template>
    <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
        <v-container>
       
      <v-card>
        

       

        <v-card-actions>
          
          <v-btn @click="show = !show" :disabled=disabled >
            <p>{{cursoInfo}}</p>    
          </v-btn>
        
         <v-spacer></v-spacer>
             <v-dialog v-model="dialog" persistent max-width="500px" :disabled=disbableUnits >
      <v-btn  slot="activator" :disabled=disbableUnits flat dark ><v-icon >
          library_add
          </v-icon></v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Crear unidad</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
           
              
              
              <v-flex xs12>
                <v-text-field label="Nombre de la unidad" required v-model="unitName"></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-textarea v-model="unitDescription"
          name="input-7-1"
          label="Descripcion de la unidad"
         
        ></v-textarea>
              </v-flex>
              
           
            </v-layout>
          </v-container>
         
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="orange" flat @click.native="dialog = false" v-on:click="addUnits()">Guardar unidad</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-card-actions>

        <v-slide-y-transition>
          <form v-show="show">
               <v-text-field
   
      label="Nombre del curso"
        v-model="title"
        color="orange"
    ></v-text-field>
    <v-text-field
        v-model="imgUrl"
      label="Link a imagen de portada"
      color="orange"
    
    ></v-text-field>
             <v-textarea
            v-model="description"
          label="Descripcion del curso"
          color="orange"
          
         
        ></v-textarea>
        <v-btn flat color="orange" v-on:click="createCourse()">
            Crear Curso 
        </v-btn>
          </form>
        </v-slide-y-transition>
      </v-card>
           
        </v-container>
       <v-container>
           <v-flex sm6>
               <v-row>

               
        
            <v-card color="grey darken-3" class="white--text" v-for="unit in units">
              <v-card-title primary-title>
                <div class="headline">{{unit.name}}</div>
                <div class="headline" > {{unit.Description}}</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark  v-bind:to="{ name: 'lessoncreator', params: {id: unit.id }}">Agregar lecciones</v-btn>
                  
              </v-card-actions>
              <v-card-actions>
                    <v-btn flat color="red" dark>Eliminar unidad</v-btn>
              </v-card-actions>
            </v-card>
            </v-row>
          </v-flex>
       </v-container>
    </v-flex>
    
    
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    name: 'courseForm',
    data () {
        return {
             show: false,
             datosUsuarios:[],
              title: '',
              description:'',
              imgUrl: '',
              disabled: false, 
              disbableUnits: true,
              cursoInfo:'Agregar curso',
              units: [],
               dialog: false,
               unitName: '',
               unitDescription:''
        }
    } ,
    mounted () {
        axios.get('http://localhost:3000/api/usuarios/' + sessionStorage.getItem('userId') +'?access_token=' + sessionStorage.getItem('accToken')).then(response =>{
                
                   
                  this.datosUsuarios = response.data
               })
               this.getUnits()
              
              
    },
    methods: {
        createCourse(){
            const CourseData = {
                title: this.title,
                Description: this.description,
                courseImg : this.imgUrl,
                author: this.datosUsuarios.primerNombre + ' ' +  this.datosUsuarios.apellido ,
                usuarioId : this.datosUsuarios.id
            }
            axios.post('http://localhost:3000/api/courses?access_token=' + sessionStorage.getItem('accToken') , CourseData).then(response => {
                sessionStorage.setItem('courseIdCreate' , response.data.id)
                this.disabled = true
                this.cursoInfo = 'curso ya creado'
                this.show = false,
                this.disbableUnits = false
            })
        },
        getUnits(){
            axios.get('http://localhost:3000/api/courses/'+ sessionStorage.getItem('courseIdCreate')+'/units?access_token=' + sessionStorage.getItem('accToken')).then(response => {
                this.units = response.data
            })
        },
        addUnits(){
            const unitData = {
                name: this.unitName,
                description: this.unitDescription,
                courseId: sessionStorage.getItem('courseIdCreate'),
                lessons: [{}]
            }
            axios.post('http://localhost:3000/api/units',unitData).then(response =>{
              this.getUnits()
            })
        }
         
    }

}
</script>

<style>

</style>
