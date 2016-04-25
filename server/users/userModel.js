/* User Documents Schema */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  id: String,
  email: String,
  given_name: String,
  family_name: String,
  trip: String,
  bio: { type: String, default: 'I am just a simple man. Not a simpleton. I wasn\'t referring to my brain capacity. I meant more like that I don\'t have expensive tastes. That sort of thing.' },
  favorite_trips: { type: String, default: 'Disney World' },
  image_url: { type: String, default: 'https://canteentrip-herokuapp-com.s3.amazonaws.com/profile_pic.svg' }
});

module.exports = mongoose.model('User', userSchema);
