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
class RequestLimiter {
    constructor(max_requests, interval) {
        this.max_requests = 3;
        this.interval = 3000;
        this.requests = 0;
        this.lastRequest = 0;
        this.timer = false;
        this.queue = [];
        /**
         * Wrap the callable given by the user and wrap it in a promise
         * @param callable
         * @returns {Promise<any>}
         */
        this.wrapCallable = (callable) => __awaiter(this, void 0, void 0, function* () {
            let resolvedCallback = null;
            let rejectCallback = null;
            const delayedPromise = new Promise((resolve, reject) => {
                resolvedCallback = resolve;
                rejectCallback = reject;
            });
            this.queue.push({
                resolve: resolvedCallback,
                reject: rejectCallback,
                callable: callable
            });
            return delayedPromise;
        });
        /**
         * Check if a new item from the queue should be called
         */
        this.check = () => {
            if (this.timer === false || this.queue.length > 0) {
                this.setTimer();
            }
            // check if we have reached the rate limit yet for this limiter
            if (this.queue.length > 0 && this.requests < this.max_requests) {
                // run as many requests as possible
                for (let i = this.requests; i < this.max_requests; i++) {
                    const queueItem = this.queue.shift();
                    if (!queueItem)
                        break;
                    this.requests++;
                    this.lastRequest = Date.now();
                    Promise.resolve(queueItem.callable()).then(queueItem.resolve, queueItem.reject);
                }
                this.check();
            }
            if (this.queue.length === 0) {
                this.clearTimer();
            }
        };
        /**
         * Start the timer which updates and resets the limits
         */
        this.setTimer = () => {
            if (this.timer !== false)
                return;
            this.timer = setInterval(() => {
                if (this.queue.length === 0) {
                    this.clearTimer();
                }
                this.requests = 0;
                this.check();
            }, this.interval);
        };
        /**
         * Clear the timer
         */
        this.clearTimer = () => {
            if (this.timer !== false) {
                clearInterval(this.timer);
                this.timer = false;
            }
        };
        /**
         * Run the request limit checker
         * @param callable
         * @returns {any}
         */
        this.run = (callable) => __awaiter(this, void 0, void 0, function* () {
            const promise = this.wrapCallable(callable);
            this.check();
            return promise;
        });
        this.max_requests = max_requests;
        this.interval = interval;
    }
}
exports.default = RequestLimiter;
