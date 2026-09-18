#!/bin/sh
if [ "$#" -eq 1 ]; then
    eval "$1"
else
    exec "$@"
fi
