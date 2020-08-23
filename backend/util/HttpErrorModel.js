class HttpError extends Error {
  constructor(message, errorStatusCode) {
    super(message);
    this.errorStatusCode = errorStatusCode;
  }
}

module.exports = HttpError;