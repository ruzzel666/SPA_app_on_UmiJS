import { Modal } from 'antd';
import type { ModalProps } from 'antd';

interface BaseModalProps extends Omit<ModalProps, 'open'> {
  open: boolean;
  onClose: () => void;
  onOk?: () => void;
}

/**
 * Базовый компонент модального окна с общей логикой
 */
export default function BaseModal({ open, onClose, onOk, children, ...props }: BaseModalProps) {
  const handleOk = () => {
    onOk?.();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      centered
      {...props}
    >
      {children}
    </Modal>
  );
}
