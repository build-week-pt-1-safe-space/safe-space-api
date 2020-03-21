const db = require('../data/dbConfig');
const BaseModel = require('./base_model');

class Users extends BaseModel {
        findMessages (id){
            return db(this.name).select('messages.id', 'messages.body', 'messages.created_at', 'messages.send_time')
                                .innerJoin('messages', 'users.id', '=', 'messages.user_id') 
                                .where({ 'users.id': id, 'messages.user_id': id })                    
        
        }
}

module.exports = new Users('users');