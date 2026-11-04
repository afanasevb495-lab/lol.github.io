<?php require '_boot.php';need();$d=jin();
if(!password_verify((string)($d['old']??''),$C['hash']))out(['ok'=>false,'err'=>'Текущий пароль неверный']);
$n=(string)($d['new']??'');if(strlen($n)<8)out(['ok'=>false,'err'=>'Новый пароль короче 8 символов']);
file_put_contents(__DIR__.'/config.php','<?php return '.var_export(['login'=>$C['login'],'hash'=>password_hash($n,PASSWORD_DEFAULT)],true).';',LOCK_EX);out(['ok'=>true]);
