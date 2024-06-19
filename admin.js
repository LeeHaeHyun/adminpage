document.addEventListener("DOMContentLoaded", function () {
    var menuItems = document.querySelectorAll(".menu-item");
    var activeSubmenuItem = null;
    var contentContainer = document.getElementById("content-container");

    menuItems.forEach(function (menuItem) {
        var titleArea = menuItem.querySelector(".title-area");
        var submenuItems = menuItem.querySelectorAll(".submenu > div");

        titleArea.addEventListener("click", toggleSubmenu);

        function toggleSubmenu() {
            menuItem.classList.toggle("open");
        }

        submenuItems.forEach(function (submenuItem) {
            submenuItem.addEventListener("click", function (e) {
                e.preventDefault();
                if (activeSubmenuItem !== null) {
                    activeSubmenuItem.classList.remove("active");
                }
                activeSubmenuItem = this;
                this.classList.add("active");

                var menuId = this.getAttribute("data-menu-id");
                loadContent(menuId);
            });
        });
    });

    function loadContent(menuId) {
        var contentContainer = document.getElementById("content-container");
        var menuContent = document.getElementById(menuId);

        if (menuContent) {
            contentContainer.innerHTML = menuContent.innerHTML;
        } else {
            console.error("해당 메뉴에 대한 내용을 찾을 수 없습니다.");
        }
    }

    // 초기 페이지 로드 시 메뉴 항목 선택 제거
    var initialActiveSubmenuItem = document.querySelector(".submenu > div.active");
    if (initialActiveSubmenuItem) {
        initialActiveSubmenuItem.classList.remove("active");
    }
});

function goToMainPage() {
    window.location.href = "admin.html";
}
