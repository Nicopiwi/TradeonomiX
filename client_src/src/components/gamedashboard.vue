<template>
<div class="main-dash">
	
<nav class="navbar nav-dash">


  <span class="navbar-brand text-white mb-0 h1"></span>
  <div class="float-right d-flex">
  	<vs-tooltip text="Crear nuevo juego historico" position="bottom" >
            <b-btn v-b-modal.modalHistorico><i class="fas fa-history"></i></b-btn>
     </vs-tooltip>
  	
  	<vs-tooltip text="Crear nuevo juego en tiempo real" position="bottom" >
            <b-btn v-b-modal.modalRealtime><i class="far fa-clock"></i></b-btn>
     </vs-tooltip>
	
	
  </div>
    
</nav>
	
    <div class="dashboard-back">
		<div>
			 <b-modal id="modalHistorico" title="Crear Nuevo juego Historico" hide-footer class="squared" style="background-color:rgb(26,26,26)">
             
				     <b-form-group label="" variant="dark">
				 	 <input type="name" name="" class="form-control" placeholder="Nombre del juego" v-model="gameData.name" class="squared">
					  <br>
					  <b-input-group prepend="$">
					 <b-form-input v-model="gameData.Cash" type="number" placeholder="Capital inicial" class="squared"></b-form-input>
					</b-input-group>
					<br>
					 <input type="date" value="2017-06-01" class="form-control" placeholder="Fecha de inicio AAAA-MM-D" v-model="gameData.startDate" class="squared">
						<br>
				 	 <input type="date" value="2017-06-01" class="form-control" placeholder="Fecha Final AAAA-MM-D" v-model="gameData.endDate" class="squared">
						<br>
 						
 						

					   <b-btn size="xl" class="float-right" variant="warning" v-on:click="createGamesHistoric()" class="squared"> Crear Partida</b-btn>
		    </b-form-group>
 			 </b-modal>

		 </div>
		 <div>
			 <b-modal variant="dark" id="modalRealtime" title="Crear Nuevo juego En tiempo Real" dark hide-footer >
				     <b-form-group label="">
				 	 <input type="name" name="" class="form-control" placeholder="Nombre del juego" v-model="gameData.name">
					  <br>
					  <b-input-group prepend="$">
					 <b-form-input v-model="gameData.Cash" type="number" placeholder="Capital inicia " ></b-form-input>
					</b-input-group>
					<br>

						<br>
 						

					   <b-btn size="xl" class="float-right" variant="warning" v-on:click="createGameRealTime()"> Crear Juego Real time</b-btn>
		    </b-form-group>
 			 </b-modal>
		 </div>
     

	 

  	  <div class="squared card scenario text-center text-muted" v-for="juego in juegos">

  		<div class="card-header">
  			  {{juego.name}}
  		</div>
  <div class="card-body">
	  <div class="row">
  <div class="col-sm-4">
	  <p class="card-title">Cash: ${{juego.Cash.toFixed(2)}}</p> 
	  
	  <p class="card-title">Account Value: ${{juego.accountValue}}</p>
  </div>
  <div class="col-sm-4" v-if="juego.isRealTime == true">
	 <p>Real Time</p>
  </div>
  <div class="col-sm-4" v-else>
	  <p>Fecha de inicio : {{juego.startDate}}</p>
	  <p class="fecha">Ultima actividad en : {{juego.todayDate}}</p>
	    <p >Fecha de Final : {{juego.endDate}}</p>
	  <p>Fecha de creacion del juego {{juego.startDate}}</p>
  </div>
  <div class="col-sm-4">dd</div>
	  </div>
    
  </div>
  <div class="card-footer text-muted" v-if="juego.isRealTime == false">
     
	 <button class="btn squared btn-danger pull-left" v-on:click="deleteGames(juego.id)"> Elimar Escenario</button> 
	
	  <router-link class="btn squared btn-warning pull-right" v-bind:to="{ name: 'viewgame', params: {id: juego.id }}">Continuar</router-link>
	
  </div>
  <div class="card-footer text-muted" v-else>
     
	 <button class="btn btn-danger squared pull-left" v-on:click="deleteGames(juego.id)"> Elimar Escenario</button> 
	
	  <router-link class="btn squared btn-warning pull-right" v-bind:to="{ name: 'viewgamereal', params: {id: juego.id }}">Continuar</router-link>
	
  </div>
