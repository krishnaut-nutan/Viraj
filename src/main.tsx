import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";
import AuthProvider from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";

const docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come Back 😛";
});
window.addEventListener("focus", () => {
  document.title = docTitle;
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </HashRouter>
);
