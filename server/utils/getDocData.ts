import type { Document, ObjectId } from 'mongodb'

/**
 * Use this util to convert a MongoDB document to a format
 * that includes `id` as a string instead of `_id` as an ObjectId.
 *
 * This is akin to firestore's doc.data() method.
 */
export const getDocData = <T extends Document & { _id: ObjectId }>(doc: T) => {
  const { _id, ...data } = doc
  return { id: _id.toString(), ...data }
}
