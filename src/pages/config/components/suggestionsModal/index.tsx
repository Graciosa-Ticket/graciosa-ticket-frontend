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
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import TextArea from "../../../../components/form/textarea";
import { UserModel } from "../../../../models/user";

interface SuggestionsModalProps extends modalActions {
  user: UserModel;
}

export default function SuggestionsModal({
  onClose,
  user,
}: SuggestionsModalProps) {
  const { handleSubmit, register } = useForm({});

  const onSubmit = handleSubmit((data) => {
    const { suggestion } = data;

    const suggestionData = {
      userCode: user.code,
      suggestion: suggestion,
    };

    console.log(suggestionData);

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
            <TextArea
              placeholder="Escreva sua sugestão"
              rows={5}
              register={{ ...register("suggestion") }}
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
