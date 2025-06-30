import React, { useEffect, useState } from 'react';
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const dummyLeads = [
  {
    id: "LD-1001",
    date: "28-06-2025",
    source: "Justdial",
    businessName: "ABC Corp",
    clientName: "John Doe",
    contactNumber: "+91 9876543210",
    requirement: "Looking for CRM software with mobile app",
    status: "New",
    remark: "Interested in demo",
    followupDate: "30-06-2025",
  },
  {
    id: "LD-1002",
    date: "28-06-2025",
    source: "Justdial",
    businessName: "ABC Corp",
    clientName: "John Doe",
    contactNumber: "+91 9876543210",
    requirement: "Looking for CRM software with mobile app",
    status: "New",
    remark: "Interested in demo",
    followupDate: "30-06-2025",
  },
  {
    id: "LD-1003",
    date: "28-06-2025",
    source: "Justdial",
    businessName: "ABC Corp",
    clientName: "John Doe",
    contactNumber: "+91 9876543210",
    requirement: "Looking for CRM software with mobile app",
    status: "New",
    remark: "Interested in demo",
    followupDate: "30-06-2025",
  },
  {
    id: "LD-1004",
    date: "28-06-2025",
    source: "Justdial",
    businessName: "ABC Corp",
    clientName: "John Doe",
    contactNumber: "+91 9876543210",
    requirement: "Looking for CRM software with mobile app",
    status: "New",
    remark: "Interested in demo",
    followupDate: "25-06-2024",
  },
];

