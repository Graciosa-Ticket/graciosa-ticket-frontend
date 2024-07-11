import { useForm } from "react-hook-form";
import { UserComponent } from "./styles";
import HenryCalvo from "../../../../assets/henrycalvo.svg";
import { AiOutlineLeft } from "react-icons/ai";
import { ModalHeader, ModalTitle } from "../../../../components/modal";
import ButtonComponent from "../../../../components/buttons";
import Input from "../../../../components/form/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserValidation } from "./validation/createUserValidation";
import { Select, SelectItem } from "../../../../components/form/select";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import { toast } from "sonner";
import { modalActions } from "../../../../shared/global.interface";
import { useEffect } from "react";

export default function CreateUserModal({
  onClose,
  onUpdate,
  onSetEditedData,
}: modalActions) {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, dirtyFields },
    setValue,
  } = useForm({
    resolver: yupResolver(createUserValidation),
  });

  useEffect(() => {
    console.log(isDirty, dirtyFields);
    if (isDirty) {
      onSetEditedData?.(true);
    }
  }, [isDirty, dirtyFields]);

  const { mutate } = useMutationQuery("/users");

  const onSubmit = handleSubmit((data) => {
    const userData = {
      name: data.name,
      email: data.email,
      birth_date: data.birth_date,
      address: data.address,
      cep: data.cep,
      phone_number: data.phone_number,
      role: data.role || "Collaborator",
      status: true,
      password: data.password,
    };
    mutate(userData, {
      onSuccess: () => {
        toast.success("Cadastro concluído");
        onUpdate?.();
      },
      onError: () => {},
    });
  });

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}>
            <AiOutlineLeft fontSize={"20px"} />
          </ButtonComponent>
          <ModalTitle>Cadastro</ModalTitle>
        </div>
      </ModalHeader>
      <UserComponent>
        <div className="img-sector">
          <img src={HenryCalvo} alt="" className="user-avatar" />
        </div>
        <h1 className="user-info-title">Informe Dados Pessoais</h1>
        <div>
          <form className="form" onSubmit={onSubmit}>
            <Input
              label="Nome"
              placeholder="Digite o Nome"
              error={errors.name?.message}
              register={{ ...register("name") }}
            />
            <Input
              label="Email"
              placeholder="Digite o Email"
              error={errors.email?.message}
              register={{ ...register("email") }}
            />
            <Input
              type="date"
              label="Nascimento"
              placeholder="Digite o Nascimento"
              maxLength={4}
              error={errors.birth_date?.message}
              register={{ ...register("birth_date") }}
            />
            <Input
              label="Endereço"
              placeholder="Digite o Endereço"
              error={errors.address?.message}
              register={{ ...register("address") }}
            />
            <Input
              label="Cep"
              placeholder="Digite o Cep"
              error={errors.cep?.message}
              register={{ ...register("cep") }}
            />
            <Input
              label="Telefone"
              placeholder="Digite DD + Telefone"
              error={errors.phone_number?.message}
              register={{ ...register("phone_number") }}
            />
            <Input
              label="Senha"
              placeholder="Minimo de 8 digitos."
              error={errors.password?.message}
              register={{ ...register("password") }}
            />
            <Select
              defaultValue={"Collaborator"}
              onValueChange={(value) => setValue("role", value)}
            >
              <SelectItem value="Administrator">Administrator</SelectItem>
              <SelectItem value="Supervisor">Supervisor</SelectItem>
              <SelectItem value="Collaborator">Collaborator</SelectItem>
            </Select>
          </form>
        </div>
        <div className="button-div">
          <ButtonComponent
            type="submit"
            buttonStyles="confirm"
            title="Cadastrar Novo Usuario"
            className="confirm-btn"
            onClick={onSubmit}
          >
            Cadastrar
          </ButtonComponent>
        </div>
      </UserComponent>
    </>
  );
}
