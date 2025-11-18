document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------
       LOAD USERS (required by tracking page)
    ------------------------------------- */
    let users = JSON.parse(localStorage.getItem("users")) || {
        "mac": "mac123"
    };
    localStorage.setItem("users", JSON.stringify(users));

    /* -------------------------------------
       SHIPMENTS DATA (localStorage)
    ------------------------------------- */
    let shipments = JSON.parse(localStorage.getItem("shipments")) || {
        "12345": { sender: "Mac-Anthony", recipient: "Samuel", address: "123 Street", status: "Processing" },
        "67890": { sender: "Samuel", recipient: "Mary", address: "456 Avenue", status: "In Transit" },
        "25347": { sender: "Mary", recipient: "Mac-Anthony", address: "678 Drive blv", status: "Delivered" },
        "04199": { sender: "Emmanuel", recipient: "Threadway", address: "419 Crescent", status: "Seized" },
        "76543": { sender: "Wike", recipient: "Tinubu", address: "911 Chop Our Money", status: "Danger" }
    };
    localStorage.setItem("shipments", JSON.stringify(shipments));

    /* -------------------------------------
       TRACKING PAGE
    ------------------------------------- */
    const trackForm = document.querySelector("form#trackForm");
    const statusDisplay = document.getElementById("status");

    if (trackForm && statusDisplay) {
        trackForm.addEventListener("submit", e => {
            e.preventDefault();
            const trackingID = document.getElementById("shipment_id").value.trim();

            if (shipments[trackingID]) {
                const ship = shipments[trackingID];
                statusDisplay.textContent = `Status: ${ship.status} (From: ${ship.sender} To: ${ship.recipient})`;

                // Dynamic color based on status
                const statusColors = {
                    "processing": "yellow",
                    "in transit": "blue",
                    "delivered": "green",
                    "seized": "red",
                    "danger": "winered",
                    "stalled": "white"
                };

                const color = statusColors[ship.status.toLowerCase()] || "black";
                statusDisplay.style.color = color;
            } else {
                statusDisplay.textContent = "Tracking ID not found.";
                statusDisplay.style.color = "red";
            }
        });
    }

    /* -------------------------------------
       ADMIN PAGE (add + delete + edit)
    ------------------------------------- */
    const shipmentForm = document.getElementById("shipmentForm");
    const shipmentTable = document.getElementById("shipmentTable");

    const editModal = document.getElementById("editModal");
    const editForm = document.getElementById("editForm");
    const closeModal = document.getElementById("closeModal");
    let editID = null;

    function renderShipments() {
        if (!shipmentTable) return;
        shipmentTable.innerHTML = "";

        for (let id in shipments) {
            const s = shipments[id];
            const row = `
                <tr>
                    <td>${id}</td>
                    <td>${s.sender}</td>
                    <td>${s.recipient}</td>
                    <td>${s.address}</td>
                    <td>${s.status}</td>
                    <td>
                        <button class="editBtn" data-id="${id}">Edit</button>
                        <button class="deleteBtn" data-id="${id}">Delete</button>
                    </td>
                </tr>`;
            shipmentTable.innerHTML += row;
        }
    }

    // Add shipment
    if (shipmentForm) {
        shipmentForm.addEventListener("submit", e => {
            e.preventDefault();
            const id = document.getElementById("trackingId").value.trim();
            const sender = document.getElementById("sender").value.trim();
            const recipient = document.getElementById("recipient").value.trim();
            const address = document.getElementById("address").value.trim();
            const status = document.getElementById("statusSelect").value;

            shipments[id] = { sender, recipient, address, status };
            localStorage.setItem("shipments", JSON.stringify(shipments));
            renderShipments();
            shipmentForm.reset();
            alert("Shipment added successfully!");
        });
    }

    // Delete or Edit shipment
    document.addEventListener("click", e => {
        if (e.target.classList.contains("deleteBtn")) {
            const id = e.target.dataset.id;
            delete shipments[id];
            localStorage.setItem("shipments", JSON.stringify(shipments));
            renderShipments();
        }

        if (e.target.classList.contains("editBtn")) {
            editID = e.target.dataset.id;
            document.getElementById("editSender").value = shipments[editID].sender;
            document.getElementById("editRecipient").value = shipments[editID].recipient;
            document.getElementById("editAddress").value = shipments[editID].address;
            document.getElementById("editStatus").value = shipments[editID].status;
            editModal.style.display = "flex";
        }
    });

    // Close edit modal
    if (closeModal) {
        closeModal.onclick = () => {
            editModal.style.display = "none";
        };
    }

    // Save edits
    if (editForm) {
        editForm.addEventListener("submit", e => {
            e.preventDefault();
            if (!editID) return;

            shipments[editID] = {
                sender: document.getElementById("editSender").value.trim(),
                recipient: document.getElementById("editRecipient").value.trim(),
                address: document.getElementById("editAddress").value.trim(),
                status: document.getElementById("editStatus").value
            };

            localStorage.setItem("shipments", JSON.stringify(shipments));
            editModal.style.display = "none";
            renderShipments();
        });
    }

    // Initial render
    renderShipments();
});

