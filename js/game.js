const numDivs = 36;
const maxHits = 10;

let hits = 0;
let penalty = 0;
let firstHitTime = 0;

function round() {
  let divSelector = randomDivId();  
  $(divSelector).addClass("target").text(hits + 1);

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#game-score").text(`${(hits-penalty) > 0 ? hits-penalty : 0}/${maxHits}.`);
  $("#win-message").removeClass("d-none");
  $(".target").removeClass("target").text('');
  $(".cover").addClass("d-flex");
  hits = penalty = 0;
}

function handleClick(event) {
  // корректное нажатие
  if ($(event.target).hasClass("target")) {
    $(event.target).removeClass("target").text('');
    $('.miss').removeClass("miss"); // для всех элементов .miss

    hits = hits + 1;
    round();
  } // ошибочное нажатие кнопки
  else {
    $(event.target).addClass("miss");
    penalty += 1;
  }
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
  // клик по промежутку между кнопками даст промах:
  $('.game-fields>.row').click(() => { 
    if ($(event.target).hasClass('row')) { // без этой проверки будет добавлять .miss кнопкам, а не строке
      $(event.target).addClass("miss"); 
      penalty += 1;
    }});
  // клик по окошку "Нажмите чтобы начать"
  $(".cover").click(function() {
    $(event.target).removeClass("d-flex"); // прячем
    $("#win-message").addClass("d-none");
    firstHitTime = getTimestamp(); // засекаем время и погнали
    round();
  })
}

$(document).ready(init);
