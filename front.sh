rm -fr public
mkdir public
cd public
git clone https://github.com/hcaumeil/iapau-site.git
cd iapau-site
npm i
npm run build
cp -r build ..
cd ..
rm -fr iapau-site
cp -r build/* .
rm -fr build
