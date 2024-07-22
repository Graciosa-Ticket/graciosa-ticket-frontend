import { useState } from "react";
import Avatar from "../../../../components/Avatar";
import { modalActions } from "../../../../shared/global.interface";
import StatusComponent from "../../../Users/components/Status";
import SectorModal from "../sectorModal";
import { SectorComponent, StatusP } from "./styles";
import { SectorCardModel } from "../../../../models/sector";
import Modal from "../../../../components/modal";
import ticketData from "./fakedata";


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
        <SectorModal data={data} onUpdate={() => handleUpdate()} onClose={() => setOpenModal(false)} />
      </Modal>
      <SectorComponent onClick={() => setOpenModal(true)}>
        <div className="status-container">
          <StatusComponent status={data?.deleted_at ? false : true} />
        </div>

        <div className="header-sector">
          <h3>{data?.name}</h3>
          <div className="user-container">
            <span>{data?.user?.name}</span>

            <Avatar
              src={data?.user?.profile_picture}
              style={{ width: 30, height: 30 }}
            />
          </div>
        </div>

        <div className="p-sector">
          <StatusP status="Aberto">Aberto</StatusP>
          <p>{ticketData.aberto}</p>
          <StatusP status="Em andamento">Em andamento</StatusP>
          <p>{ticketData.em_andamento}</p>
          <StatusP status="Aguardando aprovação">Aguardando aprovação</StatusP>
          <p>{ticketData.aguardando_aprovacao}</p>
          <StatusP status="Cancelado">Cancelado</StatusP>
          <p>{ticketData.cancelado}</p>
          <StatusP status="Reaberto">Reaberto</StatusP>
          <p>{ticketData.reaberto}</p>
          <StatusP status="Impeditivo">Impeditivo</StatusP>
          <p>{ticketData.impeditivo}</p>
          <StatusP status="Concluído">Concluído</StatusP>
          <p>{ticketData.concluido}</p>
        </div>
        <div className="description-section">
          <h6>Descrição</h6>
          <p>{data?.description}</p>
        </div>
      </SectorComponent>
    </>
  );
}
