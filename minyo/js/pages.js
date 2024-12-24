document.title = "민요알기"; // 제목

$(function () {
  // 모바일 세로 팝업 삽입
  $(".container").append("<div class='mobile-pop'><p>모바일 가로모드로 변경해 주세요.</p></div>")
  const winWidth = window.innerWidth;
const bgm = $("#bgm")[0];
const intro = $(".intro")[0];
const activeBgm = $("#active")[0]; //활동1

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
        setTimeout(() => {
          $(".select-01").removeClass("pointer-none")
      }, 7000);
      }
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
      $(".select-01").append(image);

      // 이미지 스타일링
      image.css({
        position: "absolute",
        top: "50%",
        left: "62.5%",
        zIndex: 10, 
        transform: "translate(-50%, -50%)",
        width: "29.11%",
        height: "58.43%",
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

const finishAudio = new Audio(`./sound/narration/cho1_n_11.mp3`);
  function activeFinish01() {

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
  const infoNarrationAudio = new Audio("./sound/narration/cho1_n_18.mp3");
  $(".btn-more").click(function () {

    infoEffectAudio.play();
    showImage(0, true);
    $(".dialog").fadeIn();
    finishpause()
  });

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

  let currentImg = 0;
  const images = $(".dialog .sd > div");
  const totalImages = images.length;
  let currentMoreAudio = null;
  
  function showImage(index, playAudio = true) {
    const url = $(".dialog").data("url");
    const audioFiles = [
      `./sound/narration/cho1_n_18.mp3`, 
      `./sound/narration/cho1_n_19.mp3`, 
      `./sound/narration/cho1_n_20.mp3`,
      `./sound/narration/cho1_n_21.mp3`,
      `./sound/narration/cho1_n_22.mp3`,
    ];
  
    // 이미지 활성화 업데이트
    images.removeClass("active").eq(index).addClass("active");
    currentImg = index;
  
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

    console.log( currentMoreAudio)

  
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
   // bgm
  const bgm2 = $("#bgm02")[0];
  if(winWidth > 1420){
    if (bgm2) {
      bgm2.play();
      const kkang = new Audio("./sound/contents_02/kkang.mp3");
      bgm2.addEventListener("ended", function () {
        kkang.play()
        $(".sigimsae").addClass("first")
        setTimeout(second,5000)
        $(".hidden-bg").addClass("hidden-ani")
      });
      kkang.addEventListener("ended", function () {
        $(".drag-wrap").removeClass("pointer-none")
      });
      
    }
  } else{
    let active2 = true
    $("body").click(function () {
      if (bgm2) {
        if (active2 == true) {

          bgm2.play();
          const kkang = new Audio("./sound/contents_02/kkang.mp3");
          bgm2.addEventListener("ended", function () {
            kkang.play()
            $(".sigimsae").addClass("first")
            setTimeout(second, 5000)
            $(".hidden-bg").addClass("hidden-ani")
          });
          kkang.addEventListener("ended", function () {
            $(".drag-wrap").removeClass("pointer-none")
          });
          active2 = false
          $(".mobile-touch").fadeOut();
        }
      }
    });
  }

  const areas = $(".drag02 .area"); // `area` 요소 선택
        const parent = areas.parent(); // 부모 요소 저장

        // 요소를 배열로 랜덤 섞기
        const shuffled = areas.toArray().sort(() => Math.random() - 0.5);

        // 섞인 순서대로 DOM에 다시 추가
  parent.append(shuffled);


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

  const soundsComplet = {
    sheep: new Audio('./sound/contents_02/sheep_complete.mp3'),
    cat: new Audio('./sound/contents_02/cat_complete.mp3'),
    duck: new Audio('./sound/contents_02/duck_complete.mp3'),
    cow: new Audio('./sound/contents_02/cow_complete.mp3')
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
        if (soundsComplet[animal]) {
          soundsComplet[animal].currentTime = 0;
          soundsComplet[animal].play();
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

  function finishpause(){
    finishAudio.pause()
    finishAudio2.pause()
    congratsAudio.pause()
  }

  const finishAudio2 = new Audio(`./sound/narration/cho1_n_16.mp3`);
  function activeFinish02() {
    const kkangFull = new Audio(`./sound/contents_02/kkang_full.m4a`);

    congratsAudio.play();
    congratsAudio.addEventListener("ended", function () {
      finishAudio2.play();
    });

    finishAudio2.addEventListener("ended", function () {
      $(".btn-wrap").css("display","flex")
    });

    $(".finish").fadeIn();
    
  }

  // 마우스 오버 이벤트 설정
  $(".drag-wrap .item").on("mouseenter", function () {
    const animal = $(this).data("name"); // 현재 요소의 data-name 값 가져오기

    // // 해당 동물의 소리 재생
    // if (sounds[animal]) {
    //   sounds[animal].currentTime = 0; // 소리를 처음부터 재생
    //   sounds[animal].play();
    // }
  });

  const infoNarrationAudio2 = new Audio("./sound/narration/cho1_n_17.mp3");
  $(".btn-more2").click(function () {
    infoEffectAudio.addEventListener("ended", function () {
      infoNarrationAudio2.play();
    });
    infoEffectAudio.play();
    $(".dialog").fadeIn();
    finishpause()
  });

  $(".dialog-close").click(function () {
    $(".dialog").fadeOut();
    infoNarrationAudio.pause();
    infoNarrationAudio.currentTime = 0;
    infoNarrationAudio2.pause();
    infoNarrationAudio2.currentTime = 0;
    currentMoreAudio.pause();
    currentMoreAudio.currentTime = 0;

  });
});
