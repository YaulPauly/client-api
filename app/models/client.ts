import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@adonisjs/lucid/orm'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare surname: string

  @column({ columnName: 'mothers_surname', serializeAs: null })
  declare mothersSurname: string | null

  @column()
  declare email: string

  @column({ serialize: (value: Date) => value.toISOString().split('T')[0] })
  declare birthdate: Date

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @computed({ serializeAs: 'full_name' })
  get fullName() {
    if (this.mothersSurname) {
      return `${this.name} ${this.surname} ${this.mothersSurname}`
    }
    return `${this.name} ${this.surname}`
  }

  @computed()
  get age() {
    const today = new Date()
    let age = today.getFullYear() - this.birthdate.getFullYear()
    const month = today.getMonth() - this.birthdate.getMonth()

    if (month < 0 || (month === 0 && today.getDate() < this.birthdate.getDate())) {
      age--
    }

    return age
  }
}
