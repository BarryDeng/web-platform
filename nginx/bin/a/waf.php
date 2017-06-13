<?php
function waf(){
	$uri = parse_url($_SERVER["REQUEST_URI"]);
	parse_str($uri['query'], $query);
    $keywords = array(
		"union",
        "select",
        "insert",
        "where",
        "update",
        "order",
        "flag",
		"etc",
    );
    foreach($keywords as $token){
        foreach($query as $k => $v){
            if(stristr($k, $token)){bad();}
            if(stristr($v, $token)){bad();}
        }
    }
}
function bad($s){die('<h1>WAF!</h1>');}
waf();
