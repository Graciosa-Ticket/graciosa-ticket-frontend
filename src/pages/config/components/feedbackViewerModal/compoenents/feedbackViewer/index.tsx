import { AiOutlineCheck, AiOutlineLike } from "react-icons/ai";
import { FeedbackContainer } from "./styles";
import { FeedbackModel } from "../../../../../../models/feedback";
import { FaRegTrashCan } from "react-icons/fa6";
import { useMutationQuery } from "../../../../../../services/hooks/useMutationQuery";
import { toast } from "sonner";

interface FeedbackViewerProps {
  data: FeedbackModel;
}

export default function FeedbackViewer({ data }: FeedbackViewerProps) {
  // Função para formatar a hora
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const { mutate: doneFeedback } = useMutationQuery(
    `/feedback/${data?.code}`,
    "put"
  );

  const handleDoneFeedback = () => {
    toast.success("Feedback Concluído!"); // Verificar mensagem do toast
    doneFeedback({
      onSuccess: () => {},
    });
  };

  const { mutate: deleteFeedback } = useMutationQuery(
    `/feedback/${data?.code}`,
    "delete"
  );

  const handleDeleteFeedback = () => {
    deleteFeedback(
      {},
      {
        onSuccess: () => {
          toast.success("Feedback deletado com sucesso!");
        },
      }
    );
  };

  return (
    <>
      <FeedbackContainer>
        <div className="top-feedbackViewer">
          <div className="comment">{data.comment}</div>
          <div className="right-side">
            <div className="icons-div">
              <FaRegTrashCan
                size={".6em"}
                className="trash-icon"
                title="excluir sugestão"
                onClick={handleDeleteFeedback}
              />
              {data.is_done ? (
                <AiOutlineLike
                  size={".6em"}
                  className="like-icon"
                  title="Concluído"
                />
              ) : (
                <AiOutlineCheck
                  size={".6em"}
                  className="check-icon"
                  title="Concluir"
                  onClick={handleDoneFeedback}
                />
              )}
            </div>
            <div>
              <p>{formatTime(data?.created_at as any)}</p>
            </div>
          </div>
        </div>
      </FeedbackContainer>
    </>
  );
}
