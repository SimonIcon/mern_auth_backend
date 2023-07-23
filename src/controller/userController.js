const UserModel = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// login controller
const loginController = async (req, res) => {
    const { password, email } = req.body;
    try {
        UserModel.findOne({ email }).then((user) => {
            bcrypt.compare(password, user.password).then((checkedPassword) => {
                if (!checkedPassword) {
                    res.json({ message: "you didn`t enter your password" })
                }
                const token = jwt.sign({ userId: user._id, username: user.username },
                    process.env.JWT_SECRET, { expiresIn: "1h" })

                res.json({ message: "login successful", username: user.username, token })
            }).catch(() => {
                res.json({ message: "wrong password" })
            })

        }).catch((error) => {
            res.json({ "error": error, message: "username not found" })
        })

    } catch (error) {
        res.status(500).json({ error })
    }

}

// register controller
const registerController = async (req, res) => {
    const { username, email, cellphone, country, password, profile } = req.body;
    try {
        const userExist = await UserModel.findOne({ email })
        const cellphoneExist = await UserModel.findOne({ cellphone })
        if (userExist) {
            res.json({ message: "user already exist" })
        } else if (cellphoneExist) {
            res.json({ message: "user cellphone already exist" })
        }
        bcrypt.hash(password, 10).then((hashedPassword) => {
            UserModel.create({
                username, email, country, cellphone,
                password: hashedPassword,
                profile: profile || ""
            })
            res.send({ success: true, message: "user added successfully" })
        }).catch((error) => {
            res.json({ message: "error occurred while encrypting password" })
        })


    } catch (error) {
        res.json(`error occured ${error.message}`);
    }

}

const generateOTP = async (req, res) => {
    res.send('generating otp')
}
// verifying otp
const verifyOTP = async (req, res) => {
    res.send("verifying otp")
}
// creating password reset session when OTP is valid
const resetPassword = async (req, res) => {
    res.send('reseting password')
}
// updating password
const updatePassword = async (req, res) => {
    res.send("updating password")
}

module.exports = {
    loginController, registerController, generateOTP, verifyOTP, resetPassword,
    updatePassword
}
