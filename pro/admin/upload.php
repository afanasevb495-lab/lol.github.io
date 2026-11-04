<?php require '_boot.php';need();$f=$_FILES['f']??null;
if(!$f||$f['error']||$f['size']>10*1024*1024)out(['err'=>'Файл не загружен (до 10 МБ)']);
$i=@getimagesize($f['tmp_name']);$e=[IMAGETYPE_JPEG=>'jpg',IMAGETYPE_PNG=>'png',IMAGETYPE_WEBP=>'webp',IMAGETYPE_GIF=>'gif'][$i[2]??0]??null;
if(!$e)out(['err'=>'Нужна картинка JPG, PNG, WEBP или GIF']);
$n='uploads/'.date('ymd-His').'-'.bin2hex(random_bytes(3)).'.'.$e;
if(!move_uploaded_file($f['tmp_name'],dirname(__DIR__).'/'.$n))out(['err'=>'Нет прав на запись в uploads']);
out(['url'=>$n]);
