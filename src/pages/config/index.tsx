import {
  AiOutlineComment,
  AiOutlineKey,
  AiOutlineLike,
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

export default function Config({}: modalActions<UserModel>) {
  const [openPasswordChangeModal, setopenPasswordChangeModal] = useState(false);
  const [openSuggestionsModa, setopenSuggestionsModal] = useState(false);
  const [openSupportModa, setopenSupportModal] = useState(false);
  const { user } = useAuth();
  const { onChangeTheme } = useDarkMode();

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
          data={user}
          onClose={() => setopenSuggestionsModal(false)}
        />
      </CenterModal>

      <CenterModal
        open={openSupportModa}
        onOpenChange={() => setopenSupportModal(!openSupportModa)}
      >
        <SupportModal data={user} onClose={() => setopenSupportModal(false)} />
      </CenterModal>

      <ConfigContainer>
        <PageHeaderComponent.container>
          <PageHeaderComponent.title>Configuração</PageHeaderComponent.title>
        </PageHeaderComponent.container>
        <section className="cards-sector">
          <ButtonComponent
            className="card"
            title="Perguntas Frequentes"
            onClick={() => console.log("pao")}
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
            title="Alterar senha"
            onClick={() => setopenPasswordChangeModal(true)}
          >
            <AiOutlineKey style={{ fontSize: "2em" }} />
            Alterar senha
          </ButtonComponent>

          <ButtonComponent
            className="card"
            title="sugestões"
            onClick={() => setopenSuggestionsModal(true)}
          >
            <AiOutlineLike style={{ fontSize: "2em" }} />
            sugestões
          </ButtonComponent>

          <ButtonComponent
            className="card"
            title="Temas"
            onClick={onChangeTheme}
          >
            <AiOutlineSun style={{ fontSize: "2em" }} />
            Temas
          </ButtonComponent>
        </section>
      </ConfigContainer>
    </>
  );
}
