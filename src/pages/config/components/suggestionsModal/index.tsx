import { ModalHeader } from "../../../../components/modal";
import { ModalTitle } from "../../../../components/centerModal";
import ButtonComponent from "../../../../components/buttons";
import { AiOutlineClose } from "react-icons/ai";
import { SuggestionsModalComponent } from "./styles";
import { modalActions } from "../../../../shared/global.interface";
import {
  FormContainer,
  FormContentContainer,
  FormButtonsContainer,
} from "../../../../components/form/form";
import Input from "../../../../components/form/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import TextArea from "../../../../components/form/textarea";

export default function SuggestionsModal({ onClose }: modalActions) {
  const { handleSubmit, register } = useForm({});

  const onSubmit = handleSubmit(() => {
    toast.success("Obrigado pela sugestão");
  });

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ModalTitle>sugestões</ModalTitle>
        </div>
        <div className="right-side">
          <ButtonComponent buttonStyles="text" title="Fechar" onClick={onClose}>
            <AiOutlineClose fontSize="1em" />
          </ButtonComponent>
        </div>
      </ModalHeader>

      <SuggestionsModalComponent>
        <p>
          Buscamos sempre melhorar! Se tiver ideias, sugestões ou feedback,
          compartilhe conosco. Sua opinião é essencial para nosso crescimento!
        </p>
        <FormContainer onSubmit={onSubmit}>
          <FormContentContainer>
            <Input
              label="Usuario"
              placeholder="Usuario"
              register={{ ...register("password") }}
            />
            <TextArea
              label="Descrição"
              placeholder="Descrição"
              rows={5}
              register={{ ...register("description") }}
            />
          </FormContentContainer>
          <FormButtonsContainer $columns={2}>
            <div />
            <ButtonComponent
              type="submit"
              buttonStyles="confirm"
              title={"Enviar Sugestão"}
              className="confirm-btn"
            >
              Enviar
            </ButtonComponent>
          </FormButtonsContainer>
        </FormContainer>
      </SuggestionsModalComponent>
    </>
  );
}
