import type { CacheEntry } from 'cachified'
import { LRUCache } from 'lru-cache'

export const defaultTtl = 10 * 60 * 1000
export const lruCache = new LRUCache<string, CacheEntry>({ max: 1000 })
