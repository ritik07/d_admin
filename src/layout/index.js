import {
  PieChartOutlined,
  PieChartFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Users", "/", <UserOutlined />),
  getItem("Category", "/category", <PieChartOutlined />),
  getItem("Product", "/product", <PieChartFilled />),
  // getItem("User", "sub1", <UserOutlined />, [
  //   getItem("Tom", "3"),
  //   getItem("Bill", "4"),
  //   getItem("Alex", "5"),
  // ]),
  // getItem("Team", "sub2", <UserOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];
const LayoutWrapper = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const onClickMenu = (e) => {
    navigate(e.key);
    console.log("click ", e);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            // height: 32,
            margin: 16,
            // background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <div
            className="cs-dis-flex cs-hrz-center cs-vt-center"
            style={{ fontWeight: 600, color: "#fff" }}
          >
            Doggiesthan Admin
          </div>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          onClick={onClickMenu}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "16px 16px",
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutWrapper;
