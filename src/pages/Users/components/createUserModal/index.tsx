import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
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
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import { toast } from "sonner";
import { modalActions } from "../../../../shared/global.interface";
import { UserModel } from "../../../../models/user";
import getDirtyFields from "../../../../utils/getDirtyFields";
import { FaAngleLeft } from "react-icons/fa";
import PictureInput from "../../../../components/form/picture";
import { useAuth } from "../../../../hooks/auth";

const fetchAddressByCep = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const { logradouro, bairro } = response.data;
    return { logradouro, bairro };
  } catch (error) {
    throw new Error(`Erro ao buscar o endereço`);
  }
};

export default function CreateUserModal({
  onClose,
  onUpdate,
  onSetEditedData,
  data: userData,
}: modalActions<UserModel>) {
  const { user, updateProfile } = useAuth();
  const [address, setAddress] = useState<{
    logradouro: string;
    bairro: string;
  } | null>(null);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, dirtyFields },
    setValue,
  } = useForm<UserModel>({
    resolver: yupResolver(
      userData ? updateUserValidation : (createUserValidation as any)
    ),
    defaultValues: userData,
  });

  const handleImageChange = (value: string, file: File) => {
    setValue("file", file, { shouldDirty: true });
  };

  useEffect(() => {
    const hasDirty = Object.keys(dirtyFields).length;
    if (hasDirty) {
      onSetEditedData?.(true);
    }
  }, [dirtyFields]);

  useEffect(() => {
    if (getValues("cep")) {
      fetchAddressByCep(getValues("cep"))
        .then(({ logradouro, bairro }) => {
          setAddress({ logradouro, bairro });
          setValue("address", `${logradouro}, ${bairro}`, {
            shouldDirty: true,
          });
        })
        .catch((error) => {
          console.error(error.message);
          setAddress(null);
          setValue("address", "", { shouldDirty: true });
        });
    }
  }, [getValues("cep")]);

  const { mutate: createUser, isLoading: isLoadingUpdate } = useMutationQuery(
    "/users",
    userData ? "put" : "post"
  );

  const onSubmit = handleSubmit(() => {
    const { ...rest } = getDirtyFields(dirtyFields, getValues);

    const formData = new FormData();

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

    createUser(formData, {
      onSuccess: () => {
        if (userData) {
          if (userData.code === user.code) {
            updateProfile(data);
          }

          toast.success("Cadastro Atualizado!");
        } else {
          toast.success("Cadastro concluído!");
        }
        onUpdate?.();
        onClose?.();
      },
      onError: () => {},
    });
  });

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
              label="Endereço"
              placeholder="Digite o Endereço"
              error={errors.address?.message}
              register={{ ...register("address") }}
              value={
                address
                  ? `${address.logradouro}, ${address.bairro}`
                  : getValues("address")
              }
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
            isLoading={isLoadingUpdate}
          >
            {userData ? "Confirmar Edição" : "Cadastrar"}
          </ButtonComponent>
        </div>
      </CreateUserComponent>
    </>
  );
}
