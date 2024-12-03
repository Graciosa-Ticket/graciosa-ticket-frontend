import { ModalHeader } from "../../../../components/modal";
import {
  ChooseSectorStepContainer,
  TicketFormContainer,
  TicketMainFormContainer,
  TicketModalComponent,
} from "./styles";
import { modalActions } from "../../../../shared/global.interface";
import { ModalTitle } from "../../../../components/centerModal";
import { UseFormReturn, useForm } from "react-hook-form";
import Input from "../../../../components/form/input";
import TextArea from "../../../../components/form/textarea";
import {
  FormButtonsContainer,
  FormContainer,
  FormContentContainer,
} from "../../../../components/form/form";
import ButtonComponent from "../../../../components/buttons";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTicketValidation, updateTicketValidation } from "./validation";
import { useFetch } from "../../../../services/hooks/getQuery";
import NotFoundComponent from "../../../../components/notFound";
import SectorSkeletonLoading from "../../../sector/skeleton";
import SectorCard from "./components/sectorCard";
import { FaAngleLeft } from "react-icons/fa";
import { TicketModel } from "../../../../models/ticket";
import { SectorCardModel } from "../../../../models/sector";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import { toast } from "sonner";
import { UserModel } from "../../../../models/user";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/auth";
import getDirtyFields from "../../../../utils/getDirtyFields";
import { AiOutlineCloseCircle, AiOutlineFileAdd } from "react-icons/ai";
import fileLimit from "../../../../utils/fileSizeLimit";
import { Select, SelectItem } from "../../../../components/form/select";
import PrettyCheckBoxComponent from "../../../../components/prettyCheckBox";

type viewOptions = "sector" | "main";

interface createInputProps {
  code?: string;
  title: string;
  description: string;
  status: TicketModel["status"];
  user_code: string;
  sector_code?: string;
  sector?: SectorCardModel;
  break: string;
  start_date: Date;
  end_date: Date;
  user: UserModel;
  files?: FileList | File[];
  is_recurrent: boolean;
}

export default function CreateTicketModal({
  data: ticketSector,
  onSetEditedData,
  onClose,
  onUpdate,
}: modalActions<TicketModel>) {
  const [view, setView] = useState<viewOptions>("sector");

  const formReturn = useForm<createInputProps>({
    resolver: yupResolver(
      (ticketSector ? updateTicketValidation : createTicketValidation) as any
    ) as any,
    defaultValues: ticketSector,
  });

  useEffect(() => {
    const hasDirty = Object.keys(formReturn.formState.dirtyFields).length;
    if (hasDirty) {
      onSetEditedData?.(true);
    }
  }, [formReturn.formState.dirtyFields]);

  const handleGoBack = () => {
    if (view === "main") {
      formReturn.setValue("sector_code", undefined, {
        shouldDirty: true,
      });

      formReturn.setValue("sector", undefined);
      setView("sector");
      return;
    }

    onClose?.();
  };

  const viewOptions = {
    sector: <ChooseSectorStep formProps={formReturn} onChangeStep={setView} />,
    main: (
      <TicketFormStep
        formProps={formReturn}
        onClose={onClose}
        onUpdate={onUpdate}
      />
    ),
  };

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent
            buttonStyles="text"
            title="Voltar"
            onClick={handleGoBack}
          >
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <ModalTitle>
            {formReturn.watch("sector.code")
              ? formReturn.watch("sector.name")
              : "Novo Chamado "}
          </ModalTitle>
        </div>
      </ModalHeader>
      <TicketModalComponent>{viewOptions[view]}</TicketModalComponent>
    </>
  );
}

interface StepsProps {
  formProps: UseFormReturn<createInputProps, any, undefined>;
  onChangeStep?: (step: viewOptions) => void;
  onClose?: () => void;
  onUpdate?: () => void;
}

