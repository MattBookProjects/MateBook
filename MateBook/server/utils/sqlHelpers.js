function SqlHelpers(){
    this.getSqlConditionalFromObject = (object) => {
        let keys = Object.keys(object);
        let conditions = []
        keys.forEach(key => conditions.push(`${key}='${object[key]}'`));
        return conditions.join(' AND ');
    };
    this.getSqlInsertStatementFromObject = (object) => {
        let keys = Object.keys(object);
        let values = keys.map(key => `'${object[key]}'`);
        let keysString = keys.join(', ');
        let valuesString = values.join(', ');
        return `(${keysString}) VALUES (${valuesString})`;
    };
    this.convertSqlRowToObject = (row) => {
        let keys = Object.keys(row);
        let object = {};
        keys.forEach(key => object[key] = row[key].value);
        return object;
    };
};

const sqlHelpers = new SqlHelpers();

export default sqlHelpers;
