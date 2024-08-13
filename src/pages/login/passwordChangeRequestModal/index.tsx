import { AiOutlineClose } from "react-icons/ai";
import ButtonComponent from "../../../components/buttons";
import { ModalHeader, ModalTitle } from "../../../components/modal";
import { modalActions } from "../../../shared/global.interface";
import { PasswordChangeRequestModalComponent } from "./styles";
import Input from "../../../components/form/input";
import { useForm } from "react-hook-form";
import { useMutationQuery } from "../../../services/hooks/useMutationQuery";
import { toast } from "sonner";
import {
  FormButtonsContainer,
  FormContainer,
  FormContentContainer,
} from "../../../components/form/form";

interface PasswordChangeRequestModalProps {
  user_code: string;
  email: string;
}

export default function PasswordChangeRequestModal({
  onClose,
}: modalActions<PasswordChangeRequestModalProps>) {
  const { handleSubmit, register } = useForm({});

  const { mutate: createFeedback, isLoading: isLoadingFeedback } =
    useMutationQuery("/feedback");

  const onSubmit = handleSubmit((data) => {
    createFeedback(data, {
      onSuccess: () => {
        toast.success("Obrigado pela sugestão");
        onClose?.();
      },
      onError: () => {},
    });
    console.log(data);
  });

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ModalTitle>Esqueceu sua senha ?</ModalTitle>
        </div>
        <div className="right-side">
          <ButtonComponent buttonStyles="text" title="Fechar" onClick={onClose}>
            <AiOutlineClose fontSize="1em" />
          </ButtonComponent>
        </div>
      </ModalHeader>

      <PasswordChangeRequestModalComponent>
        <FormContainer onSubmit={onSubmit}>
          <FormContentContainer>
            <Input
              label="Código de Usuário"
              placeholder="Informe código de usuário"
              //   error={errors.user_code?.message}
              {...register("user_code", {
                required: "Código de usuário é obrigatório",
              })}
            />
            <Input
              label="Email"
              placeholder="Informe email"
              //   error={errors.email?.message}
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email inválido",
                },
              })}
            />
          </FormContentContainer>

          <FormButtonsContainer $columns={2}>
            <div />
            <ButtonComponent
              type="submit"
              buttonStyles="confirm"
              title="Solicitar nova senha"
              className="confirm-btn"
              isLoading={isLoadingFeedback}
            >
              sim, Solicitar
            </ButtonComponent>
          </FormButtonsContainer>
        </FormContainer>
      </PasswordChangeRequestModalComponent>
    </>
  );
}
