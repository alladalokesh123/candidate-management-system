import React from "react";

function CandidateList({ candidates, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Resume</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone_number}</td>
            <td>{c.current_status}</td>
            <td>
              <a href={c.resume_link} target="_blank" rel="noreferrer">
                View
              </a>
            </td>
            <td>
              <button onClick={() => onEdit(c)}>Edit</button>
              <button onClick={() => onDelete(c.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CandidateList;
