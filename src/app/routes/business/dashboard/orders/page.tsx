import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Download, FileText, FileImage } from "lucide-react";
import { B, StatusBadge, ff, ffH } from "@/app/components/shared";
import { BIZ_ORDERS } from "@/app/data";

// File icon component based on file type
function FileIcon({ type }: { type: string }) {
  switch (type) {
    case "pdf":
      return <FileText className="w-5 h-5 text-red-500" />;
    case "jpg":
    case "png":
      return <FileImage className="w-5 h-5 text-blue-500" />;
    default:
      return <FileText className="w-5 h-5 text-gray-500" />;
  }
}

export function BusinessOrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = BIZ_ORDERS[0];
  
  // If order not found, redirect to dashboard
  if (!order) {
    navigate("/business/dashboard");
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/business/dashboard")} 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800" style={ffH}>Order Details</h1>
            <p className="text-gray-500 text-sm" style={ff}>Order ID: {order.id} · {order.date}</p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1" style={ff}>Customer</p>
            <p className="font-medium text-gray-800" style={ffH}>{order.customer}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1" style={ff}>Service</p>
            <p className="font-medium text-gray-800" style={ffH}>{order.service}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1" style={ff}>Amount</p>
            <p className="font-bold text-gray-800 text-lg" style={ffH}>₱{order.amount}</p>
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Uploaded Files</h3>
        <div className="space-y-3">
          {order.files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div className="flex items-center gap-3">
                <FileIcon type={file.type} />
                <div>
                  <p className="font-medium text-gray-800" style={ff}>{file.name}</p>
                  <p className="text-xs text-gray-500" style={ff}>{file.size}</p>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors" style={ff}>
                <Download size={14} />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Order Specifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border border-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1" style={ff}>Color</p>
            <p className="font-medium text-gray-800" style={ffH}>{order.specifications.color}</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1" style={ff}>Sides</p>
            <p className="font-medium text-gray-800" style={ffH}>{order.specifications.sides}</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1" style={ff}>Copies</p>
            <p className="font-medium text-gray-800" style={ffH}>{order.specifications.copies}</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1" style={ff}>Paper Size</p>
            <p className="font-medium text-gray-800" style={ffH}>{order.specifications.paperSize}</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1" style={ff}>Binding</p>
            <p className="font-medium text-gray-800" style={ffH}>{order.specifications.binding}</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1" style={ff}>Laminating</p>
            <p className="font-medium text-gray-800" style={ffH}>{order.specifications.laminating ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>

      {/* Payment & Delivery Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Payment Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Payment Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-600" style={ff}>Payment Method</p>
              <p className="font-medium text-gray-800" style={ffH}>{order.paymentDetails.method}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600" style={ff}>Payment Status</p>
              <p className="font-medium text-gray-800" style={ffH}>{order.paymentDetails.status}</p>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between font-medium text-gray-800 mb-2" style={ffH}>
                <span>Total</span>
                <span>₱{order.paymentDetails.total}</span>
              </div>
              <div className="space-y-2">
                {order.paymentDetails.breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <p className="text-gray-600" style={ff}>{item.item}</p>
                    <p className="text-gray-800" style={ffH}>₱{item.cost}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Delivery Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-600" style={ff}>Type</p>
              <p className="font-medium text-gray-800" style={ffH}>{order.delivery.type}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600" style={ff}>Schedule</p>
              <p className="font-medium text-gray-800" style={ffH}>{order.delivery.schedule}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600" style={ff}>Location</p>
              <p className="font-medium text-gray-800" style={ffH}>{order.delivery.location}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600" style={ff}>Queue Number</p>
              <p className="font-bold text-lg text-[#1B7FFD]" style={ffH}>{order.delivery.queueNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}