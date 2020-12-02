<template>
    <div>
          
    
<nav class="d-flex justify-content-between navbar navbar-light fixed-top navbar-expand-md" v-bind:class="{iswhite:this.iswhite}" id="navbar">
      <div class="container">
        <a class="navbar-brand nav-link titulo" href="#">TradeonomiX</a>
        <b-navbar-toggle target="navbarResponsive" style="color:#ffc107; border-color:#ffc107">
          <i class="fas fa-bars"></i>
        </b-navbar-toggle>
        <b-collapse is-nav id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            
            <li class="nav-item">
                      <a class="nav-link titulo" href="#generalInfo">¿Qué es?</a>
             
              
            </li>
            <li class="nav-item">
               <a class="nav-link titulo" href="#team">Equipo</a>
            </li>
            <li class="nav-item">
              
              <router-link to="/login" class="nav-link titulo">Log In</router-link>
            </li>
        
          </ul>
        </b-collapse>
        
      </div>
    </nav>
    
    <header class="masthead sect">
      <div class="container h-100">
        <div class="row h-100">
          <div class="col-lg-6 order-lg-last my-auto">
            <div class="device-container">
              <div class="device-mockup portrait">
                <div class="device">
                  <div class="screen">
                    
                    <img src="../assets/logoTrade.svg" class="img-fluid mb-2" alt="">
                    
                  </div>
                  <div class="button">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 order-lg-first my-auto">
            <div class="header-content mx-auto">
              
                 <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
               
                indicators
                background= transparent

                :interval="2500"
                img-width="1024"
                img-height="720"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >

      
      <b-carousel-slide caption="" img-blank >
        <h1 class="mb-xs-2 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-4 font-weight-light">Trading dinámico con datos <span class="texto-resaltado">históricos</span></h1>
      </b-carousel-slide>
       <b-carousel-slide caption="" img-blank img-alt="Blank image">
        <h1 class="mb-xs-2 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-4 font-weight-light"><span class="texto-resaltado">Learn</span> about trading risk free</h1>
      </b-carousel-slide>
       <b-carousel-slide caption="" img-blank img-alt="Blank image">
        <h1 class="mb-xs-2 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-4 font-weight-light">Courses in <span class="texto-resaltado">finance </span> and <span class="texto-resaltado"> blockchain</span></h1>
      </b-carousel-slide>

    </b-carousel>
       <router-link class="btn squared btn-outline-warning btn-lg" to="/registro">Registrarse</router-link>
            </div>
          </div>
          
        </div>
        <!--a id="swipeDown" href="#generalInfo">
          <i class="fas fa-angle-double-down"></i>
        </a-->
      </div>
      
    </header>
  <main>
    <section class="sect" id="generalInfo">
      <div class="container">
        <div class="row d-flex justify-content-around">
          <div class="card"  data-aos="fade-up">
            <div class="card-body">
                   <span><i class="fas fa-fast-forward fa-2x" style="color:#ffc107;"></i></span>
              <p class="card-title">Fast trading like never before</p>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur adipiscing, elit scelerisque orci habitasse ridiculus, netus in non pellentesque mauris. Eget etiam potenti vehicula netus eros lacinia nisi pretium tellus imperdiet, gilla auctor platea.</p>
            </div>
          </div>
          <div class="card"  data-aos="fade-up">
              
            <div class="card-body">
                 <span style="margin-bottom:4px;"><i class="fab fa-bitcoin fa-2x" style="color:#ffc107;"></i></span>
              <p class="card-title mt-2">Support for Crypto currencies </p>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur adipiscing, elit scelerisque orci habitasse ridiculus, netus in non pellentesque mauris. Eget etiam potenti vehicula netus eros lacinia nisi pretium tellus imperdiet, gilla auctor platea.</p>
            </div>
          </div>
          <div class="card" data-aos="fade-up">
            <div class="card-body">
            <span><i class="fas fa-chalkboard-teacher fa-2x" style="color:#ffc107; margin-bottom:1em;"></i></span>
              <p class="card-title">Obvious educational purposes</p>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur adipiscing, elit scelerisque orci habitasse ridiculus, netus in non pellentesque mauris. Eget etiam potenti vehicula netus eros lacinia nisi pretium tellus imperdiet, gilla auctor platea.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
    <section class="sect" id="team">
         <div class="container">
             <br>
        <h4 class="card-title gente">Nuestro equipo</h4>
        <div class="row d-flex justify-content-around" data-aos="fade-up">
          <div>
            <div class="testimonial-item mx-auto mb-5 mb-lg-0 text-center">
              <img class="img-fluid rounded-circle mb-3" src="https://upload.wikimedia.org/wikipedia/commons/2/27/Square_200x200.svg" alt="">
              <h5 class="gente text-center">Martin Erlich</h5>
              <p style="color: white;" class="font-weight-light mb-0 gente text-center">insert fancy title</p>
            </div>
          </div>
          <div>
            <div class="testimonial-item mx-auto mb-5 mb-lg-0 text-center">
              <img class="img-fluid rounded-circle mb-3 " src="https://upload.wikimedia.org/wikipedia/commons/2/27/Square_200x200.svg" alt="">
              <h5 class="gente">Dylan Szejnblum</h5>
              <p style="color: white;"  class="font-weight-light mb-0 gente">Insert fancy title</p>
            </div>
          </div>
          <div>
            <div class="testimonial-item mx-auto mb-5 mb-lg-0 text-center">
              <img class="img-fluid rounded-circle mb-3" src="https://upload.wikimedia.org/wikipedia/commons/2/27/Square_200x200.svg" alt="">
              <h5 class="gente">Nicolás Rozenberg</h5>
              <p style="color: white;"  class="font-weight-light mb-0 gente">Inser Fancy title</p>
            </div>
          </div>
           <div>
            <div class="testimonial-item mx-auto mb-5 mb-lg-0 text-center">
              <img class="img-fluid rounded-circle mb-3" src="https://upload.wikimedia.org/wikipedia/commons/2/27/Square_200x200.svg" alt="">
              <h5 class="gente">Alvaro Rodriguez seijo</h5>
              <p   style="color: white;" class="font-weight-light mb-0 ">Lead Designer </p>
            </div>
          </div>
        </div>
      </div>
       
    </section>
  </main>
    <footer class="font-small stylish-color-dark pt-4 sect"> 
    

    <ul class="list-unstyled list-inline text-center py-2" data-aos="fade-right">
      <li class="list-inline-item">
        <h5 class="mb-1">Regístrate gratis</h5>
      </li>
      <li class="list-inline-item">

          <router-link  class="btn squared btn-warning btn-lg" to="/registro">Click aquí</router-link>

       
      </li>
    </ul>

    <hr>

      
      
      <div id="footer" class="d-flex justify-content-center">

        <ul id="footer" class="list-unstyled list-inline text-center">
          <span class="text-muted">Seguinos en: </span>
          <li class="list-inline-item">
           <button class="btn-warning btn-circle "><i class="fab fa-instagram fa-lg"></i></button>
             
            
          </li>
          <li class="list-inline-item">
                   <button class="btn-warning btn-floating btn-circle "><i class="fab fa-twitter fa-lg"></i></button>
          </li>
          <li class="list-inline-item">
                     <button class="btn-warning btn-floating btn-circle "><i class="fab fa-facebook fa-lg"></i></button>
          </li>
        </ul>
      </div>
    </footer>
