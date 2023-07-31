TO SET UP THIS PROJECT DO THE FOLLOWING

### DOWNLOAD NODE
* FOR WINDOWS GO [HERE](https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi)
* FOR MAC GO [HERE](https://nodejs.org/dist/v18.17.0/node-v18.17.0.pkg)

### DOWNLOAD MONGODB
 - FOR WINDOWS GO [HERE](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.8-signed.msi)
 - FOR MAC GO [HERE](https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-6.0.8.tgz)

### DOWNLOAD MONGODB TOOLS
 - FOR WINDOWS GO [HERE](https://downloads.mongodb.org/migrator/1.1.3/MongoDB%20Relational%20Migrator-1.1.3.msi)
 - FOR MAC GO [HERE](https://downloads.mongodb.org/migrator/1.1.3/MongoDB%20Relational%20Migrator-1.1.3.dmg)

### DOWNLOAD THE CODE FROM GITHUB
 - THE CODEBASE CAN BE FETCHED FROM THIS [LINK](https://www.mongodb.com/try/download/relational-migrator#)
 - Click on the CODE button and select the "Download ZIP" option.


After installing everything, navigate to the directory where you downloaded the code from GitHub.

Copy the path at which  the file that was downloaded above was and enter the following command.

`cd <directory where zip file was downloaded>`

Install the dependencies necessary to run the project with the command below

`npm install`

To run the API part of the project run the following command

`npm run api-dev`

To run the UI portion of the project run the following command

`npm run dev-run`

To populate  the DB

Run the following command substituting the <collection> tag with the collections listed below

`mongoimport --collection=<collection> --db AIPS db_backup/<collection>.json`

- category
- declared_item
- entrants
- entry
- prompt
- purpose_of_visit
- prompt
- question