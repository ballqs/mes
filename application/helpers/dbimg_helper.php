<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/* mysql에 upload 할 blob type 을 반환하는 함수 */
if ( ! function_exists('getblob')) {
  function getblob($tag_name = ''){  // html에서 받아온 file tag name
    $Picture = $_FILES[$tag_name]['tmp_name'];
    $PSize = filesize($Picture);
    $mysqlPicture = addslashes(fread(fopen($Picture, "r"), $PSize));
    return $mysqlPicture;
  }
}

// if ( ! function_exists('console')) {
//   function getblob($file = array(), $tag_name = ''){  // $_FILES, html에서 받아온 file tag name
//     $Picture = $file[$tag_name]['tmp_name'];
//     $PSize = filesize($Picture);
//     $mysqlPicture = addslashes(fread(fopen($Picture, "r"), $PSize));
//     return $mysqlPicture;
//   }
// }

// if ( ! function_exists('srcpath')) {
//   function srcpath($tag_name = ''){
//     mysql_connect($host, $username, $password) or die("SQL 서버에 접속할 수 없습니다.");
//     @mysql_select_db($db) or die("데이터베이스를 선택할 수 없습니다.");
//     $result=mysql_query("select * from Images") or die("쿼리를 실행할 수 없습니다.");
//     while($row=mysql_fetch_object($result))
//     {
//     echo " SRC="SecondType.php3?PicNum=$row->PicNum">";
//     }
//   }
// }
//
// if ( ! function_exists('getimg')) {
//   function getimg($tag_name = ''){
//     $result=mysql_query("select * from Images where PicNum=$PicNum") or die("쿼리를 실행할 수 없습니다.");
//     $row=mysql_fetch_object($result);
//     Header("Content-type:image/gif");
//     echo $row->Image;
//   }
// }

if ( ! function_exists('blobtoimg')) {
  function blobtoimg($blob_data = ''){
    Header("Content-type:image/gif");
    echo $blob_data;
  }
}


if ( ! function_exists('citest')) {
  function citest($blob_data = ''){
    $CI =& get_instance();
    /*
    $CI->db
    [username] => root
    [password] => 200207moMos$
    [hostname] => localhost
    [database] => momosmes
    */
    print_r($CI->db->username);

    // mysql_connect($host, $username, $password) or die("SQL 서버에 접속할 수 없습니다.");
    // @mysql_select_db($db) or die("데이터베이스를 선택할 수 없습니다.");
    // $result=mysql_query("select * from Images") or die("쿼리를 실행할 수 없습니다.");
    // while($row=mysql_fetch_object($result))
    // {
    // echo " SRC="SecondType.php3?PicNum=$row->PicNum">";
    // }

  }
}
