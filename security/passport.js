const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const options = {
    usernameField: 'email',
    passwordField: 'password'
};

passport.use(new LocalStrategy(options, function(email, password, done) {
    Member.findOne({ email: email }, function(err, member) {
        if (err) { 
            return done(err); 
        }
        if (!member || !member.validatePassword(password)) {
            return done(null, false, { message: 'Invalid email or password combination. Try again' });
        }
        return done(null, member);
    });
}));