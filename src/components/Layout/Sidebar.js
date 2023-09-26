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
  const [selectedOption, setSelectedOption] = useState("projects");
  const [data, setData] = useState([]);

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

      // If fetching fails, use hardcoded data based on the selected option
      const hardcodedData =
        option === "projects"
          ? [
              {
                key: "1",
                projectName: "Project Alpha",
                projectType: "Web Development",
                description: "Creating a website for a client.",
              },
              {
                key: "2",
                projectName: "Project Beta",
                projectType: "Mobile App Development",
                description: "Building a mobile app for a startup.",
              },
              {
                key: "3",
                projectName: "Project Gamma",
                projectType: "Data Analysis",
                description: "Analyzing customer data for insights.",
              },
              {
                key: "4",
                projectName: "Project Delta",
                projectType: "UI/UX Design",
                description: "Designing a user-friendly interface.",
              },
              {
                key: "5",
                projectName: "Project Epsilon",
                projectType: "Marketing Campaign",
                description: "Running a marketing campaign for a new product.",
              },
              {
                key: "6",
                projectName: "Project Zeta",
                projectType: "Database Optimization",
                description: "Optimizing the database for faster performance.",
              },
              {
                key: "7",
                projectName: "Project Eta",
                projectType: "Content Creation",
                description: "Creating engaging content for the website.",
              },
            ]
          : [
              {
                key: "1",
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                message: "Interested in your services.",
                date: "2023-09-25",
              },
              {
                key: "2",
                name: "Jane Smith",
                email: "jane.smith@example.com",
                phone: "987-654-3210",
                message: "Have a question about your products.",
                date: "2023-09-26",
              },
              {
                key: "3",
                name: "Bob Johnson",
                email: "bob.johnson@example.com",
                phone: "555-555-5555",
                message: "Looking for a quote for our project.",
                date: "2023-09-27",
              },
              {
                key: "4",
                name: "Alice Johnson",
                email: "alice.johnson@example.com",
                phone: "111-222-3333",
                message: "Inquiring about your consulting services.",
                date: "2023-09-28",
              },
              {
                key: "5",
                name: "David Brown",
                email: "david.brown@example.com",
                phone: "777-888-9999",
                message: "Interested in partnership opportunities.",
                date: "2023-09-29",
              },
              {
                key: "6",
                name: "Eva Wilson",
                email: "eva.wilson@example.com",
                phone: "444-555-6666",
                message: "Seeking information about your software products.",
                date: "2023-09-30",
              },
              {
                key: "7",
                name: "Grace Miller",
                email: "grace.miller@example.com",
                phone: "666-777-8888",
                message: "Requesting a demo of your services.",
                date: "2023-10-01",
              },
            ];

      setData(hardcodedData);
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
    navigate("/login");
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
