import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { CreateUserComponent } from "./styles";
import { ModalHeader, ModalTitle } from "../../../../components/modal";
import ButtonComponent from "../../../../components/buttons";
import Input from "../../../../components/form/input";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserValidation,
  updateUserValidation,
} from "./validation/createUserValidation";
import { Select, SelectItem } from "../../../../components/form/select";
import { toast } from "sonner";
import { modalActions } from "../../../../shared/global.interface";
import { UserModel } from "../../../../models/user";
import getDirtyFields from "../../../../utils/getDirtyFields";
import { FaAngleLeft } from "react-icons/fa";
import PictureInput from "../../../../components/form/picture";
import { useAuth } from "../../../../hooks/auth";
import { AddressByCep } from "../../../../utils/addressByCep";
import { api } from "../../../../services/api.service";
import formatPhoneNumber from "../../../../utils/formatPhoneNumber";
import formatCep from "../../../../utils/cepMask";

export default function CreateUserModal({
  onClose,
  onUpdate,
  onSetEditedData,
  data: userData,
}: modalActions<UserModel>) {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, dirtyFields },
    setValue,
    watch,
  } = useForm<UserModel>({
    resolver: yupResolver(
      userData ? updateUserValidation : (createUserValidation as any)
    ),
    defaultValues: userData,
  });

  const handleImageChange = (_: string, file: File) => {
    setValue("file", file, { shouldDirty: true });
  };

  useEffect(() => {
    const hasDirty = Object.keys(dirtyFields).length;
    if (hasDirty) {
      onSetEditedData?.(true);
    }
  }, [dirtyFields]);

  const onSearchByCEP = async () => {
    const cep = watch("cep");

    if (cep.length < 8) {
      toast.error("CEP inválido");
    }

    try {
      const data = await AddressByCep(cep);

      setValue(
        "address",
        `${data?.logradouro ? `${data.logradouro}, ` : ""}${
          data?.bairro || ""
        }`,
        {
          shouldDirty: true,
        }
      );
    } catch (error) {
      toast.error("CEP inválido");
    }
  };

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    const { phone_number, cep, ...rest } = getDirtyFields(
      dirtyFields,
      getValues
    );
    const formData = new FormData();

    // Adiciona o número de telefone bruto ao FormData
    formData.append("phone_number", getRawPhoneNumber(phone_number || ""));
    formData.append("cep", getRawCep(cep || ""));

    const data = {
      ...rest,
      status: userData?.status || true,
      role: rest?.role || userData?.role || "Collaborator",
      code: userData?.code,
    };

    for (let key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    const createUser = userData ? api.put : api.post;

    try {
      await createUser("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (userData) {
        if (userData.code === user.code) {
          updateProfile(data);
        }

        toast.success("Cadastro Atualizado!");
      } else {
        toast.success("Cadastro concluído!");
        console.log(userData);
      }
      setLoading(false);
      onUpdate?.();
      onClose?.();
    } catch (error) {
      setLoading(false);
      toast.error("Ocorreu um erro, tente novamente!");
    }
  });

  function getRawPhoneNumber(value: string): string {
    return value.replace(/\D/g, "");
  }

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedValue = formatPhoneNumber(value);
    setValue("phone_number", formattedValue, { shouldDirty: true });
  };

  function getRawCep(value: string): string {
    return value.replace(/\D/g, "");
  }

  const handleCepChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedValue = formatCep(value);
    setValue("cep", formattedValue, { shouldDirty: true });
  };

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}>
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <ModalTitle>{userData ? userData.name : "Cadastro"}</ModalTitle>
        </div>
      </ModalHeader>
      <CreateUserComponent>
        <div className="img-sector">
          <PictureInput
            defaultUrl={userData?.profile_picture}
            onChangeImage={handleImageChange}
          />
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
              label="Cep"
              placeholder="Digite o Cep"
              error={errors.cep?.message}
              onBlur={onSearchByCEP}
              onChange={handleCepChange}
              value={watch("cep")}
              register={{ ...register("cep") }}
            />
            <Input
              label="Endereço"
              placeholder="Digite o Endereço"
              error={errors.address?.message}
              register={{ ...register("address") }}
            />
            <Input
              label="Telefone"
              placeholder="Digite DD + Telefone"
              error={errors.phone_number?.message}
              onChange={handlePhoneChange}
              value={watch("phone_number")}
              register={{ ...register("phone_number") }}
            />
            {!userData && (
              <Input
                label="Senha"
                placeholder="Minimo de 8 caracteres."
                error={errors.password?.message}
                register={{ ...register("password") }}
              />
            )}
            <Select
              label="Tipo"
              defaultValue={userData?.role || "Collaborator"}
              selectStyle="secondary"
              onValueChange={(value: UserModel["role"]) =>
                setValue("role", value, {
                  shouldDirty: true,
                })
              }
            >
              <SelectItem value="Collaborator">Collaborator</SelectItem>
              <SelectItem value="Supervisor">Supervisor</SelectItem>
              <SelectItem value="Administrator">Administrator</SelectItem>
            </Select>
          </form>
        </div>
        <div className="button-div">
          <div />
          <ButtonComponent
            type="submit"
            buttonStyles="confirm"
            title="Confirmar"
            className="confirm-btn"
            onClick={onSubmit}
            isLoading={loading}
          >
            {userData ? "Confirmar Edição" : "Cadastrar"}
          </ButtonComponent>
        </div>
      </CreateUserComponent>
    </>
  );
}
