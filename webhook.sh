git stash
git pull --rebase origin main
# on linux there needs to be a fresh install of Next.js
rm -rf node_modules && rm yarn.lock && rm package-lock.json
yarn install
yarn run build
pm2 restart react-tables.com