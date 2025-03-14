#!/bin/bash

if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root. Use sudo."
    exit 1
fi

echo 0 > /proc/sys/kernel/randomize_va_space

echo 0 > /proc/sys/kernel/yama/ptrace_scope

echo 0 > /proc/sys/kernel/apparmor_restrict_unprivileged_userns

current_value=$(cat /proc/sys/kernel/randomize_va_space)
if [ "$current_value" -eq 0 ]; then
    echo "ASLR has been disabled."
else
    echo "Failed to disable ASLR."
fi

current_value=$(cat /proc/sys/kernel/yama/ptrace_scope)
if [ "$current_value" -eq 0 ]; then
    echo "ptrace_scope has been disabled."
else
    echo "Failed to disable ptrace_scope."
fi

current_value=$(cat /proc/sys/kernel/apparmor_restrict_unprivileged_userns)
if [ "$current_value" -eq 0 ]; then
    echo "Apparmor restriction has been disabled."
else
    echo "Failed to disable apparmor restriction."
fi
