"use client";

import { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";

const { Meta } = Card;

export default function Home() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProduct(json))
      .catch((err) => console.error("fetch error:", err));
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col
            key={product.id}
            xs={24}
            sm={12}
            md={8}
          >
            <Card
              hoverable
              cover={
                <img
                  alt={product.title}
                  src={product.image}
                  style={{ height: 250, objectFit: "contain" }}
                />
              }
            >
              <Meta
                title={product.title}
                description={`$${product.price}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
