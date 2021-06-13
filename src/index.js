const app = require('./app');
const path = require('path');
const { dbConnection } = require('./db/config');
const port = process.env.PORT || 5000;
dbConnection();
app.listen(port, () => {
    console.log('Server is running at port: ' + port);
});