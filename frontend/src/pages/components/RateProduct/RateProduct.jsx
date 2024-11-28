import { Button, Carousel, Col, Form, Input, Modal, Rate, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import usePostRating from "./hooks/usePostRating";

const { TextArea } = Input;
const RateProduct = ({
  isModalOpen,
  record,
  handleOk,
  handleCancel,
  order,
}) => {
  const [form] = useForm();
  const { postRating } = usePostRating();
  const handlePostRating = (values) => {
    postRating
      .mutateAsync({
        ...values,
      })
      .then(() => {
        handleOk();
      });
  };

  return (
    <Modal title="Rate Product" open={isModalOpen} footer={null}>
      <Carousel autoplay>
        {record.image.map((i) => {
          return <img src={i} style={{ height: "10px" }} />;
        })}
      </Carousel>
      <Form
        form={form}
        initialValues={{
          productId: record._id,
          orderId: order._id,
          rate: 0,
          remarks: "",
        }}
        onFinish={handlePostRating}
      >
        <Row gutter={5}>
          <Col span={24}>
            <h1 className="font-bold text-2xl 2xl:text-4xl mt-2">
              {record.name}
            </h1>
          </Col>
          <Col span={24}>
            <Form.Item
              name="productId"
              label="productId"
              rules={[{ required: true }]}
              hidden
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="orderId"
              label="orderId"
              rules={[{ required: true }]}
              hidden
            >
              <Input />
            </Form.Item>
            <Form.Item name="rate" label="Rate" rules={[{ required: true }]}>
              <Rate allowHalf/>
            </Form.Item>
            <Form.Item
              name={"remarks"}
              label="Remarks"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 0,
              }}
            >
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default RateProduct;
