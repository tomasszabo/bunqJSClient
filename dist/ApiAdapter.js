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
const axios_1 = require("axios");
const RequestLimitFactory_1 = require("./RequestLimitFactory");
const Request_1 = require("./HTTP/Request");
const SignRequestHandler_1 = require("./HTTP/SignRequestHandler");
const VerifyResponseHandler_1 = require("./HTTP/VerifyResponseHandler");
const ErrorCodes_1 = require("./Helpers/ErrorCodes");
const CustomError_1 = require("./Interfaces/CustomError");
exports.BUNQ_SERVER_SIGNATURE_HEADER_KEY = "X-Bunq-Server-Signature";
exports.BUNQ_REQUEST_SIGNATURE_HEADER_KEY = "X-Bunq-Client-Signature";
exports.BUNQ_REQUEST_AUTHENTICATION_HEADER_KEY = "X-Bunq-Client-Authentication";
class ApiAdapter {
    constructor(Session, loggerInterface, BunqJSClient) {
        /**
         * Checks if the session is valid and waits for it to be refreshed
         * @returns {Promise<void>}
         */
        this.sessionValidationCheck = () => __awaiter(this, void 0, void 0, function* () {
            // check if a new session is being fetched
            if (this.BunqJSClient.fetchingNewSession) {
                // wait for the new session to be loaded
                yield this.BunqJSClient.fetchingNewSession;
            }
            else {
                // check if keepAlive is enabled and continue if it isn't
                if (this.BunqJSClient.keepAlive === false) {
                    // check if a valid session is set
                    yield this.BunqJSClient.registerSession();
                }
            }
            // calculate amount of milliseconds until expire time
            const expiresInMilliseconds = this.BunqJSClient.calculateSessionExpiry();
            if (expiresInMilliseconds < 30000) {
                // this request will extend the expiry timer
                const extendByMilliseconds = this.BunqJSClient.calculateSessionExpiry(true);
                // add milliseconds to current time
                const currentDate = new Date();
                currentDate.setTime(currentDate.getTime() + extendByMilliseconds);
                // set updated session expiry time
                this.Session.sessionExpiryTime = currentDate;
                this.logger.debug(`Request in last 30 seconds: (${expiresInMilliseconds / 1000})`);
                this.logger.debug(`Set session expiry to ${this.Session.sessionExpiryTime}`);
            }
        });
        this.Session = Session;
        this.logger = loggerInterface;
        this.BunqJSClient = BunqJSClient;
        this.RequestLimitFactory = new RequestLimitFactory_1.default();
        this.SignRequestHandler = new SignRequestHandler_1.default(this.Session, this.logger, this.BunqJSClient);
        this.VerifyResponseHandler = new VerifyResponseHandler_1.default(this.Session, this.logger, this.BunqJSClient);
        this.language = "en_US";
        this.region = "nl_NL";
        this.geoLocation = "0 0 0 0 000";
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * @param {string} url
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<void>}
     */
    get(url, headers = {}, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.request(url, "GET", "", headers, options);
            return response.data;
        });
    }
    /**
     * @param {string} url
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<void>}
     */
    delete(url, headers = {}, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.request(url, "DELETE", {}, headers, options);
            return response.data;
        });
    }
    /**
     * @param {string} url
     * @param data
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<void>}
     */
    post(url, data = {}, headers = {}, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.request(url, "POST", data, headers, options);
            return response.data;
        });
    }
    /**
     * @param {string} url
     * @param data
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<void>}
     */
    put(url, data = {}, headers = {}, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.request(url, "PUT", data, headers, options);
            return response.data;
        });
    }
    /**
     * @param {string} url
     * @param {string} method
     * @param data
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<any>}
     */
    request(url, method = "GET", data = {}, headers = {}, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`${method}: ${url}`);
            const request = new Request_1.default(url, method, data, headers, options.axiosOptions || {});
            if (!options.skipSessionCheck) {
                yield this.sessionValidationCheck();
            }
            if (options.disableAuthentication !== true) {
                // use session token or fallback to install taken if we have one
                if (this.Session.sessionToken !== null) {
                    request.setAuthenticated(this.Session.sessionToken);
                }
                else if (this.Session.installToken !== null) {
                    request.setAuthenticated(this.Session.installToken);
                }
            }
            if (options.disableSigning !== true) {
                yield this.SignRequestHandler.signRequest(request, options);
            }
            // complete relative urls
            if (request.url[0] === "/") {
                request.setUrl(`${this.Session.environmentUrl}${request.url}`);
            }
            let response;
            try {
                response = yield axios_1.default.request(request.requestConfig);
            }
            catch (error) {
                this.requestErrorHandler(error);
            }
            if (options.disableVerification !== true) {
                const verifyResult = yield this.VerifyResponseHandler.verifyResponse(response);
                if (!verifyResult && (!process.env.ENV_CI || process.env.ENV_CI === "false")) {
                    // invalid response in a non-ci environment
                    throw new CustomError_1.default("We couldn't verify the received response", response, ErrorCodes_1.default.INVALID_RESPONSE_RECEIVED);
                }
            }
            try {
                // attempt to turn string result back into json when possible
                response.data = JSON.parse(response.data);
                return response;
            }
            catch (error) { }
            return response;
        });
    }
    /**
     * Attempts to improve the error data and defaults to rethrowing it
     * @param error
     */
    requestErrorHandler(error) {
        // get the data from the request if it fails
        if (error.response && error.response.data) {
            // parse json response if possible
            try {
                // attempt to turn string result back into json when possible
                error.response.data = JSON.parse(error.response.data);
                throw error;
            }
            catch (error) { }
        }
        // rethrow if no json data could be found
        throw error;
    }
}
exports.default = ApiAdapter;
