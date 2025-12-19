import React, { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Tag,
  Empty,
  Divider,
  Spin,
  message,
  Button,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthorDetails } from "../api/authors";

const AuthorDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [books, setBooks] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState("details");

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadAuthorDetails();
    }
  }, [id]);

  const loadAuthorDetails = async () => {
    try {
      setLoading(true);

      const response = await getAuthorDetails(id);
      const result = response?.data?.data || {};

      setData(result);
      setBooks(result.books || []);
    } catch (error) {
      message.error("Failed to load author details");
    } finally {
      setLoading(false);
    }
  };

  const tabList = [
    {
      key: "details",
      label: "Author Details",
    },
    {
      key: "books",
      label: "Books",
    },
  ];

  const contentList = {
    details: (
      <div className="p-2">
        <Descriptions
          title="Author Information"
          bordered
          column={1}
          size="middle"
        >
          <Descriptions.Item label="Name">
            <span className="font-medium">{data.name || "—"}</span>
          </Descriptions.Item>

          <Descriptions.Item label="Bio">
            <span className="text-gray-600">{data.bio || "—"}</span>
          </Descriptions.Item>

          <Descriptions.Item label="Birth Year">
            {data.birth_year ? <Tag color="blue">{data.birth_year}</Tag> : "—"}
          </Descriptions.Item>
        </Descriptions>
      </div>
    ),

    books: (
      <div className="p-2">
        {books.length === 0 ? (
          <Empty description="No books found" />
        ) : (
          books.map((book) => (
            <div
              key={book.id}
              className="mb-4 p-4 border rounded-lg hover:shadow-sm transition"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">{book.id}</h4>
                <Tag color="green">₹ {book.price}</Tag>
              </div>

              <Divider className="my-2" />

              <p className="text-gray-600">
                <span className="font-medium text-gray-800">
                  Published Year:
                </span>{" "}
                {book.published_year}
              </p>
            </div>
          ))
        )}
      </div>
    ),
  };

  return (
    <Spin spinning={loading}>
      <Card
        className="custom-card-head"
        style={{ width: "100%" }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        tabBarExtraContent={<Button onClick={() => navigate("/")}>Back</Button>}
        onTabChange={setActiveTabKey}
        tabProps={{ size: "large" }}
        bordered
      >
        {contentList[activeTabKey]}
      </Card>
    </Spin>
  );
};

export default AuthorDetails;
