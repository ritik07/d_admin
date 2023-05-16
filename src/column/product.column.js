import { Button, Image } from "antd";
import { BASE_URL_ASSET } from "../constant";

export const productColumns = ({ handleEdit, handleDelete }) => {
  return [
    {
      title: "Id",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slug",
      dataIndex: "product_slug",
      key: "slug",
    },
    {
      title: "Image",
      dataIndex: "product_image",
      key: "image",
      render: (value) => {
        return (
          <div>
            <Image src={BASE_URL_ASSET + "/" + value} className="cs-img" />
          </div>
        );
      },
    },
    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (data, rowData) => {
        return (
          <div className="cs-dis-flex cs-jc-sb">
            {/* <Button type="primary" onClick={() => handleEdit(rowData)}>
              Edit
            </Button> */}
            <Button className="cs-lm-10" onClick={() => handleDelete(rowData.product_id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
};
