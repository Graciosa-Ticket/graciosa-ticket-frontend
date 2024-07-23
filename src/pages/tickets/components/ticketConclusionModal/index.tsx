import { ModalHeader } from "../../../../components/modal";
import { modalActions } from "../../../../shared/global.interface";
import { ModalTitle } from "../../../../components/centerModal";
import { useForm } from "react-hook-form";
import { TicketModel } from "../../../../models/ticket";
import {Layout} from "../ticketConclusionModal/style"
import { AiOutlineClose } from "react-icons/ai";

export default function ticketConclusionModal({
  data: ticketData,
  onUpdate,
}: modalActions) {



  const {
    handleSubmit,
    register,
    formState: { errors},
    setValue,
  } = useForm<TicketModel>({
    defaultValues: ticketData,
  });




  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ModalTitle>Novo Setor</ModalTitle>
        </div>
        <div className="right-side">
        <AiOutlineClose />
        </div>
      </ModalHeader>
        <Layout>

        </Layout>
    </>
  );
}
