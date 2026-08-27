const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

interface FieldError {
  path: string;
  message: string;
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  errors?: FieldError[];
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: FieldError[],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {

    const url = endpoint.startsWith("/api")
    ? endpoint
    : `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let errorData: ApiErrorResponse | undefined;

    try {
      errorData = await response.json();
    } catch {
      // Response wasn't JSON
    }

    throw new ApiError(
      errorData?.message ?? "Something went wrong",
      errorData?.statusCode ?? response.status,
      errorData?.errors,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}