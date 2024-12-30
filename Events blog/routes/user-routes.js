const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const multer = require("multer");

// Configure multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

// Middleware to check if user is logged in
isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/users/login");
};
// Login user view
router.get("/login", (req, res) => {
  res.render("user/login", {
    error: req.flash("error"),
  });
});

// Login post request
router.post(
  "/login",
  passport.authenticate("local.login", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

// Sign up form
router.get("/signup", (req, res) => {
  res.render("user/signup", {
    error: req.flash("error"),
  });
});

// Sign up post request
router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/signup",
    failureFlash: true,
  })
);

// Profile
router.get("/profile", isAuthenticated, (req, res) => {
  res.render("user/profile", {
    user: req.user,
    success: req.flash("success"),
  });
});

// Upload user avatar
router.post("/uploadAvatar", upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      req.flash("error", "Please select an image to upload");
      return res.redirect("/users/profile");
    }
    let newFields = {
      avatar: req.file.filename,
    };
    await User.updateOne({ _id: req.user._id }, newFields);
    req.flash("success", "Profile picture updated successfully");
    res.redirect("/users/profile");
  } catch (err) {
    console.error(err);
    req.flash("error", "An error occurred while uploading the image");
    res.redirect("/users/profile");
  }
});

// Logout user
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.redirect("/users/login");
  });
});

module.exports = router;
