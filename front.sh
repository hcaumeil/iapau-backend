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
mkdir account
cd account
git clone https://github.com/hcaumeil/iapau-datachallenges.git
cd iapau-datachallenges
npm i
npm run build
cp -r build ..
cd ..
rm -fr iapau-site
cp -r build/* .
rm -fr build
