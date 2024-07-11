import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";
import ButtonComponent from "../../../../components/buttons";
import Modal, { ModalHeader, ModalTitle } from "../../../../components/modal";
import { UserModel } from "../../../../models/user";
import SectorIcon from "../sectorIcon";
import { Userheader, UserComponent } from "./styles";
import HenryCalvo from "../../../../assets/henrycalvo.svg";
import { formatDate } from "date-fns";
import { useState } from "react";
import InputPlaceholder from "../../../../components/form/inputPlaceholder";
import { calculateAge } from "../../../../utils/calculateAge";
import UpdateUserModal from "../editUserModal";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import phoneMask from "../../../../utils/phoneMask";
import formatCEP from "../../../../utils/cepMask";
import ActionsModalComponent from "../../../../components/actionModal";

interface userModalProps {
  data: UserModel;
  onClose: () => void;
}
 


export default function UserModal({ data, onClose }: userModalProps) {
  

  const [OpenDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  
  const {mutate, } = useMutationQuery(`/users/${data.code}`, "delete");


  return (
    <>
    <Modal open={openUpdate} onOpenChange={() => setOpenUpdate(!openUpdate)}>
        <UpdateUserModal  data={data} onClose={() => setOpenUpdate(true)}/>
    </Modal>

    {/* <CenterModal open={OpenDelete} onOpenChange={() => setOpenDelete(!OpenDelete)}>
        <UserDeleteConfirmationModal message="Confirme para deletar este usuário. Esta ação não pode ser desfeita."  onDelete={
          () => mutate({})
        } onClose={onClose}/>
    </CenterModal> */}
      
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}>
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <ModalTitle>{data.name}</ModalTitle>
        </div>
        <Userheader>
          <p>{data.status ? "Ativo" : "Inativo"}</p>
          <div
            className={`status-ball ${data.status ? "active" : "inactive"}`}
          />
        </Userheader>
      </ModalHeader>
      <UserComponent>
        <div className="img-sector">
          <img src={HenryCalvo} alt="" className="user-avatar" />
        </div>
        <h3 className="user-info-title">informações Pessoais</h3>
        <div className="user-info-area">
          <InputPlaceholder label="Código" value={data.code} />
          <InputPlaceholder label="Nome" value={data.name} />

          <InputPlaceholder
            label="Nascimento"
            value={
              data.birth_date ? formatDate(data.birth_date, "dd/MM/yyyy") : ""
            }
            affix={{
              suffix: data.birth_date
                ? calculateAge(data.birth_date) + " Anos"
                : undefined,
            }}
          />
          <InputPlaceholder label="Endereço" value={data.address} />
          <InputPlaceholder label="CEP" value={formatCEP(data.cep)} />
          <InputPlaceholder label="Telefone/Ramal" value={phoneMask(data.phone_number)} />
        </div>
        {data.role !== "Administrator" && (
          <div className="function-area">
            <div className="left-side">
              <span>Função</span>
              <h5>{data.role}</h5>
            </div>
            <div className="right-side">
              <SectorIcon data={data} />
            </div>
          </div>
        )}
        <div className="footer">
      
          <ActionsModalComponent 
          message="Confirme para deletar este usuário. Esta ação não pode ser desfeita."
          actionButton={(
            <ButtonComponent buttonStyles="delete">

          Confirmar Deletar usuário

            </ButtonComponent>

          )}
          buttonProps={{
            buttonStyles: "delete"
          }}>
                      <AiOutlineDelete /> Deletar

            </ActionsModalComponent>

          <ButtonComponent buttonStyles="edit" className="btn" onClick={() => setOpenUpdate(true)}>
            <AiOutlineEdit /> Editar
          </ButtonComponent>
        </div>
      </UserComponent>
    </>
  );
}
