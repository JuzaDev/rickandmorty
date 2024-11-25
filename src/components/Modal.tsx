import { ReactNode } from "react";

interface Props {
  content: ReactNode;
  onClose: () => void;
}

const Modal = ({ content, onClose }: Props) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>
  );
};

export default Modal;
