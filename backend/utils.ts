export function toError(error?: Error) {
  return {
    name: error?.name,
    message: error?.message,
    stack: error?.stack,
    cause: error?.cause,
  }
}

