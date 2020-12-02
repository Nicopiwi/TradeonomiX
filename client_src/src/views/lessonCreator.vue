<template>
  <v-app id="inspire" dark>
    
    <v-toolbar >

     <h4 class="pull-center">Crear Lecciones </h4>
       
    </v-toolbar>
 
 <lessonCreator/>
       

       
  
  </v-app>
   
</template>

<script>
import lessonCreator from '../components/lessonCreatorForm'
export default {
    name: 'lessoncreator',
    components:{
        lessonCreator

    }
}
</script>

<style>

</style>
