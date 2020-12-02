<template>
     <v-app id="inspire" dark>
    
    <v-toolbar >

     <h4 class="pull-center">Crear curso </h4>
       
    </v-toolbar>
 

        <courseForm/>

       
  
  </v-app>
</template>

<script>
import courseForm from '../components/createCourseForm'

export default {

name: 'coursecreator' ,
 components: {
     courseForm
     
    },
data: () => ({
      drawer: true

    }),
    
}
</script>

<style>

</style>
