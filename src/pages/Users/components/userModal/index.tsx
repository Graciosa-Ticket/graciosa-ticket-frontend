import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";
import ButtonComponent from "../../../../components/buttons";
import Modal, { ModalHeader, ModalTitle } from "../../../../components/modal";
import { UserModel } from "../../../../models/user";
import SectorIcon from "../sectorIcon";
import { Userheader, UserComponent } from "./styles";
import HenryCalvo from "../../../../assets/henrycalvo.svg";
import { useState } from "react";
import UpdateUserModal from "../editUserModal";
import DeleteConfirmationModal from "../../../../components/deleteConfirmationModal";
import InputPlaceholder from "../../../../components/form/inputPlaceholder";
import { formatDate } from "date-fns";
import { calculateAge } from "../../../../utils/calculateAge";

interface userModalProps {
  data: UserModel;
  onClose: () => void;
}

export default function UserModal({ data, onClose }: userModalProps) {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  return (
    <>
      <DeleteConfirmationModal
        onOpenChange={() => setOpen1(!open1)}
      ></DeleteConfirmationModal>

      <Modal open={open} onOpenChange={() => setOpen(!open)}>
        <UpdateUserModal onClose={() => setOpen(false)} />
      </Modal>

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
          <InputPlaceholder label="CEP" value={data.cep} />
          <InputPlaceholder label="Telefone/Ramal" value={data.phone_number} />
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
          <ButtonComponent buttonStyles="delete" onClick={() => setOpen1(true)}>
            <AiOutlineDelete /> Deletar
          </ButtonComponent>
          <ButtonComponent buttonStyles="edit" onClick={() => setOpen(true)}>
            <AiOutlineEdit /> Editar
          </ButtonComponent>
        </div>
      </UserComponent>
    </>
  );
}
