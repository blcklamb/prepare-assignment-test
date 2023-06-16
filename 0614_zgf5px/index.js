//** 문제 1 */
var table = document.getElementById("tableContent");
var thead = document.createElement("thead");
table.appendChild(thead);

const headerContent = [
  "profile",
  "name",
  "positition",
  "role",
  "phone",
  "email",
];
headerContent.forEach((ele) => {
  thead
    .appendChild(document.createElement("th"))
    .appendChild(document.createTextNode(ele));
});

fetch("src/data.json")
  .then((res) => res.json())
  .then((data) => {
    let initI = 0;
    for (const employee of data) {
      const { picture, name, position, role, phone, email } = employee;
      const row = document.createElement("tr");
      const info = [picture, name, position, role, phone, email];
      info.forEach((ele, idx) => {
        if (idx === 0) {
          let picture = document.createElement("img");
          picture.src = ele;
          row.appendChild(document.createElement("td").appendChild(picture));
        } else {
          row.appendChild(document.createElement("td")).textContent = ele;
        }
      });
      table.appendChild(row);
      if (initI % 2 != 0) {
        row.classList.add("odd");
      }
      initI += 1;
      if (initI > paginationLimit) {
        row.classList.add("hidden");
      }
    }
  });

/** 문제 3*/
let currentPage = 1;
let paginationLimit = 5;
let listContentLimit = 5;

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();

  const prevRange = (pageNum - 1) * listContentLimit;
  const currRange = pageNum * listContentLimit;
  const listItems = document.querySelectorAll("tr");

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      if ((index - prevRange) % 2 != 0) {
        item.classList.add("odd");
      } else {
        item.classList.remove("odd");
      }
      item.classList.remove("hidden");
    } else {
      item.classList.remove("odd");
    }
  });
};

const paginationNumbers = document.getElementById("pagination");

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  paginationNumbers.appendChild(pageNumber);
};

const removePageNumber = () => {
  document.querySelectorAll("#pagination button").forEach((ele) => {
    paginationNumbers.removeChild(ele);
  });
};

const getPaginationArrow = (isLeft) => {
  var arrow = document.createElement("button");
  arrow.className = "arrow";
  arrow.innerHTML = isLeft ? "<<" : ">>";
  arrow.id = isLeft ? "first-page" : "last-page";
  paginationNumbers.appendChild(arrow);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= paginationLimit; i++) {
    appendPageNumber(i);
  }
};

const setClickEventOnArrow = () => {
  var firstPageButton = document.getElementById("first-page");
  var lastPageButton = document.getElementById("last-page");
  firstPageButton.addEventListener("click", () => {
    setCurrentPage(1);
  });
  lastPageButton.addEventListener("click", () => {
    setCurrentPage(paginationLimit);
  });
};

const renderPage = () => {
  getPaginationArrow((isLeft = true));
  getPaginationNumbers();
  getPaginationArrow((isLeft = false));

  setClickEventOnArrow();
  setCurrentPage(1);
};

const renderPaginationButton = () => {
  const pageList = document.querySelectorAll(".pagination-number");
  for (const pageButton of pageList) {
    const pageIndex = Number(pageButton.getAttribute("page-index"));
    if (pageIndex) {
      pageButton.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  }
};

window.addEventListener("load", () => {
  renderPage();
  renderPaginationButton();
});

/** 문제 4 */
var dropdownBox = document.getElementById("dropdownContent");
const pageStandard = [5, 15];
pageStandard.forEach((num) => {
  dropdownBox
    .appendChild(document.createElement("option"))
    .appendChild(document.createTextNode(`${num}개씩`));
});

const setPaginationLimit = (standard) => {
  paginationLimit = Math.round(25 / standard);
};

const setListContentLimit = (standard) => {
  listContentLimit = standard;
};

const changeFunc = (value) => {
  const standard = parseInt(value.split("개씩"));

  setPaginationLimit(standard);
  setListContentLimit(standard);

  renderPage();

  removePageNumber();
  renderPaginationButton();
};
