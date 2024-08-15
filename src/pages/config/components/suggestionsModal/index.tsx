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
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";

interface SuggestionsModalProps extends modalActions {
  user: UserModel;
}

export default function SuggestionsModal({
  onClose,
  user,
}: SuggestionsModalProps) {
  const { handleSubmit, register } = useForm({});

  const { mutate: createFeedback, isLoading: isLoadingFeedback } =
    useMutationQuery("/feedback");

  const onSubmit = handleSubmit((data) => {
    const { comment } = data;

    const suggestionData = {
      user_code: user.code,
      comment: comment,
    };

    createFeedback(suggestionData, {
      onSuccess: () => {
        toast.success("Obrigado pela sugestão");
        onClose?.();
      },
      onError: () => {},
    });
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
              placeholder="deixe sua sugestão aqui.
As sugestões são realizadas de forma anônima, fique tranquilo."
              rows={5}
              register={{ ...register("comment") }}
            />
          </FormContentContainer>
          <FormButtonsContainer $columns={2}>
            <div />
            <ButtonComponent
              type="submit"
              buttonStyles="confirm"
              title={"Enviar Sugestão"}
              className="confirm-btn"
              isLoading={isLoadingFeedback}
            >
              Enviar
            </ButtonComponent>
          </FormButtonsContainer>
        </FormContainer>
      </SuggestionsModalComponent>
    </>
  );
}
