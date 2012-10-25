<?php
/**
 * Created by JetBrains PhpStorm.
 * User: PiVo
 * Date: 03.07.12
 * Time: 0:17
 * To change this template use File | Settings | File Templates.
 */
session_start();
$form_fields = array('name'   => '',
                     'email'  => '',
                     'phone'  => '',
                     'message'=> '',
);
if (isset($_POST['feedback'])) {
	$params = $_POST['feedback'];

	if (isset($params['name'], $params['email'], $params['message'])) {
		$name = $params['name'];

		mail('lightdreamstudio@gmail.com', " Заказ сайта от $name lightdream", $params['message'] . $params['email']);
		$redirect_url = $_SERVER['HTTP_REFERER'];
		if ($redirect_url) {
			$_SESSION['message'] = 'Ваше сообщение отправлено';
			header("location: $redirect_url");
		}
	}else{
		$_SESSION['errors'][] = 'Не все поля заполнены';
	}
}