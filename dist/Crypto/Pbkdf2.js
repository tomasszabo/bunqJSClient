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
exports.derivePasswordKey = (password, salt = false, iterations = 10000) => __awaiter(this, void 0, void 0, function* () {
    if (salt === false) {
        // no salt given, create a new random one
        salt = forge.random.getBytesSync(128);
    }
    else {
        // get bytes from the hex salt
        salt = forge.util.hexToBytes(salt);
    }
    // asynchronously derive a key from the password
    const derivedKey = yield new Promise((resolve, reject) => {
        // derive a 32-byte key from the password
        forge.pkcs5.pbkdf2(password, salt, iterations, 16, (errorMessage, derivedKey) => {
            if (errorMessage) {
                reject(errorMessage);
            }
            else {
                resolve(derivedKey);
            }
        });
    });
    // encode the bytes as hex
    const hexKey = forge.util.bytesToHex(derivedKey);
    const hexSalt = forge.util.bytesToHex(salt);
    return {
        key: hexKey,
        salt: hexSalt
    };
});
