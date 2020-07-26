//setup express
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

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
//setup path
const path = require('path');

//routes

//root
app.get('/', (req, res) => {
    console.log('/')
    res.send('Server is up and running.')
});

//html
app.get('/htmlHeartbeat', (req, res) => {
    console.log('htmlheartbeat')
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/pingSql', (req, res, next) => {
    
    sql.connect(sqlConfig, (err) => {
        
        if (err){
            console.log(err)
            res.send(`Oops. Can't connect to ${sqlConfig.server};${sqlConfig.database}`)
            //cease code execution but keep server alive
            return next(err)
        };

        let sqlRequest = new sql.Request();
        let sqlQuery = 'SELECT @@VERSION';

        sqlRequest.query(sqlQuery, (err, data) => {
            
            if (err){
                console.log(err)
                res.send('Established a connection, but could not fulfil SQL request.')
            };

            //return SQL data
            console.log(data);
            console.table(data.recordset);
            console.log(data.rowsAffected);
            console.log(data.recordset[0]);
            
            //close SQL connection
            sql.close();

            res.send('Success. Data:' + data)
        });


    });
    
});

app.listen(port, () => {
    console.log(`Server is running on ${port}...`)
});
