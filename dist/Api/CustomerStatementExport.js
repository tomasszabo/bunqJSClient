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
class CustomerStatementExport {
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
     * @param {"CSV" | "PDF" | "MT940"} statement_format
     * @param {Date} date_start
     * @param {Date} date_end
     * @param options
     * @returns {Promise<any>}
     */
    post(userId, accountId, statement_format, date_start, date_end, options = {
        regional_format: "EUROPEAN"
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/customer-statement-export", "POST");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.post(`/v1/user/${userId}/monetary-account/${accountId}/customer-statement/`, {
                    statement_format: statement_format,
                    date_start: date_start,
                    date_end: date_end,
                    regional_format: options.regional_format
                });
            }));
            return response.Response[0];
        });
    }
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {number} customerStatementId
     * @param options
     * @returns {Promise}
     */
    get(userId, accountId, customerStatementId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/customer-statement-export", "GET");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${accountId}/customer-statement/${customerStatementId}`);
            }));
            return response.Response[0];
        });
    }
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {number} customerStatementId
     * @param options
     * @returns {Promise}
     */
    delete(userId, accountId, customerStatementId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/customer-statement-export", "DELETE");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.delete(`/v1/user/${userId}/monetary-account/${accountId}/customer-statement/${customerStatementId}`);
            }));
            return response.Response;
        });
    }
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param options
     * @returns {Promise}
     */
    list(userId, accountId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/customer-statement-export", "LIST");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${accountId}/customer-statement`); }));
            return response.Response;
        });
    }
}
exports.default = CustomerStatementExport;
