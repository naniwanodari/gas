#!/bin/bash -eu

echo -------------------------------------------------
echo
echo                    変数
echo
echo -------------------------------------------------

BASE_DIR=/vagrant/provision

echo -------------------------------------------------
echo
echo                    基本
echo
echo -------------------------------------------------

. $BASE_DIR/_base.sh

echo -------------------------------------------------
echo
echo                    Node.js
echo
echo -------------------------------------------------

. $BASE_DIR/_node14.sh

echo -------------------------------------------------
echo
echo                    Clasp
echo
echo -------------------------------------------------

npm install -g @google/clasp
clasp -v
clasp login --no-localhost

echo -------------------------------------------------
echo
echo                    Permission
echo
echo -------------------------------------------------

# ログはvagrantユーザー見れるようにする
find /var/log -type d -exec chmod a+rx {} +
find /var/log -type f -exec chmod a+r {} +

echo -------------------------------------------------
echo
echo                    クリア
echo
echo -------------------------------------------------

yum clean all
history -c
