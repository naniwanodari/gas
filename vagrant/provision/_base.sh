#!/bin/bash -eu

echo -------------------------------------------------
echo
echo                    OS更新等
echo
echo -------------------------------------------------

echo exclude=centos-release* >> /etc/yum.conf
yum -y update
yum -y install kernel kernel-devel
yum -y groupinstall "Base" "Development tools" "Japanese Support"

echo -------------------------------------------------
echo
echo                    ユーティリティー
echo
echo -------------------------------------------------

yum -y install epel-release tree pv dstat zsh man-pages-ja zip unzip

echo -------------------------------------------------
echo
echo                    タイムゾーン設定
echo
echo -------------------------------------------------

timedatectl set-timezone Asia/Tokyo

echo -------------------------------------------------
echo
echo                    言語、キーボード設定
echo
echo -------------------------------------------------

localedef -f UTF-8 -i ja_JP ja_JP.utf8
localectl set-locale LANG=ja_JP.utf8
localectl set-keymap jp106

echo -------------------------------------------------
echo
echo                    SELinux 無効化
echo
echo -------------------------------------------------

setenforce 0
sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config

echo -------------------------------------------------
echo
echo                    Firewalld 無効化
echo
echo -------------------------------------------------

systemctl stop firewalld
systemctl disable firewalld

echo -------------------------------------------------
echo
echo                    ssh 設定
echo
echo -------------------------------------------------

cp /etc/ssh/sshd_config /etc/ssh/sshd_config.org
sed -i 's/^PasswordAuthentication.no/#PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config
sed -i 's/^#PermitRootLogin yes/PermitRootLogin yes/' /etc/ssh/sshd_config
systemctl restart sshd
