import { FaAngleLeft } from "react-icons/fa";
import ButtonComponent from "../../../../components/buttons";
import Modal, { ModalHeader, ModalTitle } from "../../../../components/modal";
import SectorIcon from "../sectorIcon";
import { UserComponent } from "./styles";
import HenryCalvo from "../../../../assets/henrycalvo.svg";
import { formatDate } from "date-fns";
import { useState } from "react";
import InputPlaceholder from "../../../../components/form/inputPlaceholder";
import { calculateAge } from "../../../../utils/calculateAge";
import UpdateUserModal from "../editUserModal";
import phoneMask from "../../../../utils/phoneMask";
import formatCEP from "../../../../utils/cepMask";
import { modalActions } from "../../../../shared/global.interface";
import { UserModel } from "../../../../models/user";
import { useAuth } from "../../../../hooks/auth";
import UserStatus from "../userStatus";

export default function UserViewModal({
            data,
            onClose,
            }: modalActions<UserModel>) {
            const [openUpdate, setOpenUpdate] = useState(false);

            const { signOut } = useAuth();
            
  return (
    <>
      <Modal open={openUpdate} onOpenChange={() => setOpenUpdate(!openUpdate)}>
        <UpdateUserModal
          data={data as UserModel}
          onClose={() => setOpenUpdate(true)}
        />
      </Modal>

      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}>
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <ModalTitle>{data?.name}</ModalTitle>
        </div>  
        {data && <UserStatus data={data} />}
      </ModalHeader>
      <UserComponent>
        <div className="img-sector">
          <img src={HenryCalvo} alt="" className="user-avatar" />
        </div>
        <h3 className="user-info-title">informações Pessoais</h3>
        <div className="user-info-area">
          <InputPlaceholder label="Código" value={data?.code} />
          <InputPlaceholder label="Nome" value={data?.name} />

          <InputPlaceholder
            label="Nascimento"
            value={
              data?.birth_date ? formatDate(data?.birth_date, "dd/MM/yyyy") : ""
            }
            affix={{
              suffix: data?.birth_date
                ? calculateAge(data?.birth_date) + " Anos"
                : undefined,
            }}
          />
          <InputPlaceholder label="Endereço" value={data?.address} />
          <InputPlaceholder
            label="CEP"
            value={formatCEP(data?.cep as string)}
          />
          <InputPlaceholder
            label="Telefone/Ramal"
            value={phoneMask(data?.phone_number as string)}
          />
        </div>
        {data?.role !== "Administrator" && (
          <div className="function-area">
            <div className="left-side">
              <span>Função</span>
              <h5>{data?.role}</h5>
            </div>
            <div className="right-side">
              <SectorIcon data={data as UserModel} />
            </div>
          </div>
        )}
        <div className="footer">
         <ButtonComponent  buttonStyles="delete" title="Sair" onClick={signOut}>Sair</ButtonComponent>    
        </div>
      </UserComponent>
    </>
  );
}