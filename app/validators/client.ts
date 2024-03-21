import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
    surname: vine.string().trim().minLength(2),
    mothers_surname: vine.string().trim().optional(),
    email: vine
      .string()
      .trim()
      .email()
      .minLength(10)
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
    per_page: vine.number().withoutDecimals().positive().range([1, 10]),
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
    name: vine.string().trim().minLength(2).optional(),
    surname: vine.string().trim().minLength(2).optional(),
    mothers_surname: vine.string().trim().optional(),
    email: vine
      .string()
      .trim()
      .email()
      .minLength(10)
      .unique(async (db, value) => {
        const client = await db.from('clients').where('email', value).first()
        return !client
      })
      .optional(),
    birthdate: vine
      .date()
      .beforeOrEqual(() => {
        const today = new Date()
        const dateOld = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
        let datePermited = dateOld.toISOString().split('T')[0]

        return datePermited
      })
      .optional(),
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
