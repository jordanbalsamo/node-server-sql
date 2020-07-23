//setup express
const express = require('express');
const app = express();

//setup mssql
const sql = require('mssql');
const sqlConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    port: 1433,
    //required for Azure based SQL instances
    options: {
        encrypt: true
    }
}
const port = process.env.PORT || 5000;

//routes
app.get('/', (req,res) => {
    res.send('Server is up and running.')
})

app.get('/pingSql', (req, res) => {
    
    sql.connect(sqlConfig, (err) => {
        
        if (err){
            console.log(err)
            res.send(`Oops. Can't connect to ${sqlConfig.server};${sqlConfig.database}`)
        }

        let sqlRequest = new sql.Request();
        let sqlQuery = 'SELECT @@VERSION';

        sqlRequest.query(sqlQuery, (err, data) => {
            
            if (err){
                console.log(err)
                res.send('Established a connection, but could not fulfil SQL request.')
            }

            //return SQL data
            console.log(data);
            console.table(data.recordset);
            console.log(data.rowsAffected);
            console.log(data.recordset[0]);
            res.send('Success. Check console to confirm results of query :)')
        })


    })
    
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
