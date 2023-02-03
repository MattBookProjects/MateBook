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
        if (typeof object !== 'object' || Array.isArray(object)){
            throw 'NonObjectInputError';
        }
        let keys = Object.keys(row);
        let object = {};
        keys.forEach(key => object[key] = row[key].value);
        return object;
    };
};

const sqlHelpers = new SqlHelpers();

export default sqlHelpers;
