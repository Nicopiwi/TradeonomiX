<template>
   <div class="container">
       <div class="account">
           <b-card class="">
                <div class="row">
                    <div class="col-md-6">
                         <h3>Efectivo : ${{GameData.Cash.toFixed(2)}}</h3>
                          <h3>Valor de cuenta:  ${{GameData.accountValue}}</h3>
                         
                    </div>
                    <div class="col-md-6">
                        <div class="card" style="width: 18rem;">

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
                    
                      
                      
                        <b-form-input type="number" v-model="quantity      " placeholder="Cantidad de acciones" min="1"></b-form-input>
                         <button class="btn-warning" v-on:click="buyStocks()"> comprar </button>
                      
                     </b-input-group>
        
         </b-btn>
 			 </b-modal>
    </div>
   
</div>
    <div class="contenedor">
        
        
         <div class="crypto-container" v-for="crypto in cryptos">
        <span class="left pull-left" v-model="simbolo">{{crypto.name}}</span>
        <br>
    
             <vs-dropdown vs-custom-content vs-trigger-click >
      <a class="a-icon"v-model="precio" style="font-weight:bold;" href.prevent>
        ${{crypto.price_usd}}
      </a>

      <vs-dropdown-menu>
           <b-form-input type="number" v-model="money" placeholder="Cantidad de cash a convertir" min="1"></b-form-input>
             <b-btn class="btn-warning pull-center" v-on:click="buyCrypto(crypto)">Comprar</b-btn>
      </vs-dropdown-menu>
    </vs-dropdown>
          
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
    <tr v-for="moenda in GameData.wallet">
      <th scope="row">{{moenda.symbol.toUpperCase()}}</th>
      <td>{{moenda.quantity.toFixed(4)}}</td>
      
      <td>{{moenda.buyingValue}} </td>
       <td><button type="button" v-on:click="sellCrypto(moenda)" class="btn btn-success">Vender</button>
</td>
    </tr>
    
  </tbody>
</table>
        </div>

  </div>
             
    
   
</template>

<script>
import axios from 'axios'

 require('stocks.js')
const stocks = new Stocks('4H7UVWK0SOPMEW8E')
 

export default {
    name:'gameScreenReal' ,
    data(){
        return{
          
            GameData:[],
            simboloBuscador:'',
            PortolioStocks:[],
            datosAcciones: [] ,
            datosDia:[] ,
            simboloCarta:'',
            watchlists:[],
            quantity: 1 ,
            stocks:[],
            cryptos:[],
            simbolo:'',
            precio:1,
            money:1
            
        }
    },

    created(){
  //  this.fetchGameData()
    this.getAccountInfo() ,
    this.fetchGameActualData()
  //  this.getWatchlistStockPrice()
  
 

    },
  
  mounted(){
  
   this.getCryptos()
      
  },
  watch: {

  },
  
    methods: {
        /*  */


            

        fetchGameActualData( accion  ){
       
           

         
          
        } ,
        getWatchlisPrice(watchlis){
          
           
              

         
        },
        buyCrypto(crypto){
            const coin ={
                quantity : this.money/crypto.price_usd,
                symbol: crypto.symbol,
                buyingValue: crypto.price_usd
            }
            
            
            if(this.GameData.Cash < this.money){
                alert("usted carece de los fondos necesarios para convertir")
            }else{
                this.GameData.wallet.push(coin);
            const updatedData = {
                Cash: this.GameData.Cash- this.money,
                wallet: this.GameData.wallet
            }
                this.GameData.Cash = this.GameData.Cash - this.money;
           //     window.reload()
                axios.patch('http://localhost:3000/api/games/'+this.$route.params.id +'?access_token=' + sessionStorage.getItem('accToken'), updatedData).then(response => {
             
                 })
            }
            
        }
        
        ,
        getCryptos(){
            axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10')
                .then(response => {
                   // this.cryptos = Object.keys(response.data).map(response.constructor.name => ({symbol: constructor.name , price: symbol[constructor.name]}))

                    this.cryptos = response.data
                    //console.log(this.cryptos.datos.data.BTC)
                  //  console.log(this.cryptos)
                })
        },


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
            }, 10000)
        }
        
        ,

        sellCrypto(moneda){
         var test = this.cryptos.find(crypto => crypto.symbol === moneda.symbol)
         this.GameData.Cash + (moneda.quantity * test.price_usd)
       //this.GameData.wallet.splice(moneda , 1)
       this.GameData.wallet.splice(this.GameData.wallet.indexOf(moneda) , 1)
       // this.watchlists.splice(this.watchlists.indexOf(watchlis),1)
         
          const updatedata = {
              Cash : this.GameData.Cash + (moneda.quantity * test.price_usd),
              wallet: this.GameData.wallet
              
          }
          axios.patch('http://localhost:3000/api/games/'+this.$route.params.id +'?access_token=' + sessionStorage.getItem('accToken'), updatedata).then(response => {
             
            })
            this.GameData.Cash  = this.GameData.Cash + (moneda.quantity * test.price_usd)
          // console.log(moneda.symbol)
        },

     
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
   
    searchStock(simboloBuscador){
				const options = {
					symbol: simboloBuscador,
                     interval: '1min',
                     amount: 10
  					
				} 
                
              stocks.timeSeries(options).then(res => {
                    this.datosAcciones = JSON.parse(JSON.stringify(res));// USA ESTE PARA LOS GRAFICOS
                  console.log(this.datosAcciones)
                    this.datosDia = this.datosAcciones[1]
                    this.simboloCarta = simboloBuscador
                
                }) 
                
	
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
.crypto-container{
    background: white;
    width: 70%;
    margin: 0 auto 4px auto;
    padding: 1em;
    box-shadow: 1px 1px 0 lightgrey;
}
span.left{
    font-weight: bold
}
span.right{
    font-weight: bold
}
</style>
