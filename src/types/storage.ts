export interface WebStorageOptions {
  storage?: 'localStorage' | 'sessionStorage' | 'local' | 'session'
  prefix?: string
  maxSize?: number
}

export interface WebStorageValue {
  value?: any
  expiredAt?: number
  ttl?: number
}
