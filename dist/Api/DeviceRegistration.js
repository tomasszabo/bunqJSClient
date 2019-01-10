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
class DeviceRegistration {
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
    add(options = { description: "My Device", permitted_ips: [] }) {
        return __awaiter(this, void 0, void 0, function* () {
            const postData = {
                description: options.description,
                secret: this.Session.apiKey
            };
            if (options.permitted_ips.length > 0) {
                postData["permitted_ips"] = options.permitted_ips;
            }
            const response = yield this.ApiAdapter.post("/v1/device-server", postData, {}, {
                skipSessionCheck: true
            });
            // return the device id
            return response.Response[0].Id.id;
        });
    }
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    get(options = { deviceId: null }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options.deviceId === null) {
                // if none is set we default to our current deviceId
                options.deviceId = this.Session.deviceId;
            }
            const response = yield this.ApiAdapter.get(`/v1/device-server/${options.deviceId}`);
            // return the device id
            return response.Response[0].Id.id;
        });
    }
}
exports.default = DeviceRegistration;
