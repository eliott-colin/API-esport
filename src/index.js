require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");

// Middlewares de base
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const v1AuthRouter = require("./v1/routes/authRoutes");
const v1UsersRouter = require("./v1/routes/usersRoutes");
const v1UniversitiesRouter = require("./v1/routes/universitiesRoutes");


// Routes
app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1/users", v1UsersRouter);
app.use("api/v1/universities", v1UniversitiesRouter)

// Swagger documentation
const swaggerPath = path.join(__dirname, "v1", "swagger.json");
if (fs.existsSync(swaggerPath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`API on :${port}`));
}
module.exports = app;
