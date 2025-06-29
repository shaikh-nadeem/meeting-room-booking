import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Header from '../components/Header';

import PrivateRoute from '../components/PrivateRoute';
import GuestRoute from '../components/GuestRoute';

import Dashboard from '../pages/Dashboard';
import BookMeeting from '../pages/BookMeeting';
import Subscription from '../pages/Subscription';

export default function AppRouter(){
    return (
        <Router>
            <Header />
        <Routes>
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
            {/* Public (guests only) */}
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />

            {/* Private (logged in only) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/book"
          element={
            <PrivateRoute>
              <BookMeeting />
            </PrivateRoute>
          }
        />
        <Route
          path="/book-meeting"
          element={
            <PrivateRoute>
              <BookMeeting />
            </PrivateRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <PrivateRoute>
              <Subscription />
            </PrivateRoute>
          }
        />
        </Routes>
        </Router>
    );
}