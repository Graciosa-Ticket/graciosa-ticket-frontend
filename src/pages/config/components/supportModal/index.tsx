import { ModalHeader } from "../../../../components/modal";
import { ModalTitle } from "../../../../components/centerModal";
import ButtonComponent from "../../../../components/buttons";
import { AiOutlineClose } from "react-icons/ai";
import { modalActions } from "../../../../shared/global.interface";

import { SupportModalComponent } from "./styles";

export default function SupportModal({ onClose }: modalActions) {
  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ModalTitle>Suporte</ModalTitle>
        </div>
        <div className="right-side">
          <ButtonComponent buttonStyles="text" title="Fechar" onClick={onClose}>
            <AiOutlineClose fontSize="1em" />
          </ButtonComponent>
        </div>
      </ModalHeader>

      <SupportModalComponent>
        <span> para participar do bom dia e compania ligue 4002-8922</span>
      </SupportModalComponent>
    </>
  );
}
