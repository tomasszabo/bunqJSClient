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
class NoteText {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * Generates the base url for the different variable endpoints based on eventType
     * @param {NoteEventType} eventType
     * @param {false | number} eventId
     * @param {false | number} secondaryEventId
     * @returns {string}
     */
    createEndpoint(eventType, eventId = false, secondaryEventId = false) {
        switch (eventType) {
            case "schedule":
                return `schedule/${eventId}/schedule-instance/${secondaryEventId}`;
            case "whitelist":
                return `whitelist/${eventId}/whitelist-result/${secondaryEventId}`;
            default:
                return `${eventType}/${eventId}`;
        }
    }
    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {number} noteTextId
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    get(eventType, userId, monetaryAccountId, eventId, noteTextId, secondaryEventId = false, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-text`);
            // default base
            const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
            // full endpoint url
            const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-text/${noteTextId}`;
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.get(fullEndpoint); }));
            return response.Response[0];
        });
    }
    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    list(eventType, userId, monetaryAccountId, eventId, secondaryEventId = false, options = {}) {
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
            const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-text`, "LIST");
            // default base
            const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
            // full endpoint url
            const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-text`;
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.get(fullEndpoint); }), {}, {
                axiosOptions: {
                    params: params
                }
            });
            return response.Response;
        });
    }
    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {string} content
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    post(eventType, userId, monetaryAccountId, eventId, content, secondaryEventId = false, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-text`, "POST");
            // default base
            const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
            // full endpoint url
            const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-text`;
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.post(fullEndpoint, {
                    content: content
                });
            }));
            return response.Response;
        });
    }
    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {number} noteTextId
     * @param {string} content
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    put(eventType, userId, monetaryAccountId, eventId, noteTextId, content, secondaryEventId = false, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-text`, "PUT");
            // default base
            const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
            // full endpoint url
            const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-text/${noteTextId}`;
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () {
                return this.ApiAdapter.put(fullEndpoint, {
                    content: content
                });
            }));
            return response.Response;
        });
    }
    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {number} noteTextId
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    delete(eventType, userId, monetaryAccountId, eventId, noteTextId, secondaryEventId = false, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-text`, "DELETE");
            // default base
            const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
            // full endpoint url
            const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-text/${noteTextId}`;
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.delete(fullEndpoint); }));
            return response.Response;
        });
    }
}
exports.default = NoteText;
