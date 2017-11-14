
exports.up = function(knex, Promise) {
  return knex.schema.createTable('my_user', function(table){
  table.increments()
  table.text('agentName')
  table.text('password')
})
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('my_user')
}
