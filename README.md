# webstorage-utils
Some utils of `WebStorage`

[![lint-and-build](https://github.com/chenzn1/webstorage-utils/actions/workflows/lint-and-build.yml/badge.svg?branch=master)](https://github.com/chenzn1/webstorage-utils/actions/workflows/lint-and-build.yml)

## Install
```
// npm
npm install webstorage-utils

// yarn 
yarn add webstorage-utils

```
## Use
```
import { localStorage, sessionStorage } from 'webstorage-utils'

localStorage.set('example', 'demo')
localStorage.get('example') // demo

sessionStorage.set('example', 'demo')
sessionStorage.get('example') // demo
```

## API
### new WebStorageUtils(options)
- options
  - `storage`: 'localStorage' | 'local' | 'sessionStorage' | 'session'
  - `prefix`: string 

### storage.set(key, value[, ttl])
- `key`: string
- `value`: any
- `ttl`: number, second

```javascript
storage.set('key1', 1)

storage.set('key2', { example: 1 })

// invalid after 10 seconds
storage.set('key3', { example: 1 }, 10)
```

### storage.get(key)
- `key`: string

```javascript
const value1 = storage.set('key1')
```

### storage.del(key)
- `key`: string

```javascript
storage.del('key1')
```

### storage.clear()

```javascript
storage.clear('key1')
```