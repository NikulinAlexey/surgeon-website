export class ApiRequestError extends Error {
  fields?: Record<string, string>;

  constructor(message: string, fields?: Record<string, string[]>) {
    super(message);
    this.name = "ApiRequestError";
    this.fields = fields
      ? Object.fromEntries(Object.entries(fields).map(([key, messages]) => [key, messages[0] || "Проверьте поле"]))
      : undefined;
  }
}

export async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: options.body instanceof FormData
      ? options.headers
      : { "Content-Type": "application/json", ...options.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiRequestError(data.error || "Не удалось выполнить запрос", data.fields);
  }
  return data as T;
}
