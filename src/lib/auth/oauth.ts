import { Google } from '../social/google';

export class OAuth {
    social?: Google;

    constructor(social?: Google) {
        this.social = social;
    }

    signIn = async () => {
        return await this.social?.signIn();
    };
}
