const User = require('../models/user.model')

exports.getUsers = async (req: any, res: any) => {
    try{
        const data = await User.find();
        res.json(data)
    } catch (error){
        if(error instanceof Error){
            res.status(400).json({message: error.message})
        }
        else{
            res.status(400).json({message: `Unexpected Error: ${error}`})
        }
    }
}

exports.getCurrentUser = async (req: any, res: any) => {
    try{
        const data = await User.findOne({ _id: req.body.user_id})
        res.json(data)
    } catch (error){
        if(error instanceof Error){
            res.status(400).json({message: error.message})
        }
        else{
            res.status(400).json({message: `Unexpected Error: ${error}`})
        }
    }
}

export {};