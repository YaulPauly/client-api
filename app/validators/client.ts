import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(50),
    surname: vine.string().trim().minLength(2).maxLength(50),
    mothers_surname: vine.string().trim().maxLength(50).optional(),
    email: vine
      .string()
      .trim()
      .email()
      .minLength(10)
      .maxLength(100)
      .unique(async (db, value) => {
        const client = await db.from('clients').where('email', value).first()
        return !client
      }),
    birthdate: vine.date().beforeOrEqual(() => {
      const today = new Date()
      const dateOld = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
      let datePermited = dateOld.toISOString().split('T')[0]

      return datePermited
    }),
  })
)

export const indexClientValidator = vine.compile(
  vine.object({
    page: vine.number().withoutDecimals().positive().min(1),
    per_page: vine.number().withoutDecimals().positive().max(1000),
  })
)

export const showClientValidator = vine.compile(
  vine.object({
    id: vine
      .number()
      .withoutDecimals()
      .positive()
      .unique(async (db, value) => {
        const client = await db.from('clients').where('id', value).first()
        return client
      }),
  })
)

export const updateClientValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(50),
    surname: vine.string().trim().minLength(2).maxLength(50),
    mothers_surname: vine.string().trim().maxLength(50).optional(),
    email: vine
      .string()
      .trim()
      .email()
      .minLength(10)
      .maxLength(100)
      .unique(async (db, value, helpers) => {
        const { id } = helpers.data.params
        const client = await db.from('clients').where('email', value).whereNot('id', id).first()
        return !client
      }),
    birthdate: vine.date().beforeOrEqual(() => {
      const today = new Date()
      const dateOld = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
      let datePermited = dateOld.toISOString().split('T')[0]

      return datePermited
    }),
  })
)

export const deleteClientValidator = vine.compile(
  vine.object({
    id: vine
      .number()
      .withoutDecimals()
      .positive()
      .unique(async (db, value) => {
        const client = await db.from('clients').where('id', value).first()
        return client
      }),
  })
)
