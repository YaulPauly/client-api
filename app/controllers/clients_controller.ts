import Client from '#models/client'
import { ModelObject } from '@adonisjs/lucid/types/model'
import {
  createClientValidator,
  deleteClientValidator,
  indexClientValidator,
  showClientValidator,
  updateClientValidator,
} from '#validators/client'
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'

type TFormatClientsPaginate = {
  id: number
  full_name: string
  age: number
  birthdate: string
}

export default class ClientsController {
  async store({ request, response }: HttpContext) {
    let data
    try {
      data = await request.validateUsing(createClientValidator)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        response.status(400).json({ message: 'Validation error', errors: error.messages })
        return
      }
      throw error
    }
    const newClient = await Client.create(data)
    response.status(201).json(newClient)
  }

  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    let dataPage: { page: number; per_page: number }
    try {
      dataPage = await indexClientValidator.validate({ page, per_page: perPage })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        response.status(400).json({ message: 'Validation error', errors: error.messages })
        return
      }
      throw error
    }
    const data = await Client.query().paginate(dataPage.page, dataPage.per_page)
    let clientsCount = data.toJSON().meta.total
    const formattedClients: TFormatClientsPaginate[] = data.toJSON().data.map((client) =>
      client.serialize({
        fields: {
          pick: ['id', 'full_name', 'age', 'birthdate'],
        },
      })
    )
    response.status(200).json({ total: clientsCount, data: formattedClients })
  }

  async show({ params, response, request }: HttpContext) {
    let payload: { id: number }
    try {
      payload = await showClientValidator.validate({ id: params.id })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        response.status(400).json({ message: 'Validation error', errors: error.messages })
        return
      }
      throw error
    }
    const dataClient = await Client.findOrFail(payload.id)
    const fields = request.input('fields')
    let formattedClient: ModelObject
    if (fields === undefined) {
      formattedClient = dataClient.serialize()
    } else {
      formattedClient = dataClient.serialize({
        fields: {
          pick: fields,
        },
      })
    }
    response.status(200).json(formattedClient)
  }

  async update({ params, request, response }: HttpContext) {
    let data
    try {
      data = await request.validateUsing(updateClientValidator)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        response.status(400).json({ message: 'Validation error', errors: error.messages })
        return
      }
      throw error
    }
    const payload = await showClientValidator.validate({ id: params.id })
    const dataClient = await Client.findOrFail(payload.id)
    dataClient.name = data.name
    dataClient.surname = data.surname
    dataClient.email = data.email
    dataClient.birthdate = data.birthdate

    if (data.mothers_surname) {
      dataClient.mothersSurname = data.mothers_surname
    }
    const updateClient = await dataClient.save()
    response.status(200).json(updateClient)
  }

  async destroy({ params, response }: HttpContext) {
    let payload
    try {
      payload = await deleteClientValidator.validate({ id: params.id })
    } catch (error) {
      response.status(400).json({ error: 'Error de validación:', details: error.message })
      return
    }
    const client = await Client.findOrFail(payload.id)
    client.delete()
    response.status(204)
  }
}
