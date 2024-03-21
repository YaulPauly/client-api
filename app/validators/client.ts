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

export const deleteClientValidator = vine.compile(
  vine.object({
    id: vine.number().withoutDecimals(),
  })
)
