import { SectorComponent } from "./styles";
import { SectorModel } from "../../models/sector";
import { useState } from "react";
import CenterModal from "../centerModal";
import SectorModal from "./components/SectorModal";
import Avatar from "../Avatar";
import { modalActions } from "../../shared/global.interface";
import StatusComponent from "../../pages/Users/components/Status";

export default function SectorCard({
  data,
  onUpdate,
}: modalActions<SectorModel>) {
  const [openModal, setOpenModal] = useState(false);

  const handleUpdate = () => {
    onUpdate?.();
    setOpenModal(false);
  };

  return (
    <>
      <CenterModal
        open={openModal}
        onOpenChange={() => setOpenModal(!openModal)}
      >
        <SectorModal data={data} onUpdate={() => handleUpdate()} />
      </CenterModal>
      <SectorComponent onClick={() => setOpenModal(true)}>
        <div className="status-container">
          <StatusComponent status={!data?.deleted_at} />
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
