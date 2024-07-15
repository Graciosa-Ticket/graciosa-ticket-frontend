import { useEffect } from "react";
import { ModalHeader } from "../../../../components/modal";
import { SectorModalComponent } from "./styles";
import { modalActions } from "../../../../shared/global.interface";
import { ModalTitle } from "../../../../components/centerModal";
import { useForm } from "react-hook-form";
import { SectorModel } from "../../../../models/sector";
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
  } = useForm<SectorModel>({
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
    const data = getDirtyFields(dirtyFields, getValues);

    createSector(data, {
      onSuccess: () => {
        if (sectorData) {
          toast.success("Setor Atualizado");
        } else {
          toast.success("Setor Criado com sucesso");
        }
        onUpdate?.();
      },
    });
  });

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ModalTitle>Novo Setor</ModalTitle>
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
              placeholder="Descrição"
              rows={5}
              register={{ ...register("description") }}
            />
          </FormContentContainer>
          <FormButtonsContainer $columns={2}>
            <div />

            <ButtonComponent
              type="submit"
              buttonStyles="confirm"
              title="Cadastrar Novo Setor"
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
