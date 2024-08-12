import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { SectorCardModel } from "../../models/sector";
import { useFetch } from "../../services/hooks/getQuery";
import Input from "../form/input";
import {
  SearchUsersContainer,
  UserCardListContainer,
} from "../form/selectUsers/styles";
import NotFoundComponent from "../notFound";
import { SkeletonAnimation } from "../skeleton";

interface searchSectorProps {
  onChange(data: SectorCardModel): void;
  selectedSector: SectorCardModel | undefined;
}

const SearchUsers = ({ onChange, selectedSector }: searchSectorProps) => {
  const [dataSource, setDataSource] = useState<SectorCardModel[]>([]);

  const { register, watch } = useForm<{ search: string }>();

  const { isLoading, isFetching } = useFetch<SectorCardModel[]>(
    "/sectors",
    ["sectors"],
    {
      onSuccess: (data) => {
        setDataSource(data);
      },
    }
  );

  const isLoadingFecth = isLoading || isFetching;

  const sectorList = useMemo(() => {
    if (dataSource.length) {
      const search = watch("search").toLowerCase();

      return dataSource
        .filter((sector) => {
          const codeMatch = sector?.code?.toLowerCase().includes(search);
          const nameMatch = sector?.name?.toLowerCase().includes(search);

          return codeMatch || nameMatch;
        })
        .filter((sector) => {
          if (selectedSector) {
            return sector.code !== selectedSector.code;
          }
          return true;
        });
    }
    return [];
  }, [dataSource, watch("search"), selectedSector]);

  return (
    <SearchUsersContainer>
      <div className="header-container">
        <Input
          placeholder="Escolha o setor"
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
            sectorList.map((sector) => (
              <li key={sector.code}>
                <SectorList data={sector} onChange={onChange} />
              </li>
            ))
          )}
        </ul>
      </div>
    </SearchUsersContainer>
  );
};

interface SectorList {
  data: SectorCardModel;
  onChange(data: SectorCardModel): void;
}

const SectorList = ({ data, onChange }: SectorList) => {
  return (
    <UserCardListContainer buttonStyles="text" onClick={() => onChange(data)}>
      <div className="user-information">
        <h3>{data.name}</h3>
        <span>Código: {data.code}</span>
      </div>
    </UserCardListContainer>
  );
};

export default SearchUsers;
