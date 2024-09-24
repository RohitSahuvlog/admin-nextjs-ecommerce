// scripts/createAdmin.js

const { User } = require("..//models/User");
const { mongooseConnect } = require("../lib/mongoose");

console.log("Creating admin user...", User);

async function createAdmin() {
    await mongooseConnect();
    const email = 'admin1@gmail.com'; // Change to your admin email
    const password = '123456'; // Change to a secure password

    const existingUser = await User.findByEmail(email);
    console.log("Creatied user", existingUser);

    if (!existingUser) {
        const newUser = new User({
            email,
            password, // Mongoose will hash the password due to the pre-save hook
            role: 'admin', // Assign the role of admin
            username: "xyx"
        });

        await newUser.save(); // Save the new admin user to the database
        console.log('Admin user created successfully!');
    } else {
        console.log('Admin user already exists.');
    }

    process.exit();
}

// Execute the function
createAdmin().catch(console.error);
