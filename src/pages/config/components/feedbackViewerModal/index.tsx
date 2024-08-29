import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { modalActions } from "../../../../shared/global.interface";
import { FeedbackModel } from "../../../../models/feedback";
import { ModalHeader } from "../../../../components/modal";
import { ModalTitle } from "../../../../components/centerModal";
import ButtonComponent from "../../../../components/buttons";
import { SelectButtonsArea, SuggestionsListModalComponent } from "./styles";
import { useFetch } from "../../../../services/hooks/getQuery";
import { SkeletonAnimation } from "../../../../components/skeleton";

import PrettyCheckBoxComponent from "../../../../components/prettyCheckBox";
import FeedbackViewer from "./compoenents/feedbackViewer";

export default function SuggestionsListModal({ onClose }: modalActions) {
  const [dataSource, setDataSource] = useState<FeedbackModel[]>([]);
  const [showDoneFeedbacks, setShowDoneFeedbacks] = useState(false);
  const [animateList, setAnimateList] = useState(false); // Novo estado para animação

  const handleCheckboxChange = (id: string) => {
    setShowDoneFeedbacks(id === "Concluidos");
    setAnimateList(true); // Ativa animação ao mudar o estado
  };

  const { isLoading: isLoadingFeedback } = useFetch<FeedbackModel[]>(
    showDoneFeedbacks ? "/feedback/doneFeedbacks" : "/feedback",
    ["feedbackData", showDoneFeedbacks],
    {
      onSuccess: (feedbackResponse) => {
        setDataSource(feedbackResponse);
        setAnimateList(false); // Desativa animação após a mudança
      },
    }
  );

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

      <SelectButtonsArea>
        <PrettyCheckBoxComponent
          id="Novos"
          label="Novos"
          checked={!showDoneFeedbacks}
          onCheckedChange={() => handleCheckboxChange("Novos")}
        />
        <PrettyCheckBoxComponent
          id="Concluidos"
          label="Concluidos"
          checked={showDoneFeedbacks}
          onCheckedChange={() => handleCheckboxChange("Concluidos")}
        />
      </SelectButtonsArea>

      <SuggestionsListModalComponent>
        {isLoadingFeedback ? (
          <p>Carregando feedbacks...</p>
        ) : !dataSource.length ? (
          <SkeletonAnimation.card>
            <SkeletonAnimation.text />
            <SkeletonAnimation.text />
          </SkeletonAnimation.card>
        ) : (
          <ul className={`ticket-list ${animateList ? "fade-in" : ""}`}>
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
