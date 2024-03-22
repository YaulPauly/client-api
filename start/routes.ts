/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

const ClientsController = () => import('#controllers/clients_controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *          name:
 *            type: string
 *          surname:
 *            type: string
 *          mothers_surname:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *          birthdate:
 *            type: string
 *            format: date
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - birthdate
 */

router.post('clients', [ClientsController, 'store'])
/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Crear un nuevo Cliente
 *     tags:
 *       - Client
 *     requestBody:
 *       description: Esquema de creacion Cliente
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: Creacion de Cliente con exito
 *       400:
 *         description: Error en la validacion del request
 */

router.get('clients', [ClientsController, 'index'])
/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Obtener listado Clientes
 *     tags:
 *       - Client
 *     responses:
 *       200:
 *         description: Listado de Clientes obtenido con exito
 *       400:
 *         description: Error en la validacion del request
 */

router.get('clients/:id', [ClientsController, 'show'])
/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Obtener un Cliente mediante el ID
 *     tags:
 *       - Client
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Cliente que se desea obtener
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Cliente obtenido con exito
 *       400:
 *         description: Error en la validacion del request
 */

router.put('clients/:id', [ClientsController, 'update'])
/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Actualizar un Cliente mediante el ID
 *     tags:
 *       - Client
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Cliente que se desea actualizar
 *         schema:
 *           type: number
 *     requestBody:
 *       description: Esquema de actualizacion Cliente
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Actualizacion de Cliente con exito
 *       400:
 *         description: Error en la validacion del request
 */

router.delete('clients/:id', [ClientsController, 'destroy'])
/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Eliminar un Cliente mediante el ID
 *     tags:
 *       - Client
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Cliente que se desea eliminar
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Cliente se elimino con exito
 *       400:
 *         description: Error en la validacion del request
 */
