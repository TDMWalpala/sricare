import LoginForm from './pages/Common/Login';
import SignUpForm from './pages/Common/SignUp';
import Services from './pages/Common/Services';
import Dashboard from './pages/Common/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
   

    <Router>
     <Routes>
               <Route path="/"  />
                {/*Public router */}
                {/* <Route path="/" element={} /> */}
                {/* <Route path="/contact-us" element={</>} /> */}
                <Route path="login" element={<LoginForm />} />
                <Route path="signup" element={<SignUpForm />} />
                <Route path ="services"  element={<Services />} />
                {/* <Route path  = "dashboard" element={<Dashboard />} /> */}
                {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

    </Routes>
      </Router>
  );
}

export default App;
