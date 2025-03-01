#!/bin/bash

if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root. Use sudo."
    exit 1
fi

echo 1 > /proc/sys/kernel/randomize_va_space

echo 1 > /proc/sys/kernel/yama/ptrace_scope

current_value=$(cat /proc/sys/kernel/randomize_va_space)
if [ "$current_value" -eq 1 ]; then
    echo "ASLR has been enabled."
else
    echo "Failed to enable ASLR."
fi

current_value=$(cat /proc/sys/kernel/yama/ptrace_scope)
if [ "$current_value" -eq 1 ]; then
    echo "ptrace_scope has been enabled."
else
    echo "Failed to enable ptrace_scope."
fi
