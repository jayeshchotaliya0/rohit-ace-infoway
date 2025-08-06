// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function Home() {
//   const [products, setProduct] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [deleteId, setDeleteId] = useState<number | null>(null);
//   const [toast, setToast] = useState("");

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((res) => res.json())
//       .then((json) => setProduct(json))
//       .catch((err) => console.error("fetch error:", err));
//   }, []);

//   const confirmDelete = (id: number) => {
//     setDeleteId(id);
//     setShowModal(true);
//   };

//   const handleDelete = () => {
//     if (deleteId === null) return;

//     fetch(`https://fakestoreapi.com/products/${deleteId}`, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then(() => {
//         const updatedProducts = products.filter((product) => product.id !== deleteId);
//         setProduct(updatedProducts);
//         setToast("Product deleted successfully");
//       })
//       .catch(() => {
//         setToast("Failed to delete product");
//       })
//       .finally(() => {
//         setShowModal(false);
//         setDeleteId(null);
//         setTimeout(() => setToast(""), 3000);
//       });
//   };

//   // 👉 Filter products based on search query
//   const filteredProducts = products.filter((product: any) =>
//     product.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       {/* ✅ Toast */}
//       {toast && (
//         <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
//           {toast}
//         </div>
//       )}

//       {/* ✅ Delete Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
//           <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//             <h2 className="text-lg font-semibold mb-4">
//               Are you sure you want to delete this product?
//             </h2>
//             <p className="mb-6 text-sm text-gray-600">This action cannot be undone.</p>
//             <div className="flex justify-end space-x-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-600 text-white rounded"
//                 onClick={handleDelete}
//               >
//                 Yes, Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ✅ Top Controls (Search + Add Product) */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by product title..."
//           className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <Link
//           href="/Add_product"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Add Product
//         </Link>
//       </div>

//       {/* ✅ Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product: any) => (
//             <div
//               key={product.id}
//               className="rounded shadow-sm hover:shadow-md transition duration-300"
//             >
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-64 object-contain p-4"
//               />
//               <div className="p-4">
//                 <h3 className="font-semibold text-lg truncate">{product.title}</h3>
//                 <p className="text-gray-700 mt-1">${product.price}</p>
//                 <div className="flex justify-between mt-4">
//                   <Link
//                     href={`/Edit/${product.id}`}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => confirmDelete(product.id)}
//                     className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-full text-center">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input, Button, Modal, message, Card, Row, Col } from "antd";
const { Search } = Input;

export default function Home() {
  const [products, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProduct(json))
      .catch((err) => console.error("fetch error:", err));
  }, []);

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (deleteId === null) return;

    fetch(`https://fakestoreapi.com/products/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedProducts = products.filter((product) => product.id !== deleteId);
        setProduct(updatedProducts);
        message.success("Product deleted successfully");
      })
      .catch(() => {
        message.error("Failed to delete product");
      })
      .finally(() => {
        setShowModal(false);
        setDeleteId(null);
      });
  };

  const filteredProducts = products.filter((product: any) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* ✅ Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={showModal}
        onOk={handleDelete}
        onCancel={() => setShowModal(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this product?</p>
        <p className="text-gray-500 text-sm">This action cannot be undone.</p>
      </Modal>

      {/* ✅ Top Controls (Search + Add) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Search
          placeholder="Search by product title"
          allowClear
          enterButton="Search"
          size="middle"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2"
        />

        <Link href="/Add_product">
          <Button type="primary">Add Product</Button>
        </Link>
      </div>

      {/* ✅ Product Grid */}
      <Row gutter={[16, 16]}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.title}
                    src={product.image}
                    style={{ height: "250px", objectFit: "contain", padding: "1rem" }}
                  />
                }
                actions={[
                  <Link href={`/Edit/${product.id}`} key="edit">
                    <Button type="link">Edit</Button>
                  </Link>,
                  <Button
                    type="link"
                    danger
                    onClick={() => confirmDelete(product.id)}
                    key="delete"
                  >
                    Delete
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={<span className="truncate">{product.title}</span>}
                  description={`$${product.price}`}
                />
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <p className="text-gray-500 text-center">No products found.</p>
          </Col>
        )}
      </Row>
    </div>
  );
}
