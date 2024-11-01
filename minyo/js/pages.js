document.title = "민요알기"; // 제목

$(function () {
  // 모바일 세로 팝업 삽입
  $(".container").append("<div class='mobile-pop'><p>모바일 가로모드로 변경해 주세요.</p></div>")
  const winWidth = window.innerWidth

  // bgm
  var bgm = $("#bgm")[0];
  if (bgm) {
    var file = bgm.src;
    bgm.play();
    if (!bgm.paused) {
      console.log(file); //재생되는 파일 확인
    }
  }

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

  // 버튼
  var btnEffect = new Audio("./sound/effect/button.mp3");
  $(".btn-effect").on("mouseover", function () {
    btnEffect.play();
  });

  $(".btn-effect").on("click", function () {
    btnEffect.play();
  });

  //  셀렉트
  if (winWidth > 1420) {
    $(".btn-select").on("mouseover", function () {
      var btnIdx = $(".btn-select").index(this);
  
      $(".audio_wrap audio").each(function () {
        this.pause();
        this.currentTime = 0;
      });
  
      $(".audio_wrap audio").eq(btnIdx)[0].play();
    });
  } else{
    let touchNum = 0;
    let currentIdx = -1; // 현재 클릭된 버튼의 인덱스를 추적
    
    $(".btn-select").on("click", function (event) {
      event.preventDefault();
      var btnIdx = $(".btn-select").index(this);

      // 클릭한 버튼이 이전 버튼과 다르면 touchNum을 초기화
      if (btnIdx !== currentIdx) {
        touchNum = 0;
      }
    
      // 새로운 인덱스를 현재 인덱스로 설정
      currentIdx = btnIdx;
    
      $(".audio_wrap audio").each(function () {
        this.pause();
        this.currentTime = 0;
      });
    
      $(".audio_wrap audio").eq(btnIdx)[0].play();
    
      if (touchNum === 1) {
        touchNum++;
        const link = $(this).attr("href");
        window.location = link;
      }
    
      touchNum++;
    });
  }

  $(".btn-select").on("mouseout", function () {
    $(".audio_wrap audio").currentTime = 0;
  });

  // 오디오
  const failEffect = new Audio('sound/effect/fali_effect.mp3'); // 실패 오디오
  const congratsAudio = new Audio("./sound/effect/congrats.mp3"); // 축하 오디오

  // 첫번째 컨텐츠
  // 슬라이드
  $(".piece").draggable({
    revert: "invalid", // 드랍 영역이 아닐 경우 원래 위치로 돌아감
    helper: "clone",  // 드래그할 때 클론을 생성
    start: function(event, ui) {
      // 드래그가 시작되면 원본 요소의 투명도를 0으로 변경
      $(this).css("opacity", 0);
    },
    stop: function(event, ui) {
      // 드래그가 끝나면 원본 요소의 투명도를 다시 1로 변경
      $(this).css("opacity", 1);
    }
  });

  // 드랍 가능한 영역으로 설정
  let dropComplete = 0;
$(".area").droppable({
  accept: ".piece", // 드래그 가능한 요소
  drop: function (event, ui) {
    const draggedName = ui.draggable.data("name"); // 드래그된 요소의 data-name
    const droppedName = $(this).data("name"); // 드랍된 영역의 data-name

    // data-name 비교
    if (draggedName === droppedName) {
      $(this).addClass("active"); // 성공한 드랍 영역에 active 클래스 추가
      $(this).droppable("disable"); // 드랍 영역 비활성화
      ui.draggable.remove();
      const narrationAudio = new Audio(`./sound/narration/${draggedName}.mp3`);
      const contentAudio = new Audio(`./sound/contents_01/${draggedName}.mp3`);
      narrationAudio.play();
      $(".select-01").addClass("pointer-none");

      const image = $(`<img src="./img/content_01/pop_${droppedName}.png" alt="Success" class="pop-image" />`);
      $("body").append(image);

      // 이미지 스타일링
      image.css({
        position: "absolute",
        top: "50%",
        left: "62.5%",
        zIndex: 10, 
        transform: "translate(-50%, -50%)" 
      });

      narrationAudio.addEventListener("ended", function () {
        contentAudio.volume = 1;
        contentAudio.play();
      });

      contentAudio.addEventListener("ended", function () {
        $(".select-01").removeClass("pointer-none");
        image.remove();
        if(dropComplete >= 5) {
          activeFinish01();
        }
      });

      dropComplete++;

    } else {
      ui.draggable.draggable("option", "revert", true);
      failEffect.play();
    }
  }
});

  function activeFinish01() {
    const finishAudio = new Audio(`./sound/narration/cho1_n_11.mp3`);

    congratsAudio.addEventListener("ended", function () {
      finishAudio.play();
    });

    finishAudio.addEventListener("ended", function () {
      $(".btn-wrap").css("display","flex")
    });

    congratsAudio.play();

    $(".finish").fadeIn();
    
  }

  const infoEffectAudio = new Audio("./sound/effect/info.mp3");
  const infoNarrationAudio = new Audio("./sound/narration/cho1_n_12.mp3");
  $(".btn-more").click(function () {
    infoEffectAudio.addEventListener("ended", function () {
      infoNarrationAudio.play();
    });
    infoEffectAudio.play();
    $(".dialog").fadeIn();
    finishpause(); //활동종료 오디오 중지
  });


  // 활동2
   // bgm
  const bgm2 = $("#bgm02")[0];
  if (bgm2) {
    bgm2.play();
    const kkang = new Audio("./sound/contents_02/kkang.mp3");
    bgm2.addEventListener("ended", function () {
      kkang.volume = 1;
      kkang.play()
      $(".sigimsae").addClass("first")
      setTimeout(second,5000)
    });
    kkang.addEventListener("ended", function () {
      $(".drag-wrap").removeClass("pointer-none")
    });
    
  }
  const second = () =>{
    $(".sigimsae").removeClass("first")
    $(".sigimsae").addClass("second")
  }

  // 동물 소리 파일 경로 설정 (예: sheep.mp3, cat.mp3 등)
  const sounds = {
    sheep: new Audio('./sound/contents_02/sheep.mp3'),
    cat: new Audio('./sound/contents_02/cat.mp3'),
    duck: new Audio('./sound/contents_02/duck.mp3'),
    cow: new Audio('./sound/contents_02/cow.mp3')
  };

  // 드래그 가능하게 설정
  $(".drag .item").draggable({
    revert: function(droppable) {
      // droppable이 존재하지 않으면 revert (원래 위치로 돌아감)
      if (!droppable) {
        return true; // 드롭할 수 없는 영역에 떨어지면 원래 위치로 돌아감
      }
      const draggedName = $(this).data("name");
      const droppedName = $(droppable).data("name");
      return draggedName !== droppedName; // 이름이 일치하지 않으면 revert
    },
    start: function(event, ui) {
      $(this).css("z-index", 10);
    },
    stop: function(event, ui) {
      $(this).css("z-index", "");
    }
  });

  // 드롭 가능하게 설정
  let dropComplete2 = 0
  $(".drop .item").droppable({
    accept: ".item", // 드래그 가능한 요소
    drop: function (event, ui) {
      const draggedName = ui.draggable.data("name"); // 드래그된 요소의 data-name
      const droppedName = $(this).data("name"); // 드랍된 영역의 data-name
      if (draggedName === droppedName) {
        $(this).addClass("active");
        $(ui.draggable).addClass("dropped");
        const animal = $(this).data("name"); // 현재 요소의 data-name 값 가져오기
        if (sounds[animal]) {
          sounds[animal].currentTime = 0;
          sounds[animal].play();
        }
        ui.draggable.remove();
        dropComplete2++
      } else{
        failEffect.play();
      }
      
      if(dropComplete2 == 4){
        setTimeout(activeFinish02, 3000);
      }
    }
  });

  function activeFinish02() {
    const finishAudio = new Audio(`./sound/narration/cho1_n_16.mp3`);
    const kkangFull = new Audio(`./sound/contents_02/kkang_full.m4a`);

    congratsAudio.addEventListener("ended", function () {
      finishAudio.play();
    });

    finishAudio.addEventListener("ended", function () {
      kkangFull.volume = 1
      kkangFull.play();
      $(".btn-wrap").css("display","flex")
    });

    congratsAudio.play();

    $(".finish").fadeIn();
    
  }

  // 마우스 오버 이벤트 설정
  $(".drag-wrap .item").on("mouseenter", function () {
    const animal = $(this).data("name"); // 현재 요소의 data-name 값 가져오기

    // 해당 동물의 소리 재생
    if (sounds[animal]) {
      sounds[animal].currentTime = 0; // 소리를 처음부터 재생
      sounds[animal].play();
    }
  });

  const infoNarrationAudio2 = new Audio("./sound/narration/cho1_n_17.mp3");
  $(".btn-more2").click(function () {
    infoEffectAudio.addEventListener("ended", function () {
      infoNarrationAudio2.play();
    });
    infoEffectAudio.play();
    $(".dialog").fadeIn();
    finishpause(); //활동종료 오디오 중지
  });

  $(".dialog-close").click(function () {
    $(".dialog").fadeOut();
    infoNarrationAudio.pause();
    infoNarrationAudio.currentTime = 0;
    infoNarrationAudio2.pause();
    infoNarrationAudio2.currentTime = 0;
  });
});
