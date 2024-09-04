const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database')
require('dotenv').config();
const router = require('./routes')

connectDB();

const app = express();
app.use(bodyParser.json());

app.use('/health-check', async (req, res) => {
    res.json({
        check: "helloworld"
    })
})

app.use('/api/v1', router);
require('./docs/swagger')(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Server running on PORT: ", PORT);
});
