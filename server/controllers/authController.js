import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';


export const register = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // sending welcome email can be added here
        const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to heavan on earth website",
            text: `Welcome to heavan on earth website. Your account been created with email id : ${email}.`,
        }

        await transporter.sendMail(mailoptions);

        // Respond with success message
        return res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({ success: true, message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.status(200).json({ success: true, message: "Logout successful" });

    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Send OTP for email verification
export const sendVerifyOtp = async (req, res) => {

    try {

        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await userModel.findById(userId);

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 90000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Email Verification OTP",
            text: `Your OTP for email verification is ${otp}. It is valid for 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: "Verification OTP sent Email successfully" });


    } catch (error) {
        console.error("Error sending verification OTP:", error);
        res.status(500).json({ success: false, message: error.message });
    }

}


export const verifyEmail = async (req, res) => {

    // const { userId, otp } = req.body.userId ? req.body : req.body;
    const { otp } = req.body;
    const userId = req.userId;

    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: "Missing Details" });
    }

    try {

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            console.log("OTP mismatch:", !user.verifyOtp === '', user.verifyOtp !== otp);
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }


        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.status(200).json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// check if user is authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({ success: true, });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// send Password Reset OTP

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 90000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: " Password Reset OTP",
            text: `Your OTP for resetting your password is ${otp}. Use ths OTP to proceed with resetting your password.`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: "Password reset OTP sent successfully" });

    } catch (error) {
        console.error("Error sending password reset OTP:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: "Email, OTP, and new password are required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "expired OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.status(200).json({ success: true, message: "Password has been reset successfully" });

    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}