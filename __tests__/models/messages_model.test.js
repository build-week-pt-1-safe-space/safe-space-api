const Messages = require('../../models/messages_model');
const db = require('../../data/dbConfig');

const newMessage = { 
    body: "Hello World", 
    created_at: "20/20/2020", 
    send_time: "12:12", 
    user_id: 1
}

describe('Message Model Tests:', () => {
    it('Messages.get() should return an array of all messages in database', async () => {
        const messages = await Messages.get();

        expect(messages.length).toBe(8)
    });

    it('Messages.getBy(id) should return a single message based on id', async () => {
        const message = await Messages.getBy({ id: 3 });
    
        expect(message.length).toBe(1)
        expect(message[0].id).toBe(3)
    });

    it('Messages.getBy(null || undefined) should return an array containing "No Filter Found" ', async () => {
        const nullMessage = await Messages.getBy(null);
        const undefinedMessage = await Messages.getBy(undefined);
        
        expect(nullMessage[0]).toBe("No Filter Found")
        expect(undefinedMessage[0]).toBe("No Filter Found")
    });

    it('Messages.insert(message) should add a new message to the database', async () => {
        await Messages.insert(newMessage)
    
        const messages = await db('messages')

        expect(messages.length).toBe(9);

        await db('messages').where({ id: messages[8].id }).del();
    });
    
    it('Messages.insert(message) should return the new message object', async () => {
        const addedMessage = await Messages.insert(newMessage)

        expect(addedMessage.body).toBe("Hello World");

        await db('messages').where({ id: addedMessage.id }).del();
    });

    it('Messages.insert(null || undefined) should return an array containing "Missing Data"', async () => {
        const nullMessage = await Messages.insert(null)
        const undefinedMessage = await Messages.insert(undefined)

        expect(nullMessage[0]).toBe("Missing Data");
        expect(undefinedMessage[0]).toBe("Missing Data");
    });

    it('Messages.update(data) should return the updated data', async () => {
        const updatedMessage = await Messages.update(3, { body: "update" })

        expect(updatedMessage.body).toBe("update");
    });

    it('Messages.update(id, null || undefined) should return an array containing "Missing Data"', async () => {
        const nullMessage = await Messages.update(3, null)
        const undefinedMessage = await Messages.update(3, undefined)

        expect(nullMessage[0]).toBe("Missing Data");
        expect(undefinedMessage[0]).toBe("Missing Data");
    });

    it('Messages.update(null || undefined, data) should return an array containing "Missing Data"', async () => {
        const nullMessage = await Messages.update(null, { body: "update" })
        const undefinedMessage = await Messages.update(undefined, { body: "update" })

        expect(nullMessage[0]).toBe("Missing Data");
        expect(undefinedMessage[0]).toBe("Missing Data");
    }); 

    
    it('Messages.remove(id) should return the removed user object', async () => {
        const addedMessage = await Messages.insert(newMessage);

        const result = await Messages.remove( addedMessage.id )

        expect(result.id).toBe(addedMessage.id);
    });

    it('Messages.remove(id) should remove a user from the database', async () => {
        const addedMessage = await Messages.insert(newMessage);

        await Messages.remove( addedMessage.id )

        const messages = await Messages.get();

        expect(messages.length).toBe(8);
    });

    it('Messages.remove(null || undefined) should return an array containing "Missing ID"', async () => {
        const nullRemove = await Messages.remove( null )
        const unedfinedRemove = await Messages.remove( undefined )

        expect(nullRemove[0]).toBe("Missing ID");
        expect(unedfinedRemove[0]).toBe("Missing ID");
    });
});