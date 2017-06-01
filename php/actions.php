<?php
    $action = $_REQUEST['action'];

    switch ($action) {
        case "playFallout":
            break;
        case "exitToDesktop":
            exec('-u chip killall epiphany');
            break;
        case "reboot":
            exec('sudo shutdown -r now');
            break;
        case "shutdown":
            exec('sudo shutdown -h now');
            break;
    }
?>