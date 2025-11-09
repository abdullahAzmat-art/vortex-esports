import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export let usercontroller  = async(req, res) => {
    try {
const { name, email, password, role } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });


const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: 'User already exists' });


const hashed = await bcrypt.hash(password, 10);
const user = new User({ name, email, password: hashed, role: role || 'user' });
await user.save();


const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
res.json({ token, user  , success:true});
} catch (err) {
res.status(500).json({ message: err.message });
}
}

export  const logincontroller = async(req, res) => {
    try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Missing fields' });


const user = await User.findOne({ email });
if (!user || !user.password) return res.status(400).json({ message: 'Invalid credentials' });


const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ message: 'Invalid credentials' });


const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
res.json({ token, user , success:true });
} catch (err) {
res.status(500).json({ message: err.message });
}





}

export let googlecontroller = async(req, res) => {
    try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Missing fields' });


const user = await User.findOne({ email });
if (!user) return res.status(404).json({ message: 'User not found' });


// don't overwrite existing password unless you want to
if (user.password) return res.status(400).json({ message: 'Password already set' });


user.password = await bcrypt.hash(password, 10);
await user.save();


res.json({ message: 'Password set' });
} catch (err) {
res.status(500).json({ message: err.message });
}
}


 export const getaluser = async(req ,res)=>{
    try {
        
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
}

export const getuserbyid = async(req ,res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}


export const deleteuser = async(req ,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        console.log(error)
    }
}

export const updateuser = async(req ,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id , req.body , {new:true});   
    
        res.status(200).send({message:"User updated successfully", user})
    }catch(error){
          console.log(error)
    }
}