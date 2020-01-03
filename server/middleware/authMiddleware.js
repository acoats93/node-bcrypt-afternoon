module.exports = {
    usersOnly: (req,res,next) => {
        if(!req.session.user){
            res.status(401).json({message: 'Please Log In'})
        }else{
            next();
        }
    },
    adminsOnly: (req,res,next) => {
        if(!req.session.user.isAdmin){
            res.status(403).json({message: "You are not an admin"})
        }else{
            next();
        }
    }
}