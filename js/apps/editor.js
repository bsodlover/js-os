/*
PLEASE DO NOT USE THIS CODE AS ANY REFERENCE, 
IT IS POORLY WRITTEN,
PLEASE LOOK AT THE GITHUB DOCUMENTATION
*/

//TODO: MAKE A SELECT FILE IN CAE OF DIR BEINGI A FOLDER
function appFunction() {
Popup("show");
$('head').append('<link rel="stylesheet" href="js/lib/codemirror.css"><script src="js/lib/codemirror.js"></script><script>var editor = CodeMirror.fromTextArea("myTextarea");</script><script>document.getElementById("closeBtn").style.display = "block"; document.getElementById("myTextarea").style.display = "block"; function closeBtn() { console.log("closeBtn has been called");  var div = document.createElement("div"); div.id = "closeDiv"; div.style.width = "100px"; div.style.height = "100px"; div.innerHTML = "<button onclick=Popup(1)>Close without save</button>"; document.getElementById("popupContent").appendChild(div); domInputs(); }</script><script> textareaFunction(); </script><script> var downVar = 1; function SaveData(data) { const formdata = data; if(downVar == 1){ downVar = 2; document.getElementById("myTextarea").value = formdata;  var savedresponse = formdata;   console.log("this has run"); } }</script>');
document.getElementById("popupContent").innerHTML = '<textarea id="myTextarea"></textarea>';
return "window created";
}
function domInputs() {
    document.getElementById("closeBtn").style.display = "none";
    document.getElementById("myTextarea").style.display = "none";
    const textareavalue = document.getElementById("myTextarea").value;
    document.getElementById("closeDiv").innerHTML = '<button onclick="Popup(1)">close</button><form method="POST" target="_blank" action="directory_mng.php"><input type="hidden" name="dir" id="dirInput"><input name="action" type="hidden" value="write"><input type="hidden" id="textareaInput" name="data"><button type="submit">save</button></form>';
    document.getElementById("dirInput").value = localStorage.getItem("directory");
    document.getElementById("textareaInput").value = document.getElementById("myTextarea").value;
}
function textareaFunction() {
    
    $.get("directory_mng.php", { dir: localStorage.getItem("directory") , action:"read" }, function(data){
        SaveData(data);
      });
}
//js/index.js
//$(document).ready(function () {ajax_call = function() {$.ajax({ type: "GET",url: getLink,dataType: "html", success: function (response) {SaveData(response);}});};var interval = 5000;setInterval(ajax_call, interval);});