import type { Document, Db, Collection } from 'mongodb'
import { MongoClient } from 'mongodb'

export type CollectionDefinitions = Document
export type CollectionMap<T extends CollectionDefinitions> = {
  [K in keyof T]: Collection<T[K]>
}

export interface MongoConfig {
  /** connection string to mongo instance */
  connectionString: string
  /** name of the database to connect to */
  dbName: string
}

export interface MongoDbOptions<T extends CollectionDefinitions> {
  collections: { [K in keyof T]: { type: T[K] } }
  config: MongoConfig
}

/**
 * we can use this in a real world scenario like so:
 * export const useMongoDb = () =>
 *   initMongoDb({
 *     collections: {
 *       users: { type: {} as User },
 *       orders: { type: {} as Order },
 *       products: { type: {} as Product }
 *     },
 *     config: {
 *       connectionString: 'mongodb://localhost:27017',
 *       dbName: 'ecommerce'
 *     }
 *   })
 */

const initializedClients: { [key: string]: CollectionMap<CollectionDefinitions> } = {}

const getInitializedClient = <T extends CollectionDefinitions>(cacheKey: string) => {
  return (initializedClients[cacheKey] as CollectionMap<T>) || null
}

export const initMongoDb = async <T extends CollectionDefinitions>(opts: MongoDbOptions<T>) => {
  const connectionString = opts.config.connectionString
  if (!connectionString) throw new Error('MongoDB connection string is required')

  const dbName = opts.config.dbName
  if (!dbName) throw new Error('MongoDB database name is required')

  const cacheKey = connectionString + '|' + dbName

  const existingClient = getInitializedClient<T>(cacheKey)
  if (existingClient) return existingClient

  let client: MongoClient | null = null
  let db: Db | null = null
  let initializedCollections: Partial<CollectionMap<T>> = {}

  try {
    // if we don't have a client, create one and connect
    if (!client) {
      client = new MongoClient(opts.config.connectionString)
      await client.connect()
      // connect to the database
      // default to 'default' if no name provided
      db = client.db(opts.config.dbName ?? 'default')
    }

    // loop over the collections passed in config and initialize any that haven't been already
    for (const name of Object.keys(opts.collections) as (keyof T)[]) {
      if (!initializedCollections[name]) {
        if (!db) {
          throw new Error('Database connection not established')
        }
        // add the collection to our map
        initializedCollections[name] = db.collection<T[typeof name]>(name as string)
      }
    }

    // cache the initialized client for future calls
    initializedClients[cacheKey] = initializedCollections as CollectionMap<T>

    return initializedCollections as CollectionMap<T>
  } catch (error) {
    // if something went wrong, close the client IF it was opened
    if (client) {
      await client.close().catch(() => {})
      client = null
      db = null
      initializedCollections = {}
    }
    throw error
  }
}
