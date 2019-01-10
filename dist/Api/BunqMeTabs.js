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
class BunqMeTabs {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} paymentId
     * @param options
     * @returns {Promise<void>}
     */
    get(userId, monetaryAccountId, tabId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/bunqme-tab", "GET");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/bunqme-tab/${tabId}`); }));
            return response.Response[0];
        });
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    list(userId, monetaryAccountId, options = {
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
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/bunqme-tab", "LIST");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/bunqme-tab`, {}, {
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
     * @param {number} monetaryAccountId
     * @param {string} description
     * @param {Amount} amount
     * @param options
     * @returns {Promise<void>}
     */
    post(userId, monetaryAccountId, description, amount, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                description: description,
                amount_inquired: amount
            };
            if (options.redirect_url) {
                params.redirect_url = options.redirect_url;
            }
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/bunqme-tab", "POST");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.post(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/bunqme-tab`, {
                    bunqme_tab_entry: params
                });
            }));
            return response.Response;
        });
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} bunqMeTabId
     * @param {string} status
     * @returns {Promise<void>}
     */
    put(userId, monetaryAccountId, bunqMeTabId, status = "CANCELLED") {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/bunqme-tab", "PUT");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.put(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/bunqme-tab/${bunqMeTabId}`, {
                    status: status
                });
            }));
            return response.Response;
        });
    }
}
exports.default = BunqMeTabs;
