# js-simple-cache

A simple caching object data base on ES6 Map() that support auto invalidate cache when reach maximum size

## Install

```
npm i js-simple-cache
```

## Usage

```js
const Cache = require('js-simple-cache')
const cache = new Cache('userID', 10000)
```
### options

* First aggrument is unique `key`, when you `set` new item, it auto set with that `key` for you and you can access later with `get`
* Second arrgrument is limit size, it help cache to auto delete old item (first item) when cache reach maximum size limit (but you can set undefined to have no limit)
* Note: This only accept cache object has a props that you provide when init

## API provide

### Store and item

```js
cache.set({userID:1, username: 'HOAI AN'})
```
* This is base on ES6 Map so if you put same key it gonna replace old item

### Get and item

```js
const user = cache.get(1)
console.log(user) // {userID:1, username: 'HOAI AN'}
```
### Remove and item

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
