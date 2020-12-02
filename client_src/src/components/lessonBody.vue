<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
     
      
      <v-flex xs6 left>
    
       <v-card >
        <v-toolbar color="amber accent-3" dark>
        

          <v-toolbar-title>{{unit.name}}</v-toolbar-title>

          <v-spacer></v-spacer>


         
        </v-toolbar>

        <v-list two-line>
          <template>
            <v-list-tile v-for="lesson in unit.lessons">
              <v-list-tile-content>
                   <v-btn flat v-on:click="selectLesson(lesson)">{{lesson.title}}</v-btn>
                <v-list-tile-sub-title class="text--primary"></v-list-tile-sub-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>

             

            </v-list-tile>
            <v-btn v-on:click="goToUnit()" color="green">Pasar a la siguiente unidad</v-btn>
          </template>
        </v-list>
      </v-card>
      </v-flex>
           
      <v-flex xs5>
          <h3>{{leccion.title}}</h3>
          <p>{{leccion.body}}</p>
          <youtube v-if="leccion.videoURL !=''" :video-id="videoId"></youtube>
            <pre v-if="leccion.codesnipet!=''" class="language-js">
  <code>
   {{leccion.codesnipet}}
  </code>
</pre>
      </v-flex>
           
     
      
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import VuePrism from 'vue-prism'
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'
export default {
        name:'lessonBody',
        data () {
            return {
                unit:[],
                leccion:[]
            }
        },
        mounted () {
            this.getData()
         
        },
        methods:{
            getData(){
                axios.get('http://localhost:3000/api/units/' + this.$route.params.id ).then(Response =>{
                    this.unit = Response.data
                })
            },
            selectLesson(lesson){
                this.leccion = lesson
               this.videoId = this.$youtube.getIdFromURL(this.leccion.videoURL)
               this.startTime = this.$youtube.getTimeFromURL(this.leccion.videoURL)


            },
            goToUnit(){
                  this.$router.replace('/course/' + sessionStorage.getItem('cursoId'))
            }
        }
}
</script>

<style>

</style>
