import { useState } from "react";
import Avatar from "../../../../components/Avatar";
import { modalActions } from "../../../../shared/global.interface";
import StatusComponent from "../../../Users/components/Status";
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
      <Modal
        open={openModal}
        onOpenChange={() => setOpenModal(!openModal)}
      >
        <SectorModal data={data} onUpdate={() => handleUpdate()} />
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
          <p>Lorem Ipsum</p>
          <p>35</p>
          <p>Lorem Ipsum</p>
          <p>35</p>
          <p>Lorem Ipsum</p>
          <p>35</p>
          <p>Lorem Ipsum</p>
          <p>35</p>
        </div>
        <div className="description-section">
          <h6>Descrição</h6>
          <p>{data?.description}</p>
        </div>
      </SectorComponent>
    </>
  );
}
