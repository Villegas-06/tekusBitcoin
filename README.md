# Proyecto Angular y Electron

El proyecto consta de una lista de Bitcoin de las últimas dos semanas incluyendo el día de hoy. El día de hoy se actualiza cada minuto, siempre y cuando se tenga conexión a internet, si no se tiene conexión a internet, la aplicación solo contará con los últimos datos que se hayan consultado.

Este proyecto combina Angular y Electron para crear una empaquetada. A continuación, se describen los pasos para instalar y ejecutar este proyecto en tu computadora.

## Requisitos previos

Asegúrate de tener Node.js y npm (el administrador de paquetes de Node.js) instalados en tu computadora. Puedes descargarlos desde [nodejs.org](https://nodejs.org/). Se recomienda instalar la versión LTS.

Asegúrate de tener instalado Git, puedes descargarlo desde https://git-scm.com/. se recomienda instalar la opción: Standalone Installer

## Nota

Antes de continuar con los pasos de instalación espera a que Node.js y git sean instalados.

## Pasos de instalación

1.  **Clona el repositorio:**

    Abre tu terminal o línea de comandos y ejecuta el siguiente comando para clonar este repositorio:

    git clone https://github.com/Villegas-06/tekusBitcoin.git

2.  **Accede al directorio del proyecto:**

    Ve al directorio del proyecto que acabas de clonar y escribe el siguiente comando:

    cd tekusBitcoin

    2.1. **Accede a la carpeta del principal:**

        Luego de haber ejecutado el paso anterior dirigete a la carpeta princiapl y escribe el siguiente comando:

        cd front

    2.2. **Instala las dependencias de node:**

        Ejecuta el siguiente comando para instalar las dependencias de node:

        npm install

    2.3. **Añade angular:**

        Ejecuta el siguiente compando para instalar las dependencias de angular:

        npm install -g @angular/cli

    2.3. **Añade los modulos de electron usados:**

        Ejecuta el siguiente compando para instalar las dependencias de electron usados:

        npm install electron electron-fetch electron-builder is-online

    2.4 **Lanza la aplicacion:**

        En una terminal ubicado en la carpeta *front* del proyecto ejecuta el siguiente comando:

        ng serve

        Esto lanzará la aplicación de angular

        Nota: aquí no está el código solo se debe lanzar la aplicación para la correcta ejecución del proyecto.

    2.5 **Lanza la aplicación de Electron:**

        En otra terminal (diferente a la del paso anterior) ubicado también en la carpeta *front* ejecuta el siguiente comando:

        npm run electron

        Esto abrirá automaticamente una ventana en la cual se encuentra la aplicación.

# Uso

Puedes acceder a la aplicación visitando ejecutando el comando del paso 2.4 y 2.5. El empaquetador de Electron se encarga de la parte lógica de esta y la aplicación Angular maneja la interfaz de usuario.
