import { DrizzleQueryError } from "drizzle-orm";
import type { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";
import { ZodError } from "zod";

type HttpErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "METHOD_NOT_ALLOWED"
  | "NOT_ACCEPTABLE"
  | "REQUEST_TIMEOUT"
  | "CONFLICT"
  | "GONE"
  | "LENGTH_REQUIRED"
  | "PRECONDITION_FAILED"
  | "PAYLOAD_TOO_LARGE"
  | "URI_TOO_LONG"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "RANGE_NOT_SATISFIABLE"
  | "EXPECTATION_FAILED"
  | "TEAPOT";

type BackendErrorCode =
  | "VALIDATION_ERROR"
  | "USER_NOT_FOUND"
  | "USER_ALREADY_EXISTS"
  | "USER_ALREADY_VERIFIED"
  | "INVALID_PASSWORD"
  | "INVALID_VERIFICATION_CODE";

type ErrorCode = HttpErrorCode | BackendErrorCode | "INTERNAL_ERROR";

export function getStatusFromErrorCode(code: ErrorCode): number {
  switch (code) {
    case "BAD_REQUEST":
    case "VALIDATION_ERROR":
      return 400;
    case "UNAUTHORIZED":
    case "INVALID_PASSWORD":
    case "INVALID_VERIFICATION_CODE":
      return 401;
    case "NOT_FOUND":
    case "USER_NOT_FOUND":
      return 404;
    case "METHOD_NOT_ALLOWED":
      return 405;
    case "NOT_ACCEPTABLE":
      return 406;
    case "REQUEST_TIMEOUT":
      return 408;
    case "USER_ALREADY_EXISTS":
    case "CONFLICT":
      return 409;
    case "USER_ALREADY_VERIFIED":
    case "GONE":
      return 410;
    case "LENGTH_REQUIRED":
      return 411;
    case "PRECONDITION_FAILED":
      return 412;
    case "PAYLOAD_TOO_LARGE":
      return 413;
    case "URI_TOO_LONG":
      return 414;
    case "UNSUPPORTED_MEDIA_TYPE":
      return 415;
    case "RANGE_NOT_SATISFIABLE":
      return 416;
    case "EXPECTATION_FAILED":
      return 417;
    case "TEAPOT":
      return 418;
    case "INTERNAL_ERROR":
      return 500;
    default:
      return 500;
  }
}

export function getMessageFromErrorCode(code: ErrorCode): string {
  switch (code) {
    case "BAD_REQUEST":
      return "The request is invalid";
    case "VALIDATION_ERROR":
      return "The request contains invalid or missing fields";
    case "UNAUTHORIZED":
      return "You are not authorized to access this resource";
    case "GONE":
      return "The requested resource is no longer available";
    case "NOT_FOUND":
      return "The requested resource was not found";
    case "USER_NOT_FOUND":
      return "The user was not found";
    case "USER_ALREADY_EXISTS":
      return "The user with this email already exists";
    case "USER_ALREADY_VERIFIED":
      return "The user is already verified";
    case "INTERNAL_ERROR":
      return "An internal server error occurred";
    case "CONFLICT":
      return "The request conflicts with the current state of the server";
    case "INVALID_PASSWORD":
      return "The password is incorrect";
    case "INVALID_VERIFICATION_CODE":
      return "The verification code is incorrect";
    default:
      return "An internal server error occurred";
  }
}

export function getErrorCodeFromDBError(error: DrizzleQueryError): ErrorCode {
  const { code: pgCode, constraint } = error.cause as DatabaseError;
  if (pgCode === "23505") {
    if (constraint === "users_email_key") {
      return "USER_ALREADY_EXISTS";
    }
    return "CONFLICT";
  }
  return "INTERNAL_ERROR";
}

export function getDetailsFromZodError(error: ZodError) {
  return error.issues.map((err) => ({
    code: err.code,
    path: err.path[1],
    message: err.message,
  }));
}

export class BackendError extends Error {
  code: ErrorCode;
  details?: unknown;
  constructor(
    code: ErrorCode,
    {
      message,
      details,
    }: {
      message?: string;
      details?: unknown;
    } = {},
  ) {
    super(message ?? getMessageFromErrorCode(code));
    this.code = code;
    this.details = details;
  }
}

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response<{
    code: ErrorCode;
    message: string;
    details?: unknown;
  }>,
  next: NextFunction,
) {
  let statusCode = 500;
  let code: ErrorCode | undefined;
  let message: string | undefined;
  let details: unknown | undefined;

  console.log(error);

  if (error instanceof BackendError) {
    message = error.message;
    code = error.code;
    details = error.details;
    statusCode = getStatusFromErrorCode(code);
  }

  if (error instanceof DrizzleQueryError) {
    code = getErrorCodeFromDBError(error);
    message = getMessageFromErrorCode(code);

    const pgError = error.cause as DatabaseError;
    details = pgError.detail;
    statusCode = getStatusFromErrorCode(code);
  }

  if (error instanceof ZodError) {
    code = "VALIDATION_ERROR";
    message = getMessageFromErrorCode(code);
    details = getDetailsFromZodError(error);
    statusCode = getStatusFromErrorCode(code);
  }

  code ??= "INTERNAL_ERROR";
  message ??= getMessageFromErrorCode(code);
  details ??= undefined;

  res.status(statusCode).json({
    code,
    message,
    details,
  });
}
