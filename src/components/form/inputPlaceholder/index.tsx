import { ReactNode } from "react";
import { InputPlaceholderContainer } from "./styles";

interface inputPlaceholderProps {
  label: string;
  value: ReactNode;
  affix?: {
    suffix?: ReactNode;
    preffix?: ReactNode;
  };
}

const InputPlaceholder = ({ label, value, affix }: inputPlaceholderProps) => {
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
      </section>
    </InputPlaceholderContainer>
  );
};

export default InputPlaceholder;
