export enum CREATED_AS {
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER'
}

export enum PAYMENT_TYPE {
  COD = 'COD',
  PREPAID = 'PREPAID'
}

export enum END_POINT {
  BASE_URL = '/api'
}

export enum HTTP_STATUS_CODE {
  // eslint-disable-next-line no-magic-numbers
  BAD_REQUEST = 400,
  // eslint-disable-next-line no-magic-numbers
  UNAUTHORIZED = 401,
  // eslint-disable-next-line no-magic-numbers
  FORBIDDEN = 403,
  // eslint-disable-next-line no-magic-numbers
  NOT_FOUND = 404,
  // eslint-disable-next-line no-magic-numbers
  UNPROCESSABLE_ENTITY = 422,
  // eslint-disable-next-line no-magic-numbers
  INTERNAL_SERVER_ERROR = 500,
  // eslint-disable-next-line no-magic-numbers
  SERVICE_UNAVAILABLE = 503,
  // eslint-disable-next-line no-magic-numbers
  GATEWAY_TIMEOUT = 504,
  // eslint-disable-next-line no-magic-numbers
  OK = 200,
  // eslint-disable-next-line no-magic-numbers
  CREATED = 201,
  // eslint-disable-next-line no-magic-numbers
  UPDATED = 200,
  // eslint-disable-next-line no-magic-numbers
  CONFLICT = 409
  // eslint-disable-next-line no-magic-numbers
}

export enum ERROR_MESSAGE {
  INTERNAL_SERVER_ERROR = 'Internal server error',
  VALIDATION_ERROR = 'Validation error'
}
