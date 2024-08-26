import { ModalHeader } from "../../../../components/modal";
import { ModalTitle } from "../../../../components/centerModal";
import ButtonComponent from "../../../../components/buttons";
import { AiOutlineClose } from "react-icons/ai";
import { modalActions } from "../../../../shared/global.interface";
import { FaqModalComponent } from "./styles";

export default function FaqModal({ onClose }: modalActions) {
  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ModalTitle>Perguntas frequentes</ModalTitle>
        </div>
        <div className="right-side">
          <ButtonComponent buttonStyles="text" title="Fechar" onClick={onClose}>
            <AiOutlineClose fontSize="1em" />
          </ButtonComponent>
        </div>
      </ModalHeader>

      <FaqModalComponent>
        <div className="faq-div">
          <h2>O que é o nosso sistema de abertura de chamados?</h2>
          <p>
            Nosso software é uma solução completa para gerenciamento de
            chamados, permitindo que você registre, acompanhe e resolva
            problemas de maneira rápida e eficiente.
          </p>
        </div>
        <div className="faq-div">
          <h2>Como faço para abrir um chamado?</h2>
          <p>
            Basta acessar a tela inicial do sistema, selecionar "Novo Chamado",
            escolher o setor para qual área o chamado será destinado, em seguida
            preencher os campos de título, descrição e, caso necessário,
            adicionar um anexo. Em seguida, o time responsável receberá a
            solicitação e iniciará o atendimento.
          </p>
        </div>
        <div className="faq-div">
          <h2>Posso acompanhar o status dos meus chamados?</h2>
          <p>
            Sim! Você pode visualizar o status de todos os seus chamados, além
            de receber notificações sobre atualizações e resoluções.
          </p>
        </div>

        {/* <h2>Quem pode utilizar o sistema?</h2>
        <p>
          O sistema é acessível para todos os membros autorizados do Clube
          Graciosa.
        </p>

        <h2>Como entro em contato com o suporte técnico?</h2>
        <p>
          Você pode abrir um chamado de suporte diretamente no sistema ou entrar
          em contato através dos canais de atendimento disponíveis na seção de
          suporte.
        </p> */}
      </FaqModalComponent>
    </>
  );
}
