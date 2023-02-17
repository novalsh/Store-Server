const express = require('express');
const app = express();
const port = 8000 || process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

