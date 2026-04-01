import { Modal } from 'antd';
import type { ModalProps } from 'antd';

interface BaseModalProps extends Omit<ModalProps, 'onOk'> {
  onClose: () => void;
  onOk: () => void;
}

export default function BaseModal({ onClose, onOk, children, ...props }: BaseModalProps) {
  return (
    <Modal
      onCancel={onClose}
      onOk={onOk}
      destroyOnClose
      {...props}
    >
      {children}
    </Modal>
  );
}
