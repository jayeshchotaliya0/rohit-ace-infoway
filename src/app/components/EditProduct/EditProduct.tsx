'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Form, Input, InputNumber, Button, Card, message, Spin } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';

type ProductType = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const EditProduct: React.FC = () => {
  const { id } = useParams(); // Get ID from URL
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        form.setFieldsValue(data); // Fill the form
      } catch (err) {
        message.error('Failed to fetch product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Submit updated data
  const onFinish = async (values: ProductType) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      message.success('Product updated successfully!');
      router.push('/');
    } catch (err) {
      message.error('Failed to update product.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <Card
        title="Edit Product"
        style={{
          width: 500,
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.2)',
          borderRadius: 16,
          transform: 'perspective(1000px) rotateX(1deg)',
        }}
      >
        {loading ? (
          <Spin />
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ price: 0.1 }}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter the product title' }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price ($)"
              rules={[{ required: true, message: 'Please enter a valid price' }]}
            >
              <InputNumber style={{ width: '100%' }} min={0.1} step={0.1} />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter a description' }]}
            >
              <Input.TextArea rows={3} placeholder="Enter product description" />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please enter the category' }]}
            >
              <Input placeholder="e.g., electronics, clothing" />
            </Form.Item>

            <Form.Item
              name="image"
              label="Image URL"
              rules={[{ required: true, message: 'Please enter an image URL' }]}
            >
              <Input placeholder="http://example.com/image.jpg" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} block>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default EditProduct;
