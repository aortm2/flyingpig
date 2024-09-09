document.title = "소리알기"; // 제목

$(function () {
  // bgm
  var bgm = $(".bgm")[0];
  if (bgm) {
    bgm.play();
  }
  // 처음 진입 나레이션
  var intro = $(".intro")[0];
  if (intro) {
    intro.play();
  }

  var activeBgm = $("#active")[0];
  if (activeBgm) {
    var file = activeBgm.src;
    
    activeBgm.onended = function() {
      $(".slider-wrap").addClass("active")
    };
    
    // BGM 재생 시작
    activeBgm.play();
  }

  var effect = $("#effect")[0];
  if (effect) {
    effect.play();
  }

  document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("aria-hidden", "true");
    img.setAttribute("alt", "");
  });

  // 버튼
  var btnEffect = new Audio("./sound/effect/button.mp3");
  $(".btn-effect").on("mouseover", function () {
    btnEffect.play();
  });

  $(".btn-effect").on("click", function () {
    btnEffect.play();
  });

  //  셀렉트
  $(".btn-select").on("mouseover", function () {
    var btnIdx = $(".btn-select").index(this);

    $(".audio_wrap audio").each(function () {
      this.pause();
      this.currentTime = 0;
    });

    $(".audio_wrap audio").eq(btnIdx)[0].play();
  });

  $(".btn-select").on("mouseout", function () {
    $(".audio_wrap audio").currentTime = 0;
  });

  // 스타트 버튼
  $(".btn-start").on("mouseover", function () {
    const btnstart = new Audio("./sound/narration/yu2_na_1.mp3");
    btnstart.play();
  });

  // 오디오
  var successEffect = new Audio('./sound/effect/success_effect.mp3'); //정답 효과음
  var faliEffect = new Audio('./sound/effect/fali_effect.mp3'); //오답 효과음
  var congratsAudio = new Audio("./sound/effect/congrats.mp3"); // 축하 효과음
  var infoEffectAudio = new Audio("./sound/effect/info.mp3"); //더알아보기 효과음

  // contents01
  

  // contents02
  // 힌트
  $(".hint button").on("click", function() {
    var name = $(this).data("name");
    $(this).attr("disabled" , true)
    $(".plate > div[data-name='" + name + "']").addClass("active");

     var audioSrc = "./sound/contents_02/musical_" + name + "2.mp3";
     var audio = new Audio(audioSrc);
     audio.play();
  });
  
  // 정답
  $(".plate > div").on("click", function () {
    // 클릭한 div의 data-name 속성 값 가져오기
    var name = $(this).data("name");

    // 클릭한 div에 correct 클래스 추가
    $(this).addClass("active correct");
    $(this).attr("disabled" , true)

    // 동일한 data-name을 가진 hint 버튼에도 correct 클래스 추가
    $(".hint button[data-name='" + name + "']").addClass("correct");
    var correct = new Audio("./sound/contents_02/" + name + ".mp3");
    // 오디오 플레이
    successEffect.play();
    correct.play();

    // .pop-wrap 생성 및 스타일 설정
    var popWrap = $('<div class="pop-wrap"></div>');
    var img = $('<img>', {
        src: './img/content_02/pop_' + name + '.png',
        alt: 'pop image'
    });

    // .pop-wrap에 이미지 추가
    popWrap.append(img);

    // .plate에 .pop-wrap 추가
    $('.plate').append(popWrap);

    // 1초 후 .pop-wrap 제거
    setTimeout(function() {
        popWrap.remove(); // .pop-wrap 요소 제거
    }, 2000);

    // correct 클래스가 추가된 div의 갯수 체크
    var correctCount = $(".plate > div.correct").length;
    if (correctCount === 4) {
        finish2(); // 4개일 때 finish 함수 호출
    }
  });;

  const finish2 = () => {
    $(".select-02").fadeOut();
    $(".finish").fadeIn();
    congratsAudio.play();
  
    var finishNarration = new Audio("./sound/narration/yu2_na_22.mp3"); // 나레이션
    finishNarration.play();
  };

  // 오답
  $(".plate").on("click", function (event) {
    var clickedDiv = $(event.target);
    if (!clickedDiv.is(".daegeum, .piri, .sogeum, .saenghwang")) {
      // 오답 div
      var wrongDiv = $('<div class="wrong"></div>');
      var plateOffset = $(this).offset();
      // 메시지를 클릭한 위치에 표시
      wrongDiv.css({
        top: event.pageY - plateOffset.top + 'px',  
        left: event.pageX - plateOffset.left + 'px',
      });

      // body에 메시지 추가
      $(".plate").append(wrongDiv);

      var faliNarration = new Audio('./sound/narration/yu2_na_21.mp3'); // fali 나레이션
       // fali 오디오 재생
       faliNarration.play();
       faliEffect.play();


      // 1초 후 메시지 삭제
      setTimeout(function () {
        wrongDiv.remove();
      }, 1000);
    }
  });
  // 더알아보기 버튼
  $(".btn-more2").click(function () {
    $(".dialog").show(); // 다이얼로그를 표시
    
    infoEffectAudio.play();
    showImage(0, true); // 첫 번째 이미지 표시 및 오디오 재생
  });
  
  // 팝업 닫기
  $(".dialog-close").click(function () {
    $(".dialog").fadeOut();
  });

  // 팝업 슬라이드
