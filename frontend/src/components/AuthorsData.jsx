import { getAuthors, createAuthors, getAuthorDetails } from "../api/authors";
import React, { useState, useEffect } from "react";
import { Table, Tag, message, Button } from "antd";
import { TbEye } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const AuthorsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const getAuthorDetail = async (id) => {
    try {
      setLoading(true);
      const response = await getAuthorDetails(id);
      console.log("response details ===>> ", response?.data?.data);
    } catch (error) {
      message.error("Failed to get author details");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Bio",
      dataIndex: "bio",
      key: "bio",
    },
    {
      title: "Birth Year",
      dataIndex: "birth_year",
      key: "birth_year",
    },
    {
      title: "Action",
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
            onClick={() => deleteUser(record.id)}
          >
            <MdOutlineDelete className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      className="custom-table"
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};
