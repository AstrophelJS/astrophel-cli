installedModulePath=$(npm root -g)/astrophel-cli
projectName=$1
initiatedProjectPath=`pwd`

mkdir $projectName && cd $projectName
git clone https://github.com/AstrophelJS/astrophel-project.git .

echo Cloning starter project ...
echo ${projectName} has been created successfully