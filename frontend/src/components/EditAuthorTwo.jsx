import { Button, Card, Form, Input, InputNumber, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthorDetails, updateAuthorDetails } from "../api/authors";

export const EditAuthorTwo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data_form] = Form.useForm();
  const [initialData, setInitialData] = useState(null);
  const [authorName, setAuthorName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchAuthor();
    }
  }, [id]);

  const fetchAuthor = async () => {
    try {
      setLoading(true);
      const response = await getAuthorDetails(id);
      const response_data = response?.data?.data || {};
      setAuthorName(response_data.name);
      setInitialData({
        name: response_data.name,
        bio: response_data.bio,
        birth_year: response_data.birth_year,
      });

      data_form.setFieldsValue({
        name: response_data.name,
        bio: response_data.bio,
        birth_year: response_data.birth_year,
      });
      console.log("teststs", data_form.getFieldsValue());
    } catch (error) {
      message.error("Failed to load author details");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const resp = await updateAuthorDetails(id, values);

      if (resp.status == 200) {
        setInitialData(values);
        // message.info("Author data updated successfully.");
        message.success("Author data updated successfully.");
      }
    } catch (error) {
      message.error("Error in updating author details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Card
        title={`Update ${authorName}'s Details`}
        extra={<Button onClick={() => navigate(-1)}>Back</Button>}
        style={{ maxWidth: 800, margin: "0 auto" }}
        className="edit-author-card"
        actions={[
          <Button
            onClick={() => data_form.submit()}
            className="
                h-11 w-40
                rounded-lg
                font-semibold
                tracking-wide
                border border-[#111d3a]
              "
            style={{
              background: "#111d3a",
              color: "#fff",
              fontSize: "0.9rem",
            }}
          >
            Save
          </Button>,
          <Button
            isabled={!initialData}
            onClick={() => data_form.setFieldsValue(initialData)}
            className="
                h-11 w-40
                rounded-lg
                font-semibold
                tracking-wide
                border border-[#111d3a]
              "
            style={{
              background: "#111d3a",
              color: "#fff",
              fontSize: "0.9rem",
            }}
          >
            Cancel
          </Button>,
        ]}
      >
        <Form form={data_form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input
              type="text"
              placeholder="Enter author name"
              className="
                  h-11
                  px-4
                  border-2 border-[#111d3a]/30
                  rounded-lg
                  text-[0.95rem]
                  focus:border-[#111d3a]
                  focus:shadow-[0_0_0_2px_rgba(17,29,58,0.15)]
                "
            />
          </Form.Item>
          <Form.Item label="Birth Year" name="birth_year">
            <InputNumber
              style={{ width: "100%" }}
              placeholder="YYYY"
              className="
                  h-11
                  px-4
                  border-2 border-[#111d3a]/30
                  rounded-lg
                  text-[0.95rem]
                  focus:border-[#111d3a]
                  focus:shadow-[0_0_0_2px_rgba(17,29,58,0.15)]
                "
            />
          </Form.Item>

          <Form.Item label="Bio" name="bio">
            <Input.TextArea rows={6} placeholder="Enter short bio" />
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};
