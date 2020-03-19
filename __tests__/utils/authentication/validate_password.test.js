const passwordIsValid = require('../../../utils/authentication/validate_password');

const user = {
    "id": 11,
    "email": "definitelynew5@gmail.com",
    "first_name": "Bobby",
    "last_name": "Boy",
    "password": "$2a$12$W3YYChYdrmURPJp13y4YvOGLWLhNjYj/8XHdO8QN6ajK4MCeyDrH2",
    "phone": "55555555555",
    "profile_pic": null,
    "gender": null
}

const correct_password = 'bettergethashed';
const incorrect_password = 'bettergetstashed';

describe('Utility - Authentication: Validate User Password', () => {
    it('passwordIsValid(user, correct_password) should return true', () => {
        const isValid = passwordIsValid(user, correct_password);

        expect(isValid).toBe(true);
    });

    it('passwordIsValid(user, incorrect_password) should return false', () => {
        const isValid = passwordIsValid(user, incorrect_password);

        expect(isValid).toBe(false);
    });

    it('passwordIsValid(user, null || undefined) should return false', () => {
        const isValidNull = passwordIsValid(user, null);
        const isValidUndefined = passwordIsValid(user, undefined);

        expect(isValidNull).toBe(false);
        expect(isValidUndefined).toBe(false);
    });

    it('passwordIsValid(null || undefined, correct_password) should return false', () => {
        const isValidNull = passwordIsValid(null, correct_password);
        const isValidUndefined = passwordIsValid(undefined, correct_password);

        expect(isValidNull).toBe(false);
        expect(isValidUndefined).toBe(false);
    });
});