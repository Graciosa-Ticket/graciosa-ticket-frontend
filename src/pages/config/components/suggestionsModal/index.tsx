import { useForm, SubmitHandler } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
import TextArea from "../../../../components/form/textarea";
import { UserModel } from "../../../../models/user";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";

// Define o schema de validação com yup
const validationSchema = object({
  comment: string()
    .min(3, "O comentário deve ter pelo menos 3 caracteres.")
    .max(255, "O comentário não pode ter mais de 255 caracteres.")
    .required("Comentário é obrigatório."),
});

interface SuggestionsModalProps extends modalActions {
  user: UserModel;
}

export default function SuggestionsModal({
  onClose,
  user,
}: SuggestionsModalProps) {
  // Configura o useForm com o resolver do yup
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutate: createFeedback, isLoading: isLoadingFeedback } =
    useMutationQuery("/feedback");

  // Define a função de submit
  const onSubmit: SubmitHandler<{ comment: string }> = (data) => {
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
  };

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ModalTitle>Faça sua sugestão!</ModalTitle>
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
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <FormContentContainer>
            <TextArea
              inputStyle="secondary"
              placeholder="deixe sua sugestão aqui.
As sugestões são realizadas de forma anônima, fique tranquilo."
              rows={5}
              {...register("comment")}
            />
            {errors.comment && (
              <p className="error-message">{errors.comment.message}</p>
            )}
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
