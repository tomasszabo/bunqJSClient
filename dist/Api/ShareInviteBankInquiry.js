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
class ShareInviteBankInquiry {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    get(userId, accountId, shareInviteBankInquiryId, options = {
        count: 200,
        newer_id: false,
        older_id: false
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-inquiry", "GET");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${accountId}/share-invite-bank-inquiry/${shareInviteBankInquiryId}`);
            }));
            return response.Response;
        });
    }
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    list(userId, accountId, options = {
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
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-inquiry", "LIST");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${accountId}/share-invite-bank-inquiry`, {}, {
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
     * @param {CounterpartyAlias} counterpartyAlias
     * @param {ShareInviteBankInquiryPostShareDetail} shareDetail
     * @param {ShareInviteBankInquiryPostStatus} status
     * @param {ShareInviteBankInquiryPostOptions} options
     * @returns {Promise<any>}
     */
    post(userId, monetaryAccountId, counterpartyAlias, shareDetail, status = "PENDING", options = {
        share_type: "STANDARD"
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-inquiry", "POST");
            const postData = {
                counter_user_alias: counterpartyAlias,
                share_detail: shareDetail,
                status: status
            };
            if (options.share_type) {
                postData.share_type = options.share_type;
            }
            if (options.start_date) {
                postData.start_date = options.start_date;
            }
            if (options.end_date) {
                postData.end_date = options.end_date;
            }
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.post(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/share-invite-bank-inquiry`, postData);
            }));
            return response.Response;
        });
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {CounterpartyAlias} counterpartyAlias
     * @param {ShareInviteBankInquiryPostShareDetail} shareDetail
     * @param {ShareInviteBankInquiryPostStatus} status
     * @param {ShareInviteBankInquiryPostOptions} options
     * @returns {Promise<any>}
     */
    put(userId, monetaryAccountId, shareInviteBankInquiryId, counterpartyAlias, shareDetail, status = "PENDING", options = {
        share_type: "STANDARD"
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-inquiry", "PUT");
            const postData = {
                counter_user_alias: counterpartyAlias,
                share_detail: shareDetail,
                status: status
            };
            if (options.share_type) {
                postData.share_type = options.share_type;
            }
            if (options.start_date) {
                postData.start_date = options.start_date;
            }
            if (options.end_date) {
                postData.end_date = options.end_date;
            }
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.put(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/share-invite-bank-inquiry/${shareInviteBankInquiryId}`, postData);
            }));
            return response.Response;
        });
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} shareInviteBankInquiryId
     * @param {ShareInviteBankInquiryPostStatus} status
     * @returns {Promise<any>}
     */
    putStatus(userId, monetaryAccountId, shareInviteBankInquiryId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-inquiry", "PUT");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.put(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/share-invite-bank-inquiry/${shareInviteBankInquiryId}`, {
                    status: status
                });
            }));
            return response.Response;
        });
    }
}
exports.default = ShareInviteBankInquiry;
