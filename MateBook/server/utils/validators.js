function Validators(){
    this.validateStringInput = (string) => {
        if ( typeof string !== 'string' || string === '' ){
            throw 'InvalidInputError';
        }
        return string;
    };
    this.validateNumberInput = (number) => {
        if ( typeof number === 'number' ){
            return number;
        } else if ( typeof number === 'string' ){
            const casted = Number(number);
            if ( casted || casted === 0 ){
                return casted
            }
        }
        throw 'InvalidInputError';
    };
};

const validators = new Validators();

export default validators;