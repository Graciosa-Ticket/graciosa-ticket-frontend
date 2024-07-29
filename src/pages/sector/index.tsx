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

export default function Sector() {
  const [dataSource, setDataSource] = useState<SectorCardModel[]>([]);

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
  } = useFetch<SectorCardModel[]>("/counters/counterToChart/allsectors", [
    "sectorCounter",
  ]);

  const onRefetchData = () => {
    refetch();
    refetchCounter();
  };

  useEffect(() => {
    if (sectorData?.length && counterData?.length) {
      const counters = counterData[0];

      const data = sectorData.map((item) => {
        const counter = counters[item.code];
        if (counter) {
          return { ...item, counters: counter };
        }
        return { ...item, counters: {} };
      });

      setDataSource(data);
    }
  }, [sectorData, counterData]);

  const isLoadingFetch =
    isLoading || isFetching || loadingCounter || fetchingCounter;

  return (
    <SectorContainer>
      <PageHeaderComponent.container>
        <PageHeaderComponent.title>Setores</PageHeaderComponent.title>
        <AddNewButton
          onUpdate={() => {
            onRefetchData();
          }}
        />
      </PageHeaderComponent.container>

      <div className="div-sector-all">
        {!dataSource.length && !loadingCounter && !fetchingCounter ? (
          <NotFoundComponent />
        ) : isLoadingFetch ? (
          <SectorSkeletonLoading />
        ) : (
          <ul>
            {dataSource.map((e, i) => (
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
