initiatedProjectPath=`pwd`
installedModulePath=$(npm root -g)/astrophel-cli
starterProjectPath=$installedModulePath/lib/starters/$starterType/
projectName=$1

cd $installedModulePath/compiled

mkdir $projectName && cd $projectName
git clone https://github.com/AstrophelJS/astrophel-project.git .

mkdir $projectName
cd $projectName

echo Preparing the project ...
cp -r $starterProjectPath $initiatedProjectPath
echo ${projectName} has been created successfully