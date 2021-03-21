Config

Add these libs into your parent project

     yarn add 
        native-base
        react-native-easy-app
        teaset
     yarn add --dev 
        @babel/plugin-proposal-nullish-coalescing-operator
        @babel/plugin-proposal-optional-chaining
        babel-eslint
        babel-plugin-module-resolver
        eslint-plugin-import
        
In a directory of your parent project that you want to be a submodule, execute the following command to create a submodule:
    
    git submodule add https://github.com/cham1985/RNProjectTools



     
Execute the following command in the root directory of your parent project to update the latest code of the master branch of this repository:

    git submodule update --remote
    
    
Other collaborators of your parent project can use the following command to update the latest commit of this submodule you push
        
    git pull --recurse-submodules
