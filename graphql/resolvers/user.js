// External imports
const bcrypt = require('bcryptjs');

// Models import
const userModel = require('../../models/user');

module.exports = {
    createUser: async (args) => {
        const { name, email, password } = args.userInput;
        try {
            const user = await userModel.findOne({ email });
            if (user) {
                return new Error('User already exists');
            }

            const userData = new userModel({
                name,
                email,
                password: await bcrypt.hash(password, 15),
            });
            await userData.save();

            return userData;
        } catch (err) {
            throw new Error;
        }
    },
}