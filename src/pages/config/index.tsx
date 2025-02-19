import {
  AiOutlineComment,
  AiOutlineKey,
  AiOutlineLike,
  AiOutlineMoon,
  AiOutlinePhone,
  AiOutlineSun,
} from "react-icons/ai";
import PageHeaderComponent from "../../components/pagesHeader";

import ButtonComponent from "../../components/buttons";
import { ConfigContainer } from "./styles";
import CenterModal from "../../components/centerModal";
import { UserModel } from "../../models/user";
import { modalActions } from "../../shared/global.interface";
import { useState } from "react";
import PasswordChangeModal from "./components/passwordChangeModal";
import { useAuth } from "../../hooks/auth";
import SuggestionsModal from "./components/suggestionsModal";
import SupportModal from "./components/supportModal";
import { useDarkMode } from "../../hooks/theme";
import FaqModal from "./components/faqModal";
import { IoMegaphoneOutline } from "react-icons/io5";
import SuggestionsListModal from "./components/feedbackViewerModal";

export default function Config({}: modalActions<UserModel>) {
  const [openPasswordChangeModal, setopenPasswordChangeModal] = useState(false);
  const [openSuggestionsModa, setopenSuggestionsModal] = useState(false);
  const [openSupportModa, setopenSupportModal] = useState(false);
  const [openFaqModal, setopenFaqModal] = useState(false);
  const [openSuggestionsListModal, setopenSuggestionsListModal] =
    useState(false);

  const { user } = useAuth();
  const { onChangeTheme } = useDarkMode();

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChange = () => {
    onChangeTheme();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <CenterModal
        open={openPasswordChangeModal}
        onOpenChange={() =>
          setopenPasswordChangeModal(!openPasswordChangeModal)
        }
      >
        <PasswordChangeModal
          data={user}
          onClose={() => setopenPasswordChangeModal(false)}
        />
      </CenterModal>

      <CenterModal
        open={openSuggestionsModa}
        onOpenChange={() => setopenSuggestionsModal(!openSuggestionsModa)}
      >
        <SuggestionsModal
          user={user}
          onClose={() => setopenSuggestionsModal(false)}
        />
      </CenterModal>

      <CenterModal
        open={openSupportModa}
        onOpenChange={() => setopenSupportModal(!openSupportModa)}
      >
        <SupportModal data={user} onClose={() => setopenSupportModal(false)} />
      </CenterModal>

      <CenterModal
        open={openFaqModal}
        onOpenChange={() => setopenFaqModal(!openFaqModal)}
      >
        <FaqModal data={user} onClose={() => setopenFaqModal(false)} />
      </CenterModal>

      <CenterModal
        open={openSuggestionsListModal}
        onOpenChange={() =>
          setopenSuggestionsListModal(!openSuggestionsListModal)
        }
      >
        <SuggestionsListModal
          data={user}
          onClose={() => setopenSuggestionsListModal(false)}
        />
      </CenterModal>

      <ConfigContainer>
        <PageHeaderComponent.container>
          <PageHeaderComponent.title>Configuração</PageHeaderComponent.title>
        </PageHeaderComponent.container>
        <section className="cards-sector">
          <ButtonComponent
            className="card"
            title="Perguntas Frequentes"
            onClick={() => setopenFaqModal(true)}
          >
            <AiOutlineComment style={{ fontSize: "2em" }} />
            FAQ
          </ButtonComponent>

          <ButtonComponent
            className="card"
            title="Suporte"
            onClick={() => setopenSupportModal(true)}
          >
            <AiOutlinePhone style={{ fontSize: "2em" }} />
            Suporte
          </ButtonComponent>

          <ButtonComponent
            className="card"
            title="Fazer sugestão"
            onClick={() => setopenSuggestionsModal(true)}
          >
            <IoMegaphoneOutline style={{ fontSize: "2em" }} />
            Fazer sugestão
          </ButtonComponent>

          <ButtonComponent
            className="card"
            title="Temas"
            onClick={handleThemeChange}
          >
            {isDarkMode ? (
              <AiOutlineSun style={{ fontSize: "2em" }} />
            ) : (
              <AiOutlineMoon style={{ fontSize: "2em" }} />
            )}
            Tema
          </ButtonComponent>

          {user.role === "Administrator" && (
            <>
              <ButtonComponent
                className="card"
                title="Temas"
                onClick={() => setopenSuggestionsListModal(true)}
              >
                <AiOutlineLike style={{ fontSize: "2em" }} />
                lista de sugestões
              </ButtonComponent>
              <ButtonComponent
                className="card"
                title="Alterar senha"
                onClick={() => setopenPasswordChangeModal(true)}
              >
                <AiOutlineKey style={{ fontSize: "2em" }} />
                Alterar senhas
              </ButtonComponent>
            </>
          )}
        </section>
      </ConfigContainer>
    </>
  );
}
