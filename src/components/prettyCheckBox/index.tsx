import { useEffect, useState } from "react";
import { CSSProperties } from "styled-components";
import { PrettyContainer, PrettyCheckboxRoot } from "./styles";

interface InputProps {
  label?: string;
  name?: string;
  id: string;
  disabled?: boolean;
  error?: string;
  register?: any;
  maxWidth?: number;
  checked?: boolean;
  onCheckedChange?(value: boolean): void;
  readonly?: boolean;
  permission?: string[];
  style?: CSSProperties;
}

const PrettyCheckBoxComponent = ({
  label,
  error,
  id,
  checked = false,
  onCheckedChange,
  style,
  register,
}: InputProps) => {
  const [reloadBox, setReloadBox] = useState(false);

  useEffect(() => {
    setReloadBox(true);

    setTimeout(() => {
      setReloadBox(false);
    }, 20);
  }, [checked]);

  return (
    <PrettyContainer style={style}>
      {!reloadBox ? (
        <PrettyCheckboxRoot
          id={id}
          defaultChecked={checked}
          onCheckedChange={onCheckedChange}
          ref={register?.ref}
        ></PrettyCheckboxRoot>
      ) : (
        <div style={{ width: 24 }} />
      )}
      {label && <label htmlFor={id}>{label} </label>}
      {error && <p>{error}</p>}
    </PrettyContainer>
  );
};

export default PrettyCheckBoxComponent;
