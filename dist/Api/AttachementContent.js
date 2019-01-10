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
class AttachementContent {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    get(attachmendUUID, options = { base64: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create("/attachment-public/content", "GET");
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.get(`/v1/attachment-public/${attachmendUUID}/content`, {}, {
                    axiosOptions: {
                        responseType: "arraybuffer"
                    }
                });
            }));
            // return data as base64
            if (options.base64 === true) {
                return new Promise((resolve, reject) => {
                    if (response instanceof Buffer) {
                        // buffers are simply encoded as base64
                        resolve(response.toString("base64"));
                    }
                    else {
                        const blob = new Blob([response], { type: "image/png" });
                        // create a new filereader and transform response blob data into a base64 url
                        const reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = error => reject(error);
                    }
                });
            }
            // return raw respone image
            return response;
        });
    }
}
exports.default = AttachementContent;
