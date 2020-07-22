import { WebStorageOptions, WebStorageValue } from './types/storage'

class WebStorageUtils {
  private storage: Storage
  private prefix: string
  public constructor(options: WebStorageOptions = {}) {
    const { storage = 'local', prefix = '' } = options
    this.storage = ['localStorage', 'local'].includes(storage)
      ? localStorage
      : sessionStorage
    this.prefix = prefix ? `${prefix}::` : ''
  }
  private getKey(key: string): string {
    return `${this.prefix}${key}`
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
  public del(key: string): this {
    this.storage.removeItem(this.getKey(key))
    return this
  }
  public set(key: string, value: any, ttl?: number): this {
    this.storage.setItem(this.getKey(key), this.stringifyValue(value, ttl))
    return this
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
  public clear(): this {
    if (this.prefix) {
      let i = 0
      while (i < this.storage.length) {
        const key = this.storage.key(i)
        if (key?.indexOf(this.prefix) === 0) {
          this.storage.removeItem(key)
        } else {
          i++
        }
      }
    } else {
      this.storage.clear()
    }
    return this
  }
}

export default WebStorageUtils

export const local = new WebStorageUtils({ storage: 'local' })

export const session = new WebStorageUtils({ storage: 'session' })
