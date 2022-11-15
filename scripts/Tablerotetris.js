/*se define una clase para dividir el canvas en columnas 
    y filas y para posteriormente poder moficarlas*/

    class Tablero{
        constructor(){
            this.columnas = 10
            this.filas = 20
            this.lado_celda = 25
            this.ancho = this.columnas*this.lado_celda
            this.alto = this.filas*this.lado_celda
            this.posicion = createVector(margen_tablero,margen_tablero)
        }
        /* la cordenadas de definen como no lienales
        por lo que se establece (x) para las cordenadas horizontales, 
        (y) para las verticales */ 
        coordenada(x,y){
            return createVector(x,y).mult(this.lado_celda).add(this.posicion)
        }

        dibujar(){
            push()
            noStroke()
            for (let columna = 0; columna < this.columnas; columna++){
                    for (let fila = 0; fila < this.filas; fila++) {
                        if((columna+fila)%2==0){
                            fill("#44a0fb")
                            stroke("#17FCF9")
                        }else{
                            fill("#44a0fb")
                        }
                        let c = this.coordenada(columna,fila)
                        rect(c.x, c.y, this.lado_celda)
                    }
            }

            pop()
        }
    }