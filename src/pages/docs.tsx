import { Typography, Card } from 'antd';
import { DeveloperPhotoModal } from '@/components';
import developerPhoto from '../assets/foto.jpg';

const { Title, Paragraph, Text } = Typography;

export default function DocsPage() {
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
            <li><Text code>src/components/</Text> — переиспользуемые компоненты</li>
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
        <div style={{ marginTop: '16px' }}>
          <DeveloperPhotoModal photoSrc={developerPhoto} />
        </div>
      </Card>
    </div>
  );
}
