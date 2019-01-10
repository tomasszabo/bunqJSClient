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
const forgeRsa = forge.rsa;
const forgePki = forge.pki;
/**
 * Generates a new keypair
 * @param {number} bits
 * @param {number} workers
 * @returns {Promise<object>}
 */
exports.createKeyPair = (bits = 2048, workers = -1) => {
    return new Promise((resolve, reject) => {
        forgeRsa.generateKeyPair({
            bits: bits,
            workers: workers
        }, (err, result) => {
            if (err)
                return reject(err);
            resolve(result);
        });
    });
};
/**
 * @param {KeyPair} keypair
 * @returns {Promise<{publicKey: any; privateKey: any}>}
 */
exports.keyPairToPem = (keypair) => __awaiter(this, void 0, void 0, function* () {
    return {
        publicKey: yield exports.publicKeyToPem(keypair.publicKey),
        privateKey: yield exports.privateKeyToPem(keypair.privateKey)
    };
});
/**
 * @param {string} publicKey
 * @returns {Promise<any>}
 */
exports.publicKeyToPem = (publicKey) => __awaiter(this, void 0, void 0, function* () {
    return forgePki.publicKeyToPem(publicKey);
});
/**
 * @param {string} privateKey
 * @returns {Promise<any>}
 */
exports.privateKeyToPem = (privateKey) => __awaiter(this, void 0, void 0, function* () {
    return forgePki.privateKeyToPem(privateKey);
});
/**
 * @param {string} publicKeyPem
 * @returns {Promise<string>}
 */
exports.publicKeyFromPem = (publicKeyPem) => __awaiter(this, void 0, void 0, function* () {
    return forgePki.publicKeyFromPem(publicKeyPem);
});
/**
 * @param {string} privateKeyPem
 * @returns {Promise<string>}
 */
exports.privateKeyFromPem = (privateKeyPem) => __awaiter(this, void 0, void 0, function* () {
    return forgePki.privateKeyFromPem(privateKeyPem);
});
