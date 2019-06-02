//TODO: MAKE A DIRECTORY SYSTEM THAT IS DYNAMIC... tercer tes
var util = util || {};
util.toArray = function(list) {
   return Array.prototype.slice.call(list || [], 0);
};

var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
   window.URL = window.URL || window.webkitURL;
   window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

   var cmdLine_ = document.querySelector(cmdLineContainer);
   var output_ = document.querySelector(outputContainer);

   const CMDS_ = [
      'cat', 'clear', 'date', 'echo', 'help', 'uname', 'whoami', 'me'
   ];

   var fs_ = null;
   var cwd_ = null;
   var history_ = [];
   var histpos_ = 0;
   var histtemp_ = 0;

   window.addEventListener('click', function(e) {
      cmdLine_.focus();
   }, false);

   cmdLine_.addEventListener('click', inputTextClick_, false);
   cmdLine_.addEventListener('keydown', historyHandler_, false);
   cmdLine_.addEventListener('keydown', processNewCommand_, false);

   //
   function inputTextClick_(e) {
      this.value = this.value;
   }

   //
   function historyHandler_(e) {
      if (history_.length) {
         if (e.keyCode == 38 || e.keyCode == 40) {
            if (history_[histpos_]) {
               history_[histpos_] = this.value;
            } else {
               histtemp_ = this.value;
            }
         }

         if (e.keyCode == 38) { // up
            histpos_--;
            if (histpos_ < 0) {
               histpos_ = 0;
            }
         } else if (e.keyCode == 40) { // down
            histpos_++;
            if (histpos_ > history_.length) {
               histpos_ = history_.length;
            }
         }

         if (e.keyCode == 38 || e.keyCode == 40) {
            this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
            this.value = this.value; // Sets cursor to end of input.
         }
      }
   }

   //
   function processNewCommand_(e) {

      if (e.keyCode == 9) { // tab
         e.preventDefault();
         // Implement tab suggest.
      } else if (e.keyCode == 13) { // enter
         // Save shell history.
         if (this.value) {
            history_[history_.length] = this.value;
            histpos_ = history_.length;
         }

         // Duplicate current input and append to output section.
         var line = this.parentNode.parentNode.cloneNode(true);
         line.removeAttribute('id')
         line.classList.add('line');
         var input = line.querySelector('input.cmdline');
         input.autofocus = false;
         input.readOnly = true;
         output_.appendChild(line);

         if (this.value && this.value.trim()) {
            var args = this.value.split(' ').filter(function(val, i) {
               return val;
            });
            var cmd = args[0].toLowerCase();
            args = args.splice(1); // Remove cmd from arg list.
         }

         execCMD(cmd, args);

         window.scrollTo(0, getDocHeight_());
         this.value = ''; // Clear/setup line for next input.
      }
   }

   //
   function formatColumns_(entries) {
      var maxName = entries[0].name;
      util.toArray(entries).forEach(function(entry, i) {
         if (entry.name.length > maxName.length) {
            maxName = entry.name;
         }
      });

      var height = entries.length <= 3 ?
          'height: ' + (entries.length * 15) + 'px;' : '';

      // 12px monospace font yields ~7px screen width.
      var colWidth = maxName.length * 7;

      return ['<div class="ls-files" style="-webkit-column-width:',
              colWidth, 'px;', height, '">'];
   }

   //
   function output(html) {
      output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
   }

   // Cross-browser impl to get document's height.
   function getDocHeight_() {
      var d = document;
      return Math.max(
         Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
         Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
         Math.max(d.body.clientHeight, d.documentElement.clientHeight)
      );
   }

   function execCMD(cmd, args){
      switch (cmd) {
         case 'cat':
            var url = args.join(' ');
            if (!url) {
               output('Usage: ' + cmd + ' https://s.codepen.io/...');
               output('Example: ' + cmd + ' https://s.codepen.io/AndrewBarfield/pen/LEbPJx.js');
               break;
            }
            $.get( url, function(data) {
               var encodedStr = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                  return '&#'+i.charCodeAt(0)+';';
               });
               output('<pre>' + encodedStr + '</pre>');
            });          
            break;
         case 'clear':
            output_.innerHTML = '';
            this.value = '';
            return;
         case 'date':
            output( new Date() );
            break;
         case 'echo':
            output( args.join(' ') );
            break;
         case 'help':
            output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
            break;
         case 'uname':
            output(navigator.appVersion);
            output("penis");  
            break;
         case 'app':
         // we are now creating the function to load the desired app script
         function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
