export enum CREATED_AS {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
}

export enum PAYMENT_TYPE {
  COD = "COD",
  PREPAID = "PREPAID",
}

export enum END_POINT {
  BASE_URL = "/api",
}

export enum HTTP_STATUS_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  OK = 200,
  CREATED = 201,
  UPDATED = 200,
  CONFLICT = 409,
}

export enum ERROR_MESSAGE {
  INTERNAL_SERVER_ERROR = "Internal server error",
  VALIDATION_ERROR = "Validation error",
}
