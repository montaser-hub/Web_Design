const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

// Saving user object in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Register user
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        if (req.body.password !== req.body.confirm_password) {
          return done(
            null,
            false,
            req.flash("error", "Passwords do not match")
          );
        }

        const existingUser = await User.findOne({ email: username });
        if (existingUser) {
          return done(null, false, req.flash("error", "Email already used"));
        }

        const newUser = new User();
        newUser.email = req.body.email;
        newUser.password = newUser.hashPassword(req.body.password);
        newUser.avatar = "profile.png";

        await newUser.save();
        return done(null, newUser, req.flash("success", "User Added"));
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Login strategy
passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const user = await User.findOne({ email: username });

        if (!user) {
          return done(null, false, req.flash("error", "User not found"));
        }

        if (!user.comparePasswords(password, user.password)) {
          return done(null, false, req.flash("error", "Password is incorrect"));
        }

        return done(null, user, req.flash("success", "Welcome back"));
      } catch (err) {
        return done(err, false, req.flash("error", "Something went wrong"));
      }
    }
  )
);

module.exports = passport;
