var GithubStrategy = require('passport-github').Strategy;
var models = require('../models');
const passport = require('passport');

passport.use(
  'github',
  new GithubStrategy(
    {
      clientID: '2aec6845114049fd75e8',
      clientSecret: '5010eeb33b11dd10fea8e791a19f239e3f389426',
      callbackURL: 'http://localhost:3000/users/login/github/callback'
    },

    function(access_token, refresh_token, profile, done) {
      console.log(profile); 
      console.log("-----------------");
      models.users
        .findOne({
          where: {
            AuthId: profile.id
          }
        })
        .then(user => {
          let name = profile.displayName;
          console.log(name); 
      console.log("-----------------");
          let [firstName, ...lastName] = name.split(' ');
          lastName = lastName.join(' ');
    
          if (!user) {
            return models.users
              .create({
                AuthId: profile.id,
                FirstName: firstName,
                LastName: lastName,
                Email: profile.emails[0].value,
                Username: profile.username
              })
              .then(user => {
                done(null, user);
              });
          } else {
            done(null, user);
          }
        })
        .catch(err => {
          if (err) {
            console.log('error');
            return done(err);
          }
        });
    }
  )
);