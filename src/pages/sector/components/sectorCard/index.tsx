import { useState } from "react";
import Avatar from "../../../../components/Avatar";
import { modalActions } from "../../../../shared/global.interface";
import SectorModal from "../sectorModal";
import { SectorComponent } from "./styles";
import { SectorCardModel } from "../../../../models/sector";
import Modal from "../../../../components/modal";

export default function SectorCard({
  data,
  onUpdate,
}: modalActions<SectorCardModel>) {
  const [openModal, setOpenModal] = useState(false);

  const handleUpdate = () => {
    onUpdate?.();
  };

  return (
    <>
      <Modal open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
        <SectorModal
          data={data}
          onUpdate={() => handleUpdate()}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
      <SectorComponent onClick={() => setOpenModal(true)} title={data?.name}>
        {/* <div className="status-container">
          <StatusComponent status={data?.deleted_at ? false : true} />
        </div> */}
        <div className="header-sector">
          <h3>{data?.name}</h3>
          <div className="user-container">
            {/* <span>{data?.user?.name}</span> */}
            <Avatar
              {...(data?.user.profile_picture && {
                src: `profile_pictures/${data?.user?.profile_picture}`,
              })}
              alt=""
            />
          </div>
        </div>
        <div className="p-sector">
          <p>Aberto</p>
          <span>{data?.counters?.aberto ?? 0}</span>
          <p>Em andamento</p>
          <span>{data?.counters?.em_andamento ?? 0}</span>
          <p>Aguardando aprovação</p>
          <span>{data?.counters?.aguardando_aprovacao ?? 0}</span>
          <p>Concluído</p>
          <span>{data?.counters?.concluido ?? 0}</span>
        </div>
        <div className="description-section">
          <h6>Descrição</h6>
          <p>{data?.description}</p>
        </div>
      </SectorComponent>
    </>
  );
}
