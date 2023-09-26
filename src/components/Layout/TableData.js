import React from "react";
import { Space, Table, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import CreateProjectModal from "./Modal";

const TableData = ({
  data,
  columns,
  loading,
  heading,
  setShowModal,
  selectedProject,
  setLoading,
  setSelectedProject,
  showModal,
}) => {
  const headerStyle = {
    background: "#252525",
    color: "white",
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
      <Content className="content">
        <Space direction="vertical">
          <div>
            <h2>List of all {heading}</h2>
            {heading === "Projects" && (
              <Button
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "#e4ae25",
                }}
                onClick={() => {
                  setSelectedProject(null);
                  setShowModal(true);
                }}
              >
                Create Project
              </Button>
            )}
            <div className="table-container">
              <Table
                dataSource={data}
                columns={columns}
                scroll={{ y: 400 }}
                loading={loading}
                // Apply the custom header style to the table columns
                components={{
                  header: {
                    cell: (props) => <th {...props} style={headerStyle} />,
                  },
                }}
              />
            </div>
          </div>
        </Space>
      </Content>
    </>
  );
};

export default TableData;
