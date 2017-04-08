<?php
    $action = $_REQUEST['action'];

    switch ($action) {
        case "playFallout":
            echo "Fallout Coming Soon";
            break;
        case "exitToDesktop":
            exec('killall epiphany-browser');
            echo('Exiting Retro Terminal...');
            break;
        case "logOut":
            exec('logout');
            echo('Logging out...');
            break;
        case "reboot":
            exec('sudo reboot');
            echo('Rebooting...');
            break;
        case "shutdown":
            exec('sudo shutdown');
            echo('Shutting down...');
            break;
    }
?>