const ChooseSectorStep = ({ formProps, onChangeStep }: StepsProps) => {
  const [dataSource, setDataSource] = useState<SectorCardModel[]>([]);

  const { isLoading, isFetching } = useFetch<SectorCardModel[]>(
    "/sectors",
    ["sector"],
    {
      onSuccess: (data) => {
        setDataSource(data);
      },
    }
  );

  const isLoadingFecth = isLoading || isFetching;

  const handleSelectSector = (data: SectorCardModel) => {
    formProps.setValue("sector_code", data?.code as string, {
      shouldDirty: true,
    });

    formProps.setValue("sector", data);
    onChangeStep?.("main");
  };

  return (
    <ChooseSectorStepContainer>
      <div className="header">
        <h2>Escolha o setor</h2>
      </div>

      <section className="scroll-sec">
        {!dataSource.length && !isLoadingFecth ? (
          <NotFoundComponent />
        ) : isLoadingFecth ? (
          <SectorSkeletonLoading
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              marginTop: "20px",
            }}
          />
        ) : (
          <ul className="sectors-list">
            {dataSource.map((e, i) => (
              <li key={i}>
                <SectorCard
                  data={e}
                  onClick={(data) => {
                    handleSelectSector(data);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </ChooseSectorStepContainer>
  );
};

const TicketFormStep = ({ formProps, onClose, onUpdate }: StepsProps) => {
  const [viewAdvancedOptions, setViewAdvancedOptions] = useState(false);

  const {
    watch,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
  } = formProps;

  const { mutate: createTicket, isLoading: isLoadingUpdate } =
    useMutationQuery("/ticket");

  const { user } = useAuth();

  const onSubmit = handleSubmit(() => {
    const values = getValues();
    const isRecurrent = values.is_recurrent || false;
    formProps.setValue("is_recurrent", isRecurrent, { shouldDirty: true });

    const { ...rest } = getDirtyFields(dirtyFields, getValues);
    const formData = new FormData();

    const ticketData = {
      ...rest,
      user_code: user.code,
      status: "Aberto",
      is_recurrent: isRecurrent,
    };

    for (const key in ticketData) {
      if (ticketData[key]) {
        if (key === "files") {
          ticketData[key].forEach((file: File) => {
            formData.append("files", file);
          });
        } else {
          formData.append(key, ticketData[key]);
        }
      }
    }
    createTicket(formData, {
      onSuccess: () => {
        toast.success("Chamado Cadastrado!");
        onUpdate?.();
        onClose?.();
      },
      onError: () => {},
    });
  });

  return (
    <TicketFormContainer>
      <div className="content">
        <h2>{watch("sector.name")}</h2>
        <p>{watch("sector.description")}</p>
      </div>

      {viewAdvancedOptions && (
        <div className="go-back-button">
          <ButtonComponent
            buttonStyles="text"
            title="Voltar"
            onClick={() => setViewAdvancedOptions(false)}
          >
            <FaAngleLeft fontSize="1em" />
            Opções Avançadas
          </ButtonComponent>
        </div>
      )}

      <FormContainer onSubmit={onSubmit}>
        {viewAdvancedOptions ? (
          <TicketAdvancedOptionsForm formProps={formProps} />
        ) : (
          <TicketMainForm formProps={formProps} errors={errors} />
        )}

        <FormButtonsContainer $columns={3}>
          <ButtonComponent
            buttonStyles="text"
            title="Avançado"
            onClick={() => setViewAdvancedOptions(!viewAdvancedOptions)}
          >
            {viewAdvancedOptions ? "Voltar" : "Avançado"}
          </ButtonComponent>
          <ButtonComponent
            className="cancel-button"
            buttonStylesType="outline"
            buttonStyles="delete"
            title="Cancelar criação de chamado"
            onClick={onClose}
          >
            Cancelar
          </ButtonComponent>
          {!viewAdvancedOptions && (
            <ButtonComponent
              buttonStyles="confirm"
              type="button"
              title="Enviar chamado"
              onClick={onSubmit}
              isLoading={isLoadingUpdate}
            >
              Enviar
            </ButtonComponent>
          )}
        </FormButtonsContainer>
      </FormContainer>
    </TicketFormContainer>
  );
};

const TicketMainForm = ({
  formProps,
  errors,
}: StepsProps & { errors: any }) => {
  const { register, setValue } = formProps;
  const [files, setFiles] = useState<File[]>([]);

  const handleChangeInputValue = (current: ChangeEvent<HTMLInputElement>) => {
    const fileList = current.target.files as FileList;

    if (fileList?.length) {
      const filesArray = Array.from(fileList);

      const newFiles = filesArray.filter((file) => {
        const isDuplicate = files.some(
          (existingFile) => existingFile.name === file.name
        );
        const { canUpload } = fileLimit(
          file,
          2,
          `O arquivo: ${file.name}, é muito grande`
        );
        return !isDuplicate && canUpload;
      });
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setValue("files", [...files, ...newFiles], {
        shouldDirty: true,
      });
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file !== fileToRemove);
      setValue("files", updatedFiles as unknown as FileList, {
        shouldDirty: true,
      });
      return updatedFiles;
    });
  };

  return (
    <TicketMainFormContainer>
      <Input
        label="Título"
        placeholder="Título do chamado"
        error={errors.title?.message}
        register={{ ...register("title") }}
      />
      <TextArea
        label="Descrição"
        placeholder="Descrição"
        error={errors.description?.message}
        register={{ ...register("description") }}
      />
      <section className="file-input-container">
        <label
          className="label-container"
          htmlFor="fileInput"
          title="Adicionar anexo"
        >
          Adicionar anexo <AiOutlineFileAdd />
        </label>

        <input
          id="fileInput"
          type="file"
          multiple
          onChange={handleChangeInputValue}
        />

        {files.length > 0 && <h3>Lista de anexos</h3>}
        {files.length > 0 && (
          <div className="file-list">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <p>
                  {file.name.length > 25
                    ? `${file.name.slice(0, 20)}${file.name.slice(-4)}`
                    : file.name}
                </p>

                <ButtonComponent
                  buttonStyles="text"
                  className="remove-icon"
                  title="Remover arquivo"
                >
                  <AiOutlineCloseCircle
                    onClick={() => handleRemoveFile(file)}
                  />
                </ButtonComponent>
              </div>
            ))}
          </div>
        )}
      </section>
    </TicketMainFormContainer>
  );
};

