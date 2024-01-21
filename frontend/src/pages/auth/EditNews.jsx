import { Button, Form, Input, Modal, message } from 'antd';
import axios from 'axios'; // Import axios
import React from 'react';

const EditNewsPopup = ({ visible, onCancel, onEdit, newsData }) => {
  const [form] = Form.useForm();

  const token = () => `bearer ${window.localStorage.getItem('token')}`;

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Create the news object to be sent in the request
      const updatedNewsData = {
        title: values.title,
        content: values.content,
        date: values.date,
        writer: values.writer,
      };

      // Perform the PUT or PATCH request to update the news data
      const response = await axios.put(`http://localhost:3000/news/${newsData.id}`, updatedNewsData, {
        headers: {
          Authorization: token(),
        },
      });

      // Handle the response if needed
      console.log('News updated:', response.data);
      message.success('News data updated successfully!');

      // Call the onEdit callback with the updated data
      onEdit(updatedNewsData);

      // Close the modal and reset form
      onCancel();
      form.resetFields();
    } catch (error) {
      // Handle error if the request fails
      console.error('Error updating news:', error);
      message.error('Failed to update news data.');
    }
  };

  

  return (
    <Modal
      visible={visible}
      title="Edit News"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" className='text-black' onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} initialValues={newsData}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Content is required' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Date is required' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="writer" label="Writer" rules={[{ required: true, message: 'Writer is required' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditNewsPopup;
