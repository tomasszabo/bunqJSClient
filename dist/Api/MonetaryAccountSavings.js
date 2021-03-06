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
class MonetaryAccountSavings {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountSavingsId
     * @param options
     * @returns {Promise<any>}
     */
    get(userId, monetaryAccountSavingsId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "GET");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-savings/${monetaryAccountSavingsId}`); }));
            return response.Response[0];
        });
    }
    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    list(userId, options = {
        count: 25,
        newer_id: false,
        older_id: false
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "LIST");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-savings`); }));
            return response.Response;
        });
    }
    /**
     * @param {number} userId
     * @param {string} currency
     * @param {string} description
     * @param {AmountValue} dailyLimit
     * @param {string} color
     * @param {AmountValue} savingsGoal
     * @param options
     * @returns {Promise<void>}
     */
    post(userId, currency, description, dailyLimit, color, savingsGoal, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "POST");
            const requestBody = {
                currency: currency,
                description: description,
                daily_limit: {
                    value: dailyLimit + "",
                    currency: currency
                },
                setting: {
                    color: color,
                    default_avatar_status: "AVATAR_DEFAULT"
                },
                savings_goal: {
                    currency: currency,
                    value: savingsGoal + ""
                }
            };
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.post(`/v1/user/${userId}/monetary-account-savings`, requestBody); }));
            return response.Response;
        });
    }
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {monetaryAccountPutRequest} MonetaryAccountPutRequest
     * @param options
     * @returns {Promise<any>}
     */
    put(userId, accountId, monetaryAccountPutRequest, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "PUT");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.put(`/v1/user/${userId}/monetary-account-savings/${accountId}`, monetaryAccountPutRequest); }));
            return response.Response;
        });
    }
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {"CANCELLED"} status
     * @param {"REDEMPTION_VOLUNTARY"} sub_status
     * @param {string} reason
     * @param options
     * @returns {Promise<any>}
     */
    putCancel(userId, accountId, status, sub_status, reason, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "PUT");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.put(`/v1/user/${userId}/monetary-account-savings/${accountId}`, {
                    status: status,
                    sub_status: sub_status,
                    reason: "OTHER",
                    reason_description: reason
                });
            }));
            return response.Response;
        });
    }
}
exports.default = MonetaryAccountSavings;
