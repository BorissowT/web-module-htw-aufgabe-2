$('#searchButton').on('click', ()=>{searchByTitle()})

document.onload = searchByTitle();

function searchByTitle(){
    var title = $("#searchArea").val();
    clearPrevResults();
    showFilms(title);
}

function clearPrevResults(){
  $("#result-box").empty();
}

function showFilms(searchParam){
  var resultList;
  $.get("https://swapi.dev/api/films/?search="+searchParam).then((response)=>{
          showResults(response.results);
          setListeners();
        });
}

function showResults(resultList){
  var resultBox = $("#result-box");
  for(var i=0; i<resultList.length; i++)
  {
    var elem = resultList[i];
    resultBox.append($(`<div class="result-container">
      <div class="movie-box">
        <div class="elseTitle">${elem.title}</div>
        <br>
        <h6>director: ${elem.director}</h6>
        <h6>producer: ${elem.producer}</h6>
        <h6>release date: ${elem.release_date}</h6>
        <button id="${elem.title}" class="detailsButton">Details</button>
      </div>
    </div>`));
  }
  
}

function setListeners(){
  var buttons = document.getElementsByClassName("detailsButton");
        for (let index = 0; index < buttons.length; index++) {
            buttons[index].onclick = function () {
              showMovieDetails(this.id);
         }
        }
}

function showMovieDetails(title){
  openDetailsPage();
  fillMovieElements(title);
}

function fillMovieElements(title){
  $.get("https://swapi.dev/api/films/?search="+title).then((response)=>{
          var results = response.results;
          $("#detailsTilte").text($("#detailsTilte").text()+results[0].title);
          console.log($("#detailsTilte").val());
          $("#opening_crawl").text($("#opening_crawl").text()+results[0].opening_crawl);
          $("#director").text($("#director").text()+results[0].director);
          $("#producer").text($("#producer").text()+results[0].producer);
          $("#release_date").text($("#release_date").text()+results[0].release_date);
          $("#url").text($("#url").text()+results[0].url);
        });
}

function openDetailsPage(){
  $(".details_container").css({"visibility":"visible"});
  $("#grey_background").css({"visibility":"visible"});
  $(".details_container").animate({width:"+=55%",height:"+=350px"});
}

$("#grey_background").on("click", function(){
  closeForm();
})

function closeForm(){
  $(".details_container").animate({width:"-=55%",height:"-=60%"}, function(){$(this).css({"visibility":"hidden"});});
  $("#grey_background").css({"visibility":"hidden"});
}