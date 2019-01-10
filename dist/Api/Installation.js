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
class Installation {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param options
     * @returns {Promise<{id; token: any; serverPublicKey: any}>}
     */
    add(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.ApiAdapter.post("/v1/installation", {
                client_public_key: this.Session.publicKeyPem
            }, {}, {
                disableVerification: true,
                disableSigning: true,
                disableAuthentication: true,
                skipSessionCheck: true
            });
            return {
                id: result.Response[0].Id.id,
                token: result.Response[1].Token,
                serverPublicKey: result.Response[2].ServerPublicKey.server_public_key
            };
        });
    }
    /**
     * @param options
     * @returns {Promise<{id; token: any; serverPublicKey: any}>}
     */
    get(installationId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.ApiAdapter.get(`/v1/installation/${installationId}`);
            return {
                id: result.Response[0].Id.id,
                token: result.Response[1].Token,
                serverPublicKey: result.Response[2].ServerPublicKey.server_public_key
            };
        });
    }
}
exports.default = Installation;
