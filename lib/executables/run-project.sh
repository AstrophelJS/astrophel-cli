initiatedProjectPath=`pwd`
echo Compiling the project ...
cd $(npm root -g)/astrophel-cli/lib
npx hygen scene-compiler components --initiatedProjectPath=$initiatedProjectPath --componentName=$componentName > /dev/null
echo Project successfully compiled