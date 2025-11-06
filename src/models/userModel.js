import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true, 
  },
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
  },
}, { timestamps: true });

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

const User = mongoose.model('User', userSchema);
export default User;