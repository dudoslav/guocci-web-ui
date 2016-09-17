import { User } from './user';

describe('User', () => {

    let user: User;

    beforeEach(() => {
        user = {name: 'Gabor', id: 32, email: 'gabor@bodrog.hu'};
    });

    it('has name', () => {
        expect(user.name).toEqual('Gabor');
    });

    it('has id', () => {
        expect(user.id).toEqual(32);
    });

    it('has email', () => {
        expect(user.email).toEqual('gabor@bodrog.hu');
    });
});
