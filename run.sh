#in local development, you can spin up a Docker container and test this out :)
#see here: https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash

#with docker:
PORT=3000 SQL_USER=SA SQL_PASSWORD="<YourStrong@Passw0rd>" SQL_SERVER=localhost SQL_DATABASE=test1 node server.js
# only including the above secrets, as they are the default suggested by the above article :)

#without docker - i.e. bring your own arguments:
PORT=3000 SQL_USER= SQL_PASSWORD= SQL_SERVER= SQL_DATABASE= node server.js
