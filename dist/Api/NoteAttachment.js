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
class NoteAttachment {
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
            const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`);
            // default base
            const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
            // full endpoint url
            const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-attachment/${noteTextId}`;
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
            const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`, "LIST");
            // default base
            const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
            // full endpoint url
            const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-attachment`;
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
     * @param {number} attachment_id
     * @param {false | string} description
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    post(eventType, userId, monetaryAccountId, eventId, attachment_id, description = false, secondaryEventId = false, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`, "POST");
            // default base
            const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
            // full endpoint url
            const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-attachment`;
            // format the body
            const bodyData = {
                attachment_id: attachment_id
            };
            if (description)
                bodyData.description = description;
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.post(fullEndpoint, bodyData); }));
            return response.Response;
        });
    }
    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {number} noteTextId
     * @param {number} attachment_id
     * @param {false | string} description
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    put(eventType, userId, monetaryAccountId, eventId, noteTextId, attachment_id, description = false, secondaryEventId = false, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`, "PUT");
            // default base
            const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
            // full endpoint url
            const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-attachment/${noteTextId}`;
            // format the body
            const bodyData = {
                attachment_id: attachment_id
            };
            if (description)
                bodyData.description = description;
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.put(fullEndpoint, bodyData); }));
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
            const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`, "DELETE");
            // default base
            const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
            // full endpoint url
            const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-attachment/${noteTextId}`;
            const response = yield limiter.run(() => __awaiter(this, void 0, void 0, function* () { return this.ApiAdapter.delete(fullEndpoint); }));
            return response.Response;
        });
    }
}
exports.default = NoteAttachment;
