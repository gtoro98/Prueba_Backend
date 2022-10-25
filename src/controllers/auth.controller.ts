
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User =  require("../models/user.model")
import config from 'config';


exports.signIn = async (req: any, res: any) => {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    try{
        const newUser = await user.save()
        res.status(200).json(newUser)
    } catch (error){
        if(error instanceof Error){
            res.status(400).json({message: error.message})
        }
        else{
            res.status(400).json({message: `Unexpected Error: ${error}`})
        }
    }

}

exports.logIn = async (req: any, res: any) => {

    try{
        const user = await User.findOne({ email: req.body.email})
        if(user == null){
            return res.status(400).json({message: "Email is not registered"})
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if(!passwordIsValid){
            return res.status(400).json({message: "Invalid password!"})
        }

        var token = jwt.sign({user_id: user._id}, config.get<string>('privateKey'), {expiresIn: 86400})

         return res.status(200).json({user_id: user._id, accessToken: token})
    } catch (error){
        if(error instanceof Error){
            res.status(400).json({message: error.message})
        }
        else{
            res.status(400).json({message: `Unexpected Error: ${error}`})
        }
    }
    
    
}
