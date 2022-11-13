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

const dataSet = [
  {
    title: "떡반집 본점",
    address: "대전광역시 서구 둔산2동 1091",
    url: "https://youtu.be/wYu6GwY2i7I",
    category: "분식",
  },
  {
    title: "미도인 대전 둔산",
    address: "대전 서구 둔산로31번길 51",
    url: "https://youtu.be/b600HLzOwdw",
    category: "양식",
  },
  {
    title: "쉐이크쉑 대전 타임월드점",
    address: "대전 서구 대덕대로 219 (둔산동) EAST동 1층 쉐이크쉑(둔산동, 갤러리아타임월드)",
    url: "https://youtu.be/6vcyqCRpf6g",
    category: "양식",
  },
  {
    title: "땀땀",
    address: "대전 서구 대덕대로 211 갤러리아 타임월드 11층 고메이월드",
    url: "https://youtu.be/swD4t0hGSPQ",
    category: "기타",
  },
  {
    title: "불타는쪽갈비",
    address: "대전 서구 둔지로 36 갤러리타워",
    url: "https://youtu.be/zasBogb3E0A",
    category: "구이",
  },
  {
    title: "상무초밥 둔산직영점",
    address: "대전 서구 둔산로31번길 66",
    url: "https://youtu.be/aEZkWTbDBmI",
    category: "회/초밥",
  },
  {
    title: "태평소국밥",
    address: "대전 서구 둔산로31번길 52 덕삼빌딩 1층 102호",
    url: "hhttps://youtu.be/45xIfh-l-qM",
    category: "한식",
  },
  {
    title: "동백카츠",
    address: "대전광역시 서구 둔산로31번길 56 1층",
    url: "https://youtu.be/SRiM2ltynbo",
    category: "일식",
  },
  {
    title: "도군샤브",
    address: "대전광역시 서구 둔산남로9번길 51 1층 도군샤부",
    url: "https://youtube.com/shorts/wQ_kWpKc7_0?feature=share",
    category: "일식",
  },
  {
    title: "대전 둔산동 맛집 별달돈까스 카페",
    address: "대전광역시 서구 둔산로 30 2층",
    url: "https://youtube.com/shorts/ryUllURGauM?feature=share",
    category: "일식",
  },
  {
    title: "피슈마라홍탕 대전둔산점",
    address: "대전광역시 서구 대덕대로 248 A동 102호",
    url: "https://youtu.be/jpJfq9_Vy5E",
    category: "중식",
  },
  {
    title: "탕화쿵푸마라탕 대전둔산점",
    address: "대전 서구 둔산로31번길 38 2층",
    url: "https://youtube.com/shorts/4ScevPDV1hQ?feature=share",
    category: "중식",
  },
  {
    title: "짬뽕관 대전둔산점",
    address: "대전 서구 대덕대로234번길 38",
    url: "https://youtu.be/e7vwRXgQNsI",
    category: "중식",
  },
  {
    title: "고기명작",
    address: "대전광역시 서구 둔산로51번길 38",
    url: "https://youtu.be/tZTQ1BzV_oU",
    category: "구이",
  },
  {
    title: "보끄미 둔산점",
    address: "대전광역시 서구 대덕대로242번길 15 둔산의 아침",
    url: "https://youtu.be/RW-WJVmWnfg",
    category: "한식",
  },
  {
    title: "티켓부스",
    address: "대전 서구 둔산남로9번길 77 1층",
    url: "https://youtu.be/wk1rXfe45JU",
    category: "기타",
  },
  {
    title: "현정떡볶이",
    address: "대전광역시 서구 대덕대로233번길 20",
    url: "https://youtu.be/AQYeQNz-iOM",
    category: "분식",
  },
  {
    title: "봉달이명품김밥 둔산점",
    address: "대전광역시 서구 둔산로 15 향촌아파트",
    url: "https://youtu.be/kYzwIXLhFyU",
    category: "분식",
  },
  {
    title: "강남으로간고래",
    address: "대전광역시 서구 둔지로 13 B동 101호 102호 103호",
    url: "https://youtu.be/ly-eJf3Kc0M",
    category: "회/초밥",
  },
  {
    title: "하나참치 둔산점",
    address: "대전광역시 서구 대덕대로175번길 40 두운힐스타운",
    url: "https://youtu.be/4t6NP4oSSzQ",
    category: "회/초밥",
  },
  {
    title: "초연정",
    address: "대전 서구 둔산로31번길 10-35 1층 초연정",
    url: "https://youtu.be/31LCZiZOG5Y",
    category: "회/초밥",
  },
  {
    title: "PIENO",
    address: "대전광역시 서구 둔산로31번길 38 2층",
    url: "https://youtu.be/a4Vv5VCfJ58",
    category: "양식",
  },
  {
    title: "텀즈업브로",
    address: "대전광역시 서구 대덕대로220번길 20",
    url: "https://youtu.be/j1hmtFqHNX8",
    category: "양식",
  },
  {
    title: "해쉬",
    address: "대전광역시 서구 둔산로 18 향촌월드프라자109호",
    url: "https://youtu.be/YokmuwFCl_o",
    category: "양식",
  },
  {
    title: "소코아 대전둔산점",
    address: "대전 서구 대덕대로233번길 17 1층 104-1호",
    url: "https://youtu.be/BHMG3UvWu34",
    category: "일식",
  },
  {
    title: "정돈 갤러리아백화점 타임월드점",
    address: "대전 서구 대덕대로 211",
    url: "https://youtu.be/9Gb1-L3OszU",
    category: "일식",
  },
  {
    title: "이비가짬뽕 시청점",
    address: "대전광역시 서구 둔산중로40번길 19 1층",
    url: "https://youtu.be/Xru9bSDDpKw",
    category: "중식",
  },
  {
    title: "더베이징",
    address: "대전광역시 서구 대덕대로195번길 58",
    url: "https://youtu.be/BseGSz0EzFY",
    category: "중식",
  },
  {
    title: "짬뽕지존 대전둔산점",
    address: "대전 서구 둔산서로 13 나우빌딩 1층",
    url: "https://youtu.be/JrSY0rWwkdY",
    category: "중식",
  },
  {
    title: "정든밥",
    address: "대전광역시 서구 둔산로31번길 72",
    url: "https://youtu.be/aUVUFKS76nk",
    category: "한식",
  },
];

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
