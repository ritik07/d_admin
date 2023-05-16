import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";
import { Table, Card, Button } from "antd";
import { categoryColumns } from "../column/category.column";
import CategoryModal from "../component/category/category.modal";

const Category = () => {
  const [tableData, setTableData] = useState([]);
  const [rowData, setRowData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      getData();
      setRowData({});
    }
  }, [isModalOpen]);

  const handleAddCategory = () => {
    setIsModalOpen(true);
  };

  const getData = async () => {
    let response = await axios.get(BASE_URL + "category/get");
    setTableData(response.data.data);
  };

  const handleEdit = (rowData) => {
    setIsModalOpen(true);
    setRowData(rowData);
  };

  const handleDelete = async (id) => {
    let response = await axios.delete(BASE_URL + `category/delete/${id}`);
    if (response) {
      getData();
    }
  };

  return (
    <div>
      <Card>
        <div className="cs-dis-flex js-content-f-end">
          <Button onClick={handleAddCategory}>Add Category</Button>
        </div>
      </Card>

      <Table
        dataSource={tableData}
        columns={categoryColumns({ handleEdit, handleDelete })}
      />
      {isModalOpen ? (
        <CategoryModal
          rowData={rowData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : null}
    </div>
  );
};

export default Category;
