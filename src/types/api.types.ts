export interface ValidationError {
  path: string;
  message: string;
}

export interface ValidationErrorResponse {
  message: string;
  errors: ValidationError[];
}

export interface StandardErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export type ApiErrorResponse =
  | ValidationErrorResponse
  | StandardErrorResponse;