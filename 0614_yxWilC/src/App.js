import Table from "./components/Table.js";

const App = () => {
  const render = async () => {
    // Clear previous content
    const appContainer = document.getElementById("app");
    // appContainer.innerHTML = "";

    // Fetch Data
    try {
      const response = await fetch("src/data.json");
      if (response.ok) {
        let data = await response.json();
        const table = Table(data);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  render();
};

document.addEventListener("DOMContentLoaded", function () {
  App();
});

export default App;
