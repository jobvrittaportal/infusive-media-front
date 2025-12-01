import { hrlenseToken } from "./hrlenseTokenService";

export const hrlenseFetch = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body: any = null,
  query: string = "",
  successMessage: string = "",
  isFormData: boolean = false
) => {
  let token = await hrlenseToken();

  let headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const options: RequestInit = {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  };

  let url = `https://hrms-demo.jobvritta.com/api/${endpoint}`;
  if (query) url += `?${query}`;

  let res = await fetch(url, options);

  // Retry if token expired
  if (res.status === 401) {
    sessionStorage.removeItem("hrlense_token");
    token = await hrlenseToken();
    headers.Authorization = `Bearer ${token}`;
    res = await fetch(url, { ...options, headers });
  }

  // Non-JSON response handling
  const contentType = res.headers.get("content-type") || "";
  if (!res.ok) {
    const text = await res.text();
    console.error("API Error:", text);
    return null;
  }

  if (!contentType.includes("application/json")) return null;
  return res.json();
};
