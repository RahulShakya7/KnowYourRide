import { UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Popconfirm, Select, Table, Upload, message } from 'antd';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import CommonSection from "../../components/CommonSection";
import Helmet from "../../components/Helmet/Helmet";
import EditNewsPopup from "./EditNews";

const AdminPage = () => {
  const [ formVehicle ] = Form.useForm();
  const [ formNews ] = Form.useForm();

  const [ vehicleImage, setVehicleImage ] = useState(null);
  const [ newsImage, setNewsImage ] = useState(null);

  const [ activeTab, setActiveTab ] = useState('vehicle'); 

  const [ vehicle, setVehiclesList ] = useState([]);
  const [ vehicleImageName, setVehicleImageName ] = useState(""); 

  const [ news, setNewsList ] = useState([]);
  const [ newsImageName, setNewsImageName] = useState(""); 
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [editedNews, setEditedNews] = useState(null);
  const userRole = localStorage.getItem('role');

  // Get Vehicle List
  useEffect(() => {
    axios.get("http://localhost:3000/vehicle")
      .then(response => {
        setVehiclesList(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching vehicle data", error);
      })
  }, []);

  // Get News List
  useEffect(() => {
    axios.get("http://localhost:3000/news")
      .then(response => {
        setNewsList(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching vehicle data", error);
      })
  }, []);

  
  const token = () => `bearer ${window.localStorage.getItem('token')}`;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  ////////////////////////////////////// Upload Vehicle ///////////////////////////////////////////

  // Delete
  const handleVehicleDelete = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/vehicle/${itemId}`, {
        headers: {
          Authorization: token(),
        },
      });

      if (response.status === 200) {
        message.success('Vehicle deleted successfully');
        // Perform any additional logic after successful deletion
        // For example, you might want to update the list of vehicles
      } else {
        message.error('Failed to delete vehicle');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      message.error('An error occurred while deleting the vehicle');
    }
  };

  // Submit News
  const handleVehicleSubmit = async (values) => {
    try {
      // Create the vehicle object to be sent in the request
      const vehicleData = {
        manufacturer: values.manufacturer,
        model: values.model,
        year: values.year,
        specs: values.specs,
        color: values.color,
        vtype: values.vtype,
      };
  
      // Perform the POST request
      const response = await axios.post('http://localhost:3000/vehicle', vehicleData, {
        headers: {
          Authorization: token,
        },
      });
  
      // Handle the response if needed
      console.log('Vehicle added:', response.data);
      message.success('Vehicle data uploaded successfully!');
  
      // Reset form
      formVehicle.resetFields();
      setVehicleImage(null);
      // Return the created vehicle's ID
      return response.data.id;
    } catch (error) {
      // Handle error if the request fails
      console.error('Error adding vehicle:', error);
      message.error('Failed to add vehicle data.');
    }
  };  
  
  // Upload Image
  const uploadVehicleImage = async (vehicleId) => {
    try {
      const formData = new FormData();
      formData.append('vehiclePicture', vehicleImage);
      console.log(vehicleImage);
  
      // Perform the POST request to upload the image
      await axios.post(`http://localhost:3000/vehicle/${vehicleId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Handle the response if needed
      console.log('Image uploaded successfully!');
      message.success('Vehicle image uploaded successfully!');
    } catch (error) {
      // Handle error if the request fails
      console.error('Error uploading image:', error);
      message.error('Failed to upload vehicle image.');
    }
  };

  // Set Image
  const setVehicleImageUpload = (info) => {
    if (info.file.status === 'done') {
      setVehicleImage(info.file.originFileObj); // Set the uploaded image file
      setVehicleImageName(info.file.name); // Set the image name
    }
  };
  ////////////////////////////////////// Vehile Upload ///////////////////////////////////////////


  /////////////////////////////////////// Upload News ////////////////////////////////////////////

  // Delete News
  const handleNewsDelete = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/news/${itemId}`, {
        headers: {
          Authorization: token(),
        },
      });
  
      if (response.status === 200) {
        message.success('News deleted successfully');
        // Perform any additional logic after successful deletion
        // For example, you might want to update the list of news items
      } else {
        message.error('Failed to delete news');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      message.error('An error occurred while deleting the news');
    }
  };
  
  // Submit News
  const handleNewsSubmit = async (values) => {
    try {
      // Create the news object to be sent in the request
      const newsData = {
        title: values.title,
        content: values.content,
        date: values.date, // Assuming date is in the correct format
        writer: values.writer,
      };
  
      // Perform the POST request
      const response = await axios.post('http://localhost:3000/news', newsData, {
        headers: {
          Authorization: token(),
        },
      });
  
      // Handle the response if needed
      console.log('News added:', response.data);
      message.success('News data uploaded successfully!');
  
      // Reset form and state
      formNews.resetFields();
      setNewsImage(null);

      return response.data.id;
    } catch (error) {
      // Handle error if the request fails
      console.error('Error adding news:', error);
      message.error('Failed to add news data.');
    }
  };

  // Upload News Image
  const uploadNewsImage = async (newsid) => {
    try {
      const formData = new FormData();
      formData.append('newsPicture', newsImage);
      console.log(newsImage);
  
      // Perform the POST request to upload the image
      await axios.post(`http://localhost:3000/news/${newsid}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Handle the response if needed
      console.log('Image uploaded successfully!');
      message.success('News image uploaded successfully!');
    } catch (error) {
      // Handle error if the request fails
      console.error('Error uploading image:', error);
      message.error('Failed to upload news image.');
    }
  };

  // Set News Image
  const setNewsImageUpload = (info) => {
    if (info.file.status === 'done') {
      setNewsImage(info.file.originFileObj); // Set the uploaded image file
      setNewsImageName(info.file.name); // Set the image name
    }
  };

  // Function to handle opening the edit popup
