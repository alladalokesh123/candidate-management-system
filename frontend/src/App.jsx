import React, { useState, useEffect } from "react";
import CandidateList from "./components/CandidateList";
import CandidateForm from "./components/CandidateForm";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [editingCandidate, setEditingCandidate] = useState(null);

  // Fetch candidates
  const fetchCandidates = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/candidates");
      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Add candidate (CREATE)
  const handleAdd = async (candidate) => {
    await fetch("http://localhost:5000/api/candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidate),
    });
    fetchCandidates();
  };

  // Update candidate (UPDATE)
  const handleUpdate = async (id, updatedCandidate) => {
    await fetch(`http://localhost:5000/api/candidates/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCandidate),
    });
    setEditingCandidate(null);
    fetchCandidates();
  };

  // Delete candidate (DELETE)
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/candidates/${id}`, {
      method: "DELETE",
    });
    fetchCandidates();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Candidate Management System</h1>
      <CandidateForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingCandidate={editingCandidate}
      />

      <CandidateList
        candidates={candidates}
        onEdit={setEditingCandidate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;

