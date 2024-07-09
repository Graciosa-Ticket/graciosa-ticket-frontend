import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";
import ButtonComponent from "../../../../components/buttons";
import Modal, { ModalHeader } from "../../../../components/modal";
import { UserModel } from "../../../../models/user";
import SectorIcon from "../sectorIcon";
import Display from "./components/display";
import { Userheader, UserComponent } from "./styles";
import HenryCalvo from "../../../../assets/henrycalvo.svg";
import { useState } from "react";
import UpdateUserModal from "../editUserModal";
import DeleteConfirmationModal from "../../../../components/deleteConfirmationModal";


interface userModalProps {
  data: UserModel;
  onClose: () => void;
}
 


export default function UserModal({ data, onClose }: userModalProps) {
  

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  
  return (
    <>
    <Modal open={open1} onOpenChange={() => setOpen1(!open1)}>
        <DeleteConfirmationModal onClose={() => setOpen1(false)}></DeleteConfirmationModal>
    </Modal>

    <Modal open={open} onOpenChange={() => setOpen(!open)}>
        <UpdateUserModal onClose={() => setOpen(false)} />
    </Modal>
      
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" title="Voltar"  onClick={onClose}>
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <h3>{data.name}</h3>
        </div>
        <Userheader>
          <p>{data.status ? "ativo" : "inativo"}</p>
          <div
            className={`status-ball ${data.status ? "active" : "inactive"}`}
          />
        </Userheader>
      </ModalHeader>
      <UserComponent>
        <div className="img-sector">
          <img src={HenryCalvo} alt="" className="user-avatar" />
        </div>
        <h3>informações Pessoais</h3>
        <div className="user-info-area">
          <Display
            label={"Código"}
            content={data.code + "" || "Não informado"}
          ></Display>
          <Display label={"Nome"} content={data.name}></Display>
          <Display
            label={"Nascimento"}
            content={data.birth_date ? data.birth_date.toLocaleString() : "Não informado"}
            suffix="24"
          ></Display>
          <Display
            label={"Endereço"}
            content={data.address + "" || "Não informado"}
          ></Display>
          <Display
            label={"Cep"}
            content={data.cep + "" || "Não informado"}
          ></Display>
          <Display
            label={"Telefone/Ramal"}
            content={data.phone_number + "" || "Não informado"}
          ></Display>
        </div>
        {data.role !== "Administrator" &&
        <div className="function-area">
          <div className="left-side">
            <p>Função</p>
            <h2>{data.role}</h2>
          </div>
          <div className="right-side">
            <SectorIcon data={data} />
          </div>
        </div>}
        <div className="footer">
          <ButtonComponent buttonStyles="delete" className="btn" onClick={()=> setOpen1(true)}>
            <AiOutlineDelete /> Deletar
          </ButtonComponent>
          <ButtonComponent buttonStyles="edit" className="btn" onClick={()=> setOpen(true)}>
            <AiOutlineEdit /> Editar
          </ButtonComponent>
        </div>
      </UserComponent>
    </>
  );
}
