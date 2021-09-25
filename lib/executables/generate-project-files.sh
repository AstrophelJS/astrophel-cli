installedModulePath=$(npm root -g)/astrophel-cli
starterProjectPath=$installedModulePath/lib/starters/$starterType/

mkdir $projectName
cd $projectName
initiatedProjectPath=`pwd`

echo Copying starter project ...
cp -r $starterProjectPath $initiatedProjectPath
echo ${projectName} has been created successfully