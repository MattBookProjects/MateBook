

export function validateStringInput(string){
    if ( typeof string !== 'string' || string === '' ){
        console.log('throwing');
        throw 'InvalidInputError';
    }
    return string;
}

export function validateNumberInput(number){
    const num = Number(number);
    if (!num) {
        throw 'InvalidInputError';
    }
    return num;
}

export function hashPassword(password){
    return password;
}

export function generateAuthToken(){
    return '000000000';
}

export function getSqlConditionalFromObject(object){
    let keys = Object.keys(object);
    let conditions = []
    keys.forEach(key => conditions.push(`${key}='${object[key]}'`));
    return conditions.join(' AND ');
}

export function getSqlInsertStatementFromObject(object){
    let keys = Object.keys(object);
    let values = keys.map(key => `'${object[key]}'`);
    let keysString = keys.join(', ');
    let valuesString = values.join(', ');
    return `(${keysString}) VALUES (${valuesString})`;
}

export function convertSqlRowToObject(row){
    let keys = Object.keys(row);
    let object = {};
    keys.forEach(key => object[key] = row[key].value);
    return object;
}