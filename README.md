# webstorage-utils
一个操作 `WebStorage` 的工具库。

## Install
```
// npm
npm install webstorage-utils

// yarn 
yarn add webstorage-utils

```
## Use
```
const storage = new WebStorageUtil({ storage: 'localStorage' })
```

## API
### new WebStorageUtil(options)
- options
  - `storage`: 'localStorage' | 'sessionStorage'
  - `prefix`: string 

### 设置值，storage.set(key, value[, ttl])
- `key`: string
- `value`: any
- `ttl`: number, 单位：秒

```javascript
storage.set('key1', 1)

storage.set('key2', { example: 1 })

// 10 秒后失效
storage.set('key3', { example: 1 }, 10)
```

### 根据 key 获取值，storage.get(key)
- `key`: string

```javascript
const value1 = storage.set('key1')
```

### 删除单个 key，storage.del(key)
- `key`: string

```javascript
storage.del('key1')
```

### 清空全部，storage.clear()

```javascript
storage.clear('key1')
```

### storage.updateTTL(key[, ttl])
- `key`: string
- `ttl`: string

```javascript
// 刷新原来的 ttl。如果原来是 10 秒，则 10 秒后才失效
storage.updateTTL('key1')

// 10 秒后失效
storage.updateTTL('key1', 10)
```