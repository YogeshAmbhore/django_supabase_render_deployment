import React, { useEffect, useState } from "react";
import { Card, Form, Input, InputNumber, Button, message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthorDetails, updateAuthorDetails } from "../api/authors";

export const EditAuthor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAuthor();
    }
  }, [id]);

  const fetchAuthor = async () => {
    try {
      setLoading(true);
      const res = await getAuthorDetails(id);
      const data = res?.data?.data;

      form.setFieldsValue({
        name: data.name,
        bio: data.bio,
        birth_year: data.birth_year,
      });
    } catch (err) {
      message.error("Failed to load author details");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await updateAuthorDetails(id, values);
      message.success("Author updated successfully");
      navigate(-1); // go back
    } catch (err) {
      message.error("Failed to update author");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Card
        title="Edit Author"
        extra={<Button onClick={() => navigate(-1)}>Back</Button>}
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter author name" />
          </Form.Item>

          <Form.Item label="Bio" name="bio">
            <Input.TextArea rows={4} placeholder="Enter short bio" />
          </Form.Item>

          <Form.Item label="Birth Year" name="birth_year">
            <InputNumber style={{ width: "100%" }} placeholder="YYYY" />
          </Form.Item>

          <div className="flex justify-end gap-3">
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Card>
    </Spin>
  );
};
