export type ApiValidationDetail = {
  message: string;
};

export class ApiError extends Error {
  code: string;
  details?: ApiValidationDetail[];

  constructor(code: string, message: string, details?: ApiValidationDetail[]) {
    super(message);
    this.code = code;
    this.details = details;
  }
}