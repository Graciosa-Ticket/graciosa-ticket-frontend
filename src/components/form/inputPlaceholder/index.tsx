import { ReactNode } from "react";
import { InputPlaceholderContainer } from "./styles";
import { AiOutlineCopy } from "react-icons/ai";
import FieldCopy from "../../../utils/fieldCopy";

interface inputPlaceholderProps {
  label: string;
  value: ReactNode;
  affix?: {
    suffix?: ReactNode;
    preffix?: ReactNode;
  };
  copyText?: string; // Opcional para exibir o ícone de cópia
}

const InputPlaceholder = ({
  label,
  value,
  affix,
  copyText,
}: inputPlaceholderProps) => {
  return (
    <InputPlaceholderContainer>
      <span className="label">{label}</span>

      <section className="content">
        {affix?.preffix && (
          <span className="affix-container">{affix.preffix}</span>
        )}

        <span className="value-container">{value}</span>

        {affix?.suffix && (
          <span className="affix-container">{affix.suffix}</span>
        )}

        {copyText && (
          <AiOutlineCopy
            className="copy-icon"
            title="Clique aqui para copiar"
            onClick={() => FieldCopy(copyText)} // Passa copyText para a função FieldCopy
          />
        )}
      </section>
    </InputPlaceholderContainer>
  );
};

export default InputPlaceholder;
