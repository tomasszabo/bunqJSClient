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
class SessionServer {
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
            const result = yield this.ApiAdapter.post("/v1/session-server", {
                secret: this.Session.apiKey
            }, {}, {
                skipSessionCheck: true
            });
            return {
                id: result.Response[0].Id.id,
                token: result.Response[1].Token,
                user_info: result.Response[2]
            };
        });
    }
    /**
     * @param options
     * @returns {Promise<{id; token: any; user_info}>}
     */
    delete(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ApiAdapter.delete(`/v1/session/${this.Session.sessionId}`);
            return true;
        });
    }
}
exports.default = SessionServer;
