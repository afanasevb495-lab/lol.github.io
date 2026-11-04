<?php require '_boot.php';need();$h=file_get_contents('php://input');
if(strlen($h)<2000||stripos($h,'</html>')===false)out(['ok'=>false,'err'=>'Пустая страница, не сохранено']);
$r=dirname(__DIR__);@mkdir($r.'/backup');
if(is_file($r.'/index.html'))copy($r.'/index.html',$r.'/backup/index-'.date('Ymd-His').'.html');
$f=glob($r.'/backup/index-*.html');sort($f);foreach(array_slice($f,0,max(0,count($f)-15)) as $o)@unlink($o);
if(file_put_contents($r.'/index.html',$h,LOCK_EX)===false)out(['ok'=>false,'err'=>'Нет прав на запись index.html']);
out(['ok'=>true]);
