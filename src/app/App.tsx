import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import NewsPage from "../pages/NewsPage/ui/NewsPage";

import "antd/dist/reset.css";
import "./App.scss";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NewsPage />
    </Provider>
  );
};

export default App;
