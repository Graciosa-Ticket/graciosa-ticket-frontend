import { ModalHeader } from "../../../../components/modal";
import { ModalTitle } from "../../../../components/centerModal";
import ButtonComponent from "../../../../components/buttons";
import {
  AiOutlineClose,
  AiOutlineCopy,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { modalActions } from "../../../../shared/global.interface";
import { SupportModalComponent } from "./styles";
import FieldCopy from "../../../../utils/fieldCopy";

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
        <p>
          Está com dúvidas ou precisa de ajuda?
          <br />
          Nossa equipe está pronta para te auxiliar!
        </p>
        <p>
          Entre em contato com nosso suporte <br /> através dos canais de
          atendimento:
        </p>
        <span>
          <AiOutlineMail
            className="icon"
            size={"20px"}
            style={{ strokeWidth: "20px", clipPath: "circle(50%)" }}
          />
          suporte1@graciosa.com.br
          <AiOutlineCopy
            size={".8em"}
            className="copy-icon"
            title="Clique aqui para copiar"
            onClick={() => FieldCopy("suporte1@graciosa.com.br")}
          />
          <br />
          <AiOutlineMail
            className="icon"
            size={"20px"}
            style={{ strokeWidth: "20px", clipPath: "circle(50%)" }}
          />
          suporte2@graciosa.com.br
          <AiOutlineCopy
            size={".8em"}
            className="copy-icon"
            title="Clique aqui para copiar"
            onClick={() => FieldCopy("suporte2@graciosa.com.br")}
          />
          <br />
          <AiOutlineMail
            className="icon"
            size={"20px"}
            style={{ strokeWidth: "20px", clipPath: "circle(50%)" }}
          />
          suporte3@graciosa.com.br
          <AiOutlineCopy
            size={".8em"}
            className="copy-icon"
            title="Clique aqui para copiar"
            onClick={() => FieldCopy("suporte3@graciosa.com.br")}
          />
          <br />
          <AiOutlinePhone
            className="icon"
            size={"20px"}
            style={{
              strokeWidth: "4px", // Ajusta a espessura do traço
              transform: "scaleX(-1)", // Espelha horizontalmente
              clipPath: "circle(50%)", // Aplica um clip circular para arredondar as bordas
            }}
          />
          Telefone: 41 9610-6776
          <AiOutlineCopy
            size={".8em"}
            className="copy-icon"
            title="Clique aqui para copiar"
            onClick={() => FieldCopy("41 99610-6776")}
          />
        </span>
      </SupportModalComponent>
    </>
  );
}
