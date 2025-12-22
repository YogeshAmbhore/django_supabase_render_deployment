import { getAuthors, createAuthors, deleteAuthorDetails } from "../api/authors";
import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  message,
  Button,
  Input,
  Modal,
  Form,
  InputNumber,
  Card,
} from "antd";
import { TbEye } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const AuthorsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openResponsive, setOpenResponsive] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [recId, setRecId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      setLoading(true);
      const response = await getAuthors();
      setData(response?.data?.data);
    } catch (error) {
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorDelete = async (id) => {
    try {
      setDeleting(true);
      const resp = await deleteAuthorDetails(id);
      if (resp.status == 200) {
        message.success("Author deleted successfully.");
        await loadAuthors();
      }
    } catch (error) {
      message.error("Failed to delete author.");
    } finally {
      setDeleting(false);
    }
  };

  const onFinish = async (body) => {
    try {
      setFormLoading(true);
      const resp = await createAuthors(body);
      if (resp.status == 201) {
        // message.info("Author added successfully");
        message.success("Author added successfully");
        await loadAuthors();
        form.resetFields();
        setOpenResponsive(false);
      }
    } catch (error) {
      message.error("Error in adding author.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleModalClose = () => {
    form.resetFields();
    setOpenResponsive(false);
  };

  const showDeleteConfimationModal = (id) => {
    setRecId(id);
    setConfirmDeletion(true);
  };

  const handleOk = () => {
    handleAuthorDelete(recId);
    setConfirmDeletion(false);
    setRecId(null);
  };

  const handleCancel = () => {
    if (deleting) return;
    setConfirmDeletion(false);
  };

  const columns = [
    {
      title: "Sr. No",
      key: "sr_no",
      width: 80,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 80,
    // },
    {
      title: "Name",
      dataIndex: "name",
      width: 200,
      key: "name",
      ellipsis: true,
    },
    {
      title: "Bio",
      dataIndex: "bio",
      width: 300,
      key: "bio",
      ellipsis: true,
    },
    {
      title: "Birth Year",
      dataIndex: "birth_year",
      key: "birth_year",
      width: 120,
      align: "center",
    },
    {
      title: "Action",
      width: 150,
      fixed: "right",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded hover:bg-blue-50 text-blue-600"
            onClick={() => navigate(`authors/${record.id}`)}
          >
            <TbEye className="text-lg" />
          </button>

          <button
            className="p-2 rounded hover:bg-gray-100 text-gray-600"
            onClick={() => navigate(`authors/${record.id}/edit`)}
          >
            <FaRegEdit className="text-base" />
          </button>

          <button
            className="p-2 rounded hover:bg-red-50 text-red-500"
            onClick={() => showDeleteConfimationModal(record.id)}
          >
            <MdOutlineDelete className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        className="
        flex items-center justify-between
        bg-white h-20
        border border-[#111d3a]/20
        rounded-xl
        shadow-sm
        px-6 mb-6
      "
      >
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Search by Author Name"
            className="
            w-96 h-11
            px-4
            border-2 border-[#111d3a]/30
            rounded-lg
            text-[0.95rem]
            focus:border-[#111d3a]
            focus:shadow-[0_0_0_2px_rgba(17,29,58,0.15)]
          "
          />

          <Button
            className="
            h-11 w-36
            rounded-lg
            font-semibold
            tracking-wide
          "
            style={{
              background: "#111d3a",
              color: "#fff",
              fontSize: "0.9rem",
            }}
          >
            Search
          </Button>
        </div>
        <Button
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
          onClick={() => setOpenResponsive(true)}
        >
          Add Author
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#111d3a]/20">
        <Table
          className="custom-table"
          tableLayout="fixed"
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={loading}
          scroll={{ x: 850 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
        />
      </div>

      <Modal
        footer={null}
        centered
        open={openResponsive}
        // onOk={() => setOpenResponsive(false)}
        onCancel={() => handleModalClose()}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <Card
          title="Add Author"
          className="m-5 edit-author-card"
          actions={[
            <Button
              onClick={() => form.submit()}
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
              Submit
            </Button>,
            <Button
              onClick={() => handleModalClose()}
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
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Author name is required." }]}
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
      </Modal>

      <Modal
        open={confirmDeletion}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
        centered
        destroyOnClose
        maskClosable={false}
        okButtonProps={{ loading: deleting }}
        cancelButtonProps={{ disabled: deleting }}
      >
        <p style={{ margin: 0 }}>
          Are you sure you want to delete this record?
          <br />
          <strong>This action cannot be undone.</strong>
        </p>
      </Modal>
    </div>
  );
};
