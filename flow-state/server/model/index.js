const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/flow-state';
exports.connection = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
