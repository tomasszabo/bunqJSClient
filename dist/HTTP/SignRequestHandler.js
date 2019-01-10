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
const Url = require("url");
const Sha256_1 = require("../Crypto/Sha256");
class SignRequestHandler {
    constructor(Session, loggerInterface, BunqJSClient) {
        this.BunqJSClient = BunqJSClient;
        this.Session = Session;
        this.logger = loggerInterface;
    }
    /**
     * Signs a request using our privatekey
     * @param {Request} request
     * @param {ApiAdapterOptions} options
     * @returns {Promise<string>}
     */
    signRequest(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = request.requestConfig.url;
            const dataIsEncrypted = options.isEncrypted === true;
            const requestHasFile = !!options.includesFile;
            // Check if one or more param is set and add it to the url
            if (request.requestConfig.params && Object.keys(request.requestConfig.params).length > 0) {
                const params = new Url.URLSearchParams(request.requestConfig.params);
                url = `${request.requestConfig.url}?${params.toString()}`;
            }
            // manually include the user agent
            if (typeof navigator === "undefined") {
                const nodeUserAgent = `Node-${process.version}-bunqJSClient`;
                request.setHeader("User-Agent", nodeUserAgent);
            }
            else {
                request.setHeader("User-Agent", navigator.userAgent);
            }
            // serialize the data
            let data = "";
            const appendDataWhitelist = ["POST", "PUT", "DELETE"];
            if (dataIsEncrypted || requestHasFile) {
                const requestData = request.data;
                // overwrite transformRequest
                request.setOption("transformRequest", (data, headers) => {
                    return data;
                });
                data = requestData.toString("binary");
                // request.setData(data);
                request.setData(requestData);
            }
            else if (appendDataWhitelist.some(item => item === request.method)) {
                data = JSON.stringify(request.data);
            }
            // create a list of headers
            const headerStrings = [];
            Object.keys(request.headers)
                .sort()
                .map(headerKey => {
                if (headerKey.includes("X-Bunq") ||
                    headerKey.includes("Cache-Control") ||
                    headerKey.includes("User-Agent")) {
                    headerStrings.push(`${headerKey}: ${request.headers[headerKey]}`);
                }
            });
            // remove empty strings and join into a list of headers for the template
            const headers = headerStrings.join("\n");
            // the full template to sign
            const template = `${request.method} ${url}
${headers}

${data}`;
            // sign the template with our private key
            const signature = yield Sha256_1.signString(template, this.Session.privateKey);
            if (typeof navigator !== "undefined") {
                // remove the user agent again if we're in a browser env where we aren't allowed to
                request.removeHeader("User-Agent");
            }
            // set the signature
            request.setSigned(signature);
        });
    }
}
exports.default = SignRequestHandler;
