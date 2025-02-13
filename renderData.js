export const renderData = (data) => {
  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data); // Add this check
    return;
  }
  const listElement = document.getElementById("list");

  data.forEach((user) => {
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
