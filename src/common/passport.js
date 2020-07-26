const FacebookTokenStrategy = require("passport-facebook-token");
const passport = require("passport");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../model/user");

export const passportMiddleware = () => {
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: "2970248176431778",
        clientSecret: "54d23fcfb4a48f0ad9e37dfdd19bba60",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const userExisting = await User.findOne({
            "facebook.id": profile.id,
          });

          if (!userExisting) {
            const user = new User({
              first_name: profile.first_name,
              last_name: profile.last_name,
              method: "facebook",
              facebook: {
                id: profile.id,
                email: profile.emails[0].value,
              },
              avatar: profile.photos[0].value,
            });
            console.log(user);
            await user.save();
            console.log(user);
            return done(null, user);
          } else {
            return done(null, userExisting);
          }
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
  //GoogleTokenStrategy

  passport.use(
    "googleToken",
    new GooglePlusTokenStrategy(
      {
        clientID:
          "750121396268-q900o34aebto829befpm4u2f4etipq5l.apps.googleusercontent.com",
        clientSecret: "iBjtA-YRioeFv1XdI-ruYkBh",
        passReqToCallback: true,
      },
      async function (req, accessToken, refreshToken, profile, done) {
        try {
          console.log(accessToken);
          const userExisting = await User.findOne({ "google.id": profile.id });
          if (!userExisting) {
            const newUser = new User({
              method: "google",
              first_name: profile.name.familyName,
              last_name: profile.name.givenName,
              google: {
                id: profile.id,
                email: profile.emails[0].value,
              },
              avatar: profile.photos[0].value,
            });
            await newUser.save();
            done(null, newUser);
          }
          done(null, userExisting);
        } catch (error) {
          // console.log(error);
          done(error, false);
        }
      }
    )
  );
};

// const userExisting = await User.findOne({
//   "google.id": profile.id,
// });

// if (!userExisting) {
//   const user = new User({
//     first_name: profile.first_name,
//     last_name: profile.last_name,
//     method: "google",
//     google: {
//       id: profile.id,
//       email: profile.emails[0].value,
//     },
//     avatar: profile.photos[0].value,
//   });
//   console.log(user);
//   await user.save();
//   console.log(user);
//   return done(null, user);
// } else {
//   return done(null, userExisting);
// }
