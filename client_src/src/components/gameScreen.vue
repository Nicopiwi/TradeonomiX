<template>
   <div class="container">
       <div class="account">
           <b-card class="">
                <div class="row">
                    <div class="col-md-6">
                         <h3>Efectivo : ${{GameData.Cash.toFixed(2)}}</h3>
                          <h3>Valor de cuenta:  ${{GameData.accountValue}}</h3>
                          <p> Fecha de inicio {{GameData.startDate}}</p>
                          <p> Fecha de que se termina {{GameData.endDate}}</p>
                    </div>
                    <div class="col-md-6">
                        <div class="card" style="width: 18rem;">
  <div class="card-body">
    
    <p class="card-text"> Fecha de hoy: </p>
    <p class="card-text fechaHoy" v-model="actualDate">{{GameData.todayDate}} </p>
        <button type="button" v-on:click="addDay()"alt="Pasar Al dia siguiente" class="btn btn-outline-secondary pull-right"><i class="fas fa-forward"></i></button>
  </div>
</div>
                    </div>
                </div>
                </b-card>
       </div>

       <div class="buscador">
           <div class="card text-center">
  <div class="card-header">
      <div class="row">
          <div class="col-sm-10">
            <input v-model="simboloBuscador" type="text" class="form-control input-sm" placeholder="Escribi simbolo">
          </div>
          <div class="col-sm-1">
              <span class="input-group-btn">
                        <button v-on:click="searchStock(simboloBuscador)" class="btn btn-info btn-xl" type="button">
                            <i class="fa fa-search"></i>
                        </button>
                </span>
          </div>

      </div>

                    
                     
                    
  </div>
  <div  class="card-body">
  <div class="text-muter">    <h3 class="card-text pull-center"> {{simboloCarta.toUpperCase()}} </h3> </div>
  <div class="row">
  <div class="col-sm-6">
    <h6 class="card-text"> Precio Actual: {{datosDia.open}} </h6> 
    <br>
    <h6 class="card-text"> High: {{datosDia.high}} </h6> 
    <br>
    <h6 class="card-text"> Low :{{datosDia.low}} </h6> 
  </div>
    
  <div class="col-sm-6">

           <button type="button" class="btn btn-warning" v-on:click="addToWatchlist()">Agregar a watchlist</button> 
           <br>
           <br>
           
            <b-btn class="btn-warning"v-b-modal.modalPopover>Comprar</i></b-btn>
           <br>
           <br>
           
  </div>
</div>
  </div>
  <div class="card-footer text-muted">
   <button type="button" class="btn btn-warning pull-right"><i class="fas fa-chart-line"></i></button>
  </div>
    <div> 
    <b-modal id="modalPopover" title="Comprar acciones"  hide-footer >
				 	<b-input-group>
                    
                      
                      
                        <b-form-input type="number" v-model="quantity      " placeholder="Cantidad de acciones" min="1"></b-form-input> <button class="btn-warning" v-on:click="buyStocks()"> comprar </button>
                      
                     </b-input-group>
        
         </b-btn>
 			 </b-modal>
    </div>
   
</div>
       </div>
        <div class="portfolioTable">
            <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Simbolo</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Valor de compra</th>
      <th scope="col">Valor actual del mercado</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="accion in GameData.portfolio">
      <th scope="row">{{accion.symbol.toUpperCase()}}</th>
      <td>{{accion.quantity}}</td>
      <td>{{accion.buyingValue}}</td>
      <td> {{fetchGameActualData(accion)}}</td>
       <td><button type="button" v-on:click="" class="btn btn-success">Vender</button>
</td>
    </tr>
    
  </tbody>
</table>
        </div>
        <div class="watchlistTable">
            
            <table class="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">Simbolo</th>
                    <th scope="col">Precio Actual</th>
                     <th scope="col">
                         
                     </th>
                   
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="watchlis in watchlists">
                    <th scope="row">{{watchlis.toUpperCase()}}</th>
                    <td>{{getWatchlisPrice(watchlis)}} </td>
                    
                    <td><button type="button" v-on:click="deleteWatchlist(watchlis)" class="btn btn-danger">Eliminar de Watchlist</button> </td>
                    </tr>
                  
                    
                </tbody>
            </table>
        </div>
  </div>
             
    
   </div>
</template>

<script>
import axios from 'axios'
 require('stocks.js')
const stocks = new Stocks('4H7UVWK0SOPMEW8E')
 

