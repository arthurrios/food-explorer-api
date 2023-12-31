require("dotenv/config")
require("express-async-errors");
const cors = require("cors")
const express = require('express');
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['https://foodexplorer-r2.netlify.app' ,'http://localhost:5173'],
    credentials: true 
  }))

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use(( error, req, res, next ) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error)

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));