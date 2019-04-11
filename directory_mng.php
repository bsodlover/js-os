<?php
//TODO: WE NEED TO MAKE THE WRITE CONTENTS
if(!is_writable("js/index.js")){die("<h1>ERROR PERMISSION:Please give the folder permissions, chmod 777 -R and your directory.</h1>");}
$currentDir =  getcwd() . $_GET["dir"];
//echo $currentDir;
if(isset($_GET["action"])){
    if($_GET["action"] == "read"){
     echo file_get_contents($currentDir);
    }
} elseif ($_POST["action"] == "write") {
        $currentDir = getcwd() .  $_POST["dir"];
        $content = $_POST["data"];
        file_put_contents($currentDir, $content);
        echo "<h1>Request has been recived and proceesed, this windows will close in 2 segs.</h1>";
        echo "Dir: " . $currentDir . "<br>Content:" . $content . '<script>function closeWin() { 
            window.top.close();
        }
        setTimeout(function(){ 
            closeWin()
        }, 1000);</script>';
} elseif ($_POST["action"] == "upload") {
    //echo "upload works";
    $target_dir = getcwd() . $_POST["dir"];
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is  - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is  - " . $check["mime"] . ".";
        $uploadOk = 1;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "file is  large.";
    $uploadOk = 1;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    //echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 1;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}  
} 
if ($_GET["action"] == "mkdir") {
    $dir = getcwd() . $_GET["dir"];
    if(!mkdir($dir, 0777, true)) {
        die('Error creating folders, maybe it has been already created, otherwise check permisssions.');
    } else {echo "Folder created succesfully";}
}
elseif ($_GET["action"]== "ls") {
    $currentDir = getcwd() . $_GET["dir"];
    //echo $currentDir;
    $ls = scandir($currentDir);
    //print_r($ls);
    echo '<div class="ls-div">';
    foreach ($ls as $value){
        if (is_dir($value)) {
            echo '<file class="ls-files" style="color: green;">' . $value . '</file>';
        } else {
        echo '<file class="ls-files">' . $value . '</file>';
        }
    }
    echo "</div>";
}elseif ($_GET["action"]== "rm") {
    $currentDir = getcwd() . $_GET["dir"];
     if (!is_dir($currentDir)) {
    if (!unlink($currentDir)) {
        echo "ERROR: file or folder not deleted";
    } else {
        echo "file deleted";
    }
} else {
    if(!rmdir($currentDir)){
        echo "ERROR: folder not deleted";
    } else {
        echo "folder deleted";
    }
}
}elseif ($_GET["action"]== "touch") {
    $currentDir = getcwd() . $_GET["dir"];
    if (!touch($currentDir)) {
      echo "File not created";  
    } else {
        echo "file created";
    }
} elseif ($_GET["action"] == "unzip") {
    

$zip = new ZipArchive;
$fileDir = getcwd() . $_GET["dir"] . "/" .  $_GET["file"];
echo "file dir" .  $fileDir; 
$res = $zip->open($fileDir);
if ($res === TRUE) {
    $dir = getcwd() . $_GET["dir"];
    echo "dir" . $dir;
  $zip->extractTo($dir);
  $zip->close();
  echo 'file unziped';
} else {
  echo '<h1>Error</h1>';
}
}
?>