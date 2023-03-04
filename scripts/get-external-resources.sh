#!/bin/sh

# Loading might fail if the SRI hash doesn't match.
# https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity#tools_for_generating_sri_hashes

cd $(git rev-parse --show-toplevel)
cd "resources/external"

pwd
printf "Continue [y/n]: "
read choice

if [[ "$choice" != "y" ]]; then
    exit
fi

C="curl -L -o"

$C modern-normalize.css https://cdn.jsdelivr.net/npm/modern-normalize@1.1.0/modern-normalize.css
