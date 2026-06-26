import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Dashboard() {

  const [inventoryStats,
    setInventoryStats] =
    useState(null);

  const [analytics,
    setAnalytics] =
    useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData =
    async () => {
      try {

        const [
          inventoryRes,
          analyticsRes
        ] = await Promise.all([
          api.get(
            "/products/inventory/stats"
          ),
          api.get(
            "/products/analytics"
          )
        ]);

        setInventoryStats(
          inventoryRes.data
        );

        setAnalytics(
          analyticsRes.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const cardStyle =
    "flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-500 hover:-translate-y-1 transition-all duration-200 group";

  const iconWrapperStyle =
    "p-4 rounded-full mb-4 transition-colors duration-200 text-3xl";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Chemist Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Manage your inventory, monitor products, track revenue and fulfill customer orders.
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <div className="bg-white rounded-xl shadow-sm border p-5">
            <p className="text-slate-500 text-sm">
              Total Products
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {
                inventoryStats?.totalProducts || 0
              }
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-5">
            <p className="text-slate-500 text-sm">
              Total Orders
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {
                analytics?.totalOrders || 0
              }
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-5">
            <p className="text-slate-500 text-sm">
              Revenue
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-600">
              ₹{
                analytics?.totalRevenue || 0
              }
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-5">
            <p className="text-slate-500 text-sm">
              Low Stock
            </p>

            <h2 className="text-3xl font-bold mt-2 text-red-600">
              {
                inventoryStats?.lowStock || 0
              }
            </h2>
          </div>

        </div>

        {/* Action Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Products */}

          <Link
            to="/chemist/products"
            className="no-underline"
          >
            <div className={cardStyle}>
              <div className={`${iconWrapperStyle} bg-blue-50 text-blue-600`}>
                📦
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Manage Products
              </h2>

              <p className="mt-2 text-sm text-slate-500 text-center">
                View, update and remove medicines from inventory.
              </p>
            </div>
          </Link>

          {/* Add Product */}

          <Link
            to="/chemist/add-product"
            className="no-underline"
          >
            <div className={cardStyle}>
              <div className={`${iconWrapperStyle} bg-emerald-50 text-emerald-600`}>
                ➕
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Add Product
              </h2>

              <p className="mt-2 text-sm text-slate-500 text-center">
                Add medicines and healthcare products.
              </p>
            </div>
          </Link>

          {/* Orders */}

          <Link
            to="/chemist/orders"
            className="no-underline"
          >
            <div className={cardStyle}>
              <div className={`${iconWrapperStyle} bg-purple-50 text-purple-600`}>
                📋
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Orders
              </h2>

              <p className="mt-2 text-sm text-slate-500 text-center">
                Process and manage incoming orders.
              </p>
            </div>
          </Link>

          {/* Inventory */}

          <Link
            to="/chemist/inventory"
            className="no-underline"
          >
            <div className={cardStyle}>
              <div className={`${iconWrapperStyle} bg-orange-50 text-orange-600`}>
                🏪
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Inventory
              </h2>

              <p className="mt-2 text-sm text-slate-500 text-center">
                Monitor stock levels and inventory health.
              </p>
            </div>
          </Link>

          {/* Analytics */}

          <Link
            to="/chemist/analytics"
            className="no-underline"
          >
            <div className={cardStyle}>
              <div className={`${iconWrapperStyle} bg-indigo-50 text-indigo-600`}>
                📊
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Analytics
              </h2>

              <p className="mt-2 text-sm text-slate-500 text-center">
                Revenue, sales and business insights.
              </p>
            </div>
          </Link>

          {/* Expiry */}

          <Link
            to="/chemist/expiry"
            className="no-underline"
          >
            <div className={cardStyle}>
              <div className={`${iconWrapperStyle} bg-red-50 text-red-600`}>
                ⏰
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Expiry Alerts
              </h2>

              <p className="mt-2 text-sm text-slate-500 text-center">
                Track medicines expiring within 30 days.
              </p>
            </div>
          </Link>

          {/* Notifications */}

          <Link
            to="/notifications"
            className="no-underline"
          >
            <div className={cardStyle}>
              <div className={`${iconWrapperStyle} bg-yellow-50 text-yellow-600`}>
                🔔
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Notifications
              </h2>

              <p className="mt-2 text-sm text-slate-500 text-center">
                Order updates and important alerts.
              </p>
            </div>
          </Link>

        </div>

      </div>
    </div>
  );
}