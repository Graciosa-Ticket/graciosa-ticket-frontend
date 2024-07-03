import { ModalComponent } from "./styles";

export default function Modal({ isOpen, setModalOpen, children }) {
  if (isOpen) {
    return (
      <ModalComponent>
        <div className="div-back-modal">
          {children}
          <button className="close-modal-btn" onClick={setModalOpen}>
            Fechar
          </button>
        </div>
      </ModalComponent>
    );
  }

  return null;
}
