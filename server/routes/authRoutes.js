const bcrypt = require("bcrypt");
const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const requireLogin = require("../middlewares/requireLogin");

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

module.exports = (app) => {
  app.get("/api/user/get/:id", async (req, res) => {
    const userId = req.params.id;
    const userInfor = await User.findById(userId);
    res.send(userInfor);
  });

  app.get(
    "/api/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/api/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.post(
    "/api/user/signin",
    checkNotAuthenticated,
    passport.authenticate("local", {
      failureRedirect: "/signin",
    }),
    (req, res) => {
      res.send("success");
    }
  );

  app.post("/api/user/signup", checkNotAuthenticated, async (req, res) => {
    console.log("SIGNUP: Get user infor from frontend", req.body);
    const doc = await User.findOne({ email: req.body.email });
    if (doc) return res.send({ error: "This email has been registed." });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await new User({
      createAt: new Date(),
      password: hashedPassword,
      email: req.body.email,
      username: req.body.username,
    }).save();
    console.log("SIGNUP: Get user infor from database", user);
    res.send({ message: "signup successfully" });
  });

  app.get("/api/current_user", (req, res) => {
    console.log("auth/current_user: ", req.user);
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/signin");
  });
};
