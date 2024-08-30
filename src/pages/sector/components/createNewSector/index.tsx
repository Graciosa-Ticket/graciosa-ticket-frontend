import { ChangeEvent, useEffect, useState } from "react";
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
import formatPhoneNumber from "../../../../utils/formatPhoneNumber";

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
    watch,
  } = useForm<SectorCardModel>({
    resolver: yupResolver(
      sectorData ? updateSectorValidation : (createSectorValidation as any)
    ),
    defaultValues: sectorData,
  });

  const [originalRamal, setOriginalRamal] = useState(sectorData?.ramal || "");

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

  const { mutate: updateUserSector, isLoading: isLoadingUserUpdate } =
    useMutationQuery("/users", "put");

  const handleUpdateUserSector = (
    responsibleCode: string,
    sectorCode: string
  ) => {
    console.log("Chamada para updateUserSector com:", {
      responsibleCode,
      sectorCode,
    });

    updateUserSector(
      {
        code: responsibleCode,
        sector_code: sectorCode,
      },
      {
        onSuccess: (response) => {
          console.log(
            "Atualização do setor do usuário bem-sucedida:",
            response
          );
        },
        onError: (error) => {
          console.error("Erro ao atualizar setor do usuário:", error);
        },
      }
    );
  };

  const onSubmit = handleSubmit(() => {
    const { ...rest } = getDirtyFields(dirtyFields, getValues);

    const data = {
      ...rest,
      ramal: originalRamal,
      code: sectorData?.code,
    };

    createSector(data, {
      onSuccess: ({ data: res }) => {
        // Verifica se o statusCode é diferente de 200 e exibe a mensagem de erro
        if (res?.statusCode && res.statusCode !== 200) {
          // Usa a mensagem da resposta se disponível, caso contrário, mensagem padrão
          toast.error(
            res.message ||
              "Ocorreu um erro ao salvar o setor. Por favor, tente novamente."
          );
          return;
        }

        // Exibe mensagem de sucesso baseada na presença de sectorData
        if (sectorData) {
          toast.success("Setor Atualizado");
        } else {
          toast.success("Setor Criado com sucesso");
        }

        // Chama o handleUpdateUserSector após sucesso
        if (sectorData) {
          handleUpdateUserSector(sectorData.responsible_code, sectorData.code);
        } else {
          handleUpdateUserSector(getValues().responsible_code, data.code);
        }

        onUpdate?.();
      },
      onError: (error: any) => {
        // Extraia a mensagem de erro com base na estrutura conhecida
        let errorMessage =
          "Ocorreu um erro ao salvar o setor. Por favor, tente novamente.";

        if (error.response) {
          // Caso seja uma resposta de erro da API
          const data = error.response.data;
          errorMessage = data?.message || errorMessage;
        } else if (error.message) {
          // Caso seja um erro genérico com mensagem
          errorMessage = error.message;
        }

        toast.error(errorMessage);
        console.error("Erro ao criar/atualizar setor:", error);
      },
    });
  });
  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedValue = formatPhoneNumber(value);

    // Armazena o valor original
    setOriginalRamal(value);

    // Atualiza o campo de entrada com o valor formatado apenas para exibição
    setValue("ramal", formattedValue, { shouldDirty: true });
  };
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
                setValue("responsible_code", data?.code || "", {
                  shouldDirty: true,
                });
              }}
              error={errors.responsible_code?.message}
            />

            <Input
              label="Nome do Setor"
              placeholder="Digite o Nome do Setor"
              error={errors.name?.message}
              register={{ ...register("name") }}
            />
            <Input
              label="Ramal"
              placeholder="Digite o ramal"
              error={errors.ramal?.message}
              onChange={handlePhoneChange}
              value={watch("ramal")}
              register={{ ...register("ramal") }}
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
              isLoading={isLoadingUpdate || isLoadingUserUpdate}
            >
              {sectorData ? "Confirmar Edição" : "Cadastrar"}
            </ButtonComponent>
          </FormButtonsContainer>
        </FormContainer>
      </SectorModalComponent>
    </>
  );
}
