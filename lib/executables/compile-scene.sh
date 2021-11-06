initiatedProjectPath=`pwd`
astrophelCLIPath=$(npm root -g)/astrophel-cli
echo Compiling the project ...

payload=( "$@" )
cd $astrophelCLIPath/lib
node $astrophelCLIPath/node_modules/hygen/dist/bin.js scene-compiler scenes --initiatedProjectPath=$initiatedProjectPath --compiledProjectPath=$astrophelCLIPath/compiled "${payload[@]//\%20/ }"

echo Project successfully compiled