import { useEffect, useState } from "react";
import { GoCheck } from "react-icons/go";
import { CSSProperties } from "styled-components";
import { Container, CheckboxRoot, CheckboxIndication } from "./styles";

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
  style?: CSSProperties | undefined;
}

const CheckBoxComponent = ({
  label,
  error,
  id,
  checked = false,
  onCheckedChange,
  style,
}: InputProps) => {
  const [reloadBox, setReloadBox] = useState(false);

  useEffect(() => {
    setReloadBox(true);

    setTimeout(() => {
      setReloadBox(false);
    }, 20);
  }, [checked]);

  return (
    <Container style={style}>
      {!reloadBox ? (
        <CheckboxRoot
          id={id}
          defaultChecked={checked}
          onCheckedChange={onCheckedChange}
        >
          <CheckboxIndication>
            <GoCheck />
          </CheckboxIndication>
        </CheckboxRoot>
      ) : (
        <div style={{ width: 16 }} />
      )}
      {label && <label htmlFor={id}>{label} </label>}
      {error && <p>{error}</p>}
    </Container>
  );
};

export default CheckBoxComponent;
