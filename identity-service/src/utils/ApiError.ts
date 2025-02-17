class ApiError extends Error {
  statusCode: number
  constructor(message = 'Bad Request', statusCode = 400, stack?: string) {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    }
  }
}

export { ApiError }
