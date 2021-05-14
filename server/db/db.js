const knex = require('knex')
const knexFile = require('./knexFile')

const db = knex(knexFile.development)
module.exports = db