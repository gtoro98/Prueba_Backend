import jwt, { Secret } from "jsonwebtoken";
import config from 'config'

const privateKey = config.get<string>('privateKey');
const refreshKey = config.get<string>('privateKey');

export const encode = (args: any, secret: Secret, options: object) => {
    return jwt.sign(args, secret, options) as any;
};
export const decode = (args: any, secret: Secret) => {
    const decoded = jwt.verify(args, secret) as any;
    if (!decoded) {
        throw new Error("Invalid Token");
    }
    return decoded;
};
export const generateAccessToken = (args: any) => {
    const token = encode(args, privateKey, { expiresIn: "15m" });
    return token;
};

export const generateRefreshCookie = (args: any, response: any) => {
    const refreshToken = encode(args, refreshKey, { expiresIn: "30d" });
    const auth = response.cookie("refreshtoken", refreshToken, {
        expiresIn: config.get<string>('refreshKeyTtl'),
        httpOnly: true,
        secure: false,
    });
    return auth;
};

export const verifyToken = (request: any) => {
    const token = request.headers.authorization.split(" ")[1];
    if (token) {
        const decoded = decode(token, privateKey) as any;
        return decoded;
    }
    throw new Error("Not Authenticated");
};