const TicketAdvancedOptionsForm = ({ formProps }: StepsProps) => {
  const { setValue, watch, register } = formProps;

  const isRecurrent = watch("is_recurrent") || false;

  const selectedBreak = watch("break") || "30";

  useEffect(() => {
    setValue("break", selectedBreak, { shouldDirty: true });
  }, [isRecurrent, setValue, selectedBreak]);

  return (
    <FormContentContainer $columns={2}>
      <PrettyCheckBoxComponent
        id="ocurrence"
        label="Recorrente"
        checked={isRecurrent}
        onCheckedChange={(value) => setValue("is_recurrent", value)}
      />
      <div />
      <Input
        label="Início da Recorrência"
        placeholder="Início da Recorrência"
        type="datetime-local"
        register={{ ...register("start_date") }}
        disabled={!isRecurrent}
      />
      <Input
        label="Fim da Recorrência"
        placeholder="Fim da Recorrência"
        type="datetime-local"
        register={{ ...register("end_date") }}
        disabled={!isRecurrent}
      />
      <Select
        label="Intervalo"
        defaultValue={selectedBreak}
        selectStyle="secondary"
        onValueChange={(value: string) =>
          setValue("break", value, { shouldDirty: true })
        }
        disabled={!isRecurrent}
      >
        <SelectItem value="30">30 min</SelectItem>
        <SelectItem value="60">1h</SelectItem>
        <SelectItem value="1440">Diário</SelectItem>
        <SelectItem value="10080">Semanalmente</SelectItem>
        <SelectItem value="43200">Mensalmente</SelectItem>
        <SelectItem value="525600">Anualmente</SelectItem>
      </Select>
    </FormContentContainer>
  );
};
