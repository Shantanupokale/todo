import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div>
      {/* Global Toaster for notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "8px", // Make the text smaller
            padding: "8px 10px", // Reduce padding
            minWidth: "180px", // Reduce the minimum width
          },
        }}
      />

      {/* Use Routes from AppRoutes */}
      <AppRoutes />
    </div>
  );
}

export default App;
