import { type ApiErrorDetail } from '../types/api';

export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public details?: ApiErrorDetail[];

  constructor(
    message: string,
    statusCode: number,
    code: string,
    details?: ApiErrorDetail[],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;

    if (details) {
      this.details = details;
    }

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
