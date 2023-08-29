const User = require('../models/userModel');

const adminUserController = {
    // 01. Méthode pour créer un utilisateur :
    createUser: async (req, res) => {
        try {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
            });
    
            const savedUser = await user.save();
            res.json(savedUser, { message: "Utilisateur créé avec succès" });
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
        }
    },

    // 02. Méthode pour récupérer tous les utilisateurs : 
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
        }
    },

    // 03. Méthode pour récupérer un utilisateur par son id :
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.header('Content-Type', 'application/json');
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
        }
    },


    // 04. Méthode pour mettre à jour un utilisateur :
    updateUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.pseudo = req.body.pseudo;
            user.email = req.body.email;
            user.password = req.body.password;
            user.isAdmin = req.body.isAdmin;

            const savedUser = await user.save();
            res.json(savedUser, { message: "Utilisateur mis à jour avec succès" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
        }
    },

    // 05. Méthode pour supprimer un utilisateur :
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            await user.remove();
            res.json({ message: "Utilisateur supprimé avec succès" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
        }
    },
};

module.exports = adminUserController;