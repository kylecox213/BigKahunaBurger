let $burgerName = $("#burger-name");
let $orderBurger = $("#order-burger");
let $readyList = $("#ready-list");
let $consumedList = $("#consumed-list");

let $errorModal = $("#error-modal");
let $errorTitle = $("#error-title");
let $errorText = $("#error-text");

const API = {
  getBurgers: function () {
    return $.ajax({
      url: "api/burgers",
      type: "GET"
    });
  },
  postBurger: function (burger) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/burgers/create",
      data: JSON.stringify(burger)
    });
  },
  putBurger: function (burgerid) {
    return $.ajax({
      url: "api/burgers/update/" + burgerid,
      type: "PUT"
    });
  }
};

function refreshBurgers() {
  $readyList.empty();
  $consumedList.empty();
  API.getBurgers().then(function (data) {
    console.log(data);

    data.forEach(burger => {
      let $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": burger.id
        });
      if (burger.consumed) {
        $li.html(`<span style="font-weight:bold">${burger.burger_name}</span>`);
        $consumedList.append($li);
      }
      else {
        $li.text(burger.burger_name);
        let $button = $("<button>")
          .addClass("btn btn-warning float-right order")
          .text("Order up!");
        $li.append($button);
        $readyList.append($li);
      };
    });
  });
};

function orderNewBurger(event) {
  event.preventDefault();
  let newBurger = {
    burger_name: $burgerName.val().trim()
  }
  if (!newBurger.burger_name) {
    alert("Please provide a name for your burger or a description of its contents.");
  }
  else {
    API.postBurger(newBurger).then(function (burgerAdded) {

      if (burgerAdded) refreshBurgers();
    });
    $burgerName.val("");
  };
};

function readyBurger() {
  let burgerid = $(this)
    .parent()
    .attr("data-id");
  API.putBurger(burgerid).then(function () {
    refreshBurgers();
  });
}

$orderBurger.on("click", orderNewBurger);
$readyList.on("click", ".order", readyBurger);

