import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { modalActions } from "../../../../shared/global.interface";
import { FeedbackModel } from "../../../../models/feedback";
import { ModalHeader } from "../../../../components/modal";
import { ModalTitle } from "../../../../components/centerModal";
import ButtonComponent from "../../../../components/buttons";
import {
  FeedBackContainer,
  SelectButtonsArea,
  SuggestionsListModalComponent,
} from "./styles";
import { useFetch } from "../../../../services/hooks/getQuery";
import { SkeletonAnimation } from "../../../../components/skeleton";

import PrettyCheckBoxComponent from "../../../../components/prettyCheckBox";
import FeedbackViewer from "./compoenents/feedbackViewer";
import NotFoundComponent from "../../../../components/notFound";
import { chain } from "lodash";
import { format } from "date-fns";

interface groupFeedBackType {
  date: Date | undefined;
  year: string;
  group: FeedbackModel[];
}

export default function SuggestionsListModal({ onClose }: modalActions) {
  const [dataSource, setDataSource] = useState<groupFeedBackType[]>([]);
  const [showDoneFeedbacks, setShowDoneFeedbacks] = useState(false);
  const [animateList, setAnimateList] = useState(false); // Novo estado para animação

  const handleCheckboxChange = (id: string) => {
    setShowDoneFeedbacks(id === "Concluidos");
    setAnimateList(true); // Ativa animação ao mudar o estado
  };

  const { isLoading: isLoadingFeedback, isFetching } = useFetch<
    FeedbackModel[]
  >(
    showDoneFeedbacks ? "/feedback/doneFeedbacks" : "/feedback",
    ["feedbackData", showDoneFeedbacks],
    {
      onSuccess: (feedbackResponse) => {
        const groupedFeedBack = chain(feedbackResponse)
          .groupBy((year) => new Date(year?.created_at as Date))
          .map((e, i) => {
            const currentDate = e[0];

            return {
              date: currentDate.created_at,
              year: i,
              group: e,
            };
          })
          .value();

        setDataSource(groupedFeedBack);

        setAnimateList(false); // Desativa animação após a mudança
      },
    }
  );

  const isLoading = isLoadingFeedback || isFetching;

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
      <FeedBackContainer>
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
          {isLoading ? (
            <SkeletonAnimation.card>
              <SkeletonAnimation.text />
              <SkeletonAnimation.text />
            </SkeletonAnimation.card>
          ) : !dataSource.length ? (
            <NotFoundComponent message="Nenhum FeedBack encontrado" />
          ) : (
            <ul className={`ticket-list ${animateList ? "fade-in" : ""}`}>
              {dataSource.map((feedback, index) => (
                <section className="feedback-item" key={index}>
                  <p className="time-indicator">
                    {" "}
                    {format(feedback.date as Date, "dd/MM/yyyy")}
                  </p>

                  <ul className="feedback-list">
                    {feedback.group?.map((monthData, monthKey) => {
                      return (
                        <li key={monthKey}>
                          <FeedbackViewer data={monthData} />
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </ul>
          )}
        </SuggestionsListModalComponent>
      </FeedBackContainer>
    </>
  );
}
