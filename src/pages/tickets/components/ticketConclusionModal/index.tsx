import { useEffect } from "react";
import { ModalHeader } from "../../../../components/modal";
import { modalActions } from "../../../../shared/global.interface";
import { ModalTitle } from "../../../../components/centerModal";
import { useForm } from "react-hook-form";
import getDirtyFields from "../../../../utils/getDirtyFields";
import TextArea from "../../../../components/form/textarea";
import {
  FormButtonsContainer,
  FormContainer,
  FormContentContainer,
} from "../../../../components/form/form";
import ButtonComponent from "../../../../components/buttons";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";

import { toast } from "sonner";
import { AiOutlineClose } from "react-icons/ai";
import { TicketConclusionModalComponent } from "./style";
import { TicketModel } from "../../../../models/ticket";

export default function ticketConclusionModal({
  data: ticketData,
  onSetEditedData,
  onUpdate,
}: modalActions) {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<TicketModel>({});

  useEffect(() => {
    const hasDirty = Object.keys(dirtyFields).length;
    if (hasDirty) {
      onSetEditedData?.(true);
    }
  }, [dirtyFields]);

  const { mutate: updateTicket, isLoading: isLoadingUpdate } = useMutationQuery(
    "/ticket",
    "put"
  );

  const onSubmit = handleSubmit(() => {
    const { ...rest } = getDirtyFields(dirtyFields, getValues);

    const data = {
      ...rest,
    };

    updateTicket(data, {
      onSuccess: () => {
        toast.success("Chamado Concluido");
        onUpdate?.();
      },
      onError: () => {},
    });
  });

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ModalTitle>Conclusão do chamado</ModalTitle>
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
      <TicketConclusionModalComponent>
        <FormContainer onSubmit={onSubmit}>
          <FormContentContainer>
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
              title={"confirmar"}
              className="confirm-btn"
              onClick={onSubmit}
              isLoading={isLoadingUpdate}
            >
              confirmar
            </ButtonComponent>
          </FormButtonsContainer>
        </FormContainer>
      </TicketConclusionModalComponent>
    </>
  );
}