<p class="text-center text-muted"> Copyright © 2018 Tradeonomix. All right reserved. </p>
    </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
AOS.init();
export default {
    name:'landing',
     data () {
    return {
      slide: 0,
      sliding: null,
      iswhite: false,
      offsetTop: 0
    }
  },
  methods: {
    
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    /*
    onScroll (e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
        if (this.offsetTop > 20){
          this.iswhite=true;
        }
        else{
          this.iswhite=false;
        }
        
      }
      */
  }
}
</script>

<style>

/* Navbar*/
#navbar{
  animation: fadeOut 1s;
  position:absolute;
  width:100%;
  padding-top:7px;
  padding-bottom:7px;
  font-weight: 200;
  background-color:transparent;
  letter-spacing: 1px;
  font-family: 'Raleway', sans-serif;
}
@keyframes fadeIn {
            0% {opacity: 0;}
            100% {opacity: 1;}
          }
@keyframes fadeOut {
            
            0% {opacity: 0;}
            100% {opacity: 1;}
          }
#navbar.iswhite{
  background: rgba(255,255,255,1);
  background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 48%, rgba(237,237,237,1) 85%, rgba(237,237,237,1) 86%);
  animation: fadeIn 1s;
}
#navbar.iswhite .collapse{
}
/*Items*/
#navbar a.titulo{
    color: #ffc107;
    display:inline-block;
    margin: 0px 30px;
}
#navbar a.titulo:after {
    display:block;
    content: '';
    border-bottom: solid 4px #ffc107;  
    transform: scaleX(0.6);  
    transition: transform 250ms ease-in-out;
}
#navbar a.titulo:hover:after { 
  transform: scaleX(1); 
  border-bottom: solid 4px #2fbdbd;
  
}
#navbar a.titulo:hover{
  color: #2fbdbd!important; 
}
.nav-item{
  text-align:right;
}
@media screen{
  body{
  /*Sticky scrolling*/
    overflow-y:hidden!important;
    scroll-snap-type: y mandatory!important;
    scroll-padding-top:14vh;
  }
  .sect{
    padding-top: 100px;
    scroll-snap-align: start!important;
  }
}
.fas{
  display:block;
}
/*Header*/
  header.masthead {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 150px;
    padding-bottom:100px;
    color: white;
    background: url("../assets/fondoTrade.svg"), rgb(51, 51, 51);
    background-position: start;
    background-size: cover;
    background-repeat:repeat-y;
    font-family: 'Raleway', sans-serif;

    /*border-bottom: solid 2px #acacac;*/
   }
   .carousel-item h1{
    font-size: 5em;
    font-weight:60!important;
   }
   .carousel-indicators li{
    height: 8px!important;
    width: 8px!important;
    border-radius: 50%;
   }
  header.masthead .header-content {
  
    max-width: 900px;
    text-align: center;
  }
  @media screen and (max-width: 600px) {
    header.masthead .header-content h1 {
      font-size: 2.9em;
  }

}
@media screen and (min-width: 601px) {
    header.masthead .header-content h1 {
      font-size: 3.7em;
  }
}

