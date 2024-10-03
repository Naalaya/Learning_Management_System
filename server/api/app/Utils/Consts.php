<?php

namespace App\Utils;

class Consts
{
    // User Status
    const USER_STATUS_NORMAL  = 1;
    const USER_STATUS_BLOCKED = 2;
    const USER_STATUS_BANNED  = 3;

    // Auth Role
    const AUTH_ROLE_ADMIN   = 1;
    const AUTH_ROLE_TEACHER = 2;
    const AUTH_ROLE_STUDENT = 3;

    const LIMIT = 12;

    // Common folder name
    const COMMON_FOLDER_NAME = '0';

    const MORNING = ['label' => 'Buổi sáng', 'time_start' => '09:00', 'time_end' => '12:00'];
    const AFTERNOON = ['label' => 'Buổi chiều', 'time_start' => '13:00', 'time_end' => '18:00'];
    const EVENING = ['label' => 'Buổi tối', 'time_start' => '19:00', 'time_end' => '21:00'];

    const EXAM_TYPE_HOMEWORK = 1;
}
