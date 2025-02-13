const url = "https://jsonplaceholder.typicode.com/users";

export async function getData() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const datas = await response.json();
    console.log("Fetched Data:", datas); // Log the fetched data

    // Call a function to display data on the page
    renderData(datas);
  } catch (err) {
    console.warn(err.message);
  }
}

// Example function to render user names in a list

const renderData = (datas) => {
  if (!Array.isArray(datas)) {
    console.error("Data is not an array:", datas); // Add this check
    return;
  }
  const listElement = document.getElementById("list");

  datas.forEach((user) => {
    const name = user.name || "";
    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" "); // Safely join remaining parts

    // Create a list item with a unique data-uid
    const listItem = document.createElement("li");
    listItem.setAttribute("data-uid", user.id);

    // Create paragraph elements for first and last name
    const firstNameElement = document.createElement("p");
    firstNameElement.textContent = `First Name: ${firstName}`;

    const lastNameElement = document.createElement("p");
    lastNameElement.textContent = `Last Name: ${lastName}`;

    // Append the name elements to the list item
    listItem.appendChild(firstNameElement);
    listItem.appendChild(lastNameElement);

    // Add the list item to the list
    listElement.appendChild(listItem);
  });
};
