const express = require("express");
const bodyParser = require("body-parser");
const { log } = require("./Database/LogRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const repo = require("./Database/UserRepository");
const ptoeRepo = require("./Database/ptoeRepository");
const tableResolver = require("./Resolvers/table-resolver");
const aiResolver = require("./Resolvers/ai-resolver");
const commonResolver = require("./Resolvers/common-resolver");
const { errorHandler } = require("./Middlewares/errorHanlder");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid authentication token" });
    }
    req.user = user;
    next();
  });
};
try {
  app.get("/api/ptoe", async (req, res) => {
    try {
      res.status(200).json(await ptoeRepo.getData());
    } catch (e) {
      res.status(500).send("something went wrong");
    }
  });
  app.get("/api/board/getOne", tableResolver.getTable);
  app.get("/api/board/getAll", tableResolver.getAllBoard);
  app.get("/api/common/getStocks", commonResolver.getStocks);
  app.get("/api/predict", aiResolver.getPrediction);
  app.get("/", function (req, res) {
    return "helloworld";
  });
  app.post("/register", async (req, res) => {
    try {
      // check if user already exists
      const existingUser = await repo.getUserByEmail(req.body.email);
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "User with email already exists" });
      }

      // create new user object and hash password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      await repo.createUser(
        req.body.phonenumber,
        req.body.email,
        hashedPassword,
        req.body.fullname
      );
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      await log(`${err} in register`);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.post("/login", async (req, res) => {
    try {
      const user = await repo.getUserByEmail(req.body.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign({ id: user.id }, "secret_key");
      res.json({ token });
    } catch (err) {
      await log(`${err} in login`);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Protected API endpoint accessed successfully" });
  });
} catch (e) {
  next(e);
}

app.use(errorHandler);
// start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
