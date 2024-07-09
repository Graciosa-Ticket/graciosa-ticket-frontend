import { SectorComponent } from "./styles";
import HenryCalvo from "../../assets/henrycalvo.svg";
import { SectorCardModel } from "../../models/sector";
import Modal from "../modal";
import { useState } from "react";

interface sectorCardProps {
  data: SectorCardModel;
}

export default function SectorCard({ data }: sectorCardProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <SectorComponent>
      <Modal open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
        Modal Aberto
      </Modal>
      <section>
        <div className="all-sector" onClick={() => setOpenModal(true)}>
          <div className="header-sector">
            <h3>{`${data.name} ${data.code}`}</h3>
            <img src={HenryCalvo} />
          </div>

          <div className="p-sector">
            <p>Lorem Ipsum</p>
            <p>35</p>
            <p>Lorem Ipsum</p>
            <p>35</p>
            <p>Lorem Ipsum</p>
            <p>35</p>
            <p>Lorem Ipsum</p>
            <p>35</p>
          </div>

          <h2>Lorem Ipsum</h2>
          <p>{data?.description}</p>
        </div>
      </section>
    </SectorComponent>
  );
}
