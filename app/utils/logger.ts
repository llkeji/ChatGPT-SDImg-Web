type LogValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | LogValue[]
  | { [key: string]: LogValue };

const SENSITIVE_KEYS = new Set([
  "authorization",
  "cookie",
  "set-cookie",
  "token",
  "accesscode",
  "access_code",
  "apikey",
  "api_key",
  "openai-org-id",
  "openai-organization",
  "password",
  "secret",
]);

function maskString(value: string) {
  if (!value) return value;
  if (value.length <= 8) return "***";
  return `${value.slice(0, 4)}***${value.slice(-4)}`;
}

function sanitize(value: LogValue): LogValue {
  if (typeof value === "string") {
    return maskString(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitize(item));
  }

  if (value && typeof value === "object") {
    const result: Record<string, LogValue> = {};
    for (const [key, current] of Object.entries(value)) {
      result[key] = SENSITIVE_KEYS.has(key.toLowerCase())
        ? "***"
        : sanitize(current);
    }
    return result;
  }

  return value;
}

export function logInfo(scope: string, message: string, data?: LogValue) {
  if (data === undefined) {
    console.log(scope, message);
    return;
  }

  console.log(scope, message, sanitize(data));
}

export function logWarn(scope: string, message: string, data?: LogValue) {
  if (data === undefined) {
    console.warn(scope, message);
    return;
  }

  console.warn(scope, message, sanitize(data));
}

export function logError(scope: string, message: string, data?: LogValue) {
  if (data === undefined) {
    console.error(scope, message);
    return;
  }

  console.error(scope, message, sanitize(data));
}
