import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Upload, Input, InputNumber, Select } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constant";

const ProductModal = ({
  isModalOpen,
  setIsModalOpen,
  rowData,
  categoryData,
}) => {
  const [form] = Form.useForm();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [slugValue, setSlugValue] = useState("");

  useEffect(() => {
    if (Object.keys(rowData).length) {
      form.setFieldsValue({ ...rowData });
    }
  }, [rowData]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    formData.append("image", image);
    return formData;
  }
  const onCreate = async (value) => {
    let payload = getFormData(value);
    let response = await axios.post(BASE_URL + "product/create", payload);
    if (response) {
      handleOk();
    }
  };

  const handleOk = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createSlug = (value) => {
    let slug = value.replace(" ", "-");
    console.log("first", form.getFieldsValue());
    form.setFieldsValue({ slug: slug });
    setSlugValue(slug);
  };

  const updateSlug = () => {
    let slug = slugValue;
    slug = slug + "-" + form.getFieldValue("category_id");
    form.setFieldsValue({ slug: slug });
    setSlugValue(slug);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              // form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          encType="multipart/form-data"
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item label="Product name" name="name" required>
            <Input
              placeholder="Product name"
              onChange={(e) => createSlug(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Category of product" name="category_id" required>
            <Select
              placeholder="Select category of product"
              onChange={() => updateSlug()}
            >
              {categoryData.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Slug" name="slug">
            <Input placeholder="Slug" value={slugValue} disabled />
          </Form.Item>

          <Form.Item
            label="Short description"
            name="short_description"
            required
          >
            <Input.TextArea placeholder="Short description" />
          </Form.Item>

          <Form.Item label="Description" name="description" required>
            <Input.TextArea placeholder="Description" />
          </Form.Item>

          <Form.Item label="MRP" name="mrp" required>
            <Input type="number" placeholder="Enter MRP" />
          </Form.Item>

          <Form.Item label="Price" name="price" required>
            <Input
              type="number"
              placeholder="Enter discounted price on which you want to sell"
            />
          </Form.Item>

          <div>
            <input type="file" onChange={handleImageChange} />
            {imagePreview && (
              <img className="cs-img" src={imagePreview} alt="Uploaded image" />
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ProductModal;
