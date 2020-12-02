<template>
<v-app>


    <v-layout row>
        <v-flex xs4>

     
     <v-navigation-drawer
    class="grey darken-3"
    dark
    permanent
  >
    <v-list>
      <v-list-tile v-for="lesson in lessons">
       

        <v-list-tile-content>
          <v-list-tile-title>{{lesson.title}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

   </v-flex>
    <v-flex xs7>

        <h3>{{unitData.name}}</h3>
     <form>
               <v-text-field
   
      label="Nombre de la leccion"
        v-model="title"
        color="orange"
    ></v-text-field>
    <v-text-field
       v-model="videoURL"
      label="Link a video"
      color="orange"
    
    ></v-text-field>
             <v-textarea
           v-model="body"
          label="Cuerpo de la leccion"
          color="orange"
          
         
        ></v-textarea>
          <v-textarea
           v-model="codesnipet"
          label="Snipets de codigo"
          color="orange"
          
         
        ></v-textarea>
        <v-btn flat color="orange" v-on:click="addLesson()">
            Crear Leccion 
        </v-btn>
          </form>
            </v-flex>
            </v-layout>
          
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
    name: 'lessonCreator',
    data () {
        return {
            unitData:[],
            title:'',
            body:'',
            codesnipet:'',
            videoURL:'',
            lessons:[]

        }
    },
    mounted() {
        this.getUnitData()
    },
    methods:{
        getUnitData(){
            axios.get('http://localhost:3000/api/units/'+this.$route.params.id+'?access_token=' + sessionStorage.getItem('accToken')).then(response => {
                this.unitData = response.data
                console.log(response.data)
                this.lessons = response.data.lessons
            })
        },
        addLesson(){
            const lesson = {
                title: this.title,
                body: this.body,
                codesnipet: this.codesnipet,
                videoURL: this.videoURL
            }
            this.unitData.lessons.push(lesson)
            axios.patch('http://localhost:3000/api/units/'+this.$route.params.id+'?access_token=' + sessionStorage.getItem('accToken'), this.unitData).then(response =>{
                this.getUnitData()
            })

        }

    }

}
</script>

<style>

</style>
