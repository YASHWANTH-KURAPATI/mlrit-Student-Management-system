const bcrypt = require("bcrypt");
const db = require("./db");

async function createAdmin() {
    try {
        const username = "admin1";
        const password = process.env.ADMIN_PASSWORD;

        if (!password || password.length < 12) {
            throw new Error("Enter a strong admin password.");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await db.execute(
            `INSERT INTO users
            (username, password_hash, role)
            VALUES (?, ?, ?)`,
            [username, hashedPassword, "Admin"]
        );

        console.log("Admin account created successfully!");
        console.log("Username: " + username);

    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        await db.end();
    }
}

createAdmin();