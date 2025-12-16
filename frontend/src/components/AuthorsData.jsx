import { getAuthors, createAuthors } from "../api/authors";
import React, { useState, useEffect } from "react";
import { Table, Tag, message } from "antd";

export const AuthorsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};
