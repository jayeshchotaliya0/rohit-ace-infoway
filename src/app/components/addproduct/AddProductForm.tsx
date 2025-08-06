'use client';
import React from 'react';
import { Form, Input, InputNumber, Button, Card, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type ProductType = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: ProductType) => {
    try {
      const res = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Failed to create product');
      const data = await res.json();
      console.log('Product added:', data);
      message.success('Product added with ID: ' + data.id);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Failed to add product');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
      <Card
        title="Add New Product"
        style={{ width: 500, boxShadow: '0px 10px 25px rgba(0,0,0,0.2)', borderRadius: 16 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0.1} step={0.1} />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input placeholder="e.g. electronics" />
          </Form.Item>

          <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
            <Input placeholder="http://example.com" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddProduct;
