import { useState, CSSProperties } from 'react';
import { Button, Typography } from 'antd';
import BaseModal from './BaseModal';

const { Text } = Typography;

interface DeveloperPhotoModalProps {
  photoSrc: string;
  caption?: string;
  buttonText?: string;
}

/**
 * Модальное окно для отображения фото разработчика
 */
export default function DeveloperPhotoModal({
  photoSrc,
  caption = 'Спасибо за просмотр!',
  buttonText = '🔍 Посмотреть фото разработчика'
}: DeveloperPhotoModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const imageStyle: CSSProperties = {
    width: '80%',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transition: 'transform 0.3s',
  };

  return (
    <>
      <BaseModal
        title="Фото разработчика"
        open={isModalVisible}
        onClose={hideModal}
        footer={null}
        width={600}
      >
        <div style={{ textAlign: 'center' }}>
          <img
            src={photoSrc}
            alt="Разработчик"
            style={imageStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          {caption && (
            <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
              {caption}
            </p>
          )}
        </div>
      </BaseModal>

      <Button type="primary" size="large" onClick={showModal}>
        {buttonText}
      </Button>
    </>
  );
}
