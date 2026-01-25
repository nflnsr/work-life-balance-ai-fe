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

const axiosGetPrivate = async <Res>(
  endpoint: string,
  axiosPrivateHook: AxiosInstance,
) => (await axiosPrivateHook.get<Res>(endpoint)).data;

const axiosPostPrivate = async <Req = unknown, Res = unknown>(
  endpoint: string,
  axiosPrivateHook: AxiosInstance,
  data?: Req,
) => (await axiosPrivateHook.post<Res>(endpoint, data)).data;

const axiosPatchPrivate = async <Req = unknown, Res = unknown>(
  endpoint: string,
  axiosPrivateHook: AxiosInstance,
  data?: Req,
) => (await axiosPrivateHook.patch<Res>(endpoint, data)).data;

const axiosPutPrivate = async <Req = unknown, Res = unknown>(
  endpoint: string,
  axiosPrivateHook: AxiosInstance,
  data?: Req,
) => (await axiosPrivateHook.put<Res>(endpoint, data)).data;

const axiosDeletePrivate = async(
  endpoint: string,
  axiosPrivateHook: AxiosInstance,
) => (await axiosPrivateHook.delete(endpoint)).data;

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
