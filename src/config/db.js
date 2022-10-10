const {createPool} = require('mysql');

const pool = createPool({
    host     : 'localhost',
    user     : 'root',
    port     : '3306',
    database : 'testing_db'
});

pool.getConnection((err)=>
{
    if(err){
        console.log("error connecting to db...");
    }
    else{
        console.log('connected to db');
    }
});

const executeQuery = (query, arraParms) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, arraParms, (err, data) =>{
                if(err){
                    console.log('error in executing query');
                    reject(err);
                }
                resolve(data);
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {executeQuery};