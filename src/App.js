import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Main Pages
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import HaulWithRGM from "./pages/HaulWithRGM";

// Join RGM Pages
import ApplyToday from "./pages/joinRGM/ApplyToday";
import InexperiencedClassA from "./pages/joinRGM/InexperiencedClassA";
import ExperiencedDrivers from "./pages/joinRGM/ExperiencedDrivers";
import CurrentOpenings from "./pages/joinRGM/CurrentOpenings";
import Pay from "./pages/joinRGM/Pay";
import Equipment from "./pages/joinRGM/Equipment";
import Benefits from "./pages/joinRGM/Benefits";
import CDLSchools from "./pages/joinRGM/CDLSchools";

// Solutions
import Solutions from "./pages/solutions/Solutions";
import WhyRGM from "./pages/solutions/WhyRGM";

// Logistics
import LTL from "./pages/logistics/LTL";
import Truckload from "./pages/logistics/Truckload";
import LogisticsWhyRGM from "./pages/logistics/WhyRGM";
import WhoWeAre from "./pages/logistics/WhoWeAre";

// Company
import EmployeeOwnership from "./pages/company/EmployeeOwnership";
import CompanyBenefits from "./pages/company/Benefits";
import Responsibility from "./pages/company/Responsibility";
import Founder from "./pages/company/Founder";

// ✅ ADD THIS
import Haul from "./pages/Haul";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/HaulWithRGM" element={<HaulWithRGM />} />

        {/* Join RGM Pages */}
        <Route path="/join/apply" element={<ApplyToday />} />
        <Route path="/join/inexperienced" element={<InexperiencedClassA />} />
        <Route path="/join/experienced" element={<ExperiencedDrivers />} />
        <Route path="/join/openings" element={<CurrentOpenings />} />
        <Route path="/join/pay" element={<Pay />} />
        <Route path="/join/equipment" element={<Equipment />} />
        <Route path="/join/benefits" element={<Benefits />} />
        <Route path="/join/cdl-schools" element={<CDLSchools />} />

        {/* Solutions */}
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solutions/why-rgm" element={<WhyRGM />} />

        {/* Logistics */}
        <Route path="/logistics/ltl" element={<LTL />} />
        <Route path="/logistics/truckload" element={<Truckload />} />
        <Route path="/logistics/why-rgm" element={<LogisticsWhyRGM />} />
        <Route path="/logistics/who-we-are" element={<WhoWeAre />} />

        {/* Company */}
        <Route path="/company/employee-ownership" element={<EmployeeOwnership />} />
        <Route path="/company/benefits" element={<CompanyBenefits />} />
        <Route path="/company/responsibility" element={<Responsibility />} />
        <Route path="/company/founder" element={<Founder />} />

        {/* ✅ NEW HAUL ROUTE */}
        <Route path="/haul" element={<Haul />} />
      </Routes>
    </Router>
  );
}

export default App;
