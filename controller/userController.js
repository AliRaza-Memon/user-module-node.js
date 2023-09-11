const User = require ('../model/user');

//Creating a new user

exports.createUser = async =(req,res)=>{


    try{
        const user = new User(req.body);
        await.user.save();
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

// Get  all users
exports.getAllUsers = async (req,res) =>{
    
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};


// Get a single user by Id
exports.getUserById = async (req,res) =>{
    const userId = req.param.id;

    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message :'User not found'});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


// Update a user by Id
exports. updateUser = async (req,res) =>{
    const userId = req.params.id;
    try{
        const user = await User.findByIdAndUpdate(userId,req.body,{});

        if(!user){
            res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

//Delete a user by Id
exports.deleteUser = async (req,res) =>{

    const userId = req.params.id;
    try{
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.status(204).send();
    }catch(error){
        res.status(500).json({error:error.message});
    }
};



