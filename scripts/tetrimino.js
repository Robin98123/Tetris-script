        /*se define una clase para el tetrimino y se le dice 
    que comience a dibujar desde la cordenada 0,0 del 
    origen del tablero, no del canvas*, a sus vez se le 
    pone una condicional para que la figura no se salga del tablero*/

    class Tetrimino{
        constructor(nombre = random(["Z","S","J","L","T","O","I"])){
            this.nombre = nombre
            let base = tetriminosBase[nombre]
            this.color = base.color
            this.mapa = []
            for (const pmino of base.mapa){
                this.mapa.push(pmino.copy())
            }
            this.posicion = createVector(int(tablero.columnas / 2), 0)
        }

        moverDerecha(){
            this.posicion.x++
            if (this.movimientoErroneo){
                this.moverIzquierda()
            }
        }

        moverIzquierda(){
            this.posicion.x--
            if (this.movimientoErroneo){
                this.moverDerecha()
            }
        }

        moverAbajo(){
            this.posicion.y++
            if (this.movimientoErroneo){
                this.moverArriba()
                tablero.minosAlmacenados = this 
                Tetrimino = new Tetrimino ()
            }
        }

        moverArriba(){
            this.posicion.y--
        }

        girar (){
            for(const pmino of this.mapa){
                pmino.set(pmino.y,-pmino.x)
            }
            if (this.movimientoErroneo){
                this.desgirar()
            }
            
        }

        desgirar (){
            for(const pmino of this.mapa){
                pmino.set(-pmino.y,pmino.x)
            }
            
        }

        get movimientoErroneo(){
            let salioDelTablero = !this.estaDentroDelTablero
            return salioDelTablero

        }

        get estaDentroDelTablero(){
            for (const pmino of this.mapaTablero){
                if (pmino.x<0){
                    //Evita la salida de los tetrominos por la izquierda
                    return false
                }
                if (pmino.x >= tablero.columnas){
                    //Evita la salida de los tetrominos por la derecha
                    return false
                }
                if (pmino.y >= tablero.filas){
                    //Evita la salida de los tetrominos por abajo
                    return false
                }
            }
            return true
        }

        get mapaTablero(){
            let retorno = []
            for (const pmino of this.mapa){
                let copy = pmino.copy().add(this.posicion)
                retorno.push(copy)
            }
            return retorno
        }

        get mapaCanvas(){
            let retorno = []
            for (const pmino of this.mapa){
                let copy = pmino.copy().add(this.posicion)
                retorno.push(tablero.coordenada(copy.x,copy.y))
            }
            return retorno
        }
        /*esta funcion se encarga del procesamiento del 
        tetrimino*/

        dibujar(){
            push()
            fill(this.color)
            stroke("#44A0FB")
            for (const pmino of this.mapaCanvas){
                rect(pmino.x,pmino.y,tablero.lado_celda)
                push()
                noStroke()
                fill(255,255,255,100)
                beginShape()
                vertex(pmino.x, pmino.y)
                vertex(pmino.x + tablero.lado_celda, pmino.y)
                vertex(pmino.x + tablero.lado_celda, pmino.y + tablero.lado_celda)
                endShape(CLOSE)
                beginShape()
                fill(0,0,0,80)
                vertex(pmino.x, pmino.y)
                vertex(pmino.x, pmino.y + tablero.lado_celda)
                vertex(pmino.x + tablero.lado_celda, pmino.y + tablero.lado_celda)
                endShape(CLOSE)
                pop()
            }
            pop()
        }
    }    
    
    
    /* la tetrimo nos dejó crear un miomino pero 
    necesitamos que sean varios y diferentes figuras*/
    
    function crearMapeoBaseTetriminos(){
        tetriminosBase = {
        "Z":{
            color: "red",
            mapa: [
                createVector(),
                createVector(-1,-1),
                createVector(0,-1), 
                createVector(1,0),    
            ]
        },
        "S":{
            color: "green",
            mapa:[
                createVector(),
                createVector(1,-1),
                createVector(0,-1),
                createVector(-1,0),
            ]
        },
        "J":{
            color: "orange",
            mapa:[
                createVector(),
                createVector(-1,-1),
                createVector(-1,0),
                createVector(1,0),
            ]
        },
        "L":{
            color: "blue",
            mapa:[  
                createVector(),
                createVector(-1,-1),
                createVector(-1,0),
                createVector(1,0),
            ]
        },
        "T":{
            color: "magenta",
            mapa:[  
                createVector(),
                createVector(-1,-1),
                createVector(-1,0),
                createVector(1,0),
            ]
        },
        "O":{
            color: "Yellow",
            mapa:[  
                createVector(),
                createVector(0,-1),
                createVector(1,-1),
                createVector(1,0),
            ]
        },
        "I":{
            color: "green",
            mapa:[  
                createVector(),
                createVector(-1,0),
                createVector(1,0),
                createVector(2,0),
            ]
        }

    }
    }