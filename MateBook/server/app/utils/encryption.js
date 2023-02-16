import { createHash } from 'crypto';

function Encryption(){
    this.generateAuthToken = () => {
        const symbols = '0123456789abcdef';
        let token = ''
        for (let i = 0; i < 16; i++){
            const index = Math.floor(Math.random() * 16);
            token = token + symbols.charAt(index)
        }
        return token;
    };
    this.hashPassword = (password) => {
        return createHash('sha256').update(password).digest('hex');
    }
}

const encryption = new Encryption();

export default encryption;