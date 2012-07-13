<?php
/**
 * Created by JetBrains PhpStorm.
 * User: PiVo
 * Date: 11.07.12
 * Time: 15:50
 * To change this template use File | Settings | File Templates.
 */
$array = array(
	array('n'=> 1, 'a'=> 1),
	array('n'=> 1, 'a'=> 2),
	array('n'=> 2, 'a'=> 65),
	array('n'=> 1, 'a'=> 100),
	array('n'=> 1, 'a'=> 13),
);

$arrayMust = array(
	array('n'=> 1, 'a'=> array(1, 2)),
	array('n'=> 2, 'a'=> 65),
	array('n'=> 1, 'a'=> array(100, 13)),
);

//region pivo
$in = $array;
$out_ = array();
$group = array();
foreach ($in as $row) {
	if (!isset($row_prev['n']) || $row['n'] != $row_prev['n']) {
		if (count($group)) {
			$out_[] = $group;
		}
		$group = array();
	}
	$group[] = $row;
	$row_prev = $row;
}
if (count($group)) {
	$out_[] = $group;
}
$out_p = array();
foreach($out_ as $key=>$rows){
	foreach($rows as $row){
		$out_p[$key]['n'] = $row['n'];
		$out_p[$key]['a'][] = $row['a'];
	}
}
//endregion pivo
//region gdx
$key = 0;
foreach ($array as $arrayIn) {
	foreach ($arrayIn as $id => $val) {
		if (isset($arrayNew[$arrayIn['n']]['a'])) {
			$tempArr = $arrayNew[$arrayIn['n']]['a'];
			$tempArr[] = $arrayIn['a'];
		} else {
			$tempArr[] = $arrayIn['a'];
		}
		if ($arrayNew[$key - 1]['n'] != $arrayIn['n']) {
			$key++;
		}
		$arrayNew[$key] = array('n' => $arrayIn['n'], 'a' => $tempArr);
	}
}
//endregion gdx

// region galmi
$in = $array;
$out = array();
foreach ($in as $row) {
	if (!isset($out[$row['n']])) {
		$out[$row['n']] = array();
	}
	$out[$row['n']][] = $row['a'];
}
//endregion
header('content-type: text/plain');
echo 'was:';
print_r($array);
echo 'pivo:';
print_r($out_p);
echo 'gdx:';
print_r($arrayNew);
echo 'galmi:';
print_r($out);
echo 'must:';
print_r($arrayMust);