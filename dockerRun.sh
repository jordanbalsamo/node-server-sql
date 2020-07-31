#in local development, you can spin up a Docker container and test this out :)
#see here: https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash

# with docker:
sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=<YourStrong@Passw0rd>" \
   -p 1433:1433 --name sql1 \
   -d mcr.microsoft.com/mssql/server:2019-CU5-ubuntu-18.04

#required to give SQL Server process to start.
echo "Standby. Waiting for SQL Server to start inside container..."
sleep 30

docker exec -i sql1 bash \
-c '/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "<YourStrong@Passw0rd>" -Q "CREATE DATABASE test1"'

PORT=3000 SQL_USER=SA SQL_PASSWORD="<YourStrong@Passw0rd>" SQL_SERVER=localhost SQL_DATABASE=test1 node server.js
# only including the above secrets, as they are the default suggested by the above article :)

# without docker - i.e. bring your own arguments:
#PORT=3000 SQL_USER= SQL_PASSWORD= SQL_SERVER= SQL_DATABASE= node server.js
