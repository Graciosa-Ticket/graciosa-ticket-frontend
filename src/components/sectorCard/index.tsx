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
    <>
      <Modal open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
        Modal Aberto
      </Modal>
      <SectorComponent>
        <section>
          <div className="all-sector" onClick={() => setOpenModal(true)}>
            <div className="header-sector">
              <h3>{data.name}</h3>
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

            <h2>Descrição</h2>
            <p>{data?.description}</p>
          </div>
        </section>
      </SectorComponent>
    </>
  );
}
