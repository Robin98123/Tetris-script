/* 
Se va a encargar de representar el modelo del tablero de juego, su nombre 
empieza por una T mayúscula para identificar que es una clase y no una variable
*/
class Tablero {
    constructor() {
      this.columnas = 10;
      this.filas = 20;
      this.lado_celda = 25;
      this.ancho = this.columnas * this.lado_celda;
      this.alto = this.filas * this.lado_celda;
      this.posición = createVector(
        MARGEN_TABLERO,
        MARGEN_TABLERO + 2*this.lado_celda
      );
/* se encargará de almecenar el tatrimino que se genera aletoriamente*/
      this.minosAlmacenados = [];
      for (let fila = 0; fila < this.filas; fila++) {
        /*dentro del array vacio se generará cada tetromino */
        this.minosAlmacenados[fila] = [];
        for (let columna = 0; columna < this.columnas; columna++) {
          this.minosAlmacenados[fila].push("");
        }
      }
    }

    /* el ciclo va a recorrer cada uno de los tetriminos
    para que se vayan generando automaticamente tan pronto el tetrimino 
    llegue a la parte de abajo del tablero creando un bucle infinito*/
  
    set almacenarMino(tetrimino) {
      for (const pmino of tetrimino.mapaTablero) {
        if (pmino.y < 0) {
          //Juego términado si la posicion del mino en y es menor que 0
          tablero = new Tablero();
          tetrimino = new Tetrimino();
          lineas_hechas = 0;
        }
        this.minosAlmacenados[pmino.x][pmino.y] = tetrimino.nombre;
      }
      this.buscarLineasHorizontalesBorrar();
    }
  
    buscarLineasHorizontalesBorrar() {
      let lineas = [];
      for (let fila = this.filas; fila >= 0; fila--) {
        let agregar = true;
        for (let columna = 0; columna < this.columnas; columna++) {
          if (!this.minosAlmacenados[columna][fila]) {
            agregar = false;
            break;
          }
        }
        if (agregar) {
          lineas.push(fila);
        }
      }
      this.borrarLíneasHorizontales(lineas);
    }
  
    borrarLíneasHorizontales(lineas) {
      lineas_hechas += lineas.length;
      for (const linea of lineas) {
        for (let fila = linea; fila >= 0; fila--) {
          for (let columna = 0; columna < this.columnas; columna++) {
            if (fila == 0) {
              this.minosAlmacenados[columna][fila] = "";
              continue;
            }
            this.minosAlmacenados[columna][fila] =
              this.minosAlmacenados[columna][fila - 1];
          }
        }
      }
    }
  
    /* 
    La coordenada es una transformación no lineal donde se aplica un
    escalamiento (multiplicación) para el ajuste de las medidas y una
    traslación (suma) para el ajuste de las posiciones.
    En este caso, no usaremos rotaciones, no se necesita.
    */
    coordenada(x, y) {
      return createVector(x, y).mult(this.lado_celda).add(this.posición);
    }
  
    /* se encarga de controlar el dibujado del tablero*/
    dibujar() {
      push();
      stroke("#08e1ff")
      for (let columna = 0; columna < this.columnas; columna++) {
        for (let fila = 0; fila < this.filas; fila++) {
          if ((columna + fila) % 2 == 0) {
            fill("#08b4ff");
          } else {
            fill("#08b4ff");
          }
          let c = this.coordenada(columna, fila);
          rect(c.x, c.y, this.lado_celda);
        }
      }
      pop();
      this.dibujarMinosAlmacenados();
    }

    /*dibuja los minos almacenados*/
  
    dibujarMinosAlmacenados() {
      push();
      for (let columna = 0; columna < this.columnas; columna++) {
        for (let fila = 0; fila < this.filas; fila++) {
          let nombreMino = this.minosAlmacenados[columna][fila];
          if (nombreMino) {
            fill(tetriminosBase[nombreMino].color);
            Tetrimino.dibujarMino(this.coordenada(columna, fila));
          }
        }
      }
      pop();
    }
  }