import { ModalHeader } from "../../../../components/modal";
import {
  ChooseSectorStepContainer,
  TicketFormContainer,
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
import CheckBoxComponent from "../../../../components/form/checkbox";
import { SectorCardModel } from "../../../../models/sector";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import { toast } from "sonner";
import { UserModel } from "../../../../models/user";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/auth";
import getDirtyFields from "../../../../utils/getDirtyFields";
import { AiOutlineCloseCircle } from "react-icons/ai";

type viewOptions = "sector" | "main";

interface createInputProps {
  code?: string;
  title: string;
  description: string;
  status: TicketModel["status"];
  urgency: TicketModel["urgency"];
  user_code: string;
  sector_code?: string;
  sector?: SectorCardModel;
  recurrent: boolean;
  interval: string;
  initial_date: string;
  final_date: string;
  user: UserModel;
  files?: FileList;
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
      onError: (error) => {},
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
    const { ...rest } = getDirtyFields(dirtyFields, getValues);

    const formData = new FormData();

    const ticketData = {
      ...rest,
      user_code: user.code,
      urgency: "Normal",
      status: "Aberto",
    };

    for (const key in ticketData) {
      if (ticketData[key]) {
        formData.append(key, ticketData[key]);
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
            buttonStylesType="outline"
            buttonStyles="text"
            title="Cancelar criação de chamado"
            onClick={onClose}
          >
            Cancelar
          </ButtonComponent>
          <ButtonComponent
            buttonStyles="confirm"
            type="button"
            title="Enviar chamado"
            onClick={onSubmit}
            isLoading={isLoadingUpdate}
          >
            Enviar
          </ButtonComponent>
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
    const fileList = current.target.files;

    if (fileList?.length) {
      const newFiles = Array.from(fileList);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setValue("files", fileList as FileList, {
        shouldDirty: true,
      });
    }
  };

  return (
    <FormContentContainer>
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
      <Input type="file" multiple onChange={handleChangeInputValue} />
      <section className="file-input-container">
        {files.length > 0 && (
          <div className="file-list">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <p>
                  {file.name.length > 25
                    ? `${file.name.slice(0, 21)}${file.name.slice(-4)}`
                    : file.name}
                </p>

                <ButtonComponent buttonStyles="text" title="Remover arquivo">
                  <AiOutlineCloseCircle />
                </ButtonComponent>
              </div>
            ))}
          </div>
        )}
      </section>
    </FormContentContainer>
  );
};

const TicketAdvancedOptionsForm = ({ formProps }: StepsProps) => {
  const { setValue, watch, register } = formProps;

  return (
    <FormContentContainer $columns={2}>
      <CheckBoxComponent
        id="ocurrence"
        label="Recorrente"
        checked={watch("recurrent")}
        onCheckedChange={(value) => setValue("recurrent", value)}
      />
      <div />
      <Input
        label="Início da Recorrência"
        placeholder="Início da Recorrência"
        type="datetime-local"
        register={{ ...register("initial_date") }}
        disabled={!watch("recurrent")}
      />
      <Input
        label="Fim da Recorrência"
        placeholder="Fim da Recorrência"
        type="datetime-local"
        register={{ ...register("final_date") }}
        disabled={!watch("recurrent")}
      />
      <Input
        label="Intervalo (min)"
        type="number"
        step={10}
        min={0}
        register={{ ...register("interval") }}
        disabled={!watch("recurrent")}
      />
    </FormContentContainer>
  );
};
