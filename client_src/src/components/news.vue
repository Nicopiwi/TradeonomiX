<template>

      <div class="col-md-5 col-sm-5 col-lg-5 col-xl-5 col-xs-12 pull-right hidden-xs main-div mr-0">
      <nav class="navbar nav-news mr-0 ml-0">
  <div class="input-group col-md-12">
                    <span class="input-group-btn">
                        <button v-on:click="getNews(tema, query)" class="btn btn-md border-none text-white" type="button">
                            <i class="fa fa-search"></i>
                        </button>
                    </span>
                    <input v-model="query" type="search" v-on:keyup.enter="getNews(tema, query)" class="form-control input-sm" placeholder="Busca noticias" />
                    
                        
                        
                        
                      <b-btn v-b-toggle.collapse-search> <i class="fa fa-sliders" aria-hidden="true"></i></b-btn>
                        
                    
                </div>
</nav>
            <div id="">
              <b-collapse id="collapse-search" class="container">
                          <h4 class="text-white ml-3">Categoria: </h4>
                          
                          <div class="d-flex justify-content-around">
                            
                            <!--Falta botones-->
                            <button class="btn btn-outline-warning boton-categoria m-1" :class="{selected: temas.crypto.value}"  @click="setTopic(temas.crypto.msg); selectCrypto()">
                              <h1><i class="fab fa-bitcoin fa-2x"></i></h1>
                              <p>Crypto</p>
                            </button>

                            <button class="btn btn-outline-warning boton-categoria m-1" :class="{selected: temas.stocks.value}" @click="setTopic(temas.stocks.msg); selectStocks();">
                              <h1><i class="fas fa-chart-line fa-2x"></i></h1>
                              <p>Stocks</p>
                            </button>
                            <button class="btn btn-outline-warning boton-categoria m-1" :class="{selected: temas.commerce.value}"  @click="setTopic(temas.commerce.msg); selectCommerce();">
                              <h1><i class="fas fa-handshake fa-2x"></i></h1>
                              <p>Comercio</p>
                            </button>
                          </div>
                          <div class="d-flex justify-content-around">
                            <button class="btn btn-outline-warning boton-categoria m-1" :class="{selected: temas.techno.value}"  @click="setTopic(temas.techno.msg); selectTechno();">
                              <h1><i class="fas fa-microchip fa-2x"></i></h1>
                              <p>Tecnología</p>
                            </button>
                            <button class="btn btn-md btn-outline-warning boton-categoria m-1" :class="{selected: temas.forex.value}" @click="setTopic(temas.forex.msg); selectForex();">
                              <h1><i class="fas fa-dollar-sign fa-2x"></i></h1>
                              <p>Forex</p>
                            </button>
                            <button class="btn btn-md btn-outline-warning boton-categoria m-1" :class="{selected: temas.noFilter.value}" @click="setTopic(temas.noFilter.msg); selectNoFilter();">
                              <h1><i class="fas fa-times fa-2x"></i></h1>
                              <p>Sin filtro</p>
                            </button>
                          </div>

                             
                        </b-collapse>

       
          
               <li v-for="noticia in noticias" class="card col-md-12 news">
                    <div class="card-header row noticia">
                        <img class="card-img col-3" :src="noticia.urlToImage" alt="Image">
                        <h5 class="card-title col-9 text-white">{{noticia.title}}</h5>
                    </div>
                    
                    <div class="card-body noticia">
                        
                        <p class="card-text text-white">{{noticia.description}}</p>
                     </div>
                     <div class="card-footer noticia">
                      <em><small class="text-muted">Fuente: <a target="_blank" rel="noopener noreferrer" class="text-muted" :href="noticia.url">{{noticia.url}}</a></small></em>
                    </div>
               </li>
           
            </div>
            <br>
           
             
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'news' ,
    data () {
        return {
            tema:'',
            query:'',
            temas:{
              crypto: {msg:'crypto',value:false},
              stocks: {msg:'bolsa',value:false},
              commerce: {msg:'comercio',value:false},
              techno: {msg:'tecnologia',value:false},
              forex: {msg:'mercado de divisas',value:false},
              noFilter: {msg:'comercio bolsa criptomonedas',value:true},
            },
            
            idioma:'spanish',
            numberOfResults: 20,
            sortBy: 'popularity',
            noticias:[],
        }
    },
    methods:{
         getNews(tema, query){
             axios.get('https://newsapi.org/v2/everything?q=('+query+' OR '+tema+') OR ('+query+' AND '+tema+')'+'&language=es&sortBy='+this.sortBy+'&pageSize='+this.numberOfResults+'&apiKey=c44b85508d3b444fb5417f45b6ccbc87').then(response => {
                console.log(response.data)
                console.log(tema + query)
                this.noticias = response.data.articles
             })
          },
          setTopic(tema){
            this.tema = tema;

          },
          selectCrypto(){
            this.temas.crypto.value = true;
            this.temas.stocks.value = false;
            this.temas.commerce.value = false;
            this.temas.techno.value = false;
            this.temas.forex.value = false;
            this.temas.noFilter.value = false;
          },
          selectStocks(){
            this.temas.crypto.value = false;
            this.temas.stocks.value = true;
            this.temas.commerce.value = false;
            this.temas.techno.value = false;
            this.temas.forex.value = false;
            this.temas.noFilter.value = false;
          },
          selectCommerce(){
            this.temas.crypto.value = false;
            this.temas.stocks.value = false;
            this.temas.commerce.value = true;
            this.temas.techno.value = false;
            this.temas.forex.value = false;
            this.temas.noFilter.value = false;
          },
          selectTechno(){
            this.temas.crypto.value = false;
            this.temas.stocks.value = false;
            this.temas.commerce.value = false;
            this.temas.techno.value = true;
            this.temas.forex.value = false;
            this.temas.noFilter.value = false;
          },
          selectForex(){
            this.temas.crypto.value = false;
            this.temas.stocks.value = false;
            this.temas.commerce.value = false;
            this.temas.techno.value = false;
            this.temas.forex.value = true;
            this.temas.noFilter.value = false;
          },
          selectNoFilter(){
            this.temas.crypto.value = false;
            this.temas.stocks.value = false;
            this.temas.commerce.value = false;
            this.temas.techno.value = false;
            this.temas.forex.value = false;
            this.temas.noFilter.value = true;
          }

      },
    mounted (){
      this.getNews('comercio bolsa criptomonedas', 'comercio bolsa criptomonedas')
    }
}
</script>

