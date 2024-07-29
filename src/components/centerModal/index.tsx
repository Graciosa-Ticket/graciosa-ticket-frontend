import { CSSProperties } from "styled-components";
import {
  ModalRoot,
  ModalOverlay,
  StyledModalContent,
  ModalPortal,
  ModalTriggerCloseStyle,
  StyledModalTitle,
  CenterModalHeaderContainer,
} from "./styles";
import { DialogProps } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

interface actionModalRootProps extends DialogProps {
  contentStyle?: CSSProperties | undefined;
  overlayStyle?: CSSProperties | undefined;
}

const CenterModal = ({
  children,
  overlayStyle,
  contentStyle,
  ...props
}: actionModalRootProps) => {
  const [openModal, setOpenModal] = useState(props.open);

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        setOpenModal(props.open);
      }, 300);
    } else {
      setOpenModal(props.open);
    }
  }, [openModal, props.open]);

  return (
    <ModalRoot {...props} open={openModal}>
      <ModalPortal>
        <ModalOverlay style={overlayStyle} $closeAnimation={!props.open}>
          <StyledModalContent
            style={contentStyle}
            $closeAnimation={!props.open}
          >
            {children}
          </StyledModalContent>
        </ModalOverlay>
      </ModalPortal>
    </ModalRoot>
  );
};
export default CenterModal;

export const ModalTriggerClose = ModalTriggerCloseStyle;

export const CenterModalHeader = CenterModalHeaderContainer;
export const ModalTitle = StyledModalTitle;
