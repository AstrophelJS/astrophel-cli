initiatedProjectPath=`pwd`
echo Compiling the project ...
cd $(npm root -g)/astrophel-cli/lib
node $(npm root -g)/astrophel-cli/node_modules/hygen/dist/bin.js scene-compiler scenes --initiatedProjectPath=$initiatedProjectPath --filename=$filename $payload
echo Project successfully compiled