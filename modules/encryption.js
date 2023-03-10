import crypto from "crypto";

export const encrypt = (text) => {
    const cipher = crypto.createCipheriv(
        "aes-256-ctr",
        Buffer.from(process.env.ENCRYPT_KEY, "hex"),
        Buffer.from(process.env.INIT_VECTOR, "hex")
    );

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString("hex");
};
export const decrypt = (content) => {
    const decipher = crypto.createDecipheriv(
        "aes-256-ctr",
        Buffer.from(process.env.ENCRYPT_KEY, "hex"),
        Buffer.from(process.env.INIT_VECTOR, "hex")
    );
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(content, "hex")),
        decipher.final(),
    ]);

    return decrypted.toString();
};
