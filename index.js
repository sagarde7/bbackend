const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const USER_ID = "SAGAR DE"; 
const EMAIL = "22BCS10704@cuchd.in";
const ROLL_NUMBER = "22BCS10704";


app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        const numbers = data.filter(item => !isNaN(item));  // Extract numbers
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item)); // Extract single letters
        const highestAlphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })).pop()] : [];

        return res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});


app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
