import React, { useState, useEffect } from "react";
import { Layout, Menu, Space } from "antd";
import {
  AppstoreAddOutlined,
  PhoneOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "../../styles/Layout.css";
import logo from "../../assets/logo.png";
import TableData from "./TableData";
import { Header } from "antd/es/layout/layout";
import CreateProjectModal from "./Modal";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState([
    {
      key: "1",
      projectName: "Project 1",
      projectType: "Type 1",
      description: "Description 1",
    },
    {
      key: "2",
      projectName: "Project 2",
      projectType: "Type 2",
      description: "Description 2",
    },
    {
      key: "3",
      projectName: "Project 3",
      projectType: "Type 3",
      description: "Description 3",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const navigate = useNavigate();

  const fetchData = async (option) => {
    setLoading(true);
    try {
      const response = await axios.get(
        option === "projects" ? "/projects" : "/contacts"
      );
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching ${option}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedOption) {
      fetchData(selectedOption);
    }
  }, [selectedOption]);

  const handleMenuItemClick = (item) => {
    setSelectedOption(item.key);
    setSelectedProject(null);
  };

  const handleEditClick = (record) => {
    setSelectedProject(record);
    setShowModal(true);
  };

  const handleDeleteContact = async (record) => {
    try {
      setLoading(true);
      await axios.delete(`/deletecontact/${record.key}`);
      setLoading(false);
      fetchData(selectedOption);
    } catch (error) {
      console.error("Error deleting contact:", error);
      setLoading(false);
    }
  };

  const handleDeleteProject = async (record) => {
    try {
      setLoading(true);
      await axios.delete(`deleteproject/${record.key}`);
      setLoading(false);
      fetchData(selectedOption);
    } catch (error) {
      console.error("Error deleting project:", error);
      setLoading(false);
    }
  };

  const columns =
    selectedOption === "projects"
      ? [
          {
            title: "Project Name",
            dataIndex: "projectName",
            key: "projectName",
          },

          {
            title: "Project Type",
            dataIndex: "projectType",
            key: "projectType",
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record) => (
              <Space size="middle">
                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "none",
                    padding: "0",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEditClick(record)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "none",
                    padding: "0",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDeleteProject(record)}
                >
                  Delete
                </button>
              </Space>
            ),
          },
        ]
      : [
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
          },
          {
            title: "Message",
            dataIndex: "message",
            key: "message",
          },
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
          },
          {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
              <Space size="middle">
                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "none",
                    padding: "0",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDeleteContact(record)}
                >
                  Delete
                </button>
              </Space>
            ),
          },
        ];

  const handleLogout = () => {
    navigate.push("/login");
  };

  return (
    <>
      {showModal && (
        <CreateProjectModal
          setSelectedProject={setSelectedProject}
          setShowModal={setShowModal}
          selectedProject={selectedProject}
          setLoading={setLoading}
        />
      )}
      <Layout className="main-layout">
        <Sider
          width={200}
          className="sider"
          style={{ backgroundColor: "#252525" }}
        >
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <Menu
            mode="vertical"
            theme="dark"
            className="custom-menu"
            onClick={handleMenuItemClick}
          >
            <Menu.Item key="projects" icon={<AppstoreAddOutlined />}>
              Projects
            </Menu.Item>
            <Menu.Item key="contacts" icon={<PhoneOutlined />}>
              Contacts
            </Menu.Item>
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header className="header">Header</Header>
          {data.length > 0 && (
            <TableData
              data={data}
              columns={columns}
              loading={loading}
              heading={selectedOption === "projects" ? "Projects" : "Contacts"}
              setShowModal={setShowModal}
              setSelectedProject={setSelectedProject}
              selectedProject={selectedProject}
              setLoading={setLoading}
              showModal={showModal}
            />
          )}
        </Layout>
      </Layout>
    </>
  );
};

export default Sidebar;
