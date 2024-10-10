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
  filterCollaborators: boolean;
}

const SearchUsers = ({
  onChange,
  selectedUser,
  filterCollaborators,
}: searchUserProps) => {
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
      const search = watch("search");

      // Cria uma expressão regular para busca case insensitive
      const searchRegex = new RegExp(search, "i");

      return dataSource
        .filter((user) => {
          const code = user?.code || "";
          const name = user?.name || "";
          const email = user?.email || "";

          return (
            searchRegex.test(code) ||
            searchRegex.test(name) ||
            searchRegex.test(email)
          );
        })
        .filter((user) => {
          if (selectedUser) {
            return user.code !== selectedUser.code;
          }
          return true;
        })
        .filter((user) => !filterCollaborators || user.role !== "Collaborator");
    }
    return [];
  }, [dataSource, watch("search"), selectedUser, filterCollaborators]);

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
  const profilePictureSrc = data.profile_picture
    ? `profile_pictures/${data?.profile_picture}`
    : undefined;

  return (
    <UserCardListContainer buttonStyles="text" onClick={() => onChange(data)}>
      <Avatar src={profilePictureSrc} />

      <div className="user-information">
        <h3>{data.name}</h3>
        <span>Código: {data.code}</span>
        <span>email: {data.email}</span>
      </div>
    </UserCardListContainer>
  );
};

export default SearchUsers;
