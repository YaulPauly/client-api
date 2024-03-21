import Client from '#models/client'
import { createClientValidator } from '#validators/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientsController {
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createClientValidator)
      await Client.create(data)
      response.status(201).json({ message: 'Cliente creado correctamente' })
    } catch (error) {
      response.status(400).json({ error: 'Error de validación:', details: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const client = await Client.findOrFail(params.id)
      response.status(204).json({ message: 'Se elimino correctamente al cliente' })
      return client.delete()
    } catch (error) {
      response.status(400).json({ error: 'Error de validación:', details: error.message })
    }
  }
}
