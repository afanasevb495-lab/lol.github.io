<?php require '_boot.php';out(empty($_SESSION['ok'])?['ok'=>false]:['ok'=>true,'csrf'=>$_SESSION['csrf']]);
