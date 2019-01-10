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
class SchedulePayment {
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
    get(userId, monetaryAccountId, paymentId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/schedule-payment");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment/${paymentId}`);
            }));
            return response.Response[0];
        });
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} paymentId
     * @param options
     * @returns {Promise<void>}
     */
    delete(userId, monetaryAccountId, paymentId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/schedule-payment", "DELETE");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.delete(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment/${paymentId}`);
            }));
            return response.Response;
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
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/schedule-payment", "LIST");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment`, {}, {
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
     * @param {PaymentRequestObject} paymentRequestObject
     * @param {Schedule} schedule
     * @param options
     * @returns {Promise<void>}
     */
    post(userId, monetaryAccountId, paymentRequestObject, schedule, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/schedule-payment", "POST");
            const requestObject = {
                payment: paymentRequestObject,
                schedule: schedule
            };
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.post(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment`, requestObject);
            }));
            return response.Response;
        });
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} scheduledPaymentId
     * @param {PaymentRequestObject} paymentRequestObject
     * @param {Schedule} schedule
     * @param options
     * @returns {Promise<void>}
     */
    put(userId, monetaryAccountId, scheduledPaymentId, paymentRequestObject, schedule, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/schedule-payment", "PUT");
            const requestObject = {
                payment: paymentRequestObject,
                schedule: schedule
            };
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.put(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment/${scheduledPaymentId}`, requestObject);
            }));
            return response.Response;
        });
    }
}
exports.default = SchedulePayment;
