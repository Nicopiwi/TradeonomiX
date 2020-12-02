
<template>



  
  <v-hover> 
    <v-container slot-scope="{ hover }">
      <v-layout align-center justify-center row fill-height >
<v-flex xs5>
    <v-card  v-for="unit in units" class="mx-auto" color="grey lighten-4" max-width="800">
      <v-img
        :aspect-ratio="16/9"
        src="https://i.ytimg.com/vi/-MKapbz0GIo/maxresdefault.jpg"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out grey darken-4 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >
            <v-btn flat v-bind:to="{ name: 'lesson', params: {id: unit.id}}">{{unit.name}}</v-btn>
          </div>
        </v-expand-transition>
      </v-img>
      
    </v-card>
</v-flex>
      </v-layout>
    </v-container>
  </v-hover>

</template>
<script>
  import axios from 'axios'
  export default {
      name:'coursesidebar',
    data () {
      return {
        courseData:[],
        units:[],
        lessons:[]
      }
    },
    created(){
        this.getCourseinfo()
    },
    methods:{
         getCourseinfo(){
            axios.get('http://localhost:3000/api/courses/'+this.$route.params.id).then(response => {
                this.courseData = response.data
                axios.get('http://localhost:3000/api/courses/' + this.$route.params.id +'/units').then(response =>{
                    this.units = response.data
                    sessionStorage.setItem('cursoId' , this.$route.params.id)
                }) 
            },)
        }
    }
  }
</script>


<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>