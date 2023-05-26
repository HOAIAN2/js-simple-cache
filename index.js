"use strict"

class Cache {
    #key
    #limit
    #data
    #useCount
    constructor(key = '', limit = undefined) {
        if (typeof key !== 'string') throw new Error('Key must be a string')
        if (key.trim() === '') throw new Error('Key cannot be empty')
        if (limit) {
            if (!Number.isInteger(limit) || limit < 1) throw new Error('Limit must be integer and greater than 1')
            this.#limit = limit
            this.#useCount = new Map()
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
        if (this.#limit && this.size === this.#limit) this.#removeLeastUse()
        this.#data.set(item[this.#key], item)
        if (this.#limit) this.#useCount.set(item[this.#key], 0)
    }
    get(key) {
        if (this.#limit && this.#data.has(key)) this.#useCount.set(key, this.#useCount.get(key) + 1)
        return this.#data.get(key)
    }
    remove(key) {
        this.#data.delete(key)
    }
    clear() {
        this.#data.clear()
    }
    findKey(callback) {
        let map = this.#data.values()
        let key = undefined
        let found = false
        for (let index = 0; index < this.size; index++) {
            let value = map.next()
            found = callback(value.value)
            if (found) {
                key = value.value[this.#key]
                break
            }
        }
        return key
    }
    filter(callback) {
        let map = this.#data.values()
        const array = []
        for (let index = 0; index < this.size; index++) {
            let value = map.next()
            if (callback(value.value)) array.push(value.value)
        }
        return array
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
    #findLeastUse() {
        let map = this.#useCount.values()
        let key = undefined
        let minimum = Infinity
        for (let index = 0; index < this.size; index++) {
            let value = map.next()
            if (value.value < minimum) {
                minimum = value.value[1]
                key = value[0]
            }
        }
        return key
    }
    #removeLeastUse() {
        const key = this.#findLeastUse()
        this.#data.delete(key)
        this.#useCount.delete(key)
    }
}

module.exports = Cache