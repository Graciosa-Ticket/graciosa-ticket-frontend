import { AiOutlineLike } from "react-icons/ai";
import { FeedbackContainer } from "./styles";
import { FeedbackModel } from "../../../../../../models/feedback";

interface FeedbackViewerProps {
  data: FeedbackModel;
}

export default function FeedbackViewer({ data }: FeedbackViewerProps) {
  return (
    <>
      <FeedbackContainer>
        <div className="top-feedbackViewer">
          <div className="comment">{data.comment}</div>
          <AiOutlineLike className="like-icon" />
        </div>
      </FeedbackContainer>
    </>
  );
}
