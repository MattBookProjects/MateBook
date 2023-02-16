import { createHash } from 'crypto';

function Encryption(){
    this.generateAuthToken = () => {
        return '00000000'
    };
    this.hashPassword = (password) => {
        return createHash('sha256').update(password).digest('hex');
    }
}

const encryption = new Encryption();

export default encryption;