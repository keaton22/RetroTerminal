<?php
    $action = $_REQUEST['action'];

    switch ($action) {
        case "playFallout":
            break;
        case "exitToDesktop":
            exec('killall epiphany');
            break;
        case "logOut":
            exec('logout');
            break;
        case "reboot":
            exec('sudo reboot');
            break;
        case "shutdown":
            exec('sudo shutdown');
            break;
    }
?>