export default {
    name:'gameScreen' ,
    data(){
        return{
          
            GameData:[],
            simboloBuscador:'',
            PortolioStocks:[],
            actualDate:'',
            datosAcciones: [] ,
            datosDia:[] ,
            simboloCarta:'',
            watchlists:[],
            quantity: 1 ,
            stocks:[]
            
           /*  diaHoy: new Date(GameData.todayDate),
            pasado: new Date(diaHoy.setDate(diaHoy.getDate() + 1)) */
            

           
          
          
        }
    },

    created(){
  //  this.fetchGameData()
    this.getAccountInfo() ,
    this.fetchGameActualData()
  //  this.getWatchlistStockPrice()
  
 

    },
  
  mounted(){
  
   
      
  },
  watch: {

  },
  
    methods: {
        /*  */


            

        fetchGameActualData( accion  ){
       
           

         
          
        } ,
        getWatchlisPrice(watchlis){
            var tommorow = new Date(this.GameData.todayDate)
            tommorow.setDate(tommorow.getDate() + 1);
            var stringo = "DYlan"
            var datosWatch;
            
             const options = {
             symbol: watchlis,
             	interval: 'daily',
                start:  new Date (this.GameData.todayDate),
  				end: new Date (tommorow)
             }

                stocks.timeSeries(options).then(res => {
                 //console.log(res)
                 datosWatch = JSON.parse(JSON.stringify(res));// USA ESTE PARA LOS GRAFICOS
                 
                /*  function render (createElement)
                 { 
                     return createElement('td' , datosWatch[0].high)
                 }
                  */

                    
             })
             console.log(datosWatch)
              return "skere"
           
              

            /*   stocks.timeSeries(options).then(res => {
                    this.datosAcciones = JSON.parse(JSON.stringify(res));// USA ESTE PARA LOS GRAFICOS
                  console.log(this.datosWatch)
                    this.datosWatch = this.datosWatch[0]
                    return this.datosWatch.high
                    
                
        } */
        }
        
        ,


        buyStocks(portfolio , Cash , quantity , open){
            var quantity = this.quantity
            var stockPrice = this.datosDia.open
           const balance = {
                Cash: this.GameData.Cash - (stockPrice* quantity)
            }
            const stockDatos ={
                symbol: this.simboloCarta,
                quantity: this.quantity,
                buyingValue: this.datosDia.open
            } 
          
            this.GameData.portfolio.push(stockDatos)
           this.GameData.Cash = balance.Cash
            
            const updatedData = {
                Cash: this.GameData.Cash,
                portfolio:  this.GameData.portfolio
            }
            
            if(balance.Cash < 0){
                alert("Carece de los fondos suficientes para comprar esta cantidad de acciones")
             
            } else {
              axios.patch('http://localhost:3000/api/games/'+this.$route.params.id +'?access_token=' + sessionStorage.getItem('accToken'), updatedData).then(response => {
                  alert("compraste")
                  console.log(response.data)
            })
              
                
            } 
        } ,
        
        
        getAccountInfo(){
            axios.get('http://localhost:3000/api/games/' + this.$route.params.id + '?acces_token=' + sessionStorage.getItem('accToken')).then(response => {
                this.GameData = response.data
                this.watchlists = response.data.watchlist
                this.stocks = response.data.portfolio
            }, 5000)
        }
        
        ,
     
   /*     sellStocks(id ,buyingValue ,quantity){
            const accountDetails = { 
                Cash : this.GameData.cash + (buyingValue * quantity) //Despues cambiar por seeling value
            }
          
            let uri = 'http://localhost:3000/api/stocks/'+ id+'?access_token=' + sessionStorage.getItem('accToken')
            this.PortolioStocks.splice(id ,1);
            axios.patch('http://localhost:3000/api/games/'+this.$route.params.id +'?access_token=' + sessionStorage.getItem('accToken'), accountDetails).then(response => {
                axios.delete(uri)
            })
            window.reload()


            // Conseguir stock por id , despues hago los le sumo el valor de esas acciones a la cuenta y le agrego el cash. 
        },   */
        
        addDay(actualDate){

           
        
            var tommorow = new Date(this.GameData.todayDate)
            tommorow.setDate(tommorow.getDate() + 1);
            

            const dataUpdate = {
                todayDate : tommorow
            }
            axios.patch('http://localhost:3000/api/games/'+this.$route.params.id +'?access_token=' + sessionStorage.getItem('accToken'), dataUpdate).then(response => {
             
            })
           
        },

        addToWatchlist(){
            this.watchlists.push(this.simboloCarta)
            const dataUpdate = {
                watchlist : this.watchlists
            }

                   axios.patch('http://localhost:3000/api/games/'+this.$route.params.id +'?access_token=' + sessionStorage.getItem('accToken'), dataUpdate).then(response => {
             
            })
        } ,
        deleteWatchlist(watchlis){
            
             this.watchlists.splice(this.watchlists.indexOf(watchlis),1)
            
            const dataUpdate = {
                watchlist : this.watchlists
            }
             axios.patch('http://localhost:3000/api/games/'+this.$route.params.id +'?access_token=' + sessionStorage.getItem('accToken'), dataUpdate).then(response => {
             
            }) 
        },
       /*  deleteWatchListStock(id){
            let uri = 'http://localhost:3000/api/watchlist-stocks/'+id+'?access_token=' + sessionStorage.getItem('accToken')
           this.WatchlistStocks.splice(id , 1);
            axios.delete(uri)
        }, */
        /* 
       searchStock(GameData){

        const options = {
               symbol: 'TSLA',
    interval: 'daily',
    start: new Date('2017-07-01'),
    end: new Date('2017-07-09')
        }

            console.log(stocks.timeSeries(options))
        }, 
 */

    searchStock(simboloBuscador){
				const options = {
					symbol: simboloBuscador,
					interval: 'daily',
                    start:  new Date ('1995-01-23'),
  					end: new Date (this.GameData.todayDate),
  					/*  start: new Date(this.GameData.todayDate),
  					end: new Date(manana)  */
				} 
                
              stocks.timeSeries(options).then(res => {
                    this.datosAcciones = JSON.parse(JSON.stringify(res));// USA ESTE PARA LOS GRAFICOS
                  console.log(this.datosAcciones)
                    this.datosDia = this.datosAcciones[1]
                    this.simboloCarta = simboloBuscador
                
                }) 
                
		/* axios.post(stocks.timeSeries(options)).then(response => {
            console.log(response.data[1])
        }) */
    },
        cancelAutoUpdate: function() { clearInterval(this.timer) },
        


       
       
        

        
    },
    beforeDestroy() {
  clearInterval(this.timer)}
}
</script>

<style>

.card-text.fechaHoy{
      display: block;
  width: 110px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>
