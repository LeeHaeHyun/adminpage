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

                // 서비스 목록 테이블의 서비스명 버튼 클릭 이벤트 처리
                var simpleCertificationButton = document.querySelector(
                    "#service-list tbody span[data-menu-id='service-check']"
                );
                console.log("Simple certification button:", simpleCertificationButton);
                if (simpleCertificationButton) {
                    simpleCertificationButton.addEventListener("click", function () {
                        var menuId = this.getAttribute("data-menu-id");
                        console.log("Simple certification button clicked with menuId:", menuId);
                        loadContent(menuId);
                    });
                } else {
                    console.error("Simple certification button not found");
                }

                function loadContent(menuId) {
                    console.log("loadContent called with menuId:", menuId);

                    var contentContainer = document.getElementById("content-container");
                    var menuContent = document.getElementById(menuId);

                    if (menuContent) {
                        // content-container를 비움
                        contentContainer.innerHTML = "";

                        // 선택된 콘텐츠의 복사본을 만들어 content-container에 추가
                        var contentCopy = menuContent.cloneNode(true);
                        contentCopy.style.display = "block";
                        contentContainer.appendChild(contentCopy);
                    } else {
                        console.error("해당 메뉴에 대한 내용을 찾을 수 없습니다.");
                    }
                }
            });
        });
    });

    // 초기 페이지 로드 시 메뉴 항목 선택 제거
    var initialActiveSubmenuItem = document.querySelector(".submenu > div.active");
    if (initialActiveSubmenuItem) {
        initialActiveSubmenuItem.classList.remove("active");
    }
    // 모든 팝업 숨기기
    var allPopups = document.querySelectorAll(".popup");
    allPopups.forEach(function (popup) {
        popup.style.display = "none";
    });
});

function goToMainPage() {
    window.location.href = "admin.html";
}
function openPopup(popupId) {
    console.log("openPopup 함수 호출됨, popupId:", popupId);
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "block";
    } else {
        console.error("팝업 요소를 찾을 수 없습니다. ID:", popupId);
    }
}

function closePopup(popupId) {
    console.log("closePopup 함수 호출됨, popupId:", popupId);
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "none";
    } else {
        console.error("팝업 요소를 찾을 수 없습니다. ID:", popupId);
    }
}
function openCaseCodePopup() {
    document.getElementById("caseCodePopup2").style.display = "block";
}

function closeCaseCodePopup() {
    document.getElementById("caseCodePopup1").style.display = "none";
}

function openServiceHistoryPopup() {
    alert("[등록일: 년도-월-일 시간]으로 과거에 등록했던 \n서비스 이력을 오름차순으로 볼 수 있다(기존 기능 동일)");
}

function openRequestPopup() {
    alert(
        "상용 서버에 연동하기 위해 요청하는 버튼이며, \nCAS운영담당자 승인 후 상용 서버에 연동된다. \n결제할 내역에 [서비스 등록 요청 : 서비스명, 상용요청]으로 \n등록된다. 그리고 결재 승인 담당자에게 자동 공지 메일로 \n[서비스 등록 요청 : 서비스명, 상용요청] 1건이 등록되었습니다.\n내용으로 발송된다."
    );
}
// 서비스 ID 팝업
function openServiceIdPopup() {
    document.getElementById("serviceIdPopup").style.display = "block";
}

function checkServiceIdDuplicate() {
    // 여기에 서비스 ID 중복 체크 로직을 구현합니다.
    alert("중복 체크 완료");
}

function confirmServiceId() {
    var serviceId = document.getElementById("serviceIdInput").value;
    document.getElementById("serviceId").value = serviceId;
    closePopup("serviceIdPopup");
}

// CASECODE 팝업
function openCaseCodePopup() {
    document.getElementById("caseCodePopup1").style.display = "block";
}

function addCaseCode() {
    // 여기에 CASECODE 추가 로직을 구현합니다.
    alert("CASECODE 추가 완료");
    closePopup("caseCodePopup1");
}

// 담당자 팝업
function openManagerPopup(type) {
    var popup = document.getElementById("managerPopup");
    var text = type === "main" ? "사업 담당자" : "부 담당자";
    document.getElementById("managerPopupText").textContent =
        text + "를 체크박스에 체크하여 지정하며 서비스 만료, 주요공지시 활용할 수 있도록 함";
    popup.style.display = "block";
}

function addManager() {
    // 여기에 담당자 추가 로직을 구현합니다.
    alert("담당자 추가 완료");
    closePopup("managerPopup");
}

