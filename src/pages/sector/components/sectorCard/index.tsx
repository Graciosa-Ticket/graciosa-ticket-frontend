import { SectorComponent } from "./styles";
import { SectorCardModel } from "../../../../models/sector";
import Modal from "../../../../components/modal";
import { useState } from "react";
import Avatar from "../../../../components/Avatar";


interface sectorCardProps {
  data: SectorCardModel;
}

export default function SectorCard({ data }: sectorCardProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Modal open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
        Modal Aberto
      </Modal>

      <SectorComponent>
          <div className="all-sector" onClick={() => setOpenModal(true)}>
            <div className="header-sector">
              <h3>{data.name}</h3>
              <Avatar src={""} alt="" className="user-avatar" />
            </div>

            <div className="p-sector">
              <p>aberto</p>
              <p>35</p>
              <p>em andamento</p>
              <p>35</p>
              <p>reaberto</p>
              <p>35</p>
              <p>cancelado</p>
              <p>35</p>
            </div>

            <h2>Descrição</h2>
            <p>{data?.description}</p>
          </div>
      </SectorComponent>
    </>
  );
}
