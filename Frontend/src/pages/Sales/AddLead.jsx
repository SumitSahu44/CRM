import { useState } from 'react';

const AddLead = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    status: 'New',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await fetch('http://localhost:5000/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(data.message)
    // TODO: Send to backend API
  };



  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Add New Lead</h2>

 <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Full Name */}
  <div>
    <label className="block text-sm font-medium mb-1">Full Name</label>
    <input
      type="text"
      name="name"
      value={formData.name || ""}
      onChange={handleChange}
      required
      className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Email */}
  <div>
    <label className="block text-sm font-medium mb-1">Email</label>
    <input
      type="email"
      name="email"
      value={formData.email || ""}
      onChange={handleChange}
      required
      className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Phone */}
  <div>
    <label className="block text-sm font-medium mb-1">Phone</label>
    <input
      type="tel"
      name="phone"
      value={formData.phone || ""}
      onChange={handleChange}
      pattern="[0-9]{10}"
      title="Enter a 10-digit phone number"
      className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Company */}
  <div>
    <label className="block text-sm font-medium mb-1">Company</label>
    <input
      type="text"
      name="company"
      value={formData.company || ""}
      onChange={handleChange}
      className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Project Type */}
  <div>
    <label className="block text-sm font-medium mb-1">Project Type</label>
    <input
      type="text"
      name="projectType"
      value={formData.projectType || ""}
      onChange={handleChange}
      placeholder="e.g. Website, CRM, App"
      className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Budget */}
  <div>
    <label className="block text-sm font-medium mb-1">Estimated Budget</label>
    <input
      type="number"
      name="budget"
      value={formData.budget || ""}
      onChange={handleChange}
      min="0"
      className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Status */}
  <div>
    <label className="block text-sm font-medium mb-1">Status</label>
    <select
      name="status"
      value={formData.status || ""}
      onChange={handleChange}
      required
      className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Select Status</option>
      <option value="New">New</option>
      <option value="Interested">Interested</option>
      <option value="In Progress">In Progress</option>
      <option value="Converted">Converted</option>
    </select>
  </div>

  {/* Notes */}
  <div className="md:col-span-2">
    <label className="block text-sm font-medium mb-1">Notes</label>
    <textarea
      name="notes"
      value={formData.notes || ""}
      onChange={handleChange}
      rows="4"
      className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Submit Button */}
  <div className="md:col-span-2 flex justify-end">
    <button
      type="submit"
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
    >
      Submit Lead
    </button>
  </div>
</form>


    </div>
  );
};

export default AddLead;
