function SqlHelpers(){
    this.getSqlConditionalFromObject = (object) => {
        if (typeof object !== 'object' || Array.isArray(object)){
            throw 'NonObjectInputError';
        }
        let keys = Object.keys(object);
        if ( keys.length === 0){
           throw 'EmptyObjectInputError'
        }
        let conditions = []
        keys.forEach(key => conditions.push(`${key}='${object[key]}'`));
        return conditions.join(' AND ');
    };
    this.getSqlInsertStatementFromObject = (object) => {
        if (typeof object !== 'object' || Array.isArray(object)){
            throw 'NonObjectInputError';
        }
        let keys = Object.keys(object);
        if ( keys.length === 0){
           throw 'EmptyObjectInputError'
        }
        let values = keys.map(key => `'${object[key]}'`);
        let keysString = keys.join(', ');
        let valuesString = values.join(', ');
        return `(${keysString}) VALUES (${valuesString})`;
    };
    this.convertSqlRowToObject = (row) => {
        if (typeof row !== 'object' || Array.isArray(row)){
            throw 'NonObjectInputError';
        }
        let keys = Object.keys(row);
        let object = {};
        keys.forEach(key => object[key] = row[key].value);
        return object;
    };
    this.getSqlUpdateStatementFromObject = (object) => {
        if (typeof row !== 'object' || Array.isArray(row)){
            throw 'NonObjectInputError';
        }
        let keys = Object.keys(object);
        if ( keys.length === 0){
           throw 'EmptyObjectInputError'
        }
        let values = [];
        keys.forEach(key => values.push(`${key}=${object[key]}`));
        return values.join(', ')
    }
};

const sqlHelpers = new SqlHelpers();

export default sqlHelpers;
