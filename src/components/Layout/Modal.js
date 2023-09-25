import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import axios from "axios";

const CreateProjectModal = ({
  setShowModal,
  selectedProject,
  setLoading,
  setSelectedProject,
}) => {
  const [form] = Form.useForm();
  const [project, setProject] = useState({
    projectName: "",
    projectType: "",
    description: "",
  });

  const handleCreate = async (values) => {
    try {
      setLoading(true);
      console.log(selectedProject);
      if (selectedProject) {
        console.log("ye mara call hai", values);
        await axios.put(`/api/projects/${selectedProject.id}`, values);
      } else {
        console.log("*************", values);
        await axios.post("/api/projects", values);
      }

      setLoading(false);
      form.resetFields();
      setShowModal(false);

      setSelectedProject(null);
    } catch (error) {
      console.error("Error creating/updating project:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProject({
      ...project,
      [name]: value,
    });
  };

  return (
    <Modal
      open
      title="Edit Project"
      okText="Save"
      cancelText="Cancel"
      onCancel={() => {
        setShowModal(false);
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            handleCreate(values);
          })
          .catch((info) => {
            console.error("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="create_project_form"
        onFinish={handleCreate}
        initialValues={{
          projectName: selectedProject ? selectedProject.projectName : "",
          projectType: selectedProject ? selectedProject.projectType : "",
          description: selectedProject ? selectedProject.description : "",
        }}
      >
        <Form.Item
          name="projectName"
          label="Project Name"
          rules={[{ required: true, message: "Please enter the project name" }]}
        >
          <Input onChange={handleInputChange} />
        </Form.Item>
        <Form.Item
          name="projectType"
          label="Project Type"
          rules={[{ required: true, message: "Please enter the project type" }]}
        >
          <Input onChange={handleInputChange} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea onChange={handleInputChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;
