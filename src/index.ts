import { WebStorageOptions, WebStorageValue } from './types/storage'
export default class WebStorageUtil {
  private storage: Storage
  private prefix: string
  public constructor(options: WebStorageOptions = {}) {
    const { storage = 'localStorage', prefix = '' } = options
    this.storage = storage === 'localStorage' ? localStorage : sessionStorage
    this.prefix = prefix
  }
  private getKey(key: string): string {
    return `${this.prefix}::${key}`
  }
  private getValueInStorage(key: string): WebStorageValue {
    const result = this.storage.getItem(this.getKey(key))
    let value: WebStorageValue = {}
    if (result) {
      try {
        const data = JSON.parse(result)
        if (data.expiredAt && data.expiredAt < Date.now()) {
          throw new Error(`${key} has expired`)
        }
        value = data
      } catch (err) {
        this.del(key)
      }
    }
    return value
  }
  private stringifyValue(value: any, ttl?: number): string {
    const WebStorageValue: WebStorageValue = { value }
    if (ttl) {
      WebStorageValue.expiredAt = Date.now() + ttl * 1000
      WebStorageValue.ttl = ttl
    }
    return JSON.stringify(WebStorageValue)
  }
  public del(key: string): void {
    this.storage.removeItem(this.getKey(key))
  }
  public set(key: string, value: any, ttl?: number): void {
    this.storage.setItem(this.getKey(key), this.stringifyValue(value, ttl))
  }
  public get(key: string): any {
    const { value } = this.getValueInStorage(key)
    return value
  }
  public updateTTL(key: string, ttl?: number): any {
    const { ttl: oldTTL, value } = this.getValueInStorage(key)
    const nTTL = ttl !== undefined ? ttl : oldTTL
    if (value !== undefined && nTTL !== undefined) {
      this.set(key, value, nTTL)
    }
    return value
  }
  public clear(): void {
    if (this.prefix) {
      const i = 0
      while (i < this.storage.length) {
        const key = this.storage.key(i)
        if (key?.indexOf(`${this.prefix}::`) === 0) {
          this.storage.removeItem(key)
        } else {
          i++
        }
      }
    } else {
      this.storage.clear()
    }
  }
}
