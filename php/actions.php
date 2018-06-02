<?php
    $action = $_REQUEST['action'];

    switch ($action) {
        case 'playFallout':
            break;
        case 'logoff':
            shell_exec('sudo -u chip killall epiphany');
            break;
        case 'reboot':
        shell_exec('sudo /sbin/shutdown -r now');
            break;
        case 'shutdown':
            shell_exec('sudo /sbin/shutdown -h now');
            break;
    }
?>
