import { Button, Image } from "antd";
import { BASE_URL_ASSET } from "../constant";

export const categoryColumns = ({ handleEdit, handleDelete }) => {
  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
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
      title: "Short Description",
      dataIndex: "short_description",
      key: "short_description",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
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
            <Button className="cs-lm-10" onClick={() => handleDelete(rowData.id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
};
