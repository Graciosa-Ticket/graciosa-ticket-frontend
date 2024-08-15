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

  const { mutate: createPasswordChangeTicket, isLoading: isLoadingFeedback } =
    useMutationQuery("/management/forgotPassword");

  const onSubmit = handleSubmit((data) => {
    createPasswordChangeTicket(data, {
      onSuccess: () => {
        toast.success("Tudo Certo, aguarde a resposta do chamado");
        onClose?.();
      },
      onError: () => {
        toast.error("Erro ao solicitar a nova senha.");
      },
    });
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
              label="Email"
              placeholder="Informe email"
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email inválido",
                },
              })}
            />
            <Input
              label="Código de Usuário"
              placeholder="Informe código de usuário"
              {...register("user_code", {
                required: "Código de usuário é obrigatório",
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
              Sim, Solicitar
            </ButtonComponent>
          </FormButtonsContainer>
        </FormContainer>
      </PasswordChangeRequestModalComponent>
    </>
  );
}