header.masthead .device-container {
  max-width:400px;
  max-height:400px;
  margin-right: auto;
  margin-left: auto;
}
#carousel1{
  margin-bottom:20px;
}
/*
#swipeDown{
  font-size: 5em;
  text-align: center;
  color:#acacac;
}
*/
/*Cuerpo*/
#team{
  height: 100%;
  background-color: rgb(33, 33, 33);
  padding-bottom:5em;
}
#generalInfo{
  background-color: rgb(33, 33, 33);
}
#generalInfo .card{
  margin-top:2em;
  background-color: transparent;
  border:none;
  text-align:center;
  max-width:20vw;
  min-width:200px;
}
#generalInfo .card-title{
  font-family:'Raleway', sans-serif;
  font-weight: lighter;
  color:#ffc107;
  font-size:1.5em;
  padding-bottom:10px;
}
#generalInfo .card-text{
  font-weight: lighter;
  color:white;
}
/* footer */
footer{
  background-color: smoke;
}
.btn-floating
{
  width: 30px;
  height: 30px;
  padding: 8px 2px;
  background-color:#ffc107;
  border-color: smoke;
  border-radius: 50%;
}
.btn-floating:hover{
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
.btn-circle {
    width: 30px;
    height: 30px;
    padding: 6px 6px;
    border-radius: 50%;
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
    cursor: pointer;
}
.testimonials {
  padding-top: 7rem;
  padding-bottom: 7rem;
}
.testimonials .testimonial-item {
  max-width: 18rem;
}
.testimonials .testimonial-item img {
  max-width: 12rem;
  -webkit-box-shadow: 0px 5px 5px 0px #adb5bd;
  box-shadow: 0px 5px 5px 0px #adb5bd;
}
.gente{
    color :#ffc107;
}
</style>