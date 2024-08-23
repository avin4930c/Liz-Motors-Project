import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './comp/NavBar';
import HomePage from './Pages/HomePage/HomePage';
import CourseDetailsPage from './Pages/CourseDetailsPage/CourseDetailsPage';
import PresentationScreen from './Pages/PresentationScreen/PresentationScreen';
import Footer from './comp/Footer';

const AppRoutes = () => {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course" element={<CourseDetailsPage />} />
        <Route path="/presentation" element={<PresentationScreen />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default AppRoutes;