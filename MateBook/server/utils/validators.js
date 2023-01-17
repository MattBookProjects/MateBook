function Validators(){
    this.validateStringInput = (string) => {
        if ( typeof string !== 'string' || string === '' ){
            console.log('throwing');
            throw 'InvalidInputError';
        }
        return string;
    };
    this.validateNumberInput = (number) => {
        console.log(typeof number);
        if ( typeof number === 'number' ){
            return number;
        } else if ( typeof number === 'string' ){
            const casted = Number(number);
            console.log('CASTED: ', casted)
            if ( casted || casted === 0 ){
                return casted
            }
        }
        throw 'InvalidInputError';
    };
};

const validators = new Validators();

export default validators;