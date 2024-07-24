import { useState } from "react";
import Avatar from "../../../../components/Avatar";
import { modalActions } from "../../../../shared/global.interface";
import StatusComponent from "../../../Users/components/Status";
import SectorModal from "../sectorModal";
import { SectorComponent } from "./styles";
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
        <SectorModal
          data={data}
          onUpdate={() => handleUpdate()}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
      <SectorComponent onClick={() => setOpenModal(true)}>
        {/* <div className="status-container">
          <StatusComponent status={data?.deleted_at ? false : true} />
        </div> */}

        <div className="header-sector">
          <h3>{data?.name}</h3>
          <div className="user-container">
            {/* <span>{data?.user?.name}</span> */}

            <Avatar
              src={data?.user?.profile_picture}
              style={{ width: 30, height: 30 }}
            />
          </div>
        </div>

        <div className="p-sector">
          <p>Aberto</p>
          <span>{ticketData.aberto}</span>
          <p>Em andamento</p>
          <span>{ticketData.em_andamento}</span>
          <p>Aguardando aprovação</p>
          <span>{ticketData.aguardando_aprovacao}</span>
          <p>Concluído</p>
          <span>{ticketData.concluido}</span>
        </div>

        <div className="description-section">
          <h6>Descrição</h6>
          <p>{data?.description}</p>
        </div>
      </SectorComponent>
    </>
  );
}
