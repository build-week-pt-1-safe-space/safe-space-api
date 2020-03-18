const Users = require('../../models/users_model');
const db = require('../../data/dbConfig');

const newUser = { 
    email: "Something_new5@gmail.com", 
    first_name: "Bobby", 
    last_name: "Boy", 
    password: "something", 
    phone: "5555555555", 
    profile_pic: "Link",
    gender: "M"
}

describe('User Model Tests:', () => {
    it('Users.get() should return an array containing all users', async () => {
        const users = await Users.get();

        expect(users[0].id).toBe(2)
    });

    it('Users.getBy(email) should return a single user based on email', async () => {
        const user = await Users.getBy({ email: "alsome@gmail.com" });
    
        expect(user.id).toBe(2)
        expect(user.email).toBe("alsome@gmail.com")
    });

    it('Users.getBy(id) should return a single user based on id', async () => {
        const user = await Users.getBy({ id: 3 });
    
        expect(user.id).toBe(3)
        expect(user.email).toBe("You@gmail.com")
    });

    it('Users.getBy(null || undefined) should return an array containing "No Filter Found" ', async () => {
        const nullUser = await Users.getBy(null);
        const undefinedUser = await Users.getBy(undefined);
        
        expect(nullUser[0]).toBe("No Filter Found")
        expect(undefinedUser[0]).toBe("No Filter Found")
    });

    it('Users.insert(user) should add a new user to the database', async () => {
        await Users.insert(newUser)
    
        const users = await db('users')

        expect(users.length).toBe(5);

        await db('users').where({ id: users[4].id }).del();
    });

    it('Users.insert(user) should return the new user object', async () => {
        const addedUser = await Users.insert(newUser)

        expect(addedUser.email).toBe("Something_new5@gmail.com");

        await db('users').where({ id: addedUser.id }).del();
    });

    it('Users.insert(null || undefined) should return an array containing "Missing Data"', async () => {
        const nullUser = await Users.insert(null)
        const undefinedUser = await Users.insert(undefined)

        expect(nullUser[0]).toBe("Missing Data");
        expect(undefinedUser[0]).toBe("Missing Data");
    });

    it('Users.update(data) should return the updated data', async () => {
        const updatedUser = await Users.update(5, { email: "updated@gmail.com" })

        expect(updatedUser.email).toBe("updated@gmail.com");
    });

    it('Users.update(id, null || undefined) should return an array containing "Missing Data"', async () => {
        const nullUser = await Users.update(5, null)
        const undefinedUser = await Users.update(5, undefined)

        expect(nullUser[0]).toBe("Missing Data");
        expect(undefinedUser[0]).toBe("Missing Data");
    });

    it('Users.update(null || undefined, data) should return an array containing "Missing Data"', async () => {
        const nullUser = await Users.update(null, { email: "update" })
        const undefinedUser = await Users.update(undefined, { email: "update" })

        expect(nullUser[0]).toBe("Missing Data");
        expect(undefinedUser[0]).toBe("Missing Data");
    }); 

    it('Users.remove(id) should return the removed user object', async () => {
        const addedUser = await Users.insert(newUser);

        const result = await Users.remove( addedUser.id )

        expect(result.id).toBe(addedUser.id);
    });

    it('Users.remove(id) should remove a user from the database', async () => {
        const addedUser = await Users.insert(newUser);

        await Users.remove( addedUser.id )

        const users = await Users.get();

        expect(users.length).toBe(4);
    });

    it('Users.remove(null || undefined) should return an array containing "Missing ID"', async () => {
        const nullRemove = await Users.remove( null )
        const unedfinedRemove = await Users.remove( undefined )

        expect(nullRemove[0]).toBe("Missing ID");
        expect(unedfinedRemove[0]).toBe("Missing ID");
    });

    it('Users.findMessages(id) should return an array of user messages', async () => {
        const messages = await Users.findMessages(2)

        expect(messages.length).toBe(3);
    });
});
