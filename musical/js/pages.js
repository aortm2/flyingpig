document.title = "국악기 알기"; // 제목

$(function () {
  // 모바일 세로 팝업 삽입
  $(".container").append("<div class='mobile-pop'><p>모바일 가로모드로 변경해 주세요.</p></div>")
  const winWidth = window.innerWidth
  var bgm = $(".bgm")[0];
  var bgm2 = $(".bgm2")[0];
  var activeBgm = $("#active")[0]; //활동1
  var intro = $(".intro")[0]; // 활동2
  if (winWidth > 1420) {
    if (bgm) {
      bgm.play();
    }

    if (bgm2) {
      bgm2.play();
      $(".container").addClass("pointer-none")
      bgm2.addEventListener('ended', function () {
        $(".container").removeClass("pointer-none")
      });
    }

    if (activeBgm) {
      // BGM 재생 시작
      activeBgm.play();
      activeBgm.addEventListener('ended', function () {
        $(".select-01").removeClass("pointer-none")
      });
    }

    if (intro) {
      intro.play();
      intro.addEventListener('ended', function () {
        $(".select-02").removeClass("pointer-none")
      });
    }

  } else {
    let main = true;
    let select = true;
    let active1 = true;
    let active2 = true;
    $("body").click(function () {
      if (main) {
        if (bgm) {
          bgm.play();
        }
        main = false;
      }
  
      if (select) {
        if (bgm2) {
          bgm2.play();
          $(".container").addClass("pointer-none")
          bgm2.addEventListener('ended', function () {
            $(".container").removeClass("pointer-none")
          });
        }
        select = false;
      }

      if (activeBgm) {
        // BGM 재생 시작
        if(active1 == true){
          activeBgm.play();
          active1 = false;
          activeBgm.addEventListener('ended', function () {
            $(".select-01").removeClass("pointer-none")
          },{once:true});
        }
      }

      if (intro) {
        if(active2 == true){
          active2 = false;
          intro.play();
          intro.addEventListener('ended', function () {
            $(".select-02").removeClass("pointer-none")
          });
          console.log(active2 == true)
        } 
      }
      $(".mobile-touch").fadeOut();
    });
    
  }

  var effect = $("#effect")[0];
  if (effect) {
    effect.play();
  }

  // 오디오 정의
  const successEffect = new Audio('./sound/effect/success_effect.mp3'); //정답 효과음
  const faliEffect = new Audio('./sound/effect/fali_effect.mp3'); //오답 효과음
  const congratsAudio = new Audio("./sound/effect/congrats.mp3"); // 축하 효과음
  const infoEffectAudio = new Audio("./sound/effect/info.mp3"); //더알아보기 효과음
  const finishBgm1 = new Audio('./sound/narration/yua1_n_13.mp3'); //활동1 종료 나레이션
  const finishBgm2 = new Audio('./sound/narration/yua1_n_26.mp3'); //활동2 종료 나레이션
  const moreAudio = new Audio("./sound/narration/yua1_n_14.mp3"); // 알아보기 버튼
  const Exitaudio = new Audio("./sound/narration/yua1_n_15.mp3"); // 나가기 버튼

  // 버튼
  var btnEffect = new Audio("./sound/effect/button.mp3");
  $(".btn-effect").on("mouseover", function () {
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
    moreAudio.pause()
  });

  // 더알아보기 버튼
  $(".btn-more, .btn-more2").on("mouseover",function () {
    moreAudio.play()
    Exitaudio.pause();
  });

  // 나가기 버튼
  $(".btn-out").on("mouseover", function () {
    moreAudio.pause();
    Exitaudio.play();
  });

  document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("aria-hidden", "true");
    img.setAttribute("alt", "");
  });
  
  // 활동 01
  let complet1 = 0
  $(".quiz-wrap > div").on("click", function () {
   
    var $currentQuiz = $(this).closest(".quiz-wrap");
    $(this).addClass("active")

    // img-answer에 yes 또는 no 클래스 추가
    if ($(this).data("correct") === "yes") {
      $(".img-answer").addClass("yes");
      complet1++
      // 2초 후 다음 퀴즈로 이동
      setTimeout(function () {
        // img-answer에서 yes, no 클래스 제거
        $(".img-answer").removeClass("yes no");

        // 현재 quiz-wrap에 complete 클래스 추가
        $currentQuiz.addClass("complete");

      
      }, 2000);
      $(this).parent().addClass("pointer-none");
      successEffect.play();
      
      const audioName = $(this).data("audio");
      const audioSrc = new Audio(`./sound/contents_01/${audioName}.m4a`);
      audioSrc.play();
      audioSrc.addEventListener('ended',function(){
          // 다음 quiz-wrap에 active 클래스 추가
          setTimeout(function () {  
            var $nextQuiz = $currentQuiz.next(".quiz-wrap");
            if ($nextQuiz.length > 0) {
              $currentQuiz.removeClass("active");
              $nextQuiz.addClass("active");
            }
          }, 1000);
      });
    } else {
      $(".img-answer").addClass("no");
      faliEffect.play();
      setTimeout(function () {
       $(".img-answer").removeClass("no");
       $(".quiz-wrap > div").removeClass("active")
      }, 1000);
    }

    if(complet1 == 3){
      setTimeout(() => {
        finish()
      }, 6000);
    }
  });

  $(".quiz-wrap > div").on("mouseover", function () {
    const audioName = $(this).data("audio");
    const audioSrc = new Audio(`./sound/narration/${audioName}.mp3`);
    audioSrc.play();
  });



  function finish() {
    $(".finish").fadeIn();
    congratsAudio.play();
    congratsAudio.addEventListener('ended', function() {
      finishBgm1.play();
     });

     finishBgm1.addEventListener('ended', function() {
      $(".btn-wrap").css("display","flex")
     });
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
    
    
    
    let currentAudio = null;

    $(".btn-muisc").click(function () {
        const name = $(this).data("name");
        const audioPath = "./sound/contents_01/" + name + ".m4a";

      
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        
        currentAudio = new Audio(audioPath);
        currentAudio.play();
    });

    // .btn-controls 클릭 이벤트
    $(".btn-controls").click(function () {
      
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; 
            currentAudio = null; 
        }
    });

  // 활동2
  let audioSrc;
  $(".drag > div").on("mouseover", function () {
    const audioName = $(this).data("name");
    if (audioSrc) {
      audioSrc.pause();
      audioSrc.currentTime = 0;
    }
    audioSrc = new Audio(`./sound/contents_02/${audioName}.m4a`);
    audioSrc.play();
  });
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
        $(".select-02").append(image);
        $(".drag").addClass("pointer-none")
            
        // 이미지 스타일링
        image.css({
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 10, 
          transform: "translate(-50%, -50%)",
          width: "34.48%",
          height: "40.09%"
        });

        setTimeout(() => {
          // image.fadeOut(500, () => {
          //   image.remove(); 
          // });
        }, 2000);

        audio.addEventListener('ended', function() {
          console.log("끝남?")
          image.fadeOut(500, () => {
            image.remove(); // 페이드 아웃 후 이미지 제거
          $(".drag").removeClass("pointer-none")

          });
        });

        audioSrc.pause(); //마우스 오버 오디오 멈춤
        
        complet2++;
        
        if (complet2 == 3) {
          audio.addEventListener('ended', function() {
            setTimeout(() => {
              finish2();
            }, 1000);
           });
        }

      } else {
        faliEffect.play();
        $(ui.helper).remove();
      }
    },
  });

  function finish2() {
    $(".finish").fadeIn();
    congratsAudio.play();
    congratsAudio.addEventListener('ended', function() {
      finishBgm2.play();
     });
     finishBgm2.addEventListener('ended', function() {
      $(".btn-wrap").css("display","flex")
     });
  }
  

  $(".btn-wrap a").on("mouseover",function () {
    finishBgm1.pause();
    finishBgm2.pause();
    congratsAudio.pause
  });

});
