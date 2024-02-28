const express = require("express");
const bodyParser = require("body-parser");
const { log } = require("./Database/LogRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const repo = require("./Database/UserRepository");
const ptoeRepo = require("./Database/ptoeRepository");
const tableResolver = require("./Resolvers/table-resolver");
const athResolver = require("./Resolvers/ath-resolver");
const aiResolver = require("./Resolvers/ai-resolver");
const commonResolver = require("./Resolvers/common-resolver");
const appconfig = require("./appconfig.json");
const { errorHandler } = require("./Middlewares/errorHanlder");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
const cors = require("cors");
const { getPaginatedCpStocks } = require("./Resolvers/cp-resolver");
const { getUserDetail, updateUser } = require("./Resolvers/user-resolver");
app.use(cors());

const authenticateToken = (req, res, next) => {
  if (req.url == "/login" || req.url == "/register") {
    next();
    return;
  }
  const token = req.headers["authorization"];
  if (token == null) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  jwt.verify(token, "way DARAM ATISH MIGIRAM123980dsgadsukadsvfagdhsvf232132vsghavsd sd dyewyugewguydsdagfghsdfgdsfgydu", (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.iat + 24 * 60 * 60 < currentTimestamp) {
      return res
        .status(401)
        .json({ message: "Authentication token has expired" });
    }
    req.user = decodedToken;
    next();
  });
};
const authorize = (req, res, next) => {
  if (req.url == "/login" || req.url == "/register") {
    next();
    return;
  }
  req.user.claims = req.user.claims ? req.user.claims : {};
  if (req.url.includes("/board") && !req.user.claims.hasOwnProperty("bo")) {
    return res.status(403).json({ message: "access denied!" });
  }
  if (req.url.includes("/ath") && !req.user.claims.hasOwnProperty("ath")) {
    return res.status(403).json({ message: "access denied!" });
  }
  if (req.url.includes("predict") && !req.user.claims.hasOwnProperty("ai")) {
    return res.status(403).json({ message: "access denied!" });
  }
  if (req.url.includes("tech") && !req.user.claims.hasOwnProperty("tech")) {
    return res.status(403).json({ message: "access denied!" });
  }
  next();
};
app.use(authenticateToken);
app.use(authorize);
try {
  app.get("/api/ptoe", async (req, res) => {
    try {
      res.status(200).json(await ptoeRepo.getData());
    } catch (e) {
      res.status(500).send("something went wrong");
    }
  });
  app.get("/api/board/getOne", tableResolver.getTable);
  app.get("/api/board/categories", tableResolver.getCategories);
  app.get("/api/board/getAll", tableResolver.getAllBoard);
  app.get("/api/common/getStocks", commonResolver.getStocks);
  app.get("/api/ath/getAll", athResolver.getAll);
  app.get("/api/ath/getOne", athResolver.getOne);
  app.get("/api/predict", aiResolver.getPrediction);
  app.get("/api/cp/getpaginated",getPaginatedCpStocks)
  app.get("/getUserDetail",getUserDetail)
  app.post("/updateUser",updateUser)
  app.get("/", function (req, res) {
    return "helloworld";
  });
  app.post("/register", async (req, res) => {
    try {
      const validateRequest = () => {
        if (!req.body.username) return "user name is required!";
        if (!req.body.password) return "password is required!";
        const isNationalCodeRegex = /^\d{10}$/;
        const isNationalCodeValid = isNationalCodeRegex.test(
          req.body.nationalcode
        );
        if (!isNationalCodeValid)
          return "national code is required and should be number contains 10 digits!";
        return undefined;
      };
      const entryValidationMessage = validateRequest();
      if (entryValidationMessage) {
        return res.status(400).json({ message: entryValidationMessage });
      }
      if (
        appconfig.ReferrerCodes.FullAccess != req.body.referrerCode &&
        appconfig.ReferrerCodes.Ordinary != req.body.referrerCode
      )
        return res
          .status(403)
          .json({ message: "you are not authorized to register account" });
      const existingUser = await repo.getUserExistance(
        req.body.username,
        req.body.nationalcode
      );
      if (existingUser) {
        return res.status(409).json({
          message: "User with username or national code already exists",
        });
      }
      const salt = await bcrypt.genSalt();

      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const claims =
        appconfig.ReferrerCodes.FullAccess == req.body.referrerCode
          ? {
              tech: 1,
              ai: 1,
              ath: 1,
              bo: 1,
            }
          : {};
      await repo.createUser(
        req.body.phonenumber,
        req.body.email,
        hashedPassword,
        req.body.firstname,
        req.body.lastname,
        req.body.username,
        req.body.nationalcode,
        req.body.type,
        req.body.companyname,
        claims
      );
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      await log(`${err} in register`);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.post("/login", async (req, res) => {
    try {
      const user = await repo.getUserById(req.body.username);
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
      const tokenData = {
        username: user._id,
        claims: user.claims,
      };
      const token = jwt.sign(
        tokenData,
        "way DARAM ATISH MIGIRAM123980dsgadsukadsvfagdhsvf232132vsghavsd sd dyewyugewguydsdagfghsdfgdsfgydu"
      );
      res.json({ token });
    } catch (err) {
      await log(`${err} in login`);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.post("/addAccessToUser", async (req, res, next) => {
    try {
      const adminUser = await repo.getUserById(req.user.username);
      if (!adminUser.IsAdmin)
        return res.status(403).json({ message: "admin access is required!" });
      const user = await repo.getUserById(req.body.username);
      user.claims = !user.claims ? {} : user.claims;
      user.claims = { ...user.claims, [req.body.featureId]: 1 };
      await repo.updateUser(user);
      return res
        .status(200)
        .json({ message: "access successfully dedicated to user" });
    } catch (e) {
      next(e.message);
    }
  });
  app.get("/valid", (req, res) => {
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