let currentImg = 0;
const images = $(".dialog .sd > div");
const totalImages = images.length;

const moreAudio1 = new Audio("./sound/contents_02/more_01.mp3"); // 1번 오디오
const moreAudio2 = new Audio("./sound/contents_02/more_02.mp3"); // 2번 오디오
const moreAudio3 = new Audio("./sound/contents_02/more_03.mp3"); // 2번 오디오
const moreAudio4 = new Audio("./sound/contents_02/more_04.mp3"); // 2번 오디오

// 현재 재생 중인 오디오를 추적하는 변수
let currentMoreAudio = null;

function showImage(index, playAudio = true) {
  images.removeClass("active").eq(index).addClass("active");
  currentImg = index; // 현재 이미지를 업데이트

  // 현재 재생 중인 오디오가 있으면 중지
  if (currentMoreAudio) {
    currentMoreAudio.pause();
    currentMoreAudio.currentTime = 0; // 오디오를 처음으로 되감기
  }

  // 해당 인덱스에 맞는 오디오 설정
  if (index === 0) {
    currentMoreAudio = moreAudio1;
  } else if (index === 1) {
    currentMoreAudio = moreAudio2;
  } else if (index === 2) {
    currentMoreAudio = moreAudio3;
  } else if (index === 3) {
    currentMoreAudio = moreAudio4;
  } else {
    currentMoreAudio = null; // 해당하는 오디오가 없을 경우 null로 설정
  }

  // playAudio가 true이고 currentMoreAudio가 존재하면 오디오 재생
  if (playAudio && currentMoreAudio) {
    currentMoreAudio.play();
  }

  // 첫 번째 페이지에서 prev 버튼 숨기기
  if (index === 0) {
    $(".dialog .prev").hide();
  } else {
    $(".dialog .prev").show();
  }

  // 마지막 페이지에서 next 버튼 숨기기
  if (index === totalImages - 1) {
    $(".dialog .next").hide();
  } else {
    $(".dialog .next").show();
  }
}

// '더 알아보기' 버튼 클릭 시 첫 번째 이미지와 1번 오디오 재생
$(".btn-more2").click(function () {
  $(".dialog").show(); // 다이얼로그를 표시
  
  infoEffectAudio.play();
  showImage(0, true); // 첫 번째 이미지 표시 및 오디오 재생
  finishpause2();
});

$(".btn-muisc").click(function(){
    var name = $(this).data("name");

    var muisc = new Audio("./sound/contents_02/musical_" + name + "2.mp3");
    muisc.play();
});

// 다음 버튼 클릭 이벤트
$(".dialog .next").click(function () {
  if (currentImg < totalImages - 1) {
    showImage(currentImg + 1, true);
  }
});

// 이전 버튼 클릭 이벤트
$(".dialog .prev").click(function () {
  if (currentImg > 0) {
    showImage(currentImg - 1, true);
  }
});

// 초기 상태에서 첫 번째 이미지를 표시하지만 오디오 재생하지 않음
showImage(currentImg, false);

// 다이얼로그 초기 숨김 처리
$(".dialog").hide();

});
