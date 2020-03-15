const db = require('../data/dbConfig');

class Model {
    constructor(name) {
        this.name = name
    }

    get() {
        return db(this.name);
    }

    getBy(filter) {
        if(!filter) return [ "No Filter Found" ];

        return db(this.name).where(filter);
    }

    async insert(data) {
        if(!data) return [ "Missing Data" ]

        const idArray = await db(this.name).insert(data);

        return db(this.name).where({ id: idArray[0] }).first();
    }

    async update(id, data) {
        if(!data || !id) return [ "Missing Data" ]

        const success = await db(this.name).where({ id }).update(data).returning('*');

        if( success ) return db(this.name).where({ id }).first();
        else return [ "Error While Updating" ]
    }

    async remove(id) {
        if( !id ) return [ "Missing ID" ]

        const removed = await db(this.name).where({ id }).first();
        
        await db(this.name).where({ id }).del();

        return removed;
    } 
}

module.exports = Model;