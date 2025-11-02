// make intermediary pool for tight coupling of postgres , control and error handling , test and mocking , clean architecture
import pool from "../config/dbConfig.js";

const db = {
    query : (text , params) => {
        console.log("Running query:" , text);
        return pool.query(text , params);
    }
};

export default db;