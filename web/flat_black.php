<?php
/**
 * Created by JetBrains PhpStorm.
 * User: PiVo
 * Date: 03.07.12
 * Time: 0:17
 * To change this template use File | Settings | File Templates.
 */
require_once dirname(__FILE__) . '/../Twig/Autoloader.php';
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem('../templates');
$twig = new Twig_Environment($loader, array(
                                           'debug' => true
                                      ));
$filename = str_replace('.php', '', basename(__FILE__));
echo $twig->render("pages/side/catalog/$filename.html.twig");