const ViewLeads = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
    const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);


  const [formData, setFormData] = useState({
    leadId: "",
    date: "",
    source: "",
    businessName: "",
    clientName: "",
    contactNumber: "",
    requirement: "",
    leadStatus: "",
    remark: "",
    followupDate: "",
  });

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const handleSubmit = async(e) => {
    e.preventDefault();

    if (
  !formData.leadId ||
  !formData.date ||
  !formData.source ||
  !formData.businessName ||
  !formData.clientName
) {
  alert("Please fill all required fields: Lead ID, Date, Source, Business Name, Client Name");
  return;
}

    if (isEditMode) {
      // Update existing lead
      console.log("Updated lead:", formData);
    } else {
      // Add new lead
      console.log("New lead:", formData);
      // Optionally, add to dummyLeads (in a real app, this would be an API call)
      const response = await fetch('http://localhost:5000/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(data.message)
    }
    setShowModal(false);
    setIsEditMode(false);
    setFormData({
      leadId: "",
      date: "",
      source: "",
      businessName: "",
      clientName: "",
      contactNumber: "",
      requirement: "",
      leadStatus: "",
      remark: "",
      followupDate: "",
    });
  };

  const handleEdit = (leadId) => {
    const leadToEdit = leads.find((lead) => lead.LID === leadId);
    if (leadToEdit) {
      setFormData({
        leadId: leadToEdit.LID,
        date: leadToEdit.Date,
        source: leadToEdit.Source,
        businessName: leadToEdit.BusinessName,
        clientName: leadToEdit.ClientName,
        contactNumber: leadToEdit.ContactNumber,
        requirement: leadToEdit.Requirement,
        leadStatus: leadToEdit.LeadStatus,
        remark: leadToEdit.Remark,
        followupDate: leadToEdit.FollowUpDate,
      });
      setIsEditMode(true);
      setShowModal(true);
    }
  };

  const handleDelete = (leadId) => {
    console.log("Delete lead:", leadId);
    // In a real app, remove from dummyLeads or make an API call
    // For now, just log the action
  };


  const fetchLeads = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/leads'); // Your backend endpoint
      const data = await response.json();

      if (response.ok) {
        setLeads(data); // Set fetched leads into state
      } else {
        alert(data.message || "Failed to fetch leads");
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      alert("Something went wrong while fetching leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(); // Fetch on component mount
  }, []);


const formatDateForInput = (isoDate) => {
  if (!isoDate) return '';
  return new Date(isoDate).toISOString().split('T')[0]; // gives 'YYYY-MM-DD'
};


  return (
   <div className="border py-4 px-1 w-[100%]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Leads</h2>
        <div className="flex gap-4">
          <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
            Filter
          </button>
          <button
            onClick={() => {
              setIsEditMode(false);
              setFormData({
                leadId: "",
                date: "",
                source: "",
                businessName: "",
                clientName: "",
                contactNumber: "",
                requirement: "",
                leadStatus: "",
                remark: "",
                followupDate: "",
              });
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Lead
          </button>
        </div>
      </div>

     <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remark</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Follow-up</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan="12" className="text-center py-4 text-gray-500">
                Loading leads...
              </td>
            </tr>
          ) : leads.length === 0 ? (
            <tr>
              <td colSpan="12" className="text-center py-4 text-gray-500">
                No leads found.
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{lead.LID}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{formatDateForInput(lead.Date)}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{lead.Source}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{lead.BusinessName}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{lead.ClientName}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{lead.ContactNumber}</td>
                <td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">{lead.Requirement}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      lead.LeadStatus === "No Response"
                        ? "bg-blue-100 text-blue-800"
                        : lead.status === "Closed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {lead.LeadStatus}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">{lead.Remark}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{formatDateForInput(lead.FollowUpDate)}</td>
                <td className="px-4 py-2 flex whitespace-nowrap text-sm font-medium">
                  <a href={`tel:${lead.contactNumber}`} className="text-green-600 hover:text-green-800 mr-3" title="Call">
                    <FiPhone size={18} />
                  </a>
                  <a
                    href={`https://wa.me/${lead.contactNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-700"
                    title="WhatsApp"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEdit(lead.LID)} className="text-blue-600 hover:text-blue-900 mr-3">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(lead.LID)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full mx-auto bg-white rounded-xl shadow-xl my-8">
            <button
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10"
              onClick={() => setShowModal(false)}
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 sticky top-0 z-10">
              <h1 className="text-2xl font-bold text-white">{isEditMode ? "Edit Lead" : "Add New Lead"}</h1>
              <p className="text-blue-100 text-sm">
                {isEditMode ? "Update the lead details" : "Fill in the details to create a new lead"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-gray-700 font-medium md:col-span-1">
                  Lead ID <span className="text-red-500">*</span>
                </label>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    name="leadId"
                    value={formData.leadId}
                    onChange={handleChange}
                    placeholder="Enter Lead ID"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    disabled={isEditMode} // Disable Lead ID in edit mode
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-gray-700 font-medium md:col-span-1">Date</label>
                <div className="md:col-span-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                 <input
                    type="date"
                    name="date"
                    value={formatDateForInput(formData.date)}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-gray-700 font-medium md:col-span-1">
                  Lead Source <span className="text-red-500">*</span>
                </label>
                <div className="md:col-span-2 relative">
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option value="">Select Lead Source</option>
                    <option value="Justdial">Justdial</option>
                    <option value="IndiaMart">IndiaMart</option>
                    <option value="Referral">Referral</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-gray-700 font-medium md:col-span-1">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Enter business name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-gray-700 font-medium md:col-span-1">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <div className="md:col-span-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Enter client name"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-gray-700 font-medium md:col-span-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <div className="md:col-span-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <label className="text-gray-700 font-medium md:col-span-1">
                  Requirement <span className="text-red-500">*</span>
                </label>
                <div className="md:col-span-2">
                  <textarea
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="Describe the requirement"
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-gray-700 font-medium md:col-span-1">
                  Lead Status <span className="text-red-500">*</span>
                </label>
                <div className="md:col-span-2 relative">
                  <select
                    name="leadStatus"
                    value={formData.leadStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option value="">Select Status</option>
                    <option value="No Response (NR)">No Response (NR)</option>
                    <option value="Call Back">Call Back</option>
                    <option value="No">No</option>
                    <option value="Closed">Closed</option>
                    <option value="High Interested">High Interested</option>
                    <option value="Medium Interested">Medium Interested</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <label className="text-gray-700 font-medium md:col-span-1">Remark</label>
                <div className="md:col-span-2">
                  <textarea
                    name="remark"
                    value={formData.remark}
                    onChange={handleChange}
                    placeholder="Enter any remarks"
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-gray-700 font-medium md:col-span-1">Follow-up Date</label>
                <div className="md:col-span-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="date"
                    name="followupDate"
                    value={formatDateForInput(formData.followupDate)}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end space-x-3 sticky bottom-0 bg-white pb-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {isEditMode ? "Update Lead" : "Save Lead"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewLeads;