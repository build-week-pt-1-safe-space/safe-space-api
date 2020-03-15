exports.up = function(knex, Promise) {
    return knex.schema.createTable('messages', tbl => {
        // ID auto incrementes
        tbl.increments();
  
        // Strings
        tbl.string('body').notNullable();
        tbl.string('created_at').notNullable();
        tbl.string('send_time').notNullable();

        // Integers
        tbl.integer('user_id')
           .notNullable()
           .references( 'id' )
           .inTable( 'users' )
           .onDelete( 'CASCADE' )
           .onUpdate( 'CASCADE' )
;
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('messages');
  };
