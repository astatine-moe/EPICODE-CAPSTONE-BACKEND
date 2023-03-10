import express from "express";
import {
    createTokenPair,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshAndGenerateTokenPair,
    verifyRefreshToken,
    verifyTokenPair,
} from "../../modules/jwt";
import * as userModel from "./model";
const router = express.Router();

router.post("/register", (req, res, next) => {
    const { email, password, first_name, last_name } = req.body;
    const name = `${first_name.trim()} ${last_name.trim()}`;

    const user = new userModel.User({
        email,
        password,
        name,
    });

    user.save()
        .then((user) => {
            createTokenPair(user).then((tokenPair) => {
                res.status(200).json(tokenPair);
            });
        })
        .catch((err) => {
            next(err);
        });
});

router.post("/login", (req, res, next) => {
    const { email, password } = req.body;

    userModel
        .findOne({
            email,
        })
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    error: "Invalid email or password",
                });
            } else {
                user.comparePassword(password, (err, isMatch) => {
                    if (err) {
                        next(err);
                    } else if (!isMatch) {
                        res.status(401).json({
                            error: "Invalid email or password",
                        });
                    } else {
                        createTokenPair(user).then((tokenPair) => {
                            res.status(200).json(tokenPair);
                        });
                    }
                });
            }
        });
});

router.post("/refresh", (req, res, next) => {
    const { accessToken, refreshToken } = req.body;

    verifyTokenPair(accessToken, refreshToken).then((isValid) => {
        if (isValid) {
            verifyRefreshAndGenerateTokenPair(refreshToken).then(
                (tokenPair) => {
                    res.status(200).json(tokenPair);
                }
            );
        } else {
            res.status(401).json({
                error: "Invalid token pair",
            });
        }
    });
});

export default router;
