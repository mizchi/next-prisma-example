import type { ZodError } from "zod";

export function ism<Input, Output>(
  endpoint: string,
  fn: (input: Input) => Promise<Output>
): (input: Input) => Promise<Output> {
  return async (input: Input) => {
    if (process.browser) {
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    } else {
      return await fn(input);
    }
  };
}

export function varidatorFactory<T>(
  validator: any
): (
  input: T
) =>
  | {
      valid: true;
      data: T;
    }
  | {
      valid: false;
      error: ZodError;
    } {
  return (data: T) => {
    try {
      const result = validator.parse(data) as T;
      return {
        valid: true,
        data: result as T,
      };
    } catch (error) {
      return {
        valid: false,
        error: error as ZodError,
      };
    }
  };
}
