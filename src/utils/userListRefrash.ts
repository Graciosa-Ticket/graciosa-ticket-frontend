import { useState, useEffect, useCallback } from "react";
import { UserModel } from "../models/user";
import { useFetch } from "../services/hooks/getQuery";

export default function useUserListRefresh() {
  const [dataSource, setDataSource] = useState<UserModel[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const { isLoading, isFetching, refetch } = useFetch<UserModel[]>(
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

  const refreshUserList = useCallback(() => {
    setRefreshFlag((prev) => !prev);
  }, []);

  useEffect(() => {
    if (refreshFlag) {
      refetch();
    }
  }, [refreshFlag, refetch]);

  const isLoadingFecth = isLoading || isFetching;

  return { dataSource, isLoadingFecth, refreshUserList };
}
