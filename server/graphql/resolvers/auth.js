// External imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    signInUser: async ({email, password}) => {
        const user = await userModel.findOne({email});
        if (!user) {
            throw new Error('User doesn\t exist');
        }

        // Compare password
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new Error('Invalid email nd password combination');
        }

        // Generate token for user and return token to user
        const token = jwt.sign({ çççç: user._id, email: user.email }, process.env.JWT_SECRET, {expiresIn: '1h'});
        return {
            token,
            message: "Login successful",
        }
    }
}