import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./components/Sidebar.jsx"; // Import the new Sidebar component
import Navbar from "./components/Navbar.jsx"; // Import the new Navbar component
import Index from "./pages/Index.jsx";
import Quotes from "./pages/Quotes.jsx"; // Import the new Quotes page
import Canvas from "./pages/Canvas.jsx"; // Import the new Canvas page
import Articles from "./pages/Articles.jsx"; // Import the new Articles page

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <Navbar />
      <Box>
        <IconButton
          icon={<FaBars />}
          onClick={toggleSidebar}
          variant="outline"
          aria-label="Open Sidebar"
          position="fixed"
          top="1rem"
          left="1rem"
          zIndex="1000"
        />
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/quotes" element={<Quotes />} /> {/* Add route for Quotes page */}
          <Route path="/canvas" element={<Canvas />} /> {/* Add route for Canvas page */}
          <Route path="/articles" element={<Articles />} /> {/* Add route for Articles page */}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;