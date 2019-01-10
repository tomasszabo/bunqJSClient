"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const forge = require("./CustomForge");
const Logger_1 = require("../Helpers/Logger");
const forgeSha256 = forge.sha256;
const forgeUtil = forge.util;
/**
 * Hashes a string using sha256
 * @param {string} string
 * @returns {Promise<string>}
 */
exports.stringToHash = (string) => __awaiter(this, void 0, void 0, function* () {
    const messageDigest = forgeSha256.create();
    messageDigest.update(string);
    return messageDigest.digest().toHex();
});
/**
 * Encrypts a string using a publicKey
 * @param {string} data
 * @param publicKey
 * @returns {Promise<string>}
 */
exports.encryptString = (data, publicKey) => __awaiter(this, void 0, void 0, function* () {
    // create a new message digest for our string
    const messageDigest = forgeSha256.create();
    messageDigest.update(data, "raw");
    // sign it with a private key
    const signatureBytes = publicKey.encrypt(messageDigest);
    // encode to base 64 and return it
    return forgeUtil.encode64(signatureBytes);
});
/**
 * Signs a string using a privateKey
 * @param {string} data
 * @param privateKey
 * @returns {Promise<string>}
 */
exports.signString = (data, privateKey) => __awaiter(this, void 0, void 0, function* () {
    // create a new message digest for our string
    const messageDigest = forgeSha256.create();
    messageDigest.update(data, "raw");
    // sign it with a private key
    const signatureBytes = privateKey.sign(messageDigest);
    // encode to base 64 and return it
    return forgeUtil.encode64(signatureBytes);
});
/**
 * Verifies if a string was signed by a public key
 * @param {string} data
 * @param publicKey
 * @param {string} signature
 * @returns {Promise<string>}
 */
exports.verifyString = (data, publicKey, signature) => __awaiter(this, void 0, void 0, function* () {
    // create a new message digest for our string
    const messageDigest = forgeSha256.create();
    messageDigest.update(data, "raw");
    try {
        // decode the base64 signature
        const rawSignature = forgeUtil.decode64(signature);
        // verify the signature with the public key
        return publicKey.verify(messageDigest.digest().getBytes(), rawSignature);
    }
    catch (ex) {
        Logger_1.default.debug(ex);
        return false;
    }
});
