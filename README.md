# Microservicio de Gestión de Clientes

Este microservicio proporciona una API para la gestión de clientes, permitiendo realizar operaciones como registrar, actualizar, consultar y eliminar clientes, así como obtener una lista de clientes paginada.

## Funcionalidades Principales
- **POST /clients**: Registra nuevos clientes con datos como nombre, apellidos, correo electrónico y fecha de nacimiento.
- **GET /clients/:id**: Obtiene los detalles de un cliente específico por su ID, incluyendo su nombre completo, correo electrónico, fecha de nacimiento y edad calculada.
- **PUT /clients/:id**: Actualiza los datos de un cliente existente, siguiendo las mismas reglas de validación que en la creación.
- **DELETE /clients/:id**: Elimina lógicamente un cliente.
- **GET /clients**: Devuelve una lista paginada de clientes, con información como ID, nombre completo, edad y fecha de nacimiento.

## Tecnologías Utilizadas
- Node.js
- Adonis.js
- ORM Lucid
- Swagger (para documentar cada endpoint)
  ![image](https://github.com/YaulPauly/client-api/assets/110009653/fcbed642-b43e-4890-8755-2d78daf26280)
- Vine.js (para validaciones)
- Postman
  ![image](https://github.com/YaulPauly/client-api/assets/110009653/74153a04-a360-4127-a68c-274378fc7721)

## Configuración del Entorno Local
Crea tu base de datos y agrega tus variables de entorno para la conexión.
Para ejecutar este proyecto localmente, asegúrate de tener Node.js instalado en tu sistema. Se recomienda utilizar una versión específica de Node (20.11.10), que puede gestionarse utilizando NVM (Node Version Manager).

## Pasos para Ejecutar el Proyecto Localmente
1. Clona este repositorio en tu máquina local.
    ```bash
    git clone <URL_del_repositorio>
    ```

2. Abre una terminal y navega hasta el directorio del proyecto.
    ```bash
    cd cliente-api
    ```

3. Instala todas las dependencias necesarias.
    ```bash
    npm install
    ```

4. Realiza todas las migraciones de la base de datos.
    ```bash
    node ace make:migration run
    ```

5. Inicia el servidor.
    ```bash
    npm run dev || noce ace serve
    ```

¡Listo! Ahora puedes acceder a la API del Microservicio de Gestión de Clientes localmente en la dirección especificada en el archivo de configuración del servidor. Asegúrate de revisar la documentación Swagger para obtener detalles sobre cómo interactuar con cada endpoint de la API.
