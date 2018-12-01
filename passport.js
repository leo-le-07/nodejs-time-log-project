const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { User } = require('./models');

passport.use('login', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
}, async (name, password, cb) => {
  const user = await User.findOne({ name, password });
  if (!user) return cb(null, false, { message: 'Incorrect name or password' });
  return cb(null, user, { message: 'Logged in successfully' });
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_sescret',
}, async (jwtPayload, cb) => {
  const user = await User.findOne({ id: jwtPayload.id });
  if (!user) return cb({ message: "Can't verify current user" });
  return cb(null, user);
}));
