'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KomikSchema extends Schema {
  up () {
    this.create('komiks', (table) => {
      table.increments()
      table.string('judul', 100).notNullable()
      table.string('penulis', 100).notNullable()
      table.string('penerbit', 100).notNullable()
      table.integer('tahun_terbit').notNullable()
      table.text('sinopsis')
      table.integer('jumlah_halaman')
      table.string('genre', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('komiks')
  }
}

module.exports = KomikSchema