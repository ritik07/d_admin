import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";
import { userColumns } from "../column/user.column";
import { Table } from "antd";

const User = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    let response = await axios.get(BASE_URL + "user/get");
    setTableData(response.data.data);
  };

  return (
    <div>
      <Table dataSource={tableData} columns={userColumns} />
    </div>
  );
};

export default User;
