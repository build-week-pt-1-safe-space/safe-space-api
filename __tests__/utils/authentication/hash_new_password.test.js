const hashNewPassword = require('../../../utils/authentication/hash_new_password');

const user = {
    "name": "Bob",
    "password": "password"
}

describe('Utility - Authentication: Hash New User\'s Password', () => {
    it('hashNewPassword(user) should hash and overide the user\'s password', () => {
        const test_user = { ...user }

        hashNewPassword(test_user);

        const old_password_length = user.password.length;
        const new_password_length = test_user.password.length; 

        expect(test_user.password).not.toBe(user.password);
        expect(old_password_length < new_password_length).toBe(true);
    });

    it('hashNewPassword(null || undefined) should return false', () => {
        const resultNull = hashNewPassword(null);
        const resultUndefined = hashNewPassword(undefined);

        expect(resultNull).toBe(false);
        expect(resultUndefined).toBe(false);
    });

    it('hashNewPassword({}) should return false', () => {
        const resultEmpty = hashNewPassword({});

        expect(resultEmpty).toBe(false);
    });

    it('hashNewPassword({ password: null || undefined }) should return false', () => {
        const resultEmpty = hashNewPassword({});
        const resultNull = hashNewPassword({ password: null})

        expect(resultEmpty).toBe(false);
        expect(resultNull).toBe(false);
    });
});