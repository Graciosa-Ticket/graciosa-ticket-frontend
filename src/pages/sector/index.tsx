import { SectorCardModel } from "../../models/sector";
import { SectorContainer } from "./styles";
import PageHeaderComponent from "../../components/pagesHeader";
import { useFetch } from "../../services/hooks/getQuery";
import NotFoundComponent from "../../components/notFound";
import SectorSkeletonLoading from "./skeleton";
import { modalActions } from "../../shared/global.interface";
import EditedFormPopUp from "../../components/EditedFormPopUp";
import CenterModal from "../../components/centerModal";
import CreateSectorModal from "./components/createNewSector";
import { useEffect, useState } from "react";
import SectorCard from "./components/sectorCard";
import SearchBarComponent from "../../components/searchBarComponent";

const filterSectors = (
  value: string,
  data: SectorCardModel[]
): SectorCardModel[] => {
  const searchRegex = new RegExp(value, "i");

  return data.filter((sector) => {
    const code = sector?.code || "";
    const name = sector?.name || "";
    const responsible_code = sector?.responsible_code || "";

    return (
      searchRegex.test(code) ||
      searchRegex.test(name) ||
      searchRegex.test(responsible_code)
    );
  });
};

export default function Sector() {
  const [dataSource, setDataSource] = useState<SectorCardModel[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const {
    isLoading,
    isFetching,
    data: sectorData,
    refetch,
  } = useFetch<SectorCardModel[]>("/sectors", ["sector"]);

  const {
    isLoading: loadingCounter,
    isFetching: fetchingCounter,
    data: counterData,
    refetch: refetchCounter,
  } = useFetch<SectorCardModel>("/counters/counterToChart/allSectors", [
    "sectorCounter",
  ]);

  const onRefetchData = () => {
    refetch();
    refetchCounter();
  };

  useEffect(() => {
    if (sectorData && sectorData?.length && counterData) {
      // Cria um array de objetos com sector_code e counters a partir de counterData
      const counters = Object.entries(counterData).map(
        ([sector_code, counters]) => ({
          sector_code,
          counters,
        })
      );

      const data = sectorData.map((item) => {
        // Encontra o contador correspondente ao setor
        const counter = counters.find(
          (filter) => filter.sector_code === item.code
        );

        if (counter) {
          return {
            ...item,
            counters: counter.counters,
          } as SectorCardModel;
        }
        return item;
      });

      setDataSource(data);
    }
  }, [sectorData, counterData]);

  const isLoadingFetch =
    isLoading || isFetching || loadingCounter || fetchingCounter;

  // Filtra os setores com base no valor de pesquisa
  const filteredSectors = filterSectors(searchValue, dataSource);

  return (
    <SectorContainer>
      <PageHeaderComponent.container>
        <PageHeaderComponent.title>Setores</PageHeaderComponent.title>
        <AddNewButton
          onUpdate={() => {
            onRefetchData();
          }}
        />
        <SearchBarComponent onValueChange={setSearchValue} />
      </PageHeaderComponent.container>

      <div className="div-sector-all">
        {!filteredSectors.length && !loadingCounter && !fetchingCounter ? (
          <NotFoundComponent />
        ) : isLoadingFetch ? (
          <SectorSkeletonLoading />
        ) : (
          <ul>
            {filteredSectors.map((e, i) => (
              <li key={i}>
                <SectorCard
                  data={e}
                  onUpdate={() => {
                    onRefetchData();
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectorContainer>
  );
}

const AddNewButton = ({ onUpdate }: modalActions) => {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmCloseModal, setOpenConfirmCloseModal] = useState(false);
  const [hasEditedData, setHasEditedData] = useState(false);

  const onOpenChange = () => {
    if (hasEditedData) {
      setOpenConfirmCloseModal(true);
      return;
    }

    setOpenModal(!openModal);
  };

  const onConfirmCloseModal = () => {
    setHasEditedData(false);
    setOpenConfirmCloseModal(false);
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setHasEditedData(false);
    setOpenConfirmCloseModal(false);
  };

  const handleSuccess = () => {
    onUpdate?.();
    onConfirmCloseModal();
  };

  return (
    <>
      <EditedFormPopUp
        open={hasEditedData && openConfirmCloseModal}
        onOpenChange={() => setOpenConfirmCloseModal(!openConfirmCloseModal)}
        onConfirmCloseModal={onConfirmCloseModal}
      />
      <CenterModal open={openModal} onOpenChange={onOpenChange}>
        <CreateSectorModal
          onClose={onOpenChange}
          onUpdate={handleSuccess}
          onSetEditedData={setHasEditedData}
        />
      </CenterModal>
      <PageHeaderComponent.button
        title="Cadastrar Novo Setor"
        onClick={handleOpenModal}
      />
    </>
  );
};
