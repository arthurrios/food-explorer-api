require("dotenv/config")
const express = require('express');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));