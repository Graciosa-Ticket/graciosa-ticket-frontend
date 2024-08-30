import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { api } from "../../../../services/api.service";
import SectorSelect from "./components/sectorSelect";

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
    setError,
    clearErrors,
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

  const emailValue = watch("email");

  useEffect(() => {
    if (emailValue) {
      createUserValidation
        .validateAt("email", { email: emailValue })
        .then(() => {
          clearErrors("email");
        })
        .catch((error) => {
          setError("email", {
            type: "manual",
            message: error.message,
          });
        });
    }
  }, [emailValue, setError, clearErrors]);

  const onSubmit = handleSubmit(async () => {
    setLoading(true);

    try {
      const { ...rest } = getDirtyFields(dirtyFields, getValues);
      const formData = new FormData();

      const file = watch("file");
      if (file) {
        formData.append("file", file);
      }

      const dataToSend = userData
        ? {
            ...userData,
            role: rest.role || userData.role || "Collaborator",
            status: userData.status || true,
            registration_number:
              rest.registration_number || userData.registration_code,
            ...rest,
          }
        : {
            role: rest.role || "Collaborator",
            ...rest,
          };

      Object.entries(dataToSend).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key !== "file") {
            formData.append(key, String(value));
          }
        }
      });

      const createUser = userData ? api.put : api.post;

      await createUser("/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (userData && userData.code === user.code) {
        updateProfile({ ...userData, ...rest });
      }
      toast.success(userData ? "Cadastro Atualizado!" : "Cadastro concluído!");

      setLoading(false);
      onUpdate?.();
      onClose?.();
    } catch (error) {
      setLoading(false);
      toast.error("Ocorreu um erro, tente novamente!");
    }
  });

  const handleSectorSelect = (value: string) => {
    setValue("sector_code", value, { shouldDirty: true });
  };

  useEffect(() => {
    if (userData) {
      handleSectorSelect(userData?.sector?.name || "desconhecido");
    }
  }, [userData]);

  const defaultUrl = userData?.profile_picture
    ? `profile-picture/${userData.code}/regularSize_${userData.profile_picture}`
    : "";

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
            defaultUrl={defaultUrl as any}
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
              label="Matricula"
              placeholder="Digite a Matricula"
              error={errors.registration_code?.message}
              register={{ ...register("registration_code") }}
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
              label="Função"
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
            <SectorSelect
              onSelect={handleSectorSelect}
              defaultValue={userData?.sector?.name || ""}
            />
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
