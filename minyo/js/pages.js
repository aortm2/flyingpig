document.title = "민요알기"; // 제목

$(function () {
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
  var intro2 = $(".intro2")[0];
  if (intro) {
    intro.play();
    intro2.play();
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

  // 오디오
  const failEffect = new Audio('sound/effect/fali_effect.mp3'); // 실패 오디오
  const congratsAudio = new Audio("./sound/effect/congrats.mp3"); // 축하 오디오

  // 첫번째 컨텐츠
  // 슬라이드
  $(".piece").draggable({
    revert: "invalid" // 드랍 영역이 아닐 경우 원래 위치로 돌아감
  });

  // 드랍 가능한 영역으로 설정
  let dropComplete = 0
  $(".area").droppable({
    accept: ".piece", // 드래그 가능한 요소
    drop: function (event, ui) {
      const draggedName = ui.draggable.data("name"); // 드래그된 요소의 data-name
      const droppedName = $(this).data("name"); // 드랍된 영역의 data-name

      // data-name 비교
      if (draggedName === droppedName) {
        $(this).addClass("active");
        ui.draggable.remove();
        const narrationAudio = new Audio(`./sound/narration/${draggedName}.mp3`);
        const contentAudio = new Audio(`./sound/contents_01/${draggedName}.m4a`);
        narrationAudio.play();
        $(".select-01").addClass("pointer-none")
        narrationAudio.addEventListener("ended", function () {
          contentAudio.play();
        });
        contentAudio.addEventListener("ended", function () {
          $(".select-01").removeClass("pointer-none")
        });
        dropComplete++
      } else {
        ui.draggable.draggable("option", "revert", true);
        failEffect.play()
      }

      if(dropComplete >= 5){
        setTimeout(activeFinish01, 3000);
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

  $(".dialog-close").click(function () {
    $(".dialog").fadeOut();
    infoNarrationAudio.pause();
    infoNarrationAudio.currentTime = 0;
  });
});

