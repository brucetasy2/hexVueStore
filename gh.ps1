npm run build
cd Dist
git init 
git add -A 
git commit -m 'deploy'
git push -f https://github.com/brucetasy2/hexVueStore.git master:gh-pages