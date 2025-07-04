import { useState } from "react";
import { Card, Row, Col, Typography, Space } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartFilled,
} from "@ant-design/icons";


type Props={
  data: CardDataType[];
}

const { Title, Text, Link } = Typography;



import type {CardDataType} from './types';
import ModelBox from "./ModelBox";

const Cards = ({data} : Props) => {
  const [UserData, setUserData] = useState<CardDataType[]>([...data])
  const [selectedUser, setselectedUser] = useState<CardDataType>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const likeUserFN = (id: number) => {
    const updatedData = UserData.map(user => {
      if (user.id === id) {
        return { ...user, like: !user.like }; // Toggle liked status
      }
      return user;
    });
    setUserData(updatedData);
  }

  const deleteUserFN = (id: number) => {
    const updatedData = UserData.filter(user => user.id !== id);
    setUserData(updatedData);
  };

  const showModal = (user: CardDataType) => {
    setselectedUser(user);
    setIsModalOpen(true);
    // Implement modal logic here
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} justify="start">

      <ModelBox selectedUser={selectedUser} setUserData={setUserData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>

        {UserData.map((user, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
    style={{ width: 300, margin: 12 }}
    cover={
      <div
        style={{
          height: 150,
          background: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       <img width={"200px"} height={"100px"} src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.username}`} alt='image'/>
      </div>
    }
    actions={[
      user.like ? (
        <HeartFilled
          key="heart"
          style={{ color: 'red' }}
          onClick={() => likeUserFN(user.id)}
        />
      ): 
      <HeartOutlined key="heart" onClick={()=>likeUserFN(user.id)}/>,
      <EditOutlined key="edit" onClick={()=>showModal(user)}/>,
      <DeleteOutlined key="delete" onClick={()=>deleteUserFN(user.id)}/>,
    ]}
  >
    <Title level={5}>{user.name}</Title>
    <Space direction="vertical" size={0}>
      <Text>
        <MailOutlined /> {user.email}
      </Text>
      <Text>
        <PhoneOutlined /> {user.phone}
      </Text>
      <Text>
        <GlobalOutlined /> <Link href={user.website}>{user.website}</Link>
      </Text>
    </Space>
  </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cards;
