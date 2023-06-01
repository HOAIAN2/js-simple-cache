# js-simple-cache

A simple caching object data base on ES6 Map() that support auto invalidate cache when reach maximum size. This'll work if all object you wanna cache have a unique `key` like when you cache user data, all object have a `key` like `userID`

## Install

```
npm i js-simple-cache
```

## Usage

```js
// v1.0.7
const Cache = require('js-simple-cache')
const cache = new Cache('userID', 10000)
// v1.2.0
// Node module
const { Cache } = require('js-simple-cache')
const cache = new Cache('userID', 10000)
// ES module
import { Cache } from 'js-simple-cache'
const cache = new Cache('userID', 10000)
```
### options

* First aggrument is unique `key`, when you `set` new item, it auto set with that `key` for you and you can access later with `get`
* Second arrgrument is limit size, it help cache to auto delete least use when cache reach maximum size limit (but you can set undefined to have no limit)
* Note: This only accept cache object has a props that you provide when init

## API provide

### Getter and Setter
* Getter only: key, size
* Getter and Setter: limit (Integer and greater than current size)

### Store an item
* First aggrument is the object that contain `key`, second aggrument is a timer (miliseconds) that will help you auto remove item after `X` miliseconds.
```js
cache.set({userID:1, username: 'HOAI AN'}, 10000) // item will auto remove after 10 seconds
```
* This is base on ES6 Map so if you put same key it gonna replace old item

### Get an item

```js
const user = cache.get(1)
console.log(user) // {userID:1, username: 'HOAI AN'}
```
### Remove an item

```js
cache.remove(1)
```

### Clear cache

```js
cache.clear()
```

### find a key

```js
cache.set({ userID: 1, username: 'HOAI AN' })
cache.set({ userID: 2, username: 'HOAI AN1' })
cache.set({ userID: 3, username: 'HOAI AN2' })
cache.set({ userID: 4, username: 'HOAI AN3' })
cache.set({ userID: 5, username: 'HOAI AN4' })
cache.set({ userID: 6, username: 'HOAI AN5' })
const key = cache.findKey(item => item.username === 'HOAI AN3')
console.log(key) // 4
```

### filter

```js
const key = cache.filter(item => item.username.includes('HOAIAN'))
```
* You can convert to Object / Array to use other prototype

### search

* first arrgument is `searchvalue`, second arrgument is a list of field that will search, third arrgument is `nocase`, If `true`, search will ignore upper case or lower case

```js
const result = cache.search('search value', ['field1, field2'], true)
```

### Export to Object / Array

```js
cache.toArray()
cache.toObject()
```

* If you export to Object, it gonna use your `key` values when you create cache as `key` for Object

### Export to JSON (Object / Array)

```js
cache.toJSONArray()
cache.toJSONObject()
```
