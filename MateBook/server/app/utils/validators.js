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
/*
    this.validateMediaInput = (media) => {
        if (media){
            if(Array.isArray(media)){
                media.forEach(element => {
                    if (element.type !== 'VIDEO' && element.type !== 'IMAGE'){
                        throw 'InvalidInputError';
                    }
                    if ()
                })
            }
        }
        if (media.video)
    }; */
};

const validators = new Validators();

export default validators;