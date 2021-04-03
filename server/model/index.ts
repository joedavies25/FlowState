import mongoose from 'mongoose';
const uri = 'mongodb://localhost:27017/flow-state';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
