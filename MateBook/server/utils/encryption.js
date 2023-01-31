function Encryption(){
    this.generateAuthToken = () => {
        return '00000000'
    };
    this.hashPassword = (password) => {
        return password;
    }
}

const encryption = new Encryption();

export default encryption;