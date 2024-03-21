import Client from '#models/client'
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

type TFormatClient = {
  name: string
  surname: string
  mothers_surname: string | null
  email: string
  birthdate: string
  age: number
}

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

  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 10)
      const dataPage = await indexClientValidator.validate({ page, per_page: perPage })
      const data = await Client.query().paginate(dataPage.page, dataPage.per_page)
      const formattedClients: TFormatClientsPaginate[] = data.toJSON().data.map((client) => ({
        id: client.id,
        full_name: `${client.name} ${client.surname}`,
        age: calculateAge(client.birthdate),
        birthdate: client.birthdate.toISOString().split('T')[0],
      }))
      return response.status(200).json(formattedClients)
    } catch (error) {
      let errorObject = { error: 'Error:', details: error.message }
      if (error instanceof errors.E_VALIDATION_ERROR) {
        errorObject = { error: 'Error de validación:', details: error.message }
      }
      return response.status(400).json(errorObject)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const payload = await showClientValidator.validate({ id: params.id })
      const dataClient = await Client.findOrFail(payload.id)
      const formattedClient: TFormatClient = {
        name: dataClient.name,
        surname: dataClient.surname,
        mothers_surname: dataClient.mothers_surname,
        email: dataClient.email,
        birthdate: dataClient.birthdate.toISOString().split('T')[0],
        age: calculateAge(dataClient.birthdate),
      }
      return response.status(200).json(formattedClient)
    } catch (error) {
      let errorObject = { error: 'Error:', details: error.message }
      if (error instanceof errors.E_VALIDATION_ERROR) {
        errorObject = { error: 'Error de validación:', details: error.message }
      }
      return response.status(400).json(errorObject)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(updateClientValidator)
      const payload = await showClientValidator.validate({ id: params.id })
      const dataClient = await Client.findOrFail(payload.id)
      if ('name' in data && data.name !== undefined) {
        dataClient.name = data.name
      }
      if ('surname' in data && data.surname !== undefined) {
        dataClient.surname = data.surname
      }
      if ('mothers_surname' in data && data.mothers_surname !== undefined) {
        dataClient.mothers_surname = data.mothers_surname
      }
      if ('email' in data && data.email !== undefined) {
        dataClient.email = data.email
      }
      if ('birthdate' in data && data.birthdate !== undefined) {
        dataClient.birthdate = data.birthdate
      }
      await dataClient.save()
      return response
        .status(200)
        .json({ message: `Cliente con el "id: ${payload.id}" se actualizo correctamente` })
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

function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
