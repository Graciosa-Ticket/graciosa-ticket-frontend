import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";
import ButtonComponent from "../../../../components/buttons";
import { ModalHeader } from "../../../../components/modal";
import { UserModel } from "../../../../models/user";
import SectorIcon from "../sectorIcon";
import Display from "./components/display";
import { Userheader, UserComponent } from "./styles";
import HenryCalvo from "../../../../assets/henrycalvo.svg";

interface userModalProps {
  data: UserModel;
  onClose: () => void;
}

export default function UserModal({ data, onClose }: userModalProps) {
  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}>
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
            content={data.birth_date ? data.birth_date.toLocaleDateString() : "Não informado"}
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
            <h3>{data.role}</h3>
          </div>
          <div className="right-side">
            <SectorIcon data={data} />
          </div>
        </div>}
        <div className="footer">
          <ButtonComponent buttonStyles="delete" className="btn">
            <AiOutlineDelete /> Deletar
          </ButtonComponent>
          <ButtonComponent buttonStyles="edit" className="btn">
            <AiOutlineEdit /> Editar
          </ButtonComponent>
        </div>
      </UserComponent>
    </>
  );
}
