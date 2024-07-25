import { ModalHeader } from "../../../../components/modal";
import { modalActions } from "../../../../shared/global.interface";
import { ModalTitle } from "../../../../components/centerModal";
import ButtonComponent from "../../../../components/buttons";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../../../hooks/auth";
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

export default function PasswordChangeModal({
  data: Userdata,
  onUpdate,
  onClose,
}: modalActions<UserModel>) {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<UserModel>({
    resolver: yupResolver(ChangePasswordValidation),
    defaultValues: Userdata,
  });
  const { user } = useAuth();
  const onSubmit = handleSubmit(() => {
    const data = {
      code: user.code,
      password: getValues("password"),
    };
    console.log(data);
    toast.success("Senha Alterada com sucesso");
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
              placeholder="Confirme sua Senha"
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
            >
              Salvar
            </ButtonComponent>
          </FormButtonsContainer>
        </FormContainer>
      </PasswordChangeModalComponent>
    </>
  );
}
