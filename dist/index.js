"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const flat_1 = __importDefault(require("flat"));
class Cache {
    #key;
    #limit;
    #data;
    #useCount;
    constructor(key, limit) {
        if (typeof key !== 'string')
            throw new Error('Key must be a string');
        if (key.trim() === '')
            throw new Error('Key cannot be empty');
        if (limit) {
            if (!Number.isInteger(limit) || limit < 1)
                throw new Error('Limit must be integer and greater than 1');
            this.#limit = limit;
            this.#useCount = new Map();
        }
        this.#data = new Map();
        this.#key = key;
    }
    get key() {
        return this.#key;
    }
    get size() {
        return this.#data.size;
    }
    get limit() {
        return this.#limit;
    }
    set limit(value) {
        if (!Number.isInteger(value) || value < 1)
            throw new Error('Limit must be integer and greater than 1');
        if (value < this.size)
            throw new Error('New limit value must greater than cache size');
        this.#limit = value;
    }
    set(item, expiryTime) {
        if (typeof item !== 'object')
            throw new Error('item must be an object');
        if (!Object.hasOwn(item, this.#key))
            throw new Error(`item must contain key: ${this.#key}`);
        if (expiryTime) {
            if (!this.#isValidNumber(expiryTime))
                throw new Error('expiryTime must me a number and greater than 0');
            setTimeout(() => {
                this.remove(item[this.#key]);
            }, expiryTime);
        }
        if (this.#limit && this.size === this.#limit)
            this.#removeLeastUse();
        this.#data.set(item[this.#key], item);
        if (this.#limit)
            this.#useCount.set(item[this.#key], 0);
    }
    get(key) {
        if (this.#limit && this.#data.has(key))
            this.#useCount.set(key, this.#useCount.get(key) + 1);
        return this.#data.get(key);
    }
    remove(key) {
        if (this.#limit && this.#data.has(key))
            this.#useCount.delete(key);
        if (this.#data.has(key))
            this.#data.delete(key);
    }
    clear() {
        if (this.#limit)
            this.#useCount.clear();
        this.#data.clear();
    }
    findKey(callback) {
        const map = this.#data.values();
        let key = undefined;
        let found = false;
        const size = this.size;
        for (let index = 0; index < size; index++) {
            let value = map.next();
            found = callback(value.value);
            if (found) {
                key = value.value[this.#key];
                break;
            }
        }
        return key;
    }
    filter(callback) {
        const map = this.#data.values();
        const array = [];
        const size = this.size;
        for (let index = 0; index < size; index++) {
            let value = map.next();
            if (callback(value.value))
                array.push(value.value);
        }
        return array;
    }
    toObject() {
        return Object.fromEntries(this.#data);
    }
    toArray() {
        return Array.from(this.#data).map(item => item[1]);
    }
    toJSONArray() {
        return JSON.stringify(this.toArray());
    }
    toJSONObject() {
        return JSON.stringify(this.toObject());
    }
    search(options) {
        if (options.searchValue.trim() === '')
            return;
        if (options.nocase)
            options.searchValue = options.searchValue.toLocaleLowerCase();
        const result = [];
        const map = this.#data.values();
        const size = this.size;
        for (let index = 0; index < size; index++) {
            let value = map.next();
            if (options.deepScan) {
                const object = (0, flat_1.default)(value.value);
                const keys = Object.keys(object).filter(key => {
                    return options.searchFields.some(field => key.includes(field));
                });
                if (this.#isMatchValue(options.searchValue, object, keys, options.nocase))
                    result.push(value.value);
            }
            else {
                const object = value.value;
                const keys = Object.keys(object).filter(key => options.searchFields.includes(key));
                if (this.#isMatchValue(options.searchValue, object, keys, options.nocase))
                    result.push(value.value);
            }
        }
        return result;
    }
    #findLeastUse() {
        const map = this.#useCount.entries();
        let key = undefined;
        let minimum = Infinity;
        for (let index = 0; index < this.size; index++) {
            let value = map.next();
            if (value.value[1] < minimum) {
                minimum = value.value[1];
                key = value.value[0];
            }
        }
        return key;
    }
    #removeLeastUse() {
        const key = this.#findLeastUse();
        this.#data.delete(key);
        this.#useCount.delete(key);
    }
    #isValidNumber(number) {
        if (typeof number !== 'number')
            return false;
        if (number <= 0)
            return false;
        return true;
    }
    #isMatchValue(value, object, keys, nocase) {
        const unaccept = [String(null), String(undefined)];
        for (let index = 0; index < keys.length; index++) {
            const valueOfKey = String(object[keys[index]]);
            if (unaccept.includes(valueOfKey))
                continue;
            if (nocase) {
                if (valueOfKey.toLocaleLowerCase().includes(value))
                    return true;
            }
            else {
                if (valueOfKey.includes(value))
                    return true;
            }
        }
        return false;
    }
}
exports.Cache = Cache;
