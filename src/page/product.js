import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";
import { Table, Card, Button } from "antd";
import { productColumns } from "../column/product.column";
import ProductModal from "../component/product/product.modal";

const Product = () => {
  const [tableData, setTableData] = useState([]);
  const [rowData, setRowData] = useState({});
  const [categoryData, setCategoryData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      getData();
      getCategoryData();
      setRowData({});
    }
  }, [isModalOpen]);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const getCategoryData = async () => {
    let response = await axios.get(BASE_URL + "category/get");
    setCategoryData(response.data.data);
  };

  const getData = async () => {
    let response = await axios.get(BASE_URL + `product/get`);
    setTableData(response.data.data);
  };

  const handleEdit = (rowData) => {
    setIsModalOpen(true);
    setRowData(rowData);
  };

  const handleDelete = async (id) => {
    let response = await axios.delete(BASE_URL + `product/delete/${id}`);
    if (response) {
      getData();
    }
  };

  return (
    <div>
      <Card>
        <div className="cs-dis-flex js-content-f-end">
          <Button onClick={handleAdd}>Add Product</Button>
        </div>
      </Card>

      <Table
        dataSource={tableData}
        columns={productColumns({ handleEdit, handleDelete })}
      />
      {isModalOpen ? (
        <ProductModal
          categoryData={categoryData}
          rowData={rowData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : null}
    </div>
  );
};

export default Product;
