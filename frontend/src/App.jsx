import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageDresses from './pages/admin/ManageDresses';
import ManageGallery from './pages/admin/ManageGallery';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageReviews from './pages/admin/ManageReviews';
import AuthRoute from './components/AuthRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog/:id" element={<BlogDetail />} />

                <Route path="/nsr-portal-2026" element={<AdminLogin />} />
                <Route path="/nsr-portal-2026/dashboard" element={<AuthRoute><AdminDashboard /></AuthRoute>} />
                <Route path="/nsr-portal-2026/dresses" element={<AuthRoute><ManageDresses /></AuthRoute>} />
                <Route path="/nsr-portal-2026/gallery" element={<AuthRoute><ManageGallery /></AuthRoute>} />
                <Route path="/nsr-portal-2026/blogs" element={<AuthRoute><ManageBlogs /></AuthRoute>} />
                <Route path="/nsr-portal-2026/reviews" element={<AuthRoute><ManageReviews /></AuthRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
