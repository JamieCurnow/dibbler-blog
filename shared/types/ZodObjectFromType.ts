import type { ZodOptional, ZodObject, ZodType, ZodDefault } from 'zod'

type IsPlainObject<T> = T extends object ? (T extends ReadonlyArray<unknown> ? never : T) : never

// Helper to get all optional keys of a type
type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never
}[keyof T]

// Helper to get all required keys of a type
type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K
}[keyof T]

// A Zod type that can be optional or have a default value
type ZodTypeWithOptionalOrDefault<T> = ZodType<T> | ZodOptional<ZodType<T>> | ZodDefault<ZodType<T>>

export type ZodObjectFromType<T> = ZodObject<
  {
    [K in RequiredKeys<T>]: T[K] extends IsPlainObject<T[K]> ? ZodObjectFromType<T[K]> : ZodType<T[K]>
  } & {
    [K in OptionalKeys<T>]: T[K] extends IsPlainObject<T[K]>
      ? ZodObjectFromType<NonNullable<T[K]>> | ZodTypeWithOptionalOrDefault<T[K]>
      : ZodTypeWithOptionalOrDefault<T[K]>
  }
>

export type ZodEnumFromType<T> = ZodType<T>