var runAppFunction = function() {
   output(appFunction());
};
//preparing the name
            var appInput = args.join(' ');
            if(appInput.indexOf("-") !== -1){
            var Dashposition = appInput.indexOf("-") - 1; 
            appInput = appInput.slice(0, Dashposition);}
            var appLink = "js/apps/" + appInput + ".js";
            console.log(appLink);
            loadScript(appLink, runAppFunction);
         break;
         case 'pwd':
               output(directoryFunction("pwd"));
         break;
         case 'cd':
         directoryFunction("changeDir", args.join(''));
         break;
         case 'ls':
         $.get("directory_mng.php", { dir: localStorage.getItem("directory") , action:"ls" }, function(data){
            output(data);
          });
         break;
         case 'mkdir':
         var joinedArgs = args.join(''); 
           if(!joinedArgs.startsWith("/")) {var mkdirDir = localStorage.getItem("directory") + "/" + args.join('');} else {var mkdirDir = joinedArgs;}
          $.get("directory_mng.php", { dir: mkdirDir , action:"mkdir" }, function(data){
            output(data);
          });
         break;
         case 'rm':
         var joinedArgs = args.join(''); 
         if(!joinedArgs.startsWith("/")) {var mkdirDir = localStorage.getItem("directory") + "/" + args.join('');} else {var mkdirDir = joinedArgs;}
        $.get("directory_mng.php", { dir: mkdirDir , action:"rm" }, function(data){
          output(data);
        });
         break;
         case 'touch':
         var joinedArgs = args.join(''); 
         if(!joinedArgs.startsWith("/")) {var mkdirDir = localStorage.getItem("directory") + "/" + args.join('');} else {var mkdirDir = joinedArgs;}
        $.get("directory_mng.php", { dir: mkdirDir , action:"touch" }, function(data){
          output(data);
        });
         break;
         case 'upload':
         output('<form action="directory_mng.php" method="post" enctype="multipart/form-data"><input type="hidden" name="action" value="upload">Select image to upload:<input type="file" name="fileToUpload" id="fileToUpload"><input type="submit" value="Upload Image" name="submit"><input type="hidden" name="dir" id="dirInput"></form><script>document.getElementById("dirInput"). value = mkdirDir;</script>');
         var joinedArgs = args.join(''); 
         if(!joinedArgs.startsWith("/")) {var mkdirDir = localStorage.getItem("directory") + "/" + args.join('');} else {var mkdirDir = joinedArgs;}
         document.getElementById("dirInput").value = mkdirDir;

         break;
         case 'unzip':
         $.get("directory_mng.php", { dir: localStorage.getItem("directory") , action:"unzip", file: args.join('') }, function(data){
            output(data);
          });
         break;
         default:
            if (cmd) {
               output(cmd + ': command not found');
            }
      };
   }
   //
   return {
      init: function() {
         output('<h2>Welcome to js-os</h2><p>' + new Date() + '</p><p>Enter "help" for more information.</p>');
      },
      output: output
   }
};

$(function() {
   console.log('Inspired by https://codepen.io/AndrewBarfield/pen/LEbPJx.js');

   $('.prompt').html('[root@js-os] # ');

   // Initialize a new terminal object
   var term = new Terminal('#input-line .cmdline', '#wrapper output');
   term.init();
});
//EXTRA SCRIPTS BY ME
//Func to hide or show the draggable div app 
// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
//SHOW OR HIDE THE #MYDIV WHICH IS THE POPUP, WE ALSO HIDE THE WRAPPER WHICH IS THE CONSOLE
function Popup(mode) {
   var x = document.getElementById("mydiv");
   var y = document.getElementById("wrapper");
   if(mode == 1){mode = "hide";}
    if (mode == "hide") {
      x.style.display = "none";
      y.style.display = "block";
    } else{ if(mode == "show"){
      x.style.display = "block";
      y.style.display = "none";
    } }
}
//Save directory information
var directory = localStorage.getItem("directory");
console.log(localStorage.getItem("directory") + "this is the localget result");

//function to change dir
function directoryFunction(action, location){
   if(action == "changeDir"){
      if(!location.startsWith("/")){ directory = directory + "/" + location; } else {directory = location;}
      directory =  directory.replace("undefined","");
      console.log("log from the function " + directory);
      localStorage.setItem("directory", directory);
   }
   if(action == "pwd") {
      console.log("this is return " + directory);
      return directory;
   }
}
