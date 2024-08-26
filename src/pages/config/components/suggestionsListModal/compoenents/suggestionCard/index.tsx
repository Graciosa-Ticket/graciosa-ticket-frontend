import { AiOutlineCheck } from "react-icons/ai";
import { FeedbackContainer } from "./styles";
import { FeedbackModel } from "../../../../../../models/feedback";
import { FaRegTrashCan } from "react-icons/fa6";

interface FeedbackViewerProps {
  data: FeedbackModel;
}

export default function FeedbackViewer({ data }: FeedbackViewerProps) {
  // Função para formatar a hora
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
                title="excluir sujestão"
              />
              <AiOutlineCheck
                size={".6em"}
                className="check-icon"
                title="Concluir"
              />
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
