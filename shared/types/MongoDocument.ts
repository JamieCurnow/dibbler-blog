import type { ObjectId } from 'mongodb'

export interface MongoDocument {
  /**
   * The unique identifier for the document.
   * This will be the string representation of the MongoDB ObjectId.
   * */
  _id: string
  /** created timestamp in ISO 8601 format. */
  created: string
  /** last updated timestamp in ISO 8601 format. */
  updated: string
}

export type ToMongoDoc<T> = Omit<T, 'id'> & { _id: ObjectId }
