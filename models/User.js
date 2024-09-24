const { model, Schema, models } = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String },
    role: { type: String, default: 'user' },
}, {
    timestamps: true,
});

// Static methods for the User model
UserSchema.statics.findByEmail = async function (email) {
    return await this.findOne({ email });
};

UserSchema.statics.validatePassword = async function (password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
};

// Mongoose middleware to hash password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Define the User model
const User = models.User || model('User', UserSchema);

module.exports = { User };
