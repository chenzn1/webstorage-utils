export interface WebStorageOptions {
  storage?: 'localStorage' | 'sessionStorage'
  prefix?: string
  maxSize?: number
}

export interface WebStorageValue {
  value?: any
  expiredAt?: number
  ttl?: number
}
