---
title: letsencrypt的免费https证书申请与nginx部署
date: 2018-06-06 18:44:52
tags: [nginx, https]
---

## 使用certbot获取证书
* 第一步 选择好使用的软件和系统，然后页面就自动滚动到了相应处。
* 第二步 使用下面命令安装相关工具。

    <pre>yum -y install yum-utils</pre>
    <pre>yum-config-manager --enable rhui-REGION-rhel-server-extras rhui-REGION-rhel-server-optional</pre>

* 第三步 安装python-cert-nginx 
    <pre>$ sudo yum install python2-certbot-nginx</pre>
* 第四步 使用命令，获得证书
    <pre>$ sudo certbot --nginx</pre>
* 第五步 打开nginx.conf 添加
    <pre>
    server {
        listen 443 ssl;
        server_name blog.riyue.me;
        ssl_certificate /etc/letsencrypt/live/riyue.me/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/riyue.me/privkey.pem;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        ssl_dhparam /etc/ssl/certs/dhparam.pem;
        ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
        ssl_session_timeout 1d;
        ssl_session_cache shared:SSL:50m;
        ssl_stapling on;
        ssl_stapling_verify on;
        add_header Strict-Transport-Security max-age=15768000;
        # The rest of your server block
        root /var/www/blog/public;
        index index.html index.htm;
        location / {
                try_files $uri $uri/ =404;
        }
    }
    </pre>

* 第六步 重启nginx

