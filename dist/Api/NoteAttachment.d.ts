import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import NoteEventType from "../Types/NoteEventType";
export default class NoteAttachment implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * Generates the base url for the different variable endpoints based on eventType
     * @param {NoteEventType} eventType
     * @param {false | number} eventId
     * @param {false | number} secondaryEventId
     * @returns {string}
     */
    private createEndpoint;
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
    get(eventType: NoteEventType, userId: number, monetaryAccountId: number, eventId: number, noteTextId: number, secondaryEventId?: false | number, options?: any): Promise<any>;
    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    list(eventType: NoteEventType, userId: number, monetaryAccountId: number, eventId: number, secondaryEventId?: false | number, options?: any): Promise<any>;
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
    post(eventType: NoteEventType, userId: number, monetaryAccountId: number, eventId: number, attachment_id: number, description?: false | string, secondaryEventId?: false | number, options?: any): Promise<any>;
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
    put(eventType: NoteEventType, userId: number, monetaryAccountId: number, eventId: number, noteTextId: number, attachment_id: number, description?: false | string, secondaryEventId?: false | number, options?: any): Promise<any>;
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
    delete(eventType: NoteEventType, userId: number, monetaryAccountId: number, eventId: number, noteTextId: number, secondaryEventId?: false | number, options?: any): Promise<any>;
}
