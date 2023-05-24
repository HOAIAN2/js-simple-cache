# js-simple-cache

A simple memory cache support auto remove when reach limit size base on ES6 Map()

## Usage

```js
const cache = new Cache('userID', 10000)
```
### options

* First aggrument is unique `key`, whe you `set` new item, it auto set with that `key` for you and you can access later with `get`
* Second arrgrument is limit size, it help cache to auto delete old item (first item) when cache reach maximum size limit (but you can set undefined to have no limit)

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