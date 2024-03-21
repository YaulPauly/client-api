import Client from '#models/client'
import { createClientValidator, deleteClientValidator } from '#validators/client'
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'

export default class ClientsController {
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createClientValidator)
      await Client.create(data)
      response.status(201).json({ message: 'Cliente creado correctamente' })
    } catch (error) {
      let errorObject = { error: 'Error:', details: error.message }
      if (error instanceof errors.E_VALIDATION_ERROR) {
        errorObject = { error: 'Error de validación:', details: error.message }
      }
      return response.status(400).json(errorObject)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const payload = await deleteClientValidator.validate({ id: params.id })
      const client = await Client.findOrFail(payload.id)
      client.delete()
      response.status(204)
    } catch (error) {
      response.status(400).json({ error: 'Error de validación:', details: error.message })
    }
  }
}
