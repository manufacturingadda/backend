import jwt from "jsonwebtoken";

export const generateToken = (userData: any) => {
    const secretKey = process.env.jsonSecretKey ?? "";
    const token = jwt.sign(userData, secretKey, { expiresIn: "1w" }); // Token expires in 1 hour (you can change this as needed)
    return token;
}