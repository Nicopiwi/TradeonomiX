<template>
     <div class="pull-center">
 <div class="headline">Mis cursos</div>
 <br>
  
  <v-layout row>
      
     <br>
    <v-flex v-for="course in courses"  sm3>
      <v-card>
      
       

        <v-card-title primary-title>
          <div>
            <div class="headline">{{course.title}}</div>
            <div class="grey--text">Por : {{course.author}}</div>
              <div><v-chip color="red" text-color="white">Progreso: {{course.progress}}%</v-chip></div>
        
          </div>
        </v-card-title>

        <v-card-actions>
         
           <router-link  v-bind:to="{ name: 'coursemain', params: {id: course.IDcurso}}"><v-btn color="orange lighten-1" dark>Continuar</v-btn></router-link>
        </v-card-actions>

      </v-card>
    </v-flex>
  </v-layout>
  </div>
    
</template>

<script>
import axios from 'axios'
export default {
    name:'mycourses',
    data(){
        return{
            userData:[],
            courses:[]

        }
    },
    created() {
        this.getUserData()
    
    },
    methods: {
        getUserData(){
        axios.get('http://localhost:3000/api/usuarios/'+ sessionStorage.getItem('userId')+'?access_token=' + sessionStorage.getItem('accToken')).then(response => {
          this.userData = response.data
          this.courses = response.data.courses
          

        })
      } ,
     
        
    }
}
</script>

<style>

</style>
