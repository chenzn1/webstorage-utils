export interface WebStorageOptions {
  storage?: 'localStorage' | 'sessionStorage' | 'local' | 'session'
  prefix?: string
  maxSize?: number
}

export interface WebStorageValue {
  v?: any
  e?: number
}
