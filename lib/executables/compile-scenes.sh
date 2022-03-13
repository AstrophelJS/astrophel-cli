initiatedProjectPath=`pwd`
astrophelCLIPath=$(npm root -g)/astrophel-cli
echo Compiling the project ...

payload=( "$@" )
cd $astrophelCLIPath/lib
node $astrophelCLIPath/node_modules/hygen/dist/bin.js scenes-compiler scenes --initiatedProjectPath=$initiatedProjectPath --compiledProjectPath=$astrophelCLIPath/compiled "${payload[@]//\%20/ }"

echo Project successfully compiled
echo Starting the App

cd $astrophelCLIPath/compiled/$projectName
npm install
node $astrophelCLIPath/compiled/$projectName/node_modules/react-scripts/bin/react-scripts.js start