</div>
        
    </div>

	</div>
</template>

<script>
import axios from 'axios'
//mport Datepicker from 'vuejs-datepicker';
import sidenav from '../components/sidenav'
export default {
	name: 'gamedash' ,
	components:{
		  sidenav
	},
	
	data () {
		return {
			 juegos: [] ,
			 gameData:{
				 name:'',
				 Cash:'',
				 startDate:'',
				 todayDate: '',
				 endDate:''
			 } ,
			 selected: false,
      options: [
        { text: 'Es tiempo real', value: true },
     
       
      ]
			 
		}
	},
	mounted(){
		this.getGames()
	},
	methods: {

		  getGames(){
               //
               axios.get('http://localhost:3000/api/games?filter[where][usuarioId]=' + sessionStorage.getItem('userId') ).then(response =>{
                   console.log(response)
                   console.log(this.data)
                   this.juegos = response.data
               
               },15000)
		   },
		    createGamesHistoric(){
                const newGame ={
                    Cash : this.gameData.Cash,
                    accountValue : this.gameData.Cash,
                    usuarioId : sessionStorage.getItem('userId'),
					watchlist: [],
					portfolio:[],
					wallet:[],
					startDate : this.gameData.startDate,
					todayDate: this.gameData.startDate,
					endDate: this.gameData.endDate,
					isRealTime : false 
                }
                axios.post('http://localhost:3000/api/games?access_token=' + sessionStorage.getItem('accToken'), newGame).then(response =>{
                    console.log(response.data)
                    axios.post('http://localhost:3000/api/games/'+response.data.id+'/portfolios?access_token=' + sessionStorage.getItem('accToken'))
                    axios.post('http://localhost:3000/api/games/'+response.data.id+'/watchlists?access_token=' + sessionStorage.getItem('accToken'))
                    this.$router.replace('/viewgame/' + response.data.id)
                    console.log(text)
                })
            },
			createGameRealTime(){
				const today = new Date()
				const dd = today.getDate()
				const newGame = {
					Cash: this.gameData.Cash,
					accountValue: this.gameData.Cash,
					usuarioId: sessionStorage.getItem('userId'),
					watchlist:[],
					portfolio:[],
					wallet:[],
					startDate: dd,
					isRealTime: true
				} 
				  axios.post('http://localhost:3000/api/games?access_token=' + sessionStorage.getItem('accToken'), newGame).then(response =>{
                    console.log(response.data)
                    axios.post('http://localhost:3000/api/games/'+response.data.id+'/portfolios?access_token=' + sessionStorage.getItem('accToken'))
                    axios.post('http://localhost:3000/api/games/'+response.data.id+'/watchlists?access_token=' + sessionStorage.getItem('accToken'))
                    this.$router.replace('/viewgame/' + response.data.id)
                    console.log(text)
                })
			},
            deleteGames(id){
                axios.delete('http://localhost:3000/api/games/'+ id +'/watchlists?access_token=' + sessionStorage.getItem('accToken'))
                axios.delete('http://localhost:3000/api/games/'+ id +'/portfolios?access_token=' + sessionStorage.getItem('accToken'))
                axios.delete('http://localhost:3000/api/games/'+ id +'/?access_token=' + sessionStorage.getItem('accToken')).then(response =>{
                    location.reload();
                })
            }
			
	}
}
</script>

<style>
.fecha{
	  display: block;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.scenario{
	margin-bottom:12px;
	margin-top:12px;
	background-color: rgb(26,26,26)!important;

}
.nav-dash .float-right button{
	height:100%;
	background-color:transparent!important;
	color:#acacac;
	border:none;
}
::-webkit-scrollbar-button {
  
 }
.dashboard-back{
	background-color: rgba(51,51,51, 0.85)!important;
	overflow-y: auto;
	height:calc(100vh-85px)!important;
}
.nav-dash{
	background-color:rgb(106,106,106);
	height:60px;
	box-shadow: -1px 10px 10px -1px rgba(0,0,0,0.75)!important;
	-webkit-box-shadow: -1px 10px 10px -1px rgba(0,0,0,0.75)!important;
}
.
.main-dash{
	margin-top:0px;
	min-width:100%;
	margin-right:0px;
}
.modal-content{
	background-color:rgb(26,26,26);
}
</style>
