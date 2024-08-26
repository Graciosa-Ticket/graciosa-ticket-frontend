import { useEffect } from "react";
import { ModalHeader } from "../../../../components/modal";
import { SectorModalComponent } from "./styles";
import { modalActions } from "../../../../shared/global.interface";
import { ModalTitle } from "../../../../components/centerModal";
import { useForm } from "react-hook-form";
import { SectorCardModel } from "../../../../models/sector";
import getDirtyFields from "../../../../utils/getDirtyFields";
import Input from "../../../../components/form/input";
import TextArea from "../../../../components/form/textarea";
import SelectUsers from "../../../../components/form/selectUsers";
import {
  FormButtonsContainer,
  FormContainer,
  FormContentContainer,
} from "../../../../components/form/form";
import ButtonComponent from "../../../../components/buttons";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSectorValidation, updateSectorValidation } from "./validation";
import { toast } from "sonner";
import { AiOutlineClose } from "react-icons/ai";

export default function CreateSectorModal({
  data: sectorData,
  onSetEditedData,
  onUpdate,
}: modalActions) {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, dirtyFields },
    setValue,
  } = useForm<SectorCardModel>({
    resolver: yupResolver(
      sectorData ? updateSectorValidation : (createSectorValidation as any)
    ),
    defaultValues: sectorData,
  });

  useEffect(() => {
    const hasDirty = Object.keys(dirtyFields).length;
    if (hasDirty) {
      onSetEditedData?.(true);
    }
  }, [dirtyFields]);

  const { mutate: createSector, isLoading: isLoadingUpdate } = useMutationQuery(
    "/sectors",
    sectorData ? "put" : "post"
  );

  const onSubmit = handleSubmit(() => {
    const { ...rest } = getDirtyFields(dirtyFields, getValues);

    const data = {
      ...rest,
      code: sectorData?.code,
    };

    createSector(data, {
      onSuccess: () => {
        if (sectorData) {
          toast.success("Setor Atualizado");
        } else {
          toast.success("Setor Criado com sucesso");
        }
        onUpdate?.();
      },
      onError: (error: any) => {
        // Tratar o erro como um objeto genérico
        const errorMessage =
          error?.response?.message || // Extraí a mensagem de erro se disponível
          "Ocorreu um erro ao salvar o setor. Por favor, tente novamente."; // Mensagem padrão

        toast.error(errorMessage);
        console.error("Erro ao criar/atualizar setor:", error); // Exibe o erro no console para debug
      },
    });
  });

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ModalTitle>{sectorData ? "Editar Setor" : "Novo Setor"}</ModalTitle>
        </div>
        <div className="right-side">
          <ButtonComponent
            buttonStyles="text"
            title="Fechar"
            onClick={onUpdate}
          >
            <AiOutlineClose fontSize="1.9em" />
          </ButtonComponent>
        </div>
      </ModalHeader>
      <SectorModalComponent>
        <FormContainer onSubmit={onSubmit}>
          <FormContentContainer>
            <SelectUsers
              label="Responsável"
              title="Adicionar Responsável"
              defaultValue={sectorData?.user}
              onChange={(data) => {
                setValue("responsible_code", data?.code as string, {
                  shouldDirty: true,
                });
              }}
            />

            <Input
              label="Nome do Setor"
              placeholder="Digite o Nome do Setor"
              error={errors.name?.message}
              register={{ ...register("name") }}
            />
            <TextArea
              label="Descrição"
              error={errors.description?.message}
              placeholder="Limite de 80 Caracteres"
              rows={2}
              maxLength={80}
              register={{ ...register("description") }}
            />
          </FormContentContainer>
          <FormButtonsContainer $columns={2}>
            <div />
            <ButtonComponent
              type="submit"
              buttonStyles="confirm"
              title={sectorData ? "Confirmar Edição" : "Cadastrar Novo Setor"}
              className="confirm-btn"
              onClick={onSubmit}
              isLoading={isLoadingUpdate}
            >
              {sectorData ? "Confirmar Edição" : "Cadastrar"}
            </ButtonComponent>
          </FormButtonsContainer>
        </FormContainer>
      </SectorModalComponent>
    </>
  );
}