function validateHostIp(input) {
    if (!/^[0-9.]*$/.test(input.value)) {
        input.value = input.value.replace(/[^0-9.]/g, "");
        alert("호스트IP는 7자리 이상 15자리 이하의 숫자와 .만 입력 가능합니다.");
    }
}
function validateServiceId(input) {
    if (!/^[a-zA-Z]*$/.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-Z]/g, "");
        alert("서비스 ID는 영어만 입력할 수 있습니다.");
    }
}

function confirmServiceId() {
    var serviceIdInput = document.getElementById("serviceIdInput");
    var serviceId = document.getElementById("serviceId");
    if (serviceIdInput.value) {
        serviceId.value = "mdu_" + serviceIdInput.value;
        closePopup("serviceIdPopup");
    } else {
        alert("서비스 ID를 입력해주세요.");
    }
}

function checkServiceIdDuplicate() {
    // 여기에 중복 체크 로직을 구현합니다.
    alert("중복 체크 완료");
}
function addHostIp() {
    var container = document.getElementById("hostIpContainer");
    var input = document.createElement("input");
    input.type = "text";
    input.className = "hostIp";
    input.pattern = "[0-9.]{7,15}";
    input.required = true;
    input.oninput = function () {
        validateHostIp(this);
    };
    container.appendChild(document.createElement("br"));
    container.appendChild(input);
}

function validateExpirationDate() {
    var now = new Date();
    var oneYearLater = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    var selectedDate = new Date(
        document.getElementById("expireYear").value,
        document.getElementById("expireMonth").value - 1,
        document.getElementById("expireDay").value,
        document.getElementById("expireHour").value,
        document.getElementById("expireMinute").value
    );

    if (selectedDate > oneYearLater) {
        alert("서비스 만료일은 현재 시간으로부터 최대 1년까지만 설정할 수 있습니다.");
        setExpirationDate(); // 날짜를 1년 후로 재설정
    }
}
// 팝업 닫기
function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}

// 서비스 만료일 설정
function setExpirationDate() {
    var now = new Date();
    var oneYearLater = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

    var yearSelect = document.getElementById("expireYear");
    var monthSelect = document.getElementById("expireMonth");
    var daySelect = document.getElementById("expireDay");
    var hourSelect = document.getElementById("expireHour");
    var minuteSelect = document.getElementById("expireMinute");

    for (var i = now.getFullYear(); i <= now.getFullYear() + 10; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        yearSelect.add(option);
    }

    for (var i = 1; i <= 12; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        monthSelect.add(option);
    }

    for (var i = 1; i <= 31; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        daySelect.add(option);
    }

    for (var i = 0; i < 24; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        hourSelect.add(option);
    }

    for (var i = 0; i < 60; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        minuteSelect.add(option);
    }

    yearSelect.value = oneYearLater.getFullYear();
    monthSelect.value = oneYearLater.getMonth() + 1;
    daySelect.value = oneYearLater.getDate();
    hourSelect.value = oneYearLater.getHours();
    minuteSelect.value = oneYearLater.getMinutes();
}

// 서비스 신청
function submitApplication() {
    alert(
        "개발 서버에 연동하기 위해 요청하는 버튼이며, \nCAS개발담당자 승인 후 개발 서버에 연동된다. \n결제할 내역에 [서비스 등록 요청 : 서비스명, 개발요청]으로 \n등록된다. 그리고 결재 승인 담당자에게 자동 공지 메일로 \n[서비스 등록 요청 : 서비스명, 개발요청] 1건이 등록되었습니다.\n내용으로 발송된다."
    );
}
// 서비스 수정
function submitreplay() {
    alert(
        "수정한 내용으로 다시 연동하기 위해 요청하는 버튼이며, \nCAS개발담당자 승인 후 개발 서버에 연동된다. \n결제할 내역에 [서비스 등록 요청 : 서비스명, 개발수정요청]으로 \n등록된다. 그리고 결재 승인 담당자에게 자동 공지 메일로 \n[서비스 등록 요청 : 서비스명, 개발수정요청] 1건이 등록되었습니다.\n내용으로 발송된다."
    );
}

// 페이지 로드 시 실행
window.onload = function () {
    setExpirationDate();
};
function loadServiceCorrection() {
    var contentContainer = document.getElementById("content-container");
    var serviceCorrection = document.getElementById("service-correction");

    if (serviceCorrection) {
        // 현재 표시된 내용을 모두 숨김
        var currentContent = contentContainer.firstElementChild;
        if (currentContent) {
            currentContent.style.display = "none";
        }

        // service-correction 내용을 복사하여 표시
        var correctionCopy = serviceCorrection.cloneNode(true);
        correctionCopy.style.display = "block";
        contentContainer.innerHTML = "";
        contentContainer.appendChild(correctionCopy);
    } else {
        console.error("서비스 수정 내용을 찾을 수 없습니다.");
    }
}
