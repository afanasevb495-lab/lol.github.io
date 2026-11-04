<?php require '_boot.php';$d=jin();
if(hash_equals($C['login'],(string)($d['login']??''))&&password_verify((string)($d['password']??''),$C['hash'])){session_regenerate_id(true);$_SESSION['ok']=1;$_SESSION['csrf']=bin2hex(random_bytes(16));out(['ok'=>true,'csrf'=>$_SESSION['csrf']]);}
sleep(1);out(['ok'=>false]);
