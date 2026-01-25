import axios, { AxiosInstance } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

const axiosPrivateInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  withCredentials: true,
});

const axiosPrivateInstanceSecond = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  withCredentials: true,
});

const axiosGetPrivate = async <T>(
  endpoint: string,
  axiosPrivateHook: AxiosInstance,
) => (await axiosPrivateHook.get<T>(endpoint)).data;

const axiosPostPrivate = async <T>(
  endpoint: string,
  data: any,
  axiosPrivateHook: AxiosInstance,
) => (await axiosPrivateHook.post<T>(endpoint, data)).data;

const axiosPatchPrivate = async <T>(
  endpoint: string,
  axiosPrivateHook: AxiosInstance,
) => (await axiosPrivateHook.patch<T>(endpoint)).data;

const axiosPutPrivate = async <T>(
  endpoint: string,
  data: any,
  axiosPrivateHook: AxiosInstance,
) => (await axiosPrivateHook.put<T>(endpoint, data)).data;

const axiosDeletePrivate = async <T>(
  endpoint: string,
  axiosPrivateHook: AxiosInstance,
) => (await axiosPrivateHook.delete<T>(endpoint)).data;

export {
  axiosInstance,
  axiosPrivateInstance,
  axiosPrivateInstanceSecond,
  axiosGetPrivate,
  axiosPostPrivate,
  axiosPatchPrivate,
  axiosPutPrivate,
  axiosDeletePrivate,
};
