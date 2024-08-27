import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { modalActions } from "../../../../shared/global.interface";
import { FeedbackModel } from "../../../../models/feedback";
import { ModalHeader } from "../../../../components/modal";
import { ModalTitle } from "../../../../components/centerModal";
import ButtonComponent from "../../../../components/buttons";
import { SuggestionsListModalComponent } from "./styles";
import { useFetch } from "../../../../services/hooks/getQuery";
import { SkeletonAnimation } from "../../../../components/skeleton";
import FeedbackViewer from "./compoenents/suggestionCard";

export default function SuggestionsListModal({ onClose }: modalActions) {
  const [dataSource, setDataSource] = useState<FeedbackModel[]>([]);

  const { isLoading } = useFetch<FeedbackModel[]>("/feedback", ["feedback"], {
    onSuccess: (data: FeedbackModel[]) => {
      setDataSource(data);
    },
  });

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ModalTitle>Lista de Feedbacks</ModalTitle>
        </div>
        <div className="right-side">
          <ButtonComponent buttonStyles="text" title="Fechar" onClick={onClose}>
            <AiOutlineClose fontSize="1em" />
          </ButtonComponent>
        </div>
      </ModalHeader>

      <SuggestionsListModalComponent>
        {isLoading ? (
          <p>nem um feedback encontrado</p>
        ) : !dataSource.length ? (
          <SkeletonAnimation.card>
            <SkeletonAnimation.text />
            <SkeletonAnimation.text />
          </SkeletonAnimation.card>
        ) : (
          <ul className="ticket-list">
            {dataSource.map((feedback, index) => (
              <li key={index}>
                <FeedbackViewer data={feedback} />
              </li>
            ))}
          </ul>
        )}
      </SuggestionsListModalComponent>
    </>
  );
}
