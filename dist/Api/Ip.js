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
class Ip {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {number} credentialPasswordIpId
     * @param {number} ipId
     * @param options
     * @returns {Promise<void>}
     */
    get(userId, credentialPasswordIpId, ipId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/credential-password-ip/ip", "GET");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.get(`/v1/user/${userId}/credential-password-ip/${credentialPasswordIpId}/ip/${ipId}`); }));
            return response.Response[0];
        });
    }
    /**
     * @param {number} userId
     * @param {number} credentialPasswordIpId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    list(userId, credentialPasswordIpId, options = {
        count: 200,
        newer_id: false,
        older_id: false
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {};
            if (options.count !== undefined) {
                params.count = options.count;
            }
            if (options.newer_id !== false && options.newer_id !== undefined) {
                params.newer_id = options.newer_id;
            }
            if (options.older_id !== false && options.older_id !== undefined) {
                params.older_id = options.older_id;
            }
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/credential-password-ip/ip", "LIST");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.get(`/v1/user/${userId}/credential-password-ip/${credentialPasswordIpId}/ip`, {}, {
                    axiosOptions: {
                        params: params
                    }
                });
            }));
            return response.Response;
        });
    }
    /**
     * @param {number} userId
     * @param {number} credentialPasswordIpId
     * @param {string} ip
     * @param {"ACTIVE" | "INACTIVE"} status
     * @param options
     * @returns {Promise<any>}
     */
    post(userId, credentialPasswordIpId, ip, status, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                ip: ip,
                status: status
            };
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/credential-password-ip/ip", "POST");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.post(`/v1/user/${userId}/credential-password-ip/${credentialPasswordIpId}/ip`, data); }));
            return response.Response;
        });
    }
    /**
     * @param {number} userId
     * @param {number} credentialPasswordIpId
     * @param {number} ipId
     * @param {string} ip
     * @param {"ACTIVE" | "INACTIVE"} status
     * @param options
     * @returns {Promise<any>}
     */
    put(userId, credentialPasswordIpId, ipId, ip, status, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                ip: ip,
                status: status
            };
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/credential-password-ip/ip", "PUT");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.put(`/v1/user/${userId}/credential-password-ip/${credentialPasswordIpId}/ip/${ipId}`, data); }));
            return response.Response;
        });
    }
}
exports.default = Ip;
