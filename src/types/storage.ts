export interface WebStorageOptions {
  storage?: 'localStorage' | 'sessionStorage' | 'local' | 'session'
  prefix?: string
  maxSize?: number
}

export interface WebStorageValue<T = any> {
  v?: T
  e?: number
}