<style scoped>
li{
    list-style-type: none;
}
body{
    overflow-y:auto;

}
.nav-news{
  height:60px;
  background-color: rgb(106, 106, 106);
  position:static;
  width:100%;
  margin:0;
  box-shadow: -1px 10px 10px -1px rgba(0,0,0,0.75)!important;
}
.nav-news .vs-button{
  background:transparent!important;
}
.nav-news button{
  height:100%;
  background:transparent!important;
  border:none;
}
.boton-categoria{
  border-radius: 50%;
}
.card-img{
  height:100%;
  width:100%!important;
}
.news{
  background-color:transparent!important;
  border-radius: 0%;
  margin-top:12px;
  margin-bottom:12px;
  border:none;
  overflow-y: hidden;
}

.news .card-footer{
  border-bottom: #acacac 3px solid!important;
  border-top: none;
}
.main-div{
  overflow-y: auto;
  background-color: rgb(38, 38, 38);
  padding-left:10px;
  height:100vh;
  min-width:100%;
  border-left:#acacac 3px solid;
}
#collapse-search{
  width:100%;
  background-color: rgb(106, 106, 106);
  height:100%;
}
#custom-search-input{
  
}
.boton-categoria{
  max-width:100px;
  min-width:80px;
}
.boton-categoria:hover h1{
  color:rgb(26,26,26);
}
.boton-categoria:hover p{
  color:rgb(26,26,26);
}

.boton-categoria h1{
  color:white;
  font-size:1.7em;
}
.boton-categoria p{
  color:white;
  font-size:0.8em;
}
.boton-categoria.selected{
  background-color: #ffc107;
}
.boton-categoria.selected h1{
  color:rgb(26,26,26);
}
.boton-categoria.selected p{
  color:rgb(26,26,26);
}
::-webkit-scrollbar-track
{
  /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
  border-radius: 3px;
  background-color:#acacac;
  
}

::-webkit-scrollbar
{
  width: 8px;
  background:transparent;
}

::-webkit-scrollbar-thumb
{
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: rgba(0,0,0,0.3); 
}

</style>