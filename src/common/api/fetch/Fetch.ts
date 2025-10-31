import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

export interface ILazyParams {
  first: number;
  rows: number;
  page: number;
  sortField: string;
  sortOrder?: 1 | 0 | -1 | undefined | null;
}

export interface IEnvironmentConfig {
  websiteUrl: string;
  baseUrl: string;
}

const localConfig: IEnvironmentConfig = {
  websiteUrl: "http://localhost:3000/",
  baseUrl: "http://localhost:5000/"
};

const stageConfig: IEnvironmentConfig = {
  websiteUrl: "https://stg-hrlense.jobvritta.com/",
  baseUrl: "https://hrms-demo.jobvritta.com/api/"
};

const productionConfig: IEnvironmentConfig = {
  websiteUrl: "https://www.hrlense.com/",
  baseUrl: "https://hrmsapi.jobvritta.com/api/"
};

let config: IEnvironmentConfig;
const hostname = window.location.hostname;

if (hostname.includes("localhost")) {
  config = localConfig;
} else if (hostname.includes("stg")) {
  config = stageConfig;
} else {
  config = productionConfig;
}

export const websiteUrl = config.websiteUrl;
export const baseUrl = config.baseUrl;

export const useFetch = (
  toast?: ({ message, status }: any) => void
) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function fetchApi(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body: any,
    query: string | null,
    successMessage: string | undefined,
    isFormData: boolean | undefined,
    originalResponse: true
  ): Promise<Response | undefined>;

  async function fetchApi<T = any>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    query?: string | null,
    successMessage?: string,
    isFormData?: boolean,
    originalResponse?: false
  ): Promise<T | undefined>;

  async function fetchApi<T = any>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body: any = null,
    query: string | null = null,
    successMessage?: string,
    isFormData?: boolean,
    originalResponse?: boolean
  ): Promise<T | Response | undefined> {
    setLoading(true);

    const headers: HeadersInit = {
      Authorization: `Bearer ${user?.token || ""}`,
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const params: RequestInit = { method, headers };
    if (body) params.body = isFormData ? body : JSON.stringify(body);

    try {
      const response = await fetch(
        `${baseUrl}${url}${query ? `?${query}` : ""}`,
        params
      );

      if (response.status === 401) {
        sessionStorage.clear();
        if (toast) toast({ status: "error", message: "Unauthorized. Please login!" });
        return;
      }
      if (response.status === 400) {
        const errorMessage = await response.text();
        if (toast) toast({ status: "error", message: errorMessage });
        return;
      }

      if (!response.ok) {
        const res = await response.json();
        const errorMessage = res.message || "Something went wrong";
        if (toast) toast({ status: "error", message: errorMessage });
        return;
      }

      if (originalResponse) {
        return response;
      }

      const data: T = await response.json();

      if (successMessage) {
        if (toast) toast({ status: "success", message: successMessage });
      }

      return data;
    } catch (err) {
      if (toast) toast({ status: "error", message: "Network or server error" });
      return;
    } finally {
      setLoading(false);
    }
  }

  return { fetchApi, loading };
};

export {};