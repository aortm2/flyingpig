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
  if($("#canvas").length > 0){
    const canvas = new fabric.Canvas('canvas', {
      isDrawingMode: false,
      backgroundColor: 'rgba(255,255,255)'
    });
  
    let currentColor = ''; // 기본 색상
    let currentOpacity = 1;    // 기본 투명도
    let previousOpacity = 1;   // 이전 투명도 (형광펜 선택 전 상태)
    let currentTool = '';        // 현재 선택된 도구
  
    function resizeCanvas() {
      const boardWrap = $('.board-wrap');
      const width = boardWrap.width();
      const height = boardWrap.height();
      $('#canvas').attr({ width: width, height: height });
      canvas.setWidth(width);
      canvas.setHeight(height);
    }
  
    resizeCanvas();
  
    $(window).on('resize', function() {
      resizeCanvas();
    });
    
  
    // 도구 버튼 클릭 이벤트
    $('.tool button').on('click', function() {
      const toolClass = $(this).attr('data-name');
      if (toolClass !== 'color') {
        $('.tool button').removeClass('active');
        $(this).addClass('active');
        currentTool = toolClass; // 현재 선택된 도구 저장
      } else {
        $(this).addClass('active');
      }
  
      
      // 도구 기능 설정
      switch (toolClass) {
        case 'brush':
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          currentColor=''
          canvas.freeDrawingBrush.width = 10;
          currentOpacity = previousOpacity; // 이전 투명도로 복원
          canvas.freeDrawingBrush.color = `rgba(${hexToRgb(currentColor)}, ${currentOpacity})`;
          canvas.isDrawingMode = true;
          break;
        case 'colored-pencil':
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          canvas.freeDrawingBrush.width = 4;
          currentColor=''
          currentOpacity = previousOpacity; // 이전 투명도로 복원
          canvas.freeDrawingBrush.color = `rgba(${hexToRgb(currentColor)}, ${currentOpacity})`;
          canvas.isDrawingMode = true;
          break;
        case 'highlighter':
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          previousOpacity = currentOpacity; // 현재 투명도를 저장
          currentColor=''
          currentOpacity = 0.5;
          canvas.freeDrawingBrush.color = `rgba(${hexToRgb(currentColor)}, ${currentOpacity})`;
          canvas.freeDrawingBrush.width = 10;
          canvas.isDrawingMode = true;
          break;
        case 'stamp':
          if ($(".stamp-tool").css("display") === "flex") {
            $(".stamp-tool").css("display", "none");
          } else {
            $(".stamp-tool").css("display", "flex");
          }
          break;
        case 'eraser':
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          canvas.freeDrawingBrush.width = 20;
          currentColor = 'rgba(255,255,255)';
          currentOpacity = previousOpacity; // 이전 투명도로 복원
          canvas.freeDrawingBrush.color = `rgba(${hexToRgb(currentColor)}, ${currentOpacity})`;
          canvas.isDrawingMode = true;
          var audioEffect = new Audio('./sound/contents_01/tool_eraser.mp3');
          audioEffect.play();
          break;
        case 'color':
          // 색상 팔레트 토글
          if ($(".palette").css("display") === "flex") {
            $(".palette").css("display", "none");
          } else {
            $(".palette").css("display", "flex");
          }
          break;
        default:
          canvas.isDrawingMode = false;
      }
      updateBrush();
      
    });
  
    // 색상 팔레트 버튼 클릭 이벤트
    $('.palette button').on('click', function() {
      const color = $(this).css('background-color');
      currentColor = color; // 선택된 색상을 currentColor에 저장
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = `rgba(${hexToRgb(currentColor)}, ${currentOpacity})`;
      }
      // 색상 팔레트 닫기
      $(".palette").css("display", "none");
      $('.color').removeClass('active');
    });
  
    // 삭제 버튼 클릭 이벤트
    $('.btn-del').on('click', function() {
      canvas.clear();
    });
  
    // 브러시 색상 및 투명도 업데이트
    function updateBrush() {
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = `rgba(${hexToRgb(currentColor)}, ${currentOpacity})`;
      }
    }
  
    // HEX 색상을 RGB로 변환하는 함수
    function hexToRgb(hex) {
      const match = /^rgba?\((\d+),\s*(\d+),\s*(\d+)\)$/i.exec(hex);
      if (match) {
        return `${match[1]}, ${match[2]}, ${match[3]}`;
      }
      // HEX 색상 처리
      hex = hex.replace(/^#/, '');
      if (hex.length === 3) {
        hex = hex.split('').map(h => h + h).join('');
      }
      const rgb = parseInt(hex, 16);
      return `${(rgb >> 16) & 0xFF}, ${(rgb >> 8) & 0xFF}, ${rgb & 0xFF}`;
    }

     // 스탬프 모드
    let stampMode = false;
    let currentStampURL = '';

    // 스탬프 버튼 클릭 이벤트
    $('.stamp-tool > button').on('click', function() {
        stampMode = true; // 스탬프 모드 활성화
        if ($(".stamp-tool").css("display") === "flex") {
          $(".stamp-tool").css("display", "none");
        } else {
          $(".stamp-tool").css("display", "flex");
        }
        currentStampURL = $(this).attr('data-url');
        canvas.isDrawingMode = false;
    });

    canvas.on('mouse:down', function(event) {
      $(".stamp").removeClass("active")
      if (stampMode && currentStampURL) {
          // 클릭한 위치 좌표 얻기
          const pointer = canvas.getPointer(event.e);
          const x = pointer.x;
          const y = pointer.y;
  
        // 스탬프 이미지 URL 설정
        const stampURL = `./img/content_01/${currentStampURL}.png`;
  
          // 이미지 로드 후 클릭한 위치에 추가
          fabric.Image.fromURL(stampURL, function(img) {
              img.set({
                  left: x, // 클릭한 X 좌표
                  top: y,  // 클릭한 Y 좌표
                  originX: 'center',
                  originY: 'center',
                  selectable: true // 이미지 이동 및 크기 조정 가능
              });
  
              // 이미지 크기 조정 (필요에 따라 조정)
              img.scale(0.5);
  
              // 캔버스에 이미지 추가
              canvas.add(img);
              canvas.renderAll();
          });
  
          stampMode = false; // 스탬프 모드 비활성화
      }
    });

    // 미션
    // 처음 진입 오디오 재생이 끝났을 때
    $(".start2").on('ended', function () {

      // 3초 후에 다른 오디오 재생
      setTimeout(function () {
        var nextAudio = new Audio('sound/contents_01/musical_daegeum1.mp3');
        nextAudio.play();
      }, 3000); // 3초 지연
    });
    var secondAudio = new Audio('./sound/narration/yu2_na_6.mp3');
    const names = ['daegeum', 'piri', 'sogeum', 'saenghwang'];
    let currentIndex = 1;

    $(".btn-ok").click(function () {
      $(".save-popup").css("display", "none")
      if (currentIndex < names.length) {
        $('.mission-wrap').each(function (index) {
          if (index < names.length) {
            $(this).attr('data-name', names[(index + currentIndex) % names.length]);
          }
        });

        setTimeout(function () {
          // 현재 미션에 해당하는 오디오 재생
          var currentMissionName = names[currentIndex];
          var audioSrc = './sound/contents_01/musical_' + currentMissionName + '1.mp3';
          var audio = new Audio(audioSrc);
          audio.play();
          audio.onended = function () {
            secondAudio.play();
          };
        }, 2000);

        currentIndex++
      } else {
        finish();
      }
      saveCanvasToFinishBox();
      canvas.clear();
    });

    function finish() {
      $(".select-01").fadeOut();
      $(".finish").fadeIn();
    }


    // 툴 사운드
    var nowTool = null; //현재 툴 저장
    var startTime = null; //마우스 다운 시간 저장

    // 도구 선택 시 이벤트 핸들러
    $('.tool > button').on('click', function() {
        nowTool = $(this).data('name');
        startTime = new Date(); // 도구 사용 시작 시간 기록
        console.log('Tool selected:', nowTool);
    });

    // 브러시, 색연필, 형광펜의 마우스 다운 및 업 이벤트 처리
    canvas.on('mouse:down', function(event) {
        if (nowTool === 'brush' || nowTool === 'colored-pencil' || nowTool === 'highlighter') {
            startTime = new Date(); // 도구 사용 시작 시간 기록
        }
    });

    canvas.on('mouse:up', function(event) {
        if (nowTool === 'brush' || nowTool === 'colored-pencil' || nowTool === 'highlighter') {
            var endTime = new Date();
            var duration = (endTime - startTime) / 1000; // 사용 시간 계산 (초 단위)

            if (duration > 1) {
                playSound('tool_pen_long.ver.mp3');
            } else {
                playSound('tool_pen_short.ver.mp3');
            }
        } else if (nowTool === 'stamp') {
            playSound('tool_stamp.mp3');
        } else if (nowTool === 'eraser') {
            playSound('tool_eraser.mp3');
        }
    });

    function playSound(filename) {
        var audio = new Audio('./sound/contents_01/' + filename);
        audio.play();
    }
  }

 
  
  // save-pop
  $(".board-tool .btn > .btn-save").click(function(){
    $(".save-popup").css("display","flex")
  });

  $(".btn-no, .close").click(function(){
    $(".save-popup").css("display","none")
  });

  
  let saveCount = 0;
  function saveCanvasToFinishBox() {
    // 캔버스 데이터를 URL로 추출
    var imgDataURL = canvas.toDataURL();

    // finish-box 내의 div 요소들 선택
    var finishDivs = $('.finish-box div');
    
    // 저장할 div 선택
    var targetDiv = finishDivs.eq(saveCount);

    // 새로운 이미지 요소 생성
    var img = $('<img>').attr('src', imgDataURL).attr('alt', 'Canvas Image');
    targetDiv.append(img);

    saveCount++;
  }

   // btn-sound 클릭 시 해당 미션의 오디오 재생
   $('.btn-sound').on('click', function() {
    // 클릭한 버튼이 속한 mission-wrap의 data-name 속성 가져오기
    var missionName = $(this).closest('.mission-wrap').attr('data-name');
    
    var audioSrc = './sound/contents_01/musical_' + missionName + '1.mp3';
    var audio = new Audio(audioSrc);
    
    // 오디오 재생
    audio.play();
    audio.onended = function() {
      secondAudio.play();
    };
  });

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
