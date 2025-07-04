import { Modal, Form, Input } from 'antd';
import { useEffect } from 'react';
import type { CardDataType } from './types';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedUser: CardDataType;
  setUserData : (prev : any) => void;
};

const ModelBox = ({ isModalOpen, setIsModalOpen, selectedUser,setUserData }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue(selectedUser);
    }
  }, [selectedUser, form]);

  const handleOk = () => {
    form.submit(); // trigger form submit
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: CardDataType) => {
    console.log('Form submitted:', values);
    setUserData((prev : CardDataType[]) =>
        prev.map((user) =>
          user.id === selectedUser.id ? { ...user, ...values } : user
        )
      );
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Edit User"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="website" label="Website" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModelBox;
