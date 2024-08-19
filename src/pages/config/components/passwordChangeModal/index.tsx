import { ModalHeader } from "../../../../components/modal";
import { modalActions } from "../../../../shared/global.interface";
import { ModalTitle } from "../../../../components/centerModal";
import ButtonComponent from "../../../../components/buttons";
import { AiOutlineClose } from "react-icons/ai";
import { PasswordChangeModalComponent } from "./styles";
import {
  FormContainer,
  FormContentContainer,
  FormButtonsContainer,
} from "../../../../components/form/form";
import Input from "../../../../components/form/input";
import { UserModel } from "../../../../models/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ChangePasswordValidation } from "./validation";
import SelectUsers from "../../../../components/form/selectUsers";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";

export default function PasswordChangeModal({
  data: Userdata,
  onClose,
}: modalActions<UserModel>) {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<UserModel & { confirmPassword: string }>({
    resolver: yupResolver(ChangePasswordValidation) as any,
    defaultValues: Userdata,
  });

  const { mutate: passwordChange, isLoading: isLoadingUpdate } =
    useMutationQuery("/users/resetPassword", "put");

  const onSubmit = handleSubmit(() => {
    const { code, password } = getValues();

    const data = {
      code,
      password,
    };

    passwordChange(data, {
      onSuccess: () => {
        toast.success("Senha Alterada com sucesso");
        onClose?.();
      },
      onError: () => {},
    });
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ModalTitle>Alterar Senha</ModalTitle>
        </div>
        <div className="right-side">
          <ButtonComponent buttonStyles="text" title="Fechar" onClick={onClose}>
            <AiOutlineClose fontSize="1em" />
          </ButtonComponent>
        </div>
      </ModalHeader>

      <PasswordChangeModalComponent>
        <FormContainer onSubmit={onSubmit}>
          <FormContentContainer>
            <SelectUsers
              label="Usuario"
              title="Alterar Senha"
              onChange={(data) => {
                setValue("code", data?.code as string, {
                  shouldDirty: true,
                });
              }}
              filterCollaborators={false}
            />

            <Input
              label="Nova Senha"
              placeholder="Nova Senha"
              error={errors.password?.message}
              register={{ ...register("password") }}
              type={showPassword ? "text" : "password"}
              affix={{
                suffix: (
                  <ButtonComponent onClick={handleShow} buttonStyles="text">
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </ButtonComponent>
                ),
              }}
            />
            <Input
              label="Confirmação"
              placeholder="Confirme nova Senha"
              error={errors.confirmPassword?.message}
              register={{ ...register("confirmPassword") }}
              type={showPassword ? "text" : "password"}
            />
          </FormContentContainer>
          <FormButtonsContainer $columns={2}>
            <div />
            <ButtonComponent
              type="submit"
              buttonStyles="confirm"
              title={"Salvar Nova Senha"}
              isLoading={isLoadingUpdate}
            >
              Salvar
            </ButtonComponent>
          </FormButtonsContainer>
        </FormContainer>
      </PasswordChangeModalComponent>
    </>
  );
}
