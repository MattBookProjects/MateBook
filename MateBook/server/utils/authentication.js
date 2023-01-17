function Authentication(){
    this.generateAuthToken = () => {
        return '00000000'
    };
    this.hashPassword = (password) => {
        return password;
    }
}

const authentication = new Authentication();

export default authentication;