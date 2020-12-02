<template>
  <div class="pull-center">
 <div class="headline">Catalogo de cursos</div>
 <br>
  
  <v-layout row>
      
     <br>
    <v-flex v-for="course in courses"  sm3>
      <v-card>
        <v-img
         v-bind:src="course.courseImg"
          height="200px"
        >
        </v-img>
       

        <v-card-title primary-title>
          <div>
            <div class="headline">{{course.title}}</div>
            <div class="grey--text">Por : {{course.author}}</div>
            <span class="grey--text">{{course.Description}}</span>
          </div>
        </v-card-title>

        <v-card-actions>
         
           <v-btn color="orange lighten-1" dark v-on:click="enrollInCourse(course)">Anotate</v-btn>
        </v-card-actions>

      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'catalog',
    data(){
        return{
            courses:[],
            userData:[]
        }
    },
    mounted () {
         axios.get('http://localhost:3000/api/courses?access_token=' + sessionStorage.getItem('accToken')).then(response =>{
                this.courses =  response.data
            }) ,
            this.getUserData()
    
    },
    methods: {
      getUserData(){
        axios.get('http://localhost:3000/api/usuarios/'+ sessionStorage.getItem('userId')+'?access_token=' + sessionStorage.getItem('accToken')).then(response => {
          this.userData = response.data
        })
      } ,
     
      enrollInCourse(course){
        const courseData = {
           title : course.title ,
           IDcurso : course.id ,
           author: course.author,
           progress: 0

        }
        
         this.userData.courses.push(courseData)
         const updateData = {
          courses : this.userData.courses

        }
        axios.patch('http://localhost:3000/api/usuarios/'+ sessionStorage.getItem('userId')+'?access_token=' + sessionStorage.getItem('accToken'), updateData).then(
           this.$router.replace('/course/' + course.id)
        ) 
      }
    }
   

}
</script>

<style>

</style>
