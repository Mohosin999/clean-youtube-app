import ReactDOM from "react-dom/client";
import { StoreProvider } from "easy-peasy";
import store from "./store-easyPeasy";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
