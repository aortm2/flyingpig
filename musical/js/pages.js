document.title = "장단익히기"; // 제목

$(function () {
  // bgm
  var bgm = $(".bgm")[0];
  var bgm2 = $(".bgm2")[0];
  var bgm3 = $(".bgm3")[0];
  if (bgm) {
    bgm.play();
  }
  
  if (bgm2) {
    bgm2.play();
  }

  if (bgm3) {
    bgm2.play();
  }
  // 처음 진입 나레이션
  // var intro = $(".intro")[0];
  // if (intro) {
  //   intro.play();
  //   $(".container").addClass("pointer-none")
  //   intro.addEventListener('ended', function() {
  //   $(".container").removeClass("pointer-none")
  //   });
  // }

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

  // 버튼
  var btnEffect = new Audio("./sound/effect/button.mp3");
  $(".btn-effect").on("mouseover", function () {
    btnEffect.play();
  });

  // 나가기 버튼
  $(".btn-out").on("mouseover", function () {
    const audio = new Audio("./sound/narration/yua1_n_15.mp3"); // 1번 오디오
    audio.play();
  });

  // next 버튼 클릭 시 이벤트 처리
  $(".dialog .next").on('click', function() {
    if (currentImg < totalImages - 1) {
      showImage(currentImg + 1); // 다음 이미지 보여주기
    }
  });
  
  // prev 버튼 클릭 시 이벤트 처리
  $(".dialog .prev").on('click', function() {
    if (currentImg > 0) {
      showImage(currentImg - 1); // 이전 이미지 보여주기
    }
  });
      // '더 알아보기' 버튼 클릭 시 첫 번째 이미지와 1번 오디오 재생
  $(".btn-more").click(function () {
    $(".dialog").show(); // 다이얼로그를 표시
    
    infoEffectAudio.play();
    showImage(0, true); // 첫 번째 이미지 표시 및 오디오 재생
  });

  // 더알아보기 버튼
  $(".btn-more, .btn-more2").on("mouseover",function () {
    const audio = new Audio("./sound/narration/yua1_n_14.mp3"); // 1번 오디오
    audio.play()
  });


  document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("aria-hidden", "true");
    img.setAttribute("alt", "");
  });

  const successEffect = new Audio('./sound/effect/success_effect.mp3'); //정답 효과음
  const faliEffect = new Audio('./sound/effect/fali_effect.mp3'); //오답 효과음
  const congratsAudio = new Audio("./sound/effect/congrats.mp3"); // 축하 효과음
  const infoEffectAudio = new Audio("./sound/effect/info.mp3"); //더알아보기 효과음

  // 활동 01
  let complet1 = 0
  $(".quiz-wrap > div").on("click", function () {
    $(this).parent().addClass("pointer-none");
    var $currentQuiz = $(this).closest(".quiz-wrap");
    var isCorrect = $(this).data("correct") === "yes";

    // img-answer에 yes 또는 no 클래스 추가
    if (isCorrect) {
      $(".img-answer").addClass("yes");
    } else {
      $(".img-answer").addClass("no");
    }

    // 2초 후 다음 퀴즈로 이동
    setTimeout(function () {
      // img-answer에서 yes, no 클래스 제거
      $(".img-answer").removeClass("yes no");

      // 현재 quiz-wrap에 complete 클래스 추가
      $currentQuiz.addClass("complete");

      // 다음 quiz-wrap에 active 클래스 추가
      var $nextQuiz = $currentQuiz.next(".quiz-wrap");
      if ($nextQuiz.length > 0) {
        $currentQuiz.removeClass("active");
        $nextQuiz.addClass("active");
      }
    }, 2000);
    const audioName = $(this).data("audio");
    const audioSrc = new Audio(`./sound/narration/${audioName}.mp3`);
    audioSrc.play();
    complet1++
    console.log(complet1)
    if(complet1 == 3){
      setTimeout(() => {
        finish()
      }, 2000);
    }
  });

  $(".quiz-wrap > div").on("mouseover", function () {
    const audioName = $(this).data("audio");
    const audioSrc = new Audio(`./sound/narration/${audioName}.mp3`);
    audioSrc.play();
  });


 

  function finish() {
    $(".finish").fadeIn();
    var audio = new Audio('./sound/narration/yua1_n_13.mp3');
    audio.play();
    congratsAudio.play();
  }

    // 팝업 닫기
    $(".dialog-close").click(function () {
      $(".dialog").fadeOut();
      showImage(0, false)
    });
  
    // 팝업 슬라이드
    let currentImg = 0;
    const images = $(".dialog .sd > div");
    const totalImages = images.length;
  
    
    // 현재 재생 중인 오디오를 추적하는 변수
    
    let currentMoreAudio = null; // 전역 변수로 이동하여 모든 함수에서 접근 가능
  
    function showImage(index, playAudio = true) {
      const url = $(".dialog").data("url");
      const audioFiles = [
        `./sound/narration/yua1_n_16.mp3`, 
        `./sound/narration/yua1_n_17.mp3`, 
        `./sound/narration/yua1_n_18.mp3`,
      ];
    
      // 이미지 활성화 업데이트
      images.removeClass("active").eq(index).addClass("active");
      currentImg = index;
      console.log(index)
    
      // 기존 오디오 중지
      if (currentMoreAudio) {
        currentMoreAudio.pause();
        currentMoreAudio.currentTime = 0;
        currentMoreAudio = null; // 이전 오디오 객체 초기화
      }
    
      // 새로운 오디오 재생
      if (audioFiles[index]) {
        currentMoreAudio = new Audio(audioFiles[index]);
        if (playAudio) currentMoreAudio.play();
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
    
    
  // 활동2
  let complet2 = 0
  $(".drag > div").draggable({
    helper: "clone",
    revert: "invalid" 
  });

  $(".drop > div").droppable({
    accept: ".drag > div",
    drop: function (event, ui) {
      const draggable = ui.draggable; // 원본 드래그된 요소
      const dropTarget = $(this); // 현재 드롭된 영역

      // data-name 비교
      if (draggable.data("name") === dropTarget.data("name")) {
        dropTarget.addClass("active"); // 드롭된 요소에 active 클래스 추가
        draggable.addClass("active"); // 원본 드래그 요소에 active 클래스 추가

         const audioFile = dropTarget.data("audio");
         const audioPath = `./sound/narration/${audioFile}.mp3`;
         
         // 오디오 재생
         const audio = new Audio(audioPath); // Audio 객체 생성
         audio.play();
        
        // 이미지 동적 생성
        const imageName = `pop_${draggable.data("name")}.png`; // 이미지 파일 이름 생성
        const image = $(`<img src="./img/content_02/${imageName}" alt="Success" class="pop-image" />`); // 이미지 요소 생성
        // 이미지 삽입
        $("body").append(image);
            
        // 이미지 스타일링
        image.css({
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 10, 
          transform: "translate(-50%, -50%)" 
        });

        setTimeout(() => {
          image.fadeOut(500, () => {
            image.remove(); // 페이드 아웃 후 이미지 제거
          });
        }, 2000);
        complet2++;

      } else {
        faliEffect.play();
        $(ui.helper).remove();
      }

      if (complet2 == 3) {
        setTimeout(() => {
          finish2();
        }, 2000);
      }
    },
  });

  function finish2() {
    $(".finish").fadeIn();
    var audio = new Audio('./sound/narration/yua1_n_26.mp3');
    audio.play();
    congratsAudio.play();
  }
  
});
