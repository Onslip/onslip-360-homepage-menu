<?php
$targetPath = 'http://localhost:3333/build/images' . basename($_FILES['file']['name']);
move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);
