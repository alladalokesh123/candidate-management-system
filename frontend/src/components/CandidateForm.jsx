import React, { useState, useEffect } from "react";

function CandidateForm({ onAdd, onUpdate, editingCandidate }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    current_status: "",
    resume_link: "",
  });

  useEffect(() => {
    if (editingCandidate) {
      setForm(editingCandidate);
    }
  }, [editingCandidate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCandidate) {
      onUpdate(editingCandidate.id, form);
    } else {
      onAdd(form);
    }
    setForm({
      name: "",
      email: "",
      phone_number: "",
      current_status: "",
      resume_link: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="phone_number"
        value={form.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <input
        name="current_status"
        value={form.current_status}
        onChange={handleChange}
        placeholder="Status"
      />
      <input
        name="resume_link"
        value={form.resume_link}
        onChange={handleChange}
        placeholder="Resume Link"
      />
      <button type="submit">
        {editingCandidate ? "Update" : "Add"} Candidate
      </button>
    </form>
  );
}

export default CandidateForm;

