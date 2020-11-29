#!/bin/bash -eu

echo -------------------------------------------------
echo
echo                    Nodejs14.x
echo
echo -------------------------------------------------

yum localinstall -y https://rpm.nodesource.com/pub_14.x/el/7/x86_64/nodejs-14.15.1-1nodesource.x86_64.rpm

echo -------------------------------------------------
echo
echo                    Node Version
echo
echo -------------------------------------------------

node --version

echo -------------------------------------------------
echo
echo                    npm Version
echo
echo -------------------------------------------------

npm --version

echo -------------------------------------------------
echo
echo                    リポジトリの変更
echo
echo -------------------------------------------------

npm config set registry http://registry.npmjs.org/