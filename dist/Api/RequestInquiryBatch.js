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
class RequestInquiryBatch {
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
     * @param {number} requestInquiryId
     * @returns {Promise<any>}
     */
    get(userId, monetaryAccountId, requestInquiryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/request-inquiry-batch", "GET");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-inquiry-batch/${requestInquiryId}`);
            }));
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
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/request-inquiry-batch", "LIST");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-inquiry-batch`, {}, {
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
     * @param {Amount} amount_inquired
     * @param {CounterpartyAlias} counterpartyAlias
     * @param {RequestInquiryPostOptions} options
     * @returns {Promise<void>}
     */
    post(userId, monetaryAccountId, requestInquiries, status = false, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // this object will contain the actual request content
            const requestData = {
                total_amount_inquired: 0
            };
            let totalAmountInquired = 0;
            if (status !== false) {
                requestData.status = status;
            }
            // go through the counterparties and generate a list of request inquiries
            const requestInquiryList = [];
            requestInquiries.map(requestInquiry => {
                // validate the minimum age
                if (requestInquiry.minimum_age && requestInquiry.minimum_age !== false) {
                    if (requestInquiry.minimum_age < 12 || requestInquiry.minimum_age > 100) {
                        throw new Error("Invalid minimum_age. Value has to be 12 >= minimum_age <= 100");
                    }
                }
                // update the total amount
                totalAmountInquired += parseFloat(requestInquiry.amount_inquired.value);
                // inquiry is valid, add to the list
                requestInquiryList.push(requestInquiry);
            });
            // add the list of request inquiries to this batch and set the total amount
            requestData.request_inquiries = requestInquiries;
            requestData.total_amount_inquired = {
                value: totalAmountInquired + "",
                currency: "EUR"
            };
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/request-inquiry-batch", "POST");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.post(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-inquiry-batch`, requestData);
            }));
            return response.Response;
        });
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} requestInquiryId
     * @param {string} status
     * @returns {Promise<void>}
     */
    put(userId, monetaryAccountId, requestInquiryId, status = "REVOKED") {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/request-inquiry-batch", "PUT");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.put(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-inquiry-batch/${requestInquiryId}`, {
                    status: status
                });
            }));
            return response.Response;
        });
    }
}
exports.default = RequestInquiryBatch;
