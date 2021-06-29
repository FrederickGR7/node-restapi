# **My Base RestApi**

## Funcionalidades Generales

* Este es un micro base para crear RestApi en Node Js.

## Configuración del Proyecto en Windows

1. Descarga e instala [NodeJS](https://nodejs.org/en/).
2. Descarga e instala [Docker](https://www.docker.com/).
3. Descarga e instala [PostgreSQL](https://www.postgresql.org/).
4. Luego de la descarga ejecuta el siguiente script:  
    `docker run -p 5432:5432 --name docker-postgres -e POSTGRES_PASSWORD=postgres -d postgres`
5. Descarga e instala [Visual Studio Code IDE](https://code.visualstudio.com/).
6. Descarga e instala [GIT](https://git-scm.com/).
7. Crea el folder se va alojar el proyecto en el lugar deseado.
8. Haz click derecho dentro de la carpeta y selecciona **_GIT Bash here_**.
9. En la ventana de comandos de GIT ejecuta el siguiente script para deshabilitar la verificación SSL:  
    `git config --global http.sslVerify "false"`
10. Ejecuta los siguientes scripts para poner tu información como desarrollador:  
    `git config user.name "[PRIMER_NOMBRE] [PRIMER_APELLIDO]"`  
    `git config user.email "[TU EMAIL]"`
11. Ejecuta el siguiente script para clonar el proyecto:  
    `git clone https://github.com/FrederickGR7/node-restapi`
12. Abre el proyecto desde Visual Studio Code.
13. En la ventana de comandos ejecuta el siguiente script para instalar todas las dependencias:  
    `npm install`
14. En el archivo `.env` ubicado en la raiz del proyecto agregar las siguientes variables
      - **HOST_POSTGRES**=`[HOST]`
      - **HOST_POSTGRES_PORT**=`[PORT]`
      - **HOST_POSTGRES_USERNAME**=`[USERNAME]`
      - **HOST_POSTGRES_PASS**=`[USERNAME]`  
      - **HOST_POSTGRES_DB**=`[DBNAME]`
      - **PORT**=`3000`
15. Comandos disponibles:
    * **build**: `npm run build`, construir los output files de los `*.ts`.
    * **dev**: `npm run dev`, para cargar el ambiente de desarrollo e inicializar proyecto.
    * **start**: `npm start`, para cargar el ambiente de producción e inicializar proyecto.

## Estructura de carpetas

- _dist_ carpeta que contiene los archivos compilados (_transpilados_) del programa y son los que realmente se ejecutan.
- _src_ carpeta que contiene el codigo fuente mantenible, donde suceden los cambios y se definen las funcionalidades.
- _src/config_ contiene archivos con estructura de datos tipo map que almacenan informacion general de configuración.
- _src/controllers_ contiene clases que definen los manejadores de eventos.
- _src/utils middlewares a ser utilizadas en diferentes parte del sistema.
- _src/entities_ Aqui se definen todos los modelos de datos utilizando la especificacion de TypeORM.
- _src/repositories_ clases que definen los metodos para acceder a los datos, existe un repositorio por modelo/entidad.
- _src/services_ clases que definen los metodos para aplicar logica del negocio al momento de interactuar con los datos.
- _src/routes_ Aqui se definen las rutas de las entidades.
- _src/index.ts_ Punto de entrada.