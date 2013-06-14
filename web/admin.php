<!doctype html>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title></title>
</head>
<body>
	<h1><a href="/admin.php">admin</a></h1>
	<?php
	/**
	 * Created by JetBrains PhpStorm.
	 * User: PiVo
	 * Date: 03.07.12
	 * Time: 0:17
	 * To change this template use File | Settings | File Templates.
	 */
	class admin
	{
		static public function main()
		{
			$rel_dir = isset($_GET['p']) ? $_GET['p'] : '';
			$tpl_dir = dirname(__FILE__) . '/../templates/pages/' . $rel_dir;
			$files = dir($tpl_dir);
			while ($file = $files->read()) {
				echo self::create_link($file, $tpl_dir, $rel_dir) . '<br>';
			}
			if (isset($_POST['content'], $_GET['f'])) {
				self::save($_POST['content'], $_GET['f'], $tpl_dir, $rel_dir);
			}
			if (isset($_GET['f'])) {
				echo self::form($_GET['f'], $tpl_dir, $rel_dir);
			}
		}

		static function create_link($filename, $folder, $rel)
		{
			$string = '';
			if (is_file($folder . '/' . $filename)) {
				$string = "<p><a href='/admin.php?f=$filename&p=$rel'>$filename</a></p>";
			}
			elseif (is_dir($folder . '/' . $filename) && $filename !== '..' && $filename !== '.') {
				$string = "<h2><a href='/admin.php?p=$rel/$filename' style='font-weight: bold;'>$filename</a></h2>";
			}
			return $string;
		}

		private static function form($file, $tpl_dir, $folder)
		{
			$content = file_get_contents($tpl_dir . '/' . $file);
			$tpl = <<<EOF
<form action="/admin.php?f=$file&p=$folder" method="post">
	<input type="submit" value="save"/>
	<textarea name="content" id="content" cols="150" rows="20">$content</textarea>
	<input type="submit" value="save"/>
</form>
EOF;

			return $tpl;
		}

		private static function save($content, $file, $tpl_dir, $rel_dir)
		{
			if (is_file($tpl_dir . '/' . $file)) {
				file_put_contents($tpl_dir . '/' . $file, stripcslashes($content));
			}
		}
	}

	admin::main();
	?>
</body>
</html>
