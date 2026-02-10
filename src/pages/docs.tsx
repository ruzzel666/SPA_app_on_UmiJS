import { Modal, Button } from 'antd';
import { useState } from 'react';
import developerPhoto from '../assets/foto.jpg';

const DocsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h2>О программе</h2>
      <p>Это приложение было разработано для демонстрации возможностей UmiJS.</p>
      <Button type="primary" onClick={showModal}>
        Показать фото разработчика
      </Button>
      <Modal
        title="Фото разработчика"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <img src={developerPhoto} alt="Разработчик" style={{ width: '80%' }} />
      </Modal>
    </div>
  );
};

export default DocsPage;
