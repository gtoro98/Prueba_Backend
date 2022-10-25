const User =  require("../models/user.model")

const checkDuplicateEmails = async (req: any, res:any , next: Function) =>{

    try{
        const user = await User.findOne({ email: req.body.email})

        if(user != null){
            return res.status(400).send({message: "Email Already in use"})
        }
        else{
            next()
        }
    } catch (error){
        if(error instanceof Error){
            res.status(400).json({message: error.message})
        }
        else{
            res.status(400).json({message: `Unexpected Error: ${error}`})
        }
    }
}

const verifySignIn = {
    checkDuplicateEmails: checkDuplicateEmails,
}
module.exports = verifySignIn