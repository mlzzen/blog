hexo g
git add -A
git commit -m "update blog"
git push origin hexo
cd .\source\_posts
git add -A
git commit -m "update blog"
git push origin master
ssh -i "c:/users/creanme/.ssh/home" root@118.24.122.15 -p 2510 > /dev/null 2>&1 << eeooff
cd /var/www/blog
git pull origin hexo
echo done!