const handleEditNews = (newsData) => {
  setEditedNews(newsData);
  setEditPopupVisible(true);
};

// Function to handle saving edited news
const handleSaveEditedNews = (editedData) => {
  // Implement the logic to save the edited news data
  console.log('Edited news:', editedData);
  setEditPopupVisible(false);
};

// Function to handle canceling the edit popup
const handleCancelEditPopup = () => {
  setEditPopupVisible(false);
};
  
  
  //////////////////////////////////// Upload News /////////////////////////////////////////////

  return (
    <Helmet title="Admin">
      <CommonSection title="Admin" />
      {userRole === 'admin' ? (
        <div className="p-8 min-h-screen">
          <h1 className="text-3xl font-bold mb-14">Admin Page</h1>
            <div className="tabs tabs-boxed flex-col md:flex-row justify-center md:justify-center p-4 m-2 space-x-2 md:space-x-2">
              <a
                className={`tab ${activeTab === 'vehicle' ? 'tab-active' : ''} text-xl center-items`}
                onClick={() => handleTabChange('vehicle')}
              >
                Add Vehicle
              </a>
              <a
                className={`tab ${activeTab === 'news' ? 'tab-active' : ''} pl-4 pr-4 text-xl center-items`}
                onClick={() => handleTabChange('news')}
              >
                Add News
              </a>
              <a
                className={`tab ${activeTab === 'viewVehicles' ? 'tab-active' : ''} pl-4 pr-4 text-xl center-items`}
                onClick={() => handleTabChange('viewVehicles')}
              >
                List of Vehicles
              </a>
              <a
                className={`tab ${activeTab === 'viewNews' ? 'tab-active' : ''} pl-4 pr-4 text-xl center-items`}
                onClick={() => handleTabChange('viewNews')}
              >
                View News
              </a>
            </div>
          <div className="center-items grid grid-cols-1 md:grid-cols-1 gap-4 ">
            {activeTab === 'vehicle' && (
              // onFinish={handleVehicleSubmit}
              <Form form={formVehicle} className="bg-gray-100 p-10 rounded-lg">
                <Form.Item name="manufacturer" label="Manufacturer">
                  <Input />
                </Form.Item>
                <Form.Item name="model" label="Model">
                  <Input />
                </Form.Item>
                <Form.Item name="year" label="Year">
                  <DatePicker />
                </Form.Item>
                <Form.Item name="specs" label="Specifications">
                  <Input />
                </Form.Item>
                <Form.Item name="color" label="Colors">
                  <Input />
                </Form.Item>
                <Form.Item name="vtype" label="Type">
                  <Select placeholder="Select a vehicle type">
                    <Select.Option value="Car">Car</Select.Option>
                    <Select.Option value="Bike">Bike</Select.Option>
                    <Select.Option value="Scooter">Scooter</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="vimage" label="Vehicle Image">
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    customRequest={({ onSuccess }) => setTimeout(onSuccess, 0)}
                    onChange={setVehicleImageUpload}
                  >
                    <Button icon={<UploadOutlined />}>Upload Vehicle Image</Button>
                  </Upload>
                  {vehicleImageName && <p>{vehicleImageName}</p>} {/* Display the selected image name */}
                </Form.Item>
                {/* Other vehicle fields */}
                <Form.Item>
                  <Button className="w-full tracking-wide text-white transition-colors duration-200 transform bg-purple-800 rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-600" 
                    type="primary" 
                    htmlType="submit"
                    onClick={async () => {
                      const vehicleId = await handleVehicleSubmit(formVehicle.getFieldsValue());
                      console.log(vehicleId);
                      if (vehicleId) {
                        await uploadVehicleImage(vehicleId);
                      }
                    }}
                  >
                    Upload Vehicle Data
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
          <div className="center-items grid grid-cols-1 md:grid-cols-1 gap-4">
            {activeTab === 'news' && (
              <Form form={formNews} className="bg-gray-100 p-10 rounded-lg">
                <Form.Item name="title" label="News Title">
                  <Input />
                </Form.Item>
                <Form.Item name="content" label="Content">
                  <Input />
                </Form.Item>
                <Form.Item name="date" label="Date">
                  <DatePicker />
                </Form.Item>
                <Form.Item name="writer" label="Writer">
                  <Input />
                </Form.Item>
                <Form.Item name="nimage" label="News Image">
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    customRequest={({ onSuccess }) => setTimeout(onSuccess, 0)}
                    onChange={setNewsImageUpload}
                  >
                    <Button icon={<UploadOutlined />}>Upload News Image</Button>
                  </Upload>
                  {newsImageName && <p>{newsImageName}</p>}
                </Form.Item>
                
                {/* Other news fields */}
                <Form.Item>
                  <Button className="w-full tracking-wide text-white transition-colors duration-200 transform bg-purple-800 rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-600" 
                    type="primary" 
                    htmlType="submit"
                    onClick={async () => {
                      const newsid = await handleNewsSubmit(formNews.getFieldsValue());
                      console.log(newsid);
                      if (newsid) {
                        await uploadNewsImage(newsid);
                      }
                    }}>
                    Upload News Data
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>

          {/* View Vehicles */}
          <div className="grid center-items grid-cols-1 sm:grid-cols-1 gap-4">
            {activeTab === 'viewVehicles' && (
              <div className="p-10">
                <h2 className="text-2xl font-semibold mb-4">View Vehicles</h2>
                <div className="overflow-x-auto">
                  <Table dataSource={vehicle} className="min-w-full">
                    <Table.Column title="Model" dataIndex="model" key="model" className="w-1/2 md:w-auto" />
                    <Table.Column title="Image name" dataIndex="vimage" key="vimage" className="w-1/4 md:w-auto" />
                    <Table.Column title="ID" dataIndex="id" key="id" className="w-1/4 md:w-auto" />
                    <Table.Column
                      title="Actions"
                      key="actions"
                      className="w-1/4 md:w-auto"
                      render={(text, record) => (
                        <Popconfirm
                          title="Are you sure you want to delete this vehicle?"
                          onConfirm={() => handleVehicleDelete(record.id)}
                          okText={<Button type="danger" size="small" className="text-black">Yes</Button>}
                          cancelText="No"
                          className='p-4 bg-red '
                        >
                          <Button type="danger" size="small" className="bg-red-500 hover:bg-red-600 text-white">
                            Delete
                          </Button>
                        </Popconfirm>
                      )}
                    />
                  </Table>
                </div>
              </div>
            )}
          </div>

          {/* View News */}
          <div className="items-center grid grid-cols-1 md:grid-cols-1 gap-4">
            {activeTab === 'viewNews' && (
                <div className="p-10">
                  <h2 className="text-2xl font-semibold mb-4">List of News</h2>
                  <div className="overflow-x-auto">
                    <Table dataSource={news} className="min-w-full">
                      <Table.Column title="Title" dataIndex="title" key="title" className="w-1/2 md:w-auto" />
                      <Table.Column title="Image name" dataIndex="nimage" key="nimage" className="w-1/4 md:w-auto" />
                      <Table.Column title="ID" dataIndex="id" key="id" className="w-1/4 md:w-auto" />
                      <Table.Column
                        title="Actions"
                        key="actions"
                        className="w-1/4 md:w-auto"
                        render={(text, record) => (
                          <span>
                            <Popconfirm
                              title="Are you sure you want to delete this news?"
                              onConfirm={() => handleNewsDelete(record.id)}
                              okText={<Button type="danger" size="small" className="text-black">Yes</Button>}
                              cancelText="No"
                            >
                              <Button type="danger" size="small" className="bg-red-500 hover:bg-red-600 text-white">
                                Delete
                              </Button>
                            </Popconfirm>
                            <Button
                              type="primary"
                              size="small"
                              className="bg-red-500 hover:bg-green-600 text-white ml-2"
                              onClick={() => handleEditNews(record)} // Open the edit popup
                            >
                              Edit
                            </Button>
                          </span>
                        )}
                      />
                    </Table>
                  </div>
                </div>
              )}
              
              <EditNewsPopup
                visible={editPopupVisible}
                onCancel={handleCancelEditPopup}
                onEdit={handleSaveEditedNews}
                newsData={editedNews}
              />
          </div>
        </div>
        ) : (
          <div className='flex texts-center'>
            <h1 className="texts-center text-3xl font-bold mb-14">You do not have permission to access this page.</h1>
          </div>
        )}
    </Helmet>
  );
};

export default AdminPage;
