const apiUri = "http://localhost:3000";

const modal = document.getElementById("addForm");
const subscriberForm = document.getElementById("subscriberForm");
let emailAddress = document.getElementById("emailAddress");
let fullName = document.getElementById("fullName");

subscriberForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${apiUri}/subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // το βρηκα στο documentation και δηλώνει πως τα αρχεια που θα στειλω ειναι json
      body: JSON.stringify({
        emailAddress: emailAddress.value,
        fullName: fullName.value,
      }),
    });
  } catch (error) {
    console.log(error);
  }

  emailAddress.value = "";
  fullName.value = "";

  $("#addForm").modal("hide");

  getSubscribers();
});

async function getSubscribers() {
  const response = await fetch(`${apiUri}/subscribers`);
  const jsonData = await response.json();
  const subscribers = jsonData.Results;

  const tableBody = document.getElementById("subTableBody");
  let body = ``;

  for (const subscriber of subscribers) {
    body += `
            <tr>
                <td>${subscriber.EmailAddress}</td>
                <td>${subscriber.Name}</td>
                <td>${subscriber.State}</td>
                <td><button onclick="deleteSubscriber('${subscriber.EmailAddress}')" type="button" class="btn btn-danger">DELETE</button></td>
            </tr>
        `;
  }

  tableBody.innerHTML = body;
}

async function deleteSubscriber(emailAddress) {
  await fetch(`${apiUri}/subscribers/${emailAddress}`, { method: "DELETE" });
  await getSubscribers();
}

getSubscribers();

setInterval(() => {
  getSubscribers();
}, 60000); // Repeat function every x interval
