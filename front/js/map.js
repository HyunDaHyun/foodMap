var container = document.getElementById("map"); 
var options = {
  center: new kakao.maps.LatLng(36.351867, 127.378086), //갤러리아 쪽 좌표 핑~
  level: 8, // 지도 레벨 몇으로 하지
};

var map = new kakao.maps.Map(container, options);

// 지도 확대 축소
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//데이터 넣기 (더미데이터)

async function getDataSet(category) {
  let qs = category;
  if (!qs) {
    qs = "";
  }

  const dataSet = await axios({
    method: "get", // http method
    url: url + `/restaurants?category=${qs}`,
    headers: {}, // packet header
    data: {}, // packet body
  });
  return dataSet.data.result;
}

getDataSet();

// 주소-좌표 변환
var geocoder = new kakao.maps.services.Geocoder();

// 주소-좌표 변환 함수
function getCoordsByAddress(address) {
  return new Promise((resolve, reject) => {
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        resolve(coords);
        return;
      }
      reject(new Error("getCoordsByAddress Error: not Vaild Address"));
    });
  });
}

//인포윈도우 붙이기

function getContent(data) {
  // 유튜브 섬네일 id 
  let replaceUrl = data.videoUrl;
  let finUrl = "";
  replaceUrl = replaceUrl.replace("https://youtu.be/", "");
  replaceUrl = replaceUrl.replace("https://www.youtube.com/embed/", "");
  replaceUrl = replaceUrl.replace("https://www.youtube.com/watch?v=", "");
  finUrl = replaceUrl.split("&")[0];

  // 인포윈도우 가공하기
  return `
  <div class="infowindow">
      <div class="infowindow-img-container">
        <img
          src="https://img.youtube.com/vi/${finUrl}/mqdefault.jpg"
          class="infowindow-img"
        />
      </div>
      <div class="infowindow-body">
        <h5 class="infowindow-title">${data.title}</h5>
        <p class="infowindow-address">${data.address}</p>
        <a href="${data.videoUrl}" class="infowindow-btn" target="_blank">영상이동</a>
      </div>
    </div>
  `;
}

async function setMap(dataSet) {
  markerArray = [];
  infowindowArray = [];

  for (var i = 0; i < dataSet.length; i++) {
    let coords = await getCoordsByAddress(dataSet[i].address);
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: coords, // 마커를 표시할 위치
    });

    markerArray.push(marker);

    // 인포윈도우 생성
    var infowindow = new kakao.maps.InfoWindow({
      content: getContent(dataSet[i]), // 인포윈도우에 표시할 내용
    });

    infowindowArray.push(infowindow);

    console.log(markerArray, infowindowArray);

    kakao.maps.event.addListener(
      marker,
      "click",
      makeOverListener(map, marker, infowindow, coords)
    );
    kakao.maps.event.addListener(map, "click", makeOutListener(infowindow));
  }
}

// 1. 클릭시 다른 인포윈도우 닫기
// 2. 클릭한 곳으로 지도 중심 옮기기
function makeOverListener(map, marker, infowindow, coords) {
  return function () {
    // 1. 클릭시 다른 인포윈도우 닫기
    closeInfoWindow();
    infowindow.open(map, marker);
    // 2. 클릭한 곳으로 지도 중심 옮기기
    map.panTo(coords);
  };
}

let infowindowArray = [];
function closeInfoWindow() {
  for (let infowindow of infowindowArray) {
    infowindow.close();
  }
}

//인포위도우 클로즈하자~
function makeOutListener(infowindow) {
  return function () {
    infowindow.close();
  };
}

// 카테고리
const categoryMap = {
  korea: "한식",
  china: "중식",
  japan: "일식",
  america: "양식",
  wheat: "분식",
  meat: "구이",
  sushi: "회/초밥",
  etc: "기타",
};

const categoryList = document.querySelector(".category-list");
categoryList.addEventListener("click", categoryHandler);

async function categoryHandler(event) {
  const categoryId = event.target.id;
  const category = categoryMap[categoryId];

  try {
    // 데이터 분류
    let categorizedDataSet = await getDataSet(category);

    // 기존 마커 삭제
    closeMarker();

    // 기존 인포윈도우 닫기
    closeInfoWindow();

    setMap(categorizedDataSet);
  } catch (error) {
    console.error(error);
  }
}

// 데이터 분류
let markerArray = [];
function closeMarker() {
  for (marker of markerArray) {
    marker.setMap(null);
  }
}

async function setting() {
  try {
    const dataSet = await getDataSet();
    setMap(dataSet);
  } catch (error) {
    console.error(error);
  }
}

setting();
