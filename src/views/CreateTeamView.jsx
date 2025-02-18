// src/components/TeamView.js
import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

const TeamView = () => {
  const [teams, setTeams] = useState([]);
  const [persons, setPersons] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [selectedPersons, setSelectedPersons] = useState([]);
  const [newTeam, setNewTeam] = useState({
    name: "",
    startDate: "",
    endDate: "",
    state: true,
  });
  const [teamLeader, setTeamLeader] = useState(null);
  const [showMembersModal, setShowMembersModal] = useState(false);

  useEffect(() => {
    fetch("http://184.72.80.225/query/teamService")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const fetchPersons = (teamId) => {
    setSelectedTeam(teamId);
    fetch("http://34.195.160.62/query/personService")
      .then((response) => response.json())
      .then((data) => setPersons(data))
      .catch((error) => console.error("Error fetching persons:", error));
    setShowModal(true);
  };

  const fetchTeamLeader = (teamId) => {
    fetch(`http://184.72.80.225/query/teamService/${teamId}`)
      .then((response) => response.json())
      .then((data) => {
        const leaderId = data.leaderElementId;
        if (leaderId) {
          fetch(`http://34.195.160.62/query/personService/${leaderId}`)
            .then((response) => response.json())
            .then((leader) => {
              setTeamLeader(leader);
              setShowMembersModal(true);
            })
            .catch((error) => console.error("Error fetching leader:", error));
        } else {
          setTeamLeader(null);
          setShowMembersModal(true);
        }
      })
      .catch((error) => console.error("Error fetching team details:", error));
  };

  const removeLeader = () => {
    if (!selectedTeam || !teamLeader) {
      alert("No leader to remove");
      return;
    }

    const payload = {
      teamElementId: selectedTeam,
      personElementId: teamLeader.id,
    };

    fetch("http://34.203.191.38:10041/command/teamService/removeLeader", {
      method: "DELETE", // Método DELETE
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), // Enviamos el payload en el cuerpo
    })
      .then((response) => {
        if (response.ok) {
          alert("Leader removed successfully");
          setTeamLeader(null); // Limpiamos el líder
          setShowMembersModal(false); // Cerramos el modal
        } else {
          response.text().then((text) => alert("Error: " + text));
        }
      })
      .catch((error) => console.error("Error removing leader:", error));
  };

  const addPersonsToTeam = () => {
    if (!selectedTeam || selectedPersons.length === 0) {
      alert("Please select at least one person");
      return;
    }

    selectedPersons.forEach((personId) => {
      const payload = {
        teamElementId: selectedTeam,
        personElementId: personId,
      };

      fetch("http://34.203.191.38:10041/command/teamService/setLeader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            response.text().then((text) => alert("Error: " + text));
          }
        })
        .catch((error) => console.error("Error adding person to team:", error));
    });

    alert("Persons added successfully");
    setShowModal(false);
  };

  const addTeam = () => {
    fetch("http://34.203.191.38:10041/command/teamService", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeam),
    })
      .then((response) => {
        if (response.ok) {
          alert("Team registered successfully");
          setShowAddTeamModal(false);
          setNewTeam({ name: "", startDate: "", endDate: "", state: true });
        } else {
          response.text().then((text) => alert("Error: " + text));
        }
      })
      .catch((error) => console.error("Error adding team:", error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Registered Teams
      </h2>
      <Button
        label="Add New Team"
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded shadow-md hover:bg-green-700"
        onClick={() => setShowAddTeamModal(true)}
      />
      {teams.length === 0 ? (
        <p className="text-gray-600">No teams registered</p>
      ) : (
        <ul className="w-full max-w-lg bg-white p-4 shadow-md rounded-md">
          {teams.map((team) => (
            <li
              key={team.id}
              className="p-3 border-b cursor-pointer hover:bg-blue-50 flex justify-between items-center"
            >
              <span>{team.name}</span>
              <div className="flex gap-2">
                <Button
                  label="Add Person"
                  className="bg-blue-500 text-white px-3 py-1 rounded shadow-md hover:bg-blue-600"
                  onClick={() => fetchPersons(team.id)}
                />
                <Button
                  label="View Members"
                  className="bg-purple-500 text-white px-3 py-1 rounded shadow-md hover:bg-purple-600"
                  onClick={() => {
                    setSelectedTeam(team.id);
                    fetchTeamLeader(team.id);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog
        header="Add New Team"
        visible={showAddTeamModal}
        style={{ width: "400px", backgroundColor: "white" }}
        onHide={() => setShowAddTeamModal(false)}
      >
        <div className="p-4 bg-white">
          <input
            type="text"
            name="name"
            placeholder="Team Name"
            value={newTeam.name}
            onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <input
            type="date"
            name="startDate"
            value={newTeam.startDate}
            onChange={(e) =>
              setNewTeam({ ...newTeam, startDate: e.target.value })
            }
            className="w-full p-2 mb-4 border rounded-md"
          />
          <input
            type="date"
            name="endDate"
            value={newTeam.endDate}
            onChange={(e) =>
              setNewTeam({ ...newTeam, endDate: e.target.value })
            }
            className="w-full p-2 mb-4 border rounded-md"
          />
          <Button
            label="Create Team"
            className="mt-4 bg-green-600 text-white p-2 rounded"
            onClick={addTeam}
          />
        </div>
      </Dialog>

      <Dialog
        header="Select Persons"
        visible={showModal}
        style={{ width: "600px", backgroundColor: "white" }}
        onHide={() => setShowModal(false)}
      >
        <div className="p-4 bg-white">
          <ul className="space-y-2">
            {persons.map((person) => (
              <li
                key={person.id}
                className="flex items-center gap-2 p-2 border rounded-md"
              >
                <Checkbox
                  inputId={person.id}
                  onChange={() => {
                    setSelectedPersons((prev) =>
                      prev.includes(person.id)
                        ? prev.filter((id) => id !== person.id)
                        : [...prev, person.id]
                    );
                  }}
                  checked={selectedPersons.includes(person.id)}
                />
                <label htmlFor={person.id} className="cursor-pointer">
                  {person.firstName} {person.lastName}
                </label>
              </li>
            ))}
          </ul>
          <Button
            label="Confirm"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
            onClick={addPersonsToTeam}
          />
        </div>
      </Dialog>

      <Dialog
        header="Team Leader"
        visible={showMembersModal}
        style={{ width: "600px", backgroundColor: "white" }}
        onHide={() => setShowMembersModal(false)}
      >
        <div className="p-4 bg-white">
          {teamLeader ? (
            <div className="flex items-center justify-between gap-2 p-2 border rounded-md">
              <span>
                {teamLeader.firstName} {teamLeader.lastName}
              </span>
              <Button
                label="Remove Leader"
                className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600"
                onClick={removeLeader}
              />
            </div>
          ) : (
            <p>No leader assigned to this team.</p>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default TeamView;