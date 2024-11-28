import { Avatar, Col, List, Rate, Row } from "antd";
import React from "react";
import { Typography } from "antd";
const { Title } = Typography;
const ViewRatings = ({ ratings }) => {
  return (
    <Row gutter={5}>
      <Col span={24}>
        <Title level={2}>Average Rating</Title>
        <Rate allowHalf disabled value={ratings.reduce((a, b) => a + b.rate, 0) / ratings.length} />
      </Col>
      <Col span={24}>
        <List
          pagination={{ pageSize: 5 }}
          itemLayout="horizontal"
          dataSource={ratings}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={
                  <Row gutter={5}>
                    <Col span={24}>{new Date(item.updatedOn).toLocaleString()}</Col>
                    <Col span={24}>{item.user.name}</Col>
                    <Col span={24}>
                      <Rate allowHalf disabled value={item.rate} />
                    </Col>
                  </Row>
                }
                description={item.remarks}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default ViewRatings;
