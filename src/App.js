import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "./layout";
import "./static/style/main.css";
import User from "./page/user";
import Category from "./page/category";
import Product from "./page/product";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route index element={<User />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
