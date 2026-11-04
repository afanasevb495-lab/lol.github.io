<?php
session_set_cookie_params(['httponly'=>true,'samesite'=>'Lax','secure'=>!empty($_SERVER['HTTPS'])]);
session_start();header('Content-Type: application/json; charset=utf-8');
$C=require __DIR__.'/config.php';
function out($a){echo json_encode($a,JSON_UNESCAPED_UNICODE);exit;}
function need(){if(empty($_SESSION['ok'])||!hash_equals($_SESSION['csrf']??'',$_SERVER['HTTP_X_CSRF']??'')){http_response_code(403);out(['ok'=>false,'err'=>'Нет доступа, войдите заново']);}}
function jin(){return json_decode(file_get_contents('php://input'),true)?:[];}
