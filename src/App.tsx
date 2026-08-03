import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes.config";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
