document.title = "민요알기"; // 제목

$(function () {
  // 모바일 세로 팝업 삽입
  $(".container").append("<div class='mobile-pop'><p>모바일 가로모드로 변경해 주세요.</p></div>")
  const winWidth = window.innerWidth
  const bgm = $("#bgm")[0];
  const intro = $(".intro")[0];
  const activeBgm = $("#active")[0]; //활동1
  // bgm
  if (winWidth > 1420) {
    // 배경음악 재생
    if (bgm) {
      bgm.play();
    }
  
    // 인트로 재생
    if (intro) {
      intro.play();
    }
    if(activeBgm){
      activeBgm.play();
      activeBgm.addEventListener("ended", function () {
        $(".select-01").removeClass("pointer-none")
      });
    }
  } else {
    // 작은 화면에서 클릭 이벤트로 재생
    let main = true;
    let select = true;
    let active1 = true;
    $("body").click(function () {
      if (main == true) {
        if (bgm) {
          bgm.play();
        }
        main = false;
      }
  
      if (select == true) {
        if (intro) {
          intro.play();
        }
        select = false;
      }
      if(activeBgm){
        if(active1 == true){
          activeBgm.play();
          active1 = false
          $(".mobile-touch").fadeOut();
        }
        activeBgm.addEventListener("ended", function () {
          $(".select-01").removeClass("pointer-none")
        });
      }
      
    });
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

   // 셀렉트 화면
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

  // 오디오
  const failEffect = new Audio('sound/effect/fali_effect.mp3'); // 실패 오디오
  const congratsAudio = new Audio("./sound/effect/congrats.mp3"); // 축하 오디오

  // 첫번째 컨텐츠
  // 슬라이드
  $(".select-01 .piece").draggable({
    helper: "clone",
    revert: function (droppable) {
      if (!droppable) {
        return true;
      } else {
        var pieceName = $(this).data("name");
        var dropTarget = $(droppable[0]);
        var areaNames = dropTarget.data("name").split("|");

        if (!areaNames.includes(pieceName)) {
          return true;
        } else {
          return false;
        }
      }
    },
    start: function(event, ui) {
      $(this).addClass("drag");
    },
    stop: function(event, ui) {
      // 드래그가 끝난 후 원본에서 active 클래스 제거
      $(this).removeClass("drag");
    }
  });

  // 드롭 가능하게 설정
  let dropComplete1 = 0
  $('.select-01 .area').droppable({
      accept: ".piece", // .piece만 드롭 가능
      revert: "invalid",
      drop: function(event, ui) {
          var area = $(this); // 드롭된 area
          var pieceName = ui.draggable.data('name');
          var areaNames = area.data('name').split('|'); // 여러 개의 data-name일 수 있으므로 분리
          if (areaNames.includes(pieceName)) {
              area.addClass(pieceName); // data-name을 클래스에 추가
              ui.draggable.draggable('disable'); // 드롭된 요소를 다시 드래그할 수 없게 설정 (옵션)
              const audio = new Audio('./sound/narration/' + pieceName + '.mp3'); // Audio 객체 생성
              audio.play()
              ui.draggable.addClass("active")
              dropComplete1++
          }  else{
            failEffect.play();
          }
          if(dropComplete1 >= 5){
            activeFinish01(activeFinish01,1000)
          }
      }
  });

  function activeFinish01() {
    const finishAudio = new Audio(`./sound/narration/cho2_n_11.mp3`);
    congratsAudio.play(); 
    $(".finish").fadeIn();
    congratsAudio.addEventListener("ended", function () {
      finishAudio.play();
    });

    finishAudio.addEventListener("ended", function () {
      $(".btn-wrap").css("display","flex")
    });
   
  }

  const infoEffectAudio = new Audio("./sound/effect/info.mp3");
  const infoNarrationAudio = new Audio("./sound/narration/cho2_n_12.mp3");
  $(".btn-more").click(function () {
    infoEffectAudio.addEventListener("ended", function () {
      infoNarrationAudio.play();
    });
    infoEffectAudio.play();
    $(".dialog").fadeIn();
  });

  // $(".drag .piece").on("mouseenter", function () {
  //   const pieceName = $(this).data("name"); // 현재 요소의 data-name 값 가져오기
  //   const audio = new Audio('./sound/narration/' + pieceName + '.mp3'); // Audio 객체 생성
  //   audio.currentTime = 0;
  //   audio.play();
  // });


  // 활동2
   // bgm
  const bgm2 = $("#bgm02")[0];
  let active2 = true;
  if(winWidth > 1420){
    if (bgm2) {
      bgm2.play();
      bgm2.addEventListener("ended", function () {
        $(".select-02").removeClass("pointer-none")
      });
    }
  } else{
    $("body").click(function(){
      if (bgm2) {
        if(active2 == true){
          bgm2.play();
          bgm2.addEventListener("ended", function () {
            $(".select-02").removeClass("pointer-none")
          });
          $(".mobile-touch").fadeOut();
          active2 = false
        }
      }
    });
  }
  const second = () =>{
    $(".sigimsae").removeClass("first")
    $(".sigimsae").addClass("second")
  }

  // 드래그 가능하게 설정
  $(".drag .item").draggable({
    revert: function(droppable) {
      // droppable이 존재하지 않으면 revert (원래 위치로 돌아감)
      if (!droppable) {
        return true; // 드롭할 수 없는 영역에 떨어지면 원래 위치로 돌아감
      }
      const draggedName = $(this).data("name");
      const droppedName = $(droppable).data("name");
      return draggedName !== droppedName;
    },
    helper: function() {
      const clone = $(this).clone().css({
          zIndex: 1000 // z-index를 높게 설정
      });
      return clone; // 클론 반환
  },
    start: function(event, ui) {
      $(this).addClass("d-drag");
    },
    stop: function(event, ui) {
      // 드래그가 끝난 후 원본에서 active 클래스 제거
      $(this).removeClass("d-drag");
    }
  });

  // 드롭 가능하게 설정
  let dropComplete2 = 0
  $(".drop .item").droppable({
    accept: ".item", // 드래그 가능한 요소

    drop: function (event, ui) {
      const draggedName = ui.draggable.data("name"); // 드래그된 요소의 data-name
      const droppedName = $(this).data("name"); // 드랍된 영역의 data-name

      if (draggedName == droppedName && $(".ui-droppable-hover").length < 1) {
        console.log($(".ui-droppable-hover").length < 2)
        $(this).addClass("active");
        $(this).droppable("disable");
        const itemName = $(this).data("name"); // 현재 요소의 data-name 값 가져오기
        const audio = new Audio('./sound/narration/' + itemName + '.mp3'); // Audio 객체 생성
        audio.currentTime = 0;
        audio.play();
        ui.draggable.addClass("active");
        dropComplete2++
      } else{
        failEffect.play();
      }
      
      
      if(dropComplete2 == 7){
        setTimeout(activeFinish02, 1000);
      }
    }
  });

  function activeFinish02() {
    const finishAudio = new Audio(`./sound/narration/cho2_n_23.mp3`);
    $(".finish").fadeIn();
    congratsAudio.play();
    congratsAudio.addEventListener("ended", function () {
      finishAudio.play();
    });
    
    finishAudio.addEventListener("ended", function () {
      $(".btn-wrap").css("display","flex")
    });
  }

  // 마우스 오버 이벤트 설정
  // $(".drag .item").on("mouseenter", function () {
  //   const itemName = $(this).data("name");
  //   const audio = new Audio('./sound/narration/' + itemName + '.mp3');
  //   audio.currentTime = 0;
  //   audio.play();
  // });

  const infoNarrationAudio2 = new Audio("./sound/narration/cho2_n_24.mp3");
  $(".btn-more2").click(function () {
    infoEffectAudio.addEventListener("ended", function () {
      infoNarrationAudio2.play();
    });
    infoEffectAudio.play();
    $(".dialog").fadeIn();
  });

  $(".dialog-close").click(function () {
    $(".dialog").fadeOut();
    infoNarrationAudio.pause();
    infoNarrationAudio.currentTime = 0;
    infoNarrationAudio2.pause();
    infoNarrationAudio2.currentTime = 0;
  });
});
