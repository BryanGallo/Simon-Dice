//obteniendo el boton a travez de su id
  const btnEmpezar = document.getElementById('btnEmpezar')
  const celeste = document.getElementById('celeste')
  const violeta = document.getElementById('violeta')
  const naranja = document.getElementById('naranja')
  const verde = document.getElementById('verde')
  const counter = document.getElementById('count')
  const ULTIMO_NIVEL = 2
  let nombre = prompt('Ingrese su nombre')
//Creando una clase para iniciar el juego
class Juego{
  
  constructor(){
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(() => {
      this.siguienteNivel() 
    }, 2500);
    
  }

  inicializar(){
    this.elegirColor = this.elegirColor.bind(this)
    this.siguienteNivel =this.siguienteNivel.bind(this)
    counter.classList.add('show')
    this.cuentaRegresiva()
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores ={
      //js tiene algo interesante que cuando queremos en el objeto poner un atributo 'celeste en este casos' y asignarle el valor que teniamos en la variable 'celeste' nos podemos ahorrar estos 2 puntos y el nombre de la variable y como llevan el mismo nombre esto lo hace js por nosotros
      // celeste:celeste,
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toggleBtnEmpezar(){
    //contains para revisar si tiene la clase hide
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia(){
    // fill llena todo el arreglo con lo q se le envie en este caso el 0
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n=>Math.floor(Math.random() * 4))
    console.log(this.secuencia);
    
  
  }

  siguienteNivel(){
    this.subnivel =0
    this.iluminarSecuencia()
    this.agregarClic()
  }

  tranformarNumeroColor(numero){
    switch (numero) {
      case 0:
        return 'celeste'
        //en este caso no hace falta poner el break, porque el break no se va a ejecutar si se hace un return
        // break;
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
      default:
        break;
    }
  }

  tranformarColorNumero(color){
    switch (color) {
      case 'celeste':
        return 0
        //en este caso no hace falta poner el break, porque el break no se va a ejecutar si se hace un return
        // break;
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
      default:
        break;
    }
  }
//Va a recorrer el array de la secuencia hasta el nivel en el que este en el usuario
  iluminarSecuencia(){
    //aqui obtenemos el color que queremos iluminar y llamamos a la funcion para que lo ilumine
    for (let i = 0; i < this.nivel; i++) {
    //en una vriable guardamos la secuencia de colores y le vamos a pasar el numero de la secuencia del que estamos en cada ciclo 
      const color = this.tranformarNumeroColor(this.secuencia[i])
      setTimeout(()=>{
        this.iluminarColor(color)
      },1000*i)//le ponemos por i para que si es el color 0 se preda ese momento si es el color 1 se prenda en el segundo 1 y asi
    }
  }

  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(() => {
      this.apagarColor(color)
    }, 350);
  }

  apagarColor(color){
    this.colores[color].classList.remove('light')
  }
  agregarClic(){
    //aqui estamos agregando el evento clic, y decirle al navegador que funcion tiene que ejecutar cuando se realice ese evento clic, es algo que js le indica al navegador, y esa funcion se va a ejecutar asincronamente y js cuando se quede sin tareas la va a ejecutar
    //tambien podemos encontrar de esta manera el enlace this
    //var _this=this o var self = this(y mandamos la variable como parametro de bind) o puede ir en el construtor que inicializa y 'this.elegirColor = this.elegirColor.bind(this) revisa el constructor que inicializa ahi esta declaradopara evitar lo de abajo
    // aqui a la funcion que va despues del evento le aplicamos bind
    // this.colores.celeste.addEventListener('click',this.elegirColor.bind(this))
    // this.colores.celeste.addEventListener('click',this.elegirColor.bind(self))
    this.colores.celeste.addEventListener('click',this.elegirColor)
    this.colores.violeta.addEventListener('click',this.elegirColor)
    this.colores.naranja.addEventListener('click',this.elegirColor)
    this.colores.verde.addEventListener('click',this.elegirColor)
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click',this.elegirColor)
    this.colores.violeta.removeEventListener('click',this.elegirColor)
    this.colores.naranja.removeEventListener('click',this.elegirColor)
    this.colores.verde.removeEventListener('click',this.elegirColor)
  }
  //Cuando agregamos manejadores de eventos, lo metodos que se llaman se llaman por parametros que se suelen llamar 'ev'
  elegirColor(ev){
    //al momento de hacer click nos va ha salir el evento del click donde ingresamos al tarjet para ver en que elemento se realizo el click
    // console.log(ev);
    //js aqui va perder el contexto porque this deja de apunta al constructor y empieza a apuntar al objeto donde se encuentra el evento, y para aue ese this no deje de apuntar al constructor(clase) se le pasa el atributo 'bind'(que significa atar o enlazar) y aunque resulte raro de js lo tenenmos que hacer linea 86
    // console.log(this);

    // *********ahora vamos a entrar a el evento de clic en el navegador, de ahi al evento ´tarjet' y dentro de este vamos a tener un atributo que se llama 'dataset' y dentro de eso vamos a tener el color que toco el usuario, recuerdad que esto sale  dek div del color y su atributo es 'data-color', vamos a tener que captura el numero del color que eligio el usuario 
    const nombreColor = ev.target.dataset.color
    const numeroColor=  this.tranformarColorNumero(nombreColor)
    this.iluminarColor(nombreColor)
    if(numeroColor === this.secuencia[this.subnivel]){
      this.subnivel++
      if(this.subnivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if(this.nivel === (ULTIMO_NIVEL + 1)){
          this.ganoElJuego()
        }else{
          //aqui nos va a dar un error porque nuevamente this va a dejar de apuntar a nuestra clase y va a puntar a window, porque le estamos diciendo que ejecute la funcion 'siguienteNivel' pero el encargado de ejecutar la funcion es window, ya que recordemos que el setTimeOut lo que h ace delegar en el navegador la ejecucion de esta funcion y por eso nos cambia el 'this'
          //y si queremos que el this se nuestra clase en este caso juego usamos nuevamente el bind
          // setTimeout(this.siguienteNivel,2000)
          // setTimeout(this.siguienteNivel.bind(this),2000)
          //pero nosotros lo colocaremos en el inicalizar para evitar ponerlo directo en la linea 144
          //asi que lo colocamos como al inicio
          setTimeout(this.siguienteNivel,1500)
        }
      }
    }else{
        this.perdioElJuego()
    }
  }


  ganoElJuego(){
    swal(nombre, 'Felicitaciones, Ganaste El juego', 'success')
    .then(()=>{
      this.inicializar()
    })
  }

  perdioElJuego(){
    swal(nombre, 'Lo lamentamos, Perdiste El juego', 'error')
     .then(()=>{
      this.eliminarEventosClick()
      this.inicializar()
    })
  }

  cuentaRegresiva(){
    let contador = 3
   
    counter.style.display='flex'
    counter.style.justifyContent='center'
    counter.style.alignItems='center'
    counter.innerHTML = contador
    setTimeout(() =>{
      contador =2
      counter.innerHTML = contador
    },500)
    setTimeout(()=>{
      contador = 1
      counter.innerHTML = contador
    },1000)
    setTimeout(()=>{
      counter.style.display='none'
    },1500)


  }
  
}
//con esta inicializamos a la clase juegos
function empezarJuego(){
  // let juego = new Juego()
  //ponemos para pder debugear el codigo ver en la consola que esta pasando y
  //acceder a la secuencia generada
  window.juego = new Juego()
}

