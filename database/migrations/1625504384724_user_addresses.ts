import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserAddresses extends BaseSchema {
  protected tableName = 'user_addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('id').inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.integer('number').notNullable()
      table.string('street').notNullable()
      table.string('district')
      table.string('city').notNullable()
      table.string('state').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
