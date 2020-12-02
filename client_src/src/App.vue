<template>
  <div id="app">
   <router-view/>
   
  </div>
</template>

<style>
  body{
      background-color: #343a40;
      

  }

  body::-webkit-scrollbar
{
  display:block;
}
.application{
  height:100vh;
  overflow-y: hidden;
}
  .squared{
	border-radius:0px!important;
  }
.primario{
	color:#2fbdbd!important;
}
.primario:hover{
	text-decoration: none!important;
	color:#2fbdbd!important;
}
.texto-resaltado{
  color: #2fbdbd; 
}
</style>