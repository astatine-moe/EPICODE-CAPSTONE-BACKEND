import jwt from "jsonwebtoken";
import * as User from "../api/users/model";

export const generateAccessToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
    };

    const options = {
        expiresIn: "1d",
    };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
};

export const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
};

export const generateRefreshToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
    };

    const options = {
        expiresIn: "7d",
    };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
};

export const verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
};

//create token pair
export const createTokenPair = async (user) => {
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    return {
        accessToken,
        refreshToken,
    };
};

//verify token pair
export const verifyTokenPair = async (accessToken, refreshToken) => {
    const decodedAccessToken = await verifyAccessToken(accessToken);
    const decodedRefreshToken = await verifyRefreshToken(refreshToken);

    if (decodedAccessToken.id === decodedRefreshToken.id) {
        return true;
    } else {
        return false;
    }
};

//verify refresh and generate new token pair
export const verifyRefreshAndGenerateTokenPair = async (refreshToken) => {
    const decodedRefreshToken = await verifyRefreshToken(refreshToken);

    const user = await User.findById(decodedRefreshToken.id);

    if (!user) {
        throw new Error("User not found");
    }

    const tokenPair = await createTokenPair(user);

    return tokenPair;
};
