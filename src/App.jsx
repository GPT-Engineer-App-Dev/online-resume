import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Quotes from "./pages/Quotes.jsx"; // Import the new Quotes page

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/quotes" element={<Quotes />} /> {/* Add route for Quotes page */}
      </Routes>
    </Router>
  );
}

export default App;
