// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses

const HttpStatus = Object.freeze({
  // Informational responses (100 – 199)
  // Successful responses (200 – 299)
  OK: { code: 200, message: "OK" },
  CREATED: { code: 201, message: "Created" },
  ACCEPTED: { code: 202, message: "Accepted" },
  NO_CONTENT: { code: 204, message: "No Content" },
  RESET_CONTENT: { code: 205, message: "Reset Content" },
  PARTIAL_CONTENT: { code: 206, message: "Partial Content" },
  // Redirection messages (300 – 399)
  // Client error responses (400 – 499)
  BAD_REQUEST: { code: 400, message: "Bad Request" },
  UNAUTHORIZED: { code: 401, message: "Unauthorized" },
  FORBIDDEN: { code: 403, message: "Forbidden" },
  NOT_FOUND: { code: 404, message: "Not Found" },
  METHOD_NOT_ALLOWED: { code: 405, message: "Method Not Allowed" },
  CONFLICT: { code: 409, message: "Conflict" },
  GONE: { code: 410, message: "Gone" },
  PRECONDITION_FAILED: { code: 412, message: "Precondition Failed" },
  UNSUPPORTED_MEDIA_TYPE: { code: 415, message: "Unsupported Media Type" },
  UNPROCESSABLE_ENTITY: { code: 422, message: "Unprocessable Entity" },
  TOO_MANY_REQUESTS: { code: 429, message: "Too Many Requests" },
  // Server error responses (500 – 599)
  INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
  NOT_IMPLEMENTED: { code: 501, message: "Not Implemented" },
  BAD_GATEWAY: { code: 502, message: "Bad Gateway" },
  SERVICE_UNAVAILABLE: { code: 503, message: "Service Unavailable" },
  GATEWAY_TIMEOUT: { code: 504, message: "Gateway Timeout" }
});

class HttpError extends Error {
  constructor(status) {
    super(status.message);
    this.statusCode = status.code;
    this.name = "HttpError";
  }
}

export { HttpStatus, HttpError };