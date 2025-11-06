import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const register = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" }); 
    }

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds); 

    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || 'user', 
    });

    await newUser.save();

    res.status(201).json(newUser); 

  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" }); 
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" }); 
    }

    
    const payload = {
      sub: user._id, 
      role: user.role,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' } 
    );

    res.status(200).json({
      message: "Login successful",
      accessToken: token,
      user: user 
    });

  } catch (error) {
    next(error);
  }
};