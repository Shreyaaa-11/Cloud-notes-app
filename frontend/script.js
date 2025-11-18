const API_URL = "https://cloud-notes-app-1yn4.onrender.com";
const API_KEY = "secret";

async function addNote() {
    const text = document.getElementById("noteText").value;
    const color = document.getElementById("noteColor").value;

    await fetch(API_URL + "/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        },
        body: JSON.stringify({ text, color })
    });

    loadNotes();
}

async function loadNotes() {
    const res = await fetch(API_URL + "/notes", {
        headers: { "x-api-key": API_KEY }
    });
    const notes = await res.json();

    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    notes.forEach(n => {
        const div = document.createElement("div");
        div.className = "note";
        div.style.background = n.color;

        div.innerHTML = `
            <p>${n.text}</p>
            <button onclick="archiveNote('${n.id}')">Archive</button>
            <button onclick="deleteNote('${n.id}')">Delete</button>
        `;

        container.appendChild(div);
    });
}

async function archiveNote(id) {
    await fetch(`${API_URL}/notes/${id}/archive`, {
        method: "PUT",
        headers: { "x-api-key": API_KEY }
    });
    loadNotes();
}

async function deleteNote(id) {
    await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
        headers: { "x-api-key": API_KEY }
    });
    loadNotes();
}

loadNotes();
