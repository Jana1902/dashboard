import { Card, Skeleton, Avatar, Input, Row, Col } from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons'
import { dashboardContext } from "../context";
import { Link } from "react-router-dom";

const Profile = () => {
  const { userData, isLoading } = dashboardContext();

  if (isLoading || !userData) {
    return (
      <div className="w-4/5 mx-auto mt-8 space-y-6 bg-white rounded-2xl p-4 h-100">
        <Skeleton avatar paragraph={{ rows: 4 }} active />
      </div>
    );
  }

  const { name, email, id, phone, address } = userData;
  const initials = name ? name.charAt(0).toUpperCase() : "U";

  const formattedAddress = address
    ? `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`
    : "";

  return (
      <div className="w-4/5 mx-auto mt-8 space-y-6 rounded-2xl">
      <div className="font-semibold text-xl"><Link to="/dashboard"><ArrowLeftOutlined className="mr-2 font-bold bg-amber-50 rounded-full p-2 text-base mt-0 cursor-pointer" /></Link>Welcome, {userData.name}</div>
        <Card className="bg-white">
          <div className="flex items-center space-x-4 mb-7">
            <Avatar size={64}>{initials}</Avatar>
            <div className="ml-3">
              <div className="text-lg font-semibold">{name}</div>
              <div className="text-gray-500">{email}</div>
            </div>
          </div>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <label className="block text-gray-600 mb-1">User ID</label>
              <Input value={id} disabled />
            </Col>
            <Col xs={24} md={12}>
              <label className="block text-gray-600 mb-1">Name</label>
              <Input value={name} disabled />
            </Col>
            <Col xs={24} md={12}>
              <label className="block text-gray-600 mb-1">Email ID</label>
              <Input value={email} disabled />
            </Col>
            <Col xs={24} md={12}>
              <label className="block text-gray-600 mb-1">Address</label>
              <Input.TextArea
                value={formattedAddress}
                disabled
                autoSize={{ minRows: 1 }}
              />
            </Col>
            <Col xs={24} md={12} className="mb-20">
              <label className="block text-gray-600 mb-1">Phone</label>
              <Input value={phone} disabled />
            </Col>
          </Row>
        </Card>
      </div>
  );
};

export default Profile;
