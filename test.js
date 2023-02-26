

const locale = {};
dayjs.locale(locale, null, true);


let cDay = document.querySelector('#date');
let cTime = document.querySelector('#time');
let hour = document.querySelector('#hour');
let now = dayjs();
let currentHour = now.format('H');
let saveBtn = $('.saveBtn');


$(function () {
  refreshColor();
  displayText();


  function displayText() {
    let blockObj = JSON.parse(localStorage.getItem('plannerNotes')) || {}
    let textKeys = Object.keys(blockObj)
    for (let i = 0; i < textKeys.length; i++) {
      $(`#text-${textKeys[i]}`).val(blockObj[textKeys[i]])
    }
  }


  $(saveBtn).click(function(){
    let id = $(this).parent().attr("id")
    console.log($(this).siblings('.description'))
    console.log(id)
    let blockId = $(this).parent().attr('id')
    let blockText = $(this).siblings('.description').val()
    

    let blockObj = JSON.parse(localStorage.getItem('plannerNotes')) || {}
    blockObj[blockId] = blockText
    localStorage.setItem('plannerNotes', JSON.stringify(blockObj))
  })


  function refreshColor() {
    $('.time-block').each(function(){
 
      if (this.id == currentHour) {
        $(this).removeClass('past future').addClass('present');
      }else if (this.id < currentHour){
        $(this).removeClass('future present').addClass('past');
      }else {
        $(this).removeClass('past present').addClass('future');
      }
      
      if (currentHour > 17 || currentHour < 9) {
        $(this).removeClass('past present').addClass('future');
      }
    })
  }


  setInterval(function () {
    cDay.textContent = dayjs().format('MMMM/DD/YYYY');
    cTime.textContent = dayjs().format('hh:mm:ss a');

    refreshColor()
  }, 1000);
});


function updateTime() {
    const dateElement = document.querySelector("#date");
    const timeElement = document.querySelector("#time");
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
    dateElement.textContent = currentDate;
    timeElement.textContent = currentTime;
  }
  
  setInterval(updateTime, 1000);
  