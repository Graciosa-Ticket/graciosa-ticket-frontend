import { useMutation } from "react-query";
import { api } from "../api.service";

type methods = "post" | "put" | "patch" | "delete";

export const useMutationQuery = <T = any, R = any>(
  url: string,
  method: methods = "post"
) => {
  const prepareMutation = (data: T, isFormData: boolean = false) => {
    const headers = isFormData ? { "Content-Type": "multipart/form-data" } : {};

    return api[method]<R>(url, data, { headers });
  };

  return useMutation(
    (data: T) => prepareMutation(data, data instanceof FormData),
    {
      retry: false,
    }
  );
};
