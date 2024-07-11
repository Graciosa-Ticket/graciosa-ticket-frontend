import { useState } from "react";
import { UserModel } from "../models/user";
import { useFetch } from "../services/hooks/getQuery";

export default function useUserListRefresh() {
  const [dataSource, setDataSource] = useState<UserModel[]>([]);
  const { isLoading, isFetching } = useFetch<UserModel[]>(
    "/users",
    ["users"],
    {
      onSuccess: (data) => {
        console.log(data);
        setDataSource(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const isLoadingFetch = isLoading || isFetching;

  return { dataSource, isLoadingFetch };
}
