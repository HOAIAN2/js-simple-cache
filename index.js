"use strict"

class Cache {
    #key
    #limit
    #data
    constructor(key = '', limit) {
        if (typeof key !== 'string') throw new Error('Key must be a string')
        if (limit) {
            if (!Number.isInteger(limit) || limit < 1) throw new Error('Limit must be integer and greater than 1')
            this.#limit = limit
        }
        this.#data = new Map()
        this.#key = key
    }
    get size() {
        return this.#data.size
    }
    set(item) {
        if (typeof item !== 'object') throw new Error('item must be an object')
        if (!Object.hasOwn(item, this.#key)) throw new Error(`item must contain key: ${this.#key}`)
        if (this.#limit && this.size === this.#limit) this.#data.delete(this.#data.entries().next().value[0])
        this.#data.set(item[this.#key], item)
    }
    get(key) {
        return this.#data.get(key)
    }
    remove(key) {
        this.#data.delete(key)
    }
    clear() {
        this.#data.clear()
    }
    toObject() {
        return Object.fromEntries(this.#data)
    }
    toArray() {
        return Array.from(this.#data).map(item => item[1])
    }
    toJSONArray() {
        return JSON.stringify(this.toArray())
    }
    toJSONObject() {
        return JSON.stringify(this.toObject())
    }
}

module.exports = Cache