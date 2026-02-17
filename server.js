const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Password generator function
function generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol) {
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+{}[]<>?/";

    let allChars = "";
    if (hasUpper) allChars += upperChars;
    if (hasLower) allChars += lowerChars;
    if (hasNumber) allChars += numberChars;
    if (hasSymbol) allChars += symbolChars;

    if (allChars === "") return null;

    let password = "";
    for (let i = 0; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    return password;
}

// API endpoint
app.post("/generate", (req, res) => {
    const { length, hasUpper, hasLower, hasNumber, hasSymbol } = req.body;
    const password = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);

    if (!password) {
        return res.status(400).json({ error: "No character types selected!" });
    }
    res.json({ password });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));