import { useState } from "react";
import { ModalHeader } from "../../../../components/modal";
import ButtonComponent from "../../../../components/buttons";
import { FaAngleLeft } from "react-icons/fa";
import { SectorModalComponent } from "./styles";

export default function SectorModal({ data, onCLose }: sectorModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onCLose}>
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <h3>{data.name}</h3>
        </div>
      </ModalHeader>
      <SectorModalComponent></SectorModalComponent>
    </>
  );
}
