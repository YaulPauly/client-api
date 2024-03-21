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

router.post('clients', [ClientsController, 'store'])
router.get('clients', [ClientsController, 'index'])
router.get('clients/:id', [ClientsController, 'show'])
router.put('clients/:id', [ClientsController, 'update'])
router.delete('clients/:id', [ClientsController, 'destroy'])
