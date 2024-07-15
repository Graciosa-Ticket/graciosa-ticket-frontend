import { useMemo, useState } from "react";
import Input from "../input";
import { SearchUsersContainer, UserCardListContainer } from "./styles";
import { UserModel } from "../../../models/user";
import { useFetch } from "../../../services/hooks/getQuery";
import { useForm } from "react-hook-form";
import { SkeletonAnimation } from "../../skeleton";
import NotFoundComponent from "../../notFound";
import Avatar from "../../Avatar";

interface searchUserProps {
  onChange(data: UserModel): void;
  selectedUser: UserModel | undefined;
}

const SearchUsers = ({ onChange, selectedUser }: searchUserProps) => {
  const [dataSource, setDataSource] = useState<UserModel[]>([]);

  const { register, watch } = useForm<{ search: string }>();

  const { isLoading, isFetching } = useFetch<UserModel[]>("/users", ["users"], {
    onSuccess: (data) => {
      setDataSource(data);
    },
  });

  const isLoadingFecth = isLoading || isFetching;

  const userlist = useMemo(() => {
    if (dataSource.length) {
      return dataSource
        .filter((user) => {
          const search = watch("search");

          if (
            user?.code?.includes(search) ||
            user?.name?.includes(search) ||
            user?.email?.includes(search)
          ) {
            return true;
          }
          return false;
        })
        .filter((user) => {
          if (selectedUser) {
            return user.code !== selectedUser.code;
          }
          return true;
        });
    }
    return [];
  }, [dataSource, watch("search"), selectedUser]);

  return (
    <SearchUsersContainer>
      <div className="header-container">
        <Input
          placeholder="Buscar usuários"
          register={{ ...register("search") }}
        />
      </div>

      <div className="search-result">
        <ul>
          {!dataSource.length && !isLoadingFecth ? (
            <NotFoundComponent />
          ) : isLoadingFecth ? (
            <SkeletonAnimation.text />
          ) : (
            userlist.map((user) => (
              <li key={user.code}>
                <UserCardList data={user} onChange={onChange} />
              </li>
            ))
          )}
        </ul>
      </div>
    </SearchUsersContainer>
  );
};

interface userCardList {
  data: UserModel;
  onChange(data: UserModel): void;
}

const UserCardList = ({ data, onChange }: userCardList) => {
  return (
    <UserCardListContainer buttonStyles="text" onClick={() => onChange(data)}>
      <Avatar src={data?.profile_picture} />

      <div className="user-information">
        <h3>{data.name}</h3>
        <span>Código: {data.code}</span>
        <span>email: {data.email}</span>
      </div>
    </UserCardListContainer>
  );
};

export default SearchUsers;
