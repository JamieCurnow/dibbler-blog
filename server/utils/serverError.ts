import { createError } from 'h3'

// These need to be functions to avoid creating all errors on import
// which is why we don't export them because the syntax would be weird
// instead, use the serverError function below which has nice syntax.
const serverErrors = {
  404: (statusMessage: string = 'Not Found') => createError({ statusCode: 404, statusMessage }),
  403: (statusMessage: string = 'Forbidden') => createError({ statusCode: 403, statusMessage }),
  400: (statusMessage: string = 'Bad Request') => createError({ statusCode: 400, statusMessage }),
  401: (statusMessage: string = 'Unauthorized') => createError({ statusCode: 401, statusMessage }),
  500: (statusMessage: string = 'Internal Server Error') => createError({ statusCode: 500, statusMessage })
}

type ServerErrorCode = keyof typeof serverErrors

/**
 * Helper to create a server error by status code.
 * Has a predictable status message.
 * @example
 * if (!doc) throw serverError(404)
 * @example
 * if (!hasAccess) throw serverError(403, 'You do not have access to this resource')
 */
export const serverError = (statusCode: ServerErrorCode | number, statusMessage?: string) => {
  const err = codeIsKeyofServerErrors(statusCode) ? serverErrors[statusCode] : null

  if (!err) {
    return createError({
      statusCode: statusCode || 500,
      statusMessage: statusMessage || 'Unknown Server Error'
    })
  }

  return err(statusMessage)
}

const codeIsKeyofServerErrors = (code: number): code is keyof typeof serverErrors => {
  return Object.keys(serverErrors).includes(code.toString())
}
