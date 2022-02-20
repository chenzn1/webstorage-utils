# webstorage-utils
Some utils of `WebStorage`

[![Build Status](https://github.com/chenzn1/webstorage-utils/actions/workflows/yarn-test.yml/badge.svg?branch=master&event=push)](https://github.com/chenzn1/webstorage-utils/actions/workflows/yarn-test.yml)

## Install
```
// npm
npm install webstorage-utils

// yarn 
yarn add webstorage-utils

```
## Use
```
import { localStorageWrapper, sessionStorageWrapper } from 'webstorage-utils'

localStorageWrapper.set('example', 'demo')
localStorageWrapper.get('example') // demo

sessionStorageWrapper.set('example', 'demo')
sessionStorageWrapper.get('example') // demo
```

## API
### new WebStorageUtil(options)
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