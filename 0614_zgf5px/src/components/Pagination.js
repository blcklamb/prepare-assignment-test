const Pagination = () => {
  const paginationButtonStyle = (button, maxPage) => {
    const buttonList = document.querySelectorAll("#pagination > button");
    if (buttonList) {
      for (let i = 0; i < maxPage + 2; i++) {
        if (i == button.innerText) {
          buttonList[i].classList.add("active");
        } else {
          buttonList[i].classList.remove("active");
        }
      }
    }
  };
  const buttonClicked = (button, maxPage, listPerPage, currentPage) => {
    paginationButtonStyle(button, maxPage, currentPage);
  };
  const setPaginationButton = (maxPage, listPerPage, currentPage) => {
    for (let i = 0; i < maxPage + 2; i++) {
      const button = document.createElement("button");
      let textNode = i;
      if (i == 0 || i == maxPage + 1) {
        button.setAttribute("class", "arrow");
        textNode = i == 0 ? "<<" : ">>";
      } else if (i == currentPage) {
        button.setAttribute("class", "active");
      }
      button.appendChild(document.createTextNode(textNode));
      button.addEventListener("click", () => {
        buttonClicked(button, maxPage, listPerPage, currentPage);
      });
      document.getElementById("pagination").appendChild(button);
    }
  };
  const render = () => {
    let maxPage = 10;
    let listPerPage = 5;
    let currentPage = 1;
    setPaginationButton(maxPage, listPerPage, currentPage);
  };
  render();
};

export default Pagination;
