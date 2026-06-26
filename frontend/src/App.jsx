import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/user/Home";
import ProductDetails from "./pages/user/ProductDetails";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import MyOrders from "./pages/user/MyOrders";
import TrackOrder from "./pages/user/TrackOrder";

import Dashboard from "./pages/chemist/Dashboard";
import Products from "./pages/chemist/Products";
import Orders from "./pages/chemist/Orders";
import AddProduct from "./pages/chemist/AddProduct";
import EditProduct from "./pages/chemist/EditProduct";

import ProtectedRoute from "./routes/ProtectedRoute";
import ChemistLogin from "./pages/chemist/Login";
import AdminLogin from "./pages/admin/Login";
import DeliveryLogin from "./pages/delivery/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Chemists from "./pages/admin/Chemists";
import Stats from "./pages/admin/Stats";
import AdminOrders from "./pages/admin/Orders";
import DeliveryBoys from "./pages/admin/DeliveryBoys";
import AssignDelivery from "./pages/admin/AssignDelivery";
import DeliveryDashboard from "./pages/delivery/Dashboard";

import DeliveryOrders from "./pages/delivery/Orders";

import Notifications from "./pages/Notifications";

import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Inventory from "./pages/chemist/Inventory";
import Analytics from "./pages/chemist/Analytics";
import ExpiryProducts from "./pages/chemist/ExpiryProducts";
import Coupons from "./pages/admin/Coupons";
import CreateCoupon from "./pages/admin/CreateCoupon";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* User Routes */}

          <Route
            path="/"
            element={
              <ProtectedRoute role="user">
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedRoute role="user">
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute role="user">
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute role="user">
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute role="user">
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/track/:orderId"
            element={
              <ProtectedRoute role="user">
                <TrackOrder />
              </ProtectedRoute>
            }
          />

          {/* Chemist Routes */}

          <Route
            path="/chemist"
            element={
              <ProtectedRoute role="chemist">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chemist/products"
            element={
              <ProtectedRoute role="chemist">
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chemist/orders"
            element={
              <ProtectedRoute role="chemist">
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chemist/add-product"
            element={
              <ProtectedRoute role="chemist">
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chemist/edit-product/:id"
            element={
              <ProtectedRoute role="chemist">
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/chemist/login" element={<ChemistLogin />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/delivery/login" element={<DeliveryLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/chemists"
            element={
              <ProtectedRoute role="admin">
                <Chemists />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/stats"
            element={
              <ProtectedRoute role="admin">
                <Stats />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute role="admin">
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/delivery-boys"
            element={
              <ProtectedRoute role="admin">
                <DeliveryBoys />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders/:orderId/assign"
            element={
              <ProtectedRoute role="admin">
                <AssignDelivery />
              </ProtectedRoute>
            }
          />

          <Route
            path="/delivery"
            element={
              <ProtectedRoute role="deliveryBoy">
                <DeliveryDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/delivery/orders"
            element={
              <ProtectedRoute role="deliveryBoy">
                <DeliveryOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chemist/inventory"
            element={
              <ProtectedRoute role="chemist">
                <Inventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chemist/analytics"
            element={
              <ProtectedRoute role="chemist">
                <Analytics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chemist/expiry"
            element={
              <ProtectedRoute role="chemist">
                <ExpiryProducts />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/coupons" element={<Coupons />} />

          <Route path="/admin/create-coupon" element={<CreateCoupon />} />

          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
