import UserModel from '../models/UserModel.js';
import { emailValidator } from "../helpers/emailValidator.js";
import createJWT from '../helpers/createJWT.js';
const registerUser = async (req, res) => {
    const { name, lastName, email, password } = req.body;
    if(!emailValidator(email)){
        return res.json({
            state: false,
            msg: "El correo electrónico no es válido",
        });
    }
    const uniqueEmail = await UserModel.findOne({ email });
    if(uniqueEmail){
        return res.json({
            state: false,
            msg: "El correo electrónico ya existe",
        });
    }
    try{
        const user = new UserModel(req.body);
        const result = await user.save();
        res.json({
            state: true,
            msg: "Usuario registrado correctamente",
            result: result
        });
    }catch(error){
        console.log(`Error creating user ${error}`);
    }
}
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!emailValidator(email)){
        return res.json({
            state: false,
            msg: "El correo electrónico no es válido",
        });
    }
    const user = await UserModel.findOne({ email });
    if(!user){
        return res.json({
            state: false,
            msg: "El correo electrónico no existe",
        });
    }
    if (await user.comparePassword(password)){
        return res.json({
            state: true,
            _id: user._id,
            name: user.name + ' ' + user.lastName,
            email: user.email,
            token: createJWT(user._id),

        });
    }else{
        return res.json({ state:false, msg: 'Password incorrect' });
    }
}
export{
    registerUser,
    loginUser
}
