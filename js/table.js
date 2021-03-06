var file = "http://www.vandyaasa.com/Mentorlist.txt";
var peopleArray = [];

var textBox = document.getElementById('searchInput');

textBox.addEventListener('keyup', function(){
  console.log("test");
});

console.log('test');

function test() {
  alert("tes");
}

$.get(file, function(data){
  var lines = data.split("\n"); // creates array of each line

  for(var i = 0; i < lines.length; i++){
    if(/^\s*$/.test(lines[i])){
      lines.splice(i,1);  // remove blank indexes
      i--;  // check same index for repeating blank lines
    }
  }

  var numOfPeople = (lines.length+1)/6 - 1; // 6 = num of lines per person

  for(var i = 0; i < numOfPeople; i++){
      peopleArray[i] = {
        fullname: lines[i * 6],
        pronouns: lines[i * 6 + 1],
        hometown: lines[i * 6 + 2],
        study: lines[i * 6 + 3],
        involvement: lines[i * 6 + 4],
        contact: lines[i * 6 + 5]
      }
  }

  // sort people by alphabetical order
  peopleArray.sort(function(a,b) {
    var afullname = a.fullname.toLowerCase();
    var bfullname = b.fullname.toLowerCase();

    if(afullname < bfullname) {
      return -1;
    }

    if(afullname > bfullname) {
      return 1;
    }

    return 0;
  });

  makeGrid(peopleArray, numOfPeople, personInfo);
});

function makeGrid(peopleArray, numOfPeople, personInfo) {
  console.log(peopleArray);

  $(".cell").remove();

  var con = " Contact Me";

  for(var i = 0; i < numOfPeople; i++){

    var personInfo = "<div class=\"cell\"><h2>" + peopleArray[i].fullname + "</h2><ul>";

    if(peopleArray[i].pronouns.trim() != 'n/a'){
      personInfo += "<li>" + peopleArray[i].pronouns + "</li>";
    }

    if(peopleArray[i].hometown.trim() != 'n/a'){
      personInfo += "<li>" + peopleArray[i].hometown + "</li>";
    }

    if(peopleArray[i].study.trim() != 'n/a'){
      personInfo += "<li>" + peopleArray[i].study + "</li>";
    }

    if(peopleArray[i].involvement.trim() != 'n/a'){
      personInfo += "<li>" + peopleArray[i].involvement + "</li>";
    }

    personInfo += "</ul><ul class=\"bottom\"><li><a href=\"malto:" + peopleArray[i].contact + "\" target=\"_blank\"><img alt=\"Contact\" src=\"img/mail-clipart.png\">"
    + con + "</a></li></ul>"

    $('#mentor-grid').append(personInfo);
  }
}
