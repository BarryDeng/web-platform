<?php
error_reporting(E_ALL || ~E_NOTICE);
include "waf.php";
if (!isset($_GET['p']))
    die("missing parameters");
$p = $_GET['p'];
$p=str_replace("./","",$p);
$p=str_replace(".\\","",$p);
$b=substr(strstr($p, ".."), 2);
if(strstr($b, "../"))
    die("Too many ../");
$p='resource/'.$p;
if (!file_exists($p))
    die("file not found");
echo file_get_contents($p);
?>
