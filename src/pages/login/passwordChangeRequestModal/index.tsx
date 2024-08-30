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
import CheckBoxComponent from "../../../components/form/checkbox";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface PasswordChangeRequestModalProps {
  registration_code: string;
  email: string;
  confirmBox?: boolean;
}

// Esquema de validação com Yup
const passwordChangeRequestSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  registration_code: Yup.string().required("Matricula é obrigatório"),
  confirmBox: Yup.boolean()
    .oneOf([true], "Você deve confirmar para solicitar a alteração de senha")
    .required("Confirmação é obrigatória"),
});

export default function PasswordChangeRequestModal({
  onClose,
}: modalActions<PasswordChangeRequestModalProps>) {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PasswordChangeRequestModalProps>({
    resolver: yupResolver(passwordChangeRequestSchema) as any,
  });

  const { mutate: createPasswordChangeTicket, isLoading: isLoadingFeedback } =
    useMutationQuery("/management/forgotPassword");

  const onSubmit = handleSubmit((data) => {
    // Remove o campo confirmBox antes de enviar a solicitação
    delete data.confirmBox;

    createPasswordChangeTicket(data, {
      onSuccess: () => {
        toast.success("Tudo Certo, aguarde a resposta do chamado");
        // Desmarca o checkbox e fecha o modal após o sucesso
        setValue("confirmBox", false);
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
              error={errors.email?.message}
              register={{ ...register("email") }}
            />
            <Input
              label="Matricula"
              placeholder="Informe matricula"
              error={errors.registration_code?.message}
              register={{ ...register("registration_code") }}
            />
            <CheckBoxComponent
              id="ocurrence"
              label="Confirmo que desejo enviar uma solicitação de alteração de senha à administração."
              checked={watch("confirmBox")} // Define o estado inicial do checkbox
              onCheckedChange={(value) => setValue("confirmBox", value)}
            />
            <div />
          </FormContentContainer>

          <FormButtonsContainer $columns={2}>
            <div />
            <ButtonComponent
              type="submit"
              buttonStyles={watch("confirmBox") ? "confirm" : "text"}
              title={
                watch("confirmBox")
                  ? "Solicitar nova senha"
                  : "Marque a caixa para habilitar o envio da solicitação"
              }
              className="confirm-btn"
              isLoading={isLoadingFeedback}
              disabled={!watch("confirmBox")}
            >
              Sim, solicitar
            </ButtonComponent>
          </FormButtonsContainer>
        </FormContainer>
      </PasswordChangeRequestModalComponent>
    </>
  );
}
