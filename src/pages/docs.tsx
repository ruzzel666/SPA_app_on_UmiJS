import { Modal, Button, Typography, Card } from 'antd';
import { useState } from 'react';
import developerPhoto from '../assets/foto.jpg';

const { Title, Paragraph, Text } = Typography;

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
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <Title level={2} style={{ textAlign: 'center', color: '#1890ff', marginBottom: '32px' }}>
        📚 О программе
      </Title>

      <Card bordered={false} style={{ marginBottom: '32px', backgroundColor: '#f9f9f9' }}>
        <Paragraph>
          <Text strong>SPA-приложение на UmiJS</Text> — это современное одностраничное приложение (SPA),
          разработанное с использованием <Text code>UmiJS</Text> — мощного фреймворка для React,
          созданного командой Ant Design. Приложение демонстрирует типичную структуру проекта,
          включая маршрутизацию, управление состоянием, статические ресурсы и компонентный подход.
        </Paragraph>
      </Card>

      <Card title="🎯 Цель проекта" bordered={false} style={{ marginBottom: '32px' }}>
        <Paragraph>
          Главная цель этого приложения — показать базовые возможности <Text strong>UmiJS</Text>, такие как:
        </Paragraph>
        <ul>
          <li>Автоматическая маршрутизация по файловой структуре</li>
          <li>Поддержка TypeScript и JSX/TSX</li>
          <li>Интеграция с UI-библиотеками (в данном случае — Ant Design)</li>
          <li>Удобная работа со статическими ресурсами (изображения, шрифты и т.д.)</li>
          <li>Гибкая конфигурация через <Text code>config/config.ts</Text></li>
        </ul>
      </Card>

      <Card title="🔧 Технологии" bordered={false} style={{ marginBottom: '32px' }}>
        <Paragraph>
          В проекте используются следующие технологии:
        </Paragraph>
        <ul>
          <li><Text code>React</Text> — библиотека для создания пользовательских интерфейсов</li>
          <li><Text code>UmiJS</Text> — каркас приложения с продвинутыми возможностями сборки</li>
          <li><Text code>TypeScript</Text> — строгая типизация для надёжного кода</li>
          <li><Text code>Ant Design</Text> — набор компонентов для элегантного дизайна</li>
          <li><Text code>Less / CSS</Text> — стилизация интерфейса</li>
        </ul>
      </Card>

      <Card title="📦 Структура проекта (основные части)" bordered={false} style={{ marginBottom: '32px' }}>
        <Paragraph>
          <ul>
            <li><Text code>src/pages/</Text> — страницы приложения (автоматическая маршрутизация)</li>
            <li><Text code>src/assets/</Text> — статические файлы (картинки, иконки)</li>
            <li><Text code>src/components/</Text> — переиспользуемые компоненты (если будут)</li>
            <li><Text code>config/</Text> — настройки Umi (роутинг, плагины, прокси и т.д.)</li>
            <li><Text code>.gitignore</Text> — исключение временных и служебных файлов из репозитория</li>
          </ul>
        </Paragraph>
      </Card>

      <Card
        title={
          <span>
            👨‍💻 <Text strong>Разработчик</Text>
          </span>
        }
        bordered={false}
        style={{ textAlign: 'center', backgroundColor: '#e6f7ff' }}
      >
        <Paragraph>
          Это приложение было разработано магистром 1 курса направления "Информационные системы и технологии"
          Института новых материалов и технологий в Уральском Федеральном Университете имени первого Президента России Б.Н. Ельцина.
          Приложение разработано в рамках задания по дисциплине "Создание web-сервисов с использованием современных программных средств".
        </Paragraph>
        <Button type="primary" size="large" onClick={showModal}>
          🔍 Посмотреть фото разработчика
        </Button>
      </Card>

      <Modal
        title="Фото разработчика"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        <div style={{ textAlign: 'center' }}>
          <img
            src={developerPhoto}
            alt="Разработчик"
            style={{
              width: '80%',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            Спасибо за просмотр!
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default DocsPage;