Config

Add these libs into your parent project

     yarn add 
        native-base
        react-native-easy-app
        teaset
        ahooks
     yarn add --dev 
        @babel/plugin-proposal-nullish-coalescing-operator
        @babel/plugin-proposal-optional-chaining
        babel-eslint
        babel-plugin-module-resolver
        eslint-plugin-import
        
In a directory of your parent project that you want to be a submodule, execute the following command to create a submodule:
    
    git submodule add https://github.com/StarksJohn/RNProjectTools



     
Execute the following command in the root directory of your parent project to update the latest code of the master branch of this repository:

    git submodule update --remote
    
    
Other collaborators of your parent project can use the following command to update the latest commit of this submodule you push
        
    git pull --recurse-submodules

If the code of the submodule is changed in the main project, you can view the change record in submodules of sourceTree

push

    If push fails in sourceTree,like:
    
    LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 

    It can be changed to Push after turning over the wall in the terminal
