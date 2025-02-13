// URL and Request Objects
/*
 url: href, host, hostname, port, protocol, origin, pathname, hash, search, searchParams
request options: method, body, headers, cache
cache  (HTTP Cache, NOT Cache API)
- `default`: cache first, server request if stale, update cache if newer
- `reload`: always go to server AND update the cache
- `no-store`: always go to server but do not update the cache
- `no-cache`: make a conditional request to server and compare, update cache and use latest
- `force-cache`: only makes request if there is no HTTP Cache file
- `only-if-cache`: from cache or 504 gateway timeout error
Headers
- string | object literal | new Headers()
*/
const urlStr = "https://jsonplaceholder.typicode.com/users";

export const getData = () => {
  const url = new URL(urlStr);

  console.log(url.host, url.origin, url.protocol, url.port, url.pathname);

  const request = new Request(url, {
    headers: { "x-tca": "Hello" },
    method: "GET",
    cache: "no-cache",
  });
  getDataAsync(request);
};

async function getDataAsync(request) {
  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Fetched Data:", data); // Log the fetched data

    // Call a function to display data on the page
    renderData(data);
  } catch (err) {
    console.warn(err.message);
  }
}

// Example function to render user names in a list

const renderData = (data) => {
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
