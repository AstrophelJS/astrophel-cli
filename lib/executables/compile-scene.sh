initiatedProjectPath=`pwd`
echo Compiling the project ...

payload=( "$@" )
cd $(npm root -g)/astrophel-cli/lib
node $(npm root -g)/astrophel-cli/node_modules/hygen/dist/bin.js scene-compiler scenes --initiatedProjectPath=$initiatedProjectPath "${payload[@]//\%20/ }"

echo Project successfully compiled