import { WebStorageOptions, WebStorageValue } from './types/storage'

export default class WebStorageUtils {
  private storage: Storage
  private prefix: string
  public constructor(options: WebStorageOptions = {}) {
    const { storage = 'local', prefix = '' } = options
    this.storage = ['localStorage', 'local'].includes(storage)
      ? window.localStorage
      : window.sessionStorage
    this.prefix = prefix ? `${prefix}::` : ''
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  private getValueInStorage<T = any>(key: string): WebStorageValue<T> | undefined {
    const result = this.storage.getItem(this.getKey(key))
    let value: WebStorageValue<T> | undefined
    if (result) {
      try {
        const data = JSON.parse(result)
        if (data.e && data.e < Date.now()) {
          throw new Error(`${key} has expired`)
        }
        value = data
      } catch (err) {
        this.del(key)
      }
    }
    return value
  }

  private stringifyValue(v: any, ttl?: number): string {
    const WebStorageValue: WebStorageValue = { v }
    if (ttl) {
      WebStorageValue.e = Date.now() + ttl * 1000
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

  public get<T = any>(key: string): T | undefined {
    return this.getValueInStorage<T>(key)?.v
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

export const local = new WebStorageUtils({ storage: 'local' })
export const localStorageWrapper = local
export const localStorage = localStorageWrapper

export const session = new WebStorageUtils({ storage: 'session' })
export const sessionStorageWrapper = session
export const sessionStorage = session
