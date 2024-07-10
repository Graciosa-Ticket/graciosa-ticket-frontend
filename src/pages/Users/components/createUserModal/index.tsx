import { useForm } from "react-hook-form";
import { UserComponent } from "./styles";
import HenryCalvo from "../../../../assets/henrycalvo.svg";
import { AiOutlineLeft } from "react-icons/ai";
import { ModalHeader } from "../../../../components/modal";
import ButtonComponent from "../../../../components/buttons";
import Input from "../../../../components/form/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserValidation } from "./validation/createUserValidation";
import { Select, SelectItem } from "../../../../components/form/select";

interface userModalProps {
  onClose: () => void;
}

export default function CreateUserModal({ onClose }: userModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(createUserValidation),
  });

  const onSubmit = handleSubmit((data) => {
    const userData = {
      name: data.name,
      email: data.email,
      birth_date: data.birth_date,
      address: data.address,
      cep: data.cep,
      phone_number: phoneMask(data.phone_number),
      role: data.role,
      status: true,
    };
    console.log(userData);
  });

  function phoneMask(phone_number: string) {
    let r = phone_number.replace(/\D/g, "");
    r = r.replace(/^0/, "");

    if (r.length > 11) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 7) {
      r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (phone_number.trim() !== "") {
      r = r.replace(/^(\d*)/, "($1");
    }
    return r;
  }

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}>
            <AiOutlineLeft fontSize={"20px"} />
          </ButtonComponent>
          <h3>Cadastro</h3>
        </div>
      </ModalHeader>
      <UserComponent>
        <div className="img-sector">
          <img src={HenryCalvo} alt="" className="user-avatar" />
        </div>
        <h3 className="user-info-title ">Informe Dados Pessoais</h3>
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

            <Select
              defaultValue={"Collaborator"}
              triggerStyle={{}}
              onValueChange={(value) => setValue("role", value)}
            >
              <SelectItem value="Administrator">Administrator</SelectItem>
              <SelectItem value="Supervisor">Supervisor</SelectItem>
              <SelectItem value="Collaborator">Collaborator</SelectItem>
            </Select>
          </form>
        </div>
        <div className="button-div">
          <div />
          <ButtonComponent
            type="submit"
            buttonStyles="confirm"
            title="Cadastrar Novo Usuario"
            onClick={onSubmit}
          >
            Cadastrar
          </ButtonComponent>
        </div>
      </UserComponent>
    </>
  );
}
