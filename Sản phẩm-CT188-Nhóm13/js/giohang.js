function isExistedInCart(item, arrCart) {
  let myIndex = -1;
  arrCart.forEach((itemCart, index) => {
    if (item.id == itemCart.id) myIndex = index;
  });
  return myIndex;
}

function addCart() {
  let updatedCart = [];
  // Kiểm tra localStorage có hoạt động hay không
  const selectedItems = (evt) => {
    const linkClicked = evt.target;

    // Lấy ra phần tử input type="number" trong cùng một div với nút "Đặt hàng" được nhấp vào
    const quantityInput = linkClicked.parentElement.querySelector('input[type="number"]');

    // Lấy giá trị số lượng từ input type="number"
    const selectedQuantity = quantityInput.value;

    //Hiện thông báo của phần truy cập đến phần tử ngay trước phần tử mà người dùng nhấn vào
    if (selectedQuantity == 0) {
      alert(
        "Vui lòng chọn số lượng bạn muốn cho cuốn sách " + linkClicked.previousElementSibling.children[1].textContent
      );
    } else {
      alert(linkClicked.previousElementSibling.children[1].textContent + " đã được thêm vào giỏ hàng");
      // Kiểm tra khả năng sử dụng Local Storage:
      if (typeof Storage !== undefined) {
        //Lưu thông tin sản phẩm vào newItem
        let newItem = {
          id: linkClicked.previousElementSibling.children[0].textContent,
          name: linkClicked.previousElementSibling.children[1].textContent,
          price: linkClicked.previousElementSibling.children[2].textContent,
          quantity: selectedQuantity,
        };

        // Kiểm tra Giỏ hàng đã tồn tại trong localStorage hay chưa
        // Nếu chưa tồn tại
        if (JSON.parse(localStorage.getItem("cartItems")) === null) {
          // Thêm sản phẩm vào giỏ hàng và lưu vào Local Storage
          updatedCart.push(newItem);
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
          window.location.reload();
        } else {
          // Giỏ hàng đã tồn tài
          // Lấy giá trị được lưu trữ trong localStorage và chuyển đổi thành một đối tượng JavaScript
          updatedCart = JSON.parse(localStorage.getItem("cartItems"));

          // Kiểm tra Item đã có trong giỏ hàng hay chưa
          if ((index = isExistedInCart(newItem, updatedCart)) >= 0) {
            // Nếu có thì cập nhật số lượng cho nó
            temp = parseInt(updatedCart[index].quantity);
            temp += parseInt(selectedQuantity);
            updatedCart[index].quantity = temp;
          } else {
            // Nếu chưa thì thêm vào
            updatedCart.push(newItem);
          }
        }
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        window.location.reload();
      } else {
        alert("Local storage is not working on your browser");
      }
    }
  };

  // Xử lý sự kiện khi người dùng nhấn nút "Đặt hàng"
  const attachingEvent = (evt) => evt.addEventListener("click", selectedItems);
  const add2CartLinks = document.getElementsByClassName("add-cart");
  let arrCartLinks = Array.from(add2CartLinks);
  arrCartLinks.forEach(attachingEvent);

  // Xử lý khi người dùng nhấp vào biểu tượng giỏ hàng để chuyển hướng đến trang giohang.html
  const shoppingcard = document.querySelector(".shopping-cart");
  shoppingcard.addEventListener("click", function () {
    location.href = "giohang.html";
  });

  // Hiển thị số lượng sản phẩm trong giỏ hàng trên giao diện
  if (localStorage.cartItems != undefined) {
    const numberOrderedItems = document.querySelector(".shopping-cart .no-ordered-items");
    let numberOfItems = 0;
    let customerCart = JSON.parse(localStorage.getItem("cartItems"));

    if (customerCart && Array.isArray(customerCart)) {
      customerCart.forEach((item) => {
        numberOfItems += parseInt(item.quantity, 10);
      });
      numberOrderedItems.innerHTML = numberOfItems;
    } else {
      // Xử lý trường hợp localStorage.cartItems không tồn tại hoặc không phải là mảng
      numberOrderedItems.innerHTML = "0";
    }
  } else {
    // Xử lý trường hợp localStorage.cartItems chưa được định nghĩa
    const numberOrderedItems = document.querySelector(".shopping-cart .no-ordered-items");
    numberOrderedItems.innerHTML = "0";
  }
}

function showCart() {
  if (localStorage.cartItems == undefined) {
    alert("Giỏ hàng của bạn đang trống, hãy thêm sản phẩm vào giỏ hàng");
    location.href = "sanpham.html";
  } else {
    let custommerCart = JSON.parse(localStorage.getItem("cartItems"));
    const tblHead = document.getElementsByTagName("thead")[0];
    const tblBody = document.getElementsByTagName("tbody")[0];
    const tblHFoot = document.getElementsByTagName("tfoot")[0];
    let headColumns = (bodyRows = footcolumns = "");
    headColumns +=
      "<tr><th>Số thứ tự</th><th>ID Sản phẩm</th><th>Tên Sản phẩm</th> <th>Số lượng</th><th>Đơn giá</th><th>Xoá</th></tr>";
    tblHead.innerHTML = headColumns;
    vat = total = amountPaid = 0;
    no = 0; /* ordinalNumber = 0; */
    if (custommerCart[0] === null) {
      bodyRows += '<tr><td colspan="5">No items found</td></tr>';
    } else {
      custommerCart.forEach((item) => {
        total += Number(item.quantity) * Number(item.price.replace(/[^0-9]/g, ""));
        bodyRows +=
          "<tr><td>" +
          ++no +
          "</td><td>" +
          item.id +
          "</td><td>" +
          item.name +
          "</td><td>" +
          Number(item.quantity) +
          "</td><td>" +
          formatCurrency(item.price.replace(/[^0-9]/g, "")) +
          '</td><td><a href="#"onclick=deleteCart(this);>Xoá</a></td></tr>';
      });
    }

    tblBody.innerHTML = bodyRows;
    footcolumns += '<tr><td colspan="4">Tổng:</td> <td>' + formatCurrency(total) + '</td><td rowspan="3"></td></tr>';
    footcolumns += '<tr><td colspan="4">VAT (10%):</td> <td>' + formatCurrency(Math.floor(total * 0.1)) + "</td></tr> ";
    footcolumns +=
      '<tr><td colspan="4">Thành tiền:</td> <td>' + formatCurrency(Math.floor(1.1 * total)) + "</td></tr> ";
    tblHFoot.innerHTML = footcolumns;
  }
}

function deleteCart(evt) {
  let updatedCart = [];
  let custommerCart = JSON.parse(localStorage.getItem("cartItems"));
  custommerCart.forEach((item) => {
    if (item.id != evt.parentElement.parentElement.children[1].textContent) {
      updatedCart.push(item);
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  window.location.reload();
}
const formatPercentage = (value, locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);
};
const formatCurrency = (amount, locale = "vi-VN") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Khi nhấn vào icon tìm kiếm thì khung tìm kiếm hiện ra
document.addEventListener("DOMContentLoaded", function () {
  var searchButton = document.querySelector(".search-box__button");
  var searchBox = document.querySelector(".header__search-box");

  searchButton.addEventListener("click", function () {
    searchBox.classList.toggle("open");
  });
});
