## Adding Data to YugabyteDB

With our cluster running in the cloud, we can seed it with data using the provided `schema.sql` and `data.sql` files.

1. Install the [ysqlsh](https://docs.yugabyte.com/preview/admin/ysqlsh/) command-line utility. Alternatively, you can use the cloud shell to interact with your cluster.
2. Execute the `schema.sql` script against your cluster.

```
  % bin/ysqlsh "host='DB_HOST' port=5433 user=admin dbname='yugabyte' sslmode='require' sslrootcert='/path/to/root/certificate'" --file "/path/to/schema.sql"
```

3. Execute the `data.sql` script against your cluster.

```
  % bin/ysqlsh "host='DB_HOST' port=5433 user=admin dbname='yugabyte' sslmode='require' sslrootcert='/path/to/root.crt'" --file "/path/to/data.sql"
```

## Running Locally

This application consists of a Node.js server, YugabyteDB Database and React frontend.

1. Clone the repository and install the dependencies.

```
% git clone git@github.com:YugabyteDB-Samples/yugabytedb-azure-nodejs-demos.git
% cd yugabytedb-app-service-demo
% npm install
```

2. Open the `.env` file and set the environment variables.

3. Start the server.

```
% node index.js
```

4. View the application UI at http://localhost:8080.

## Deploying to Azure App Service

First, create a project in [Azure App Service](https://azure.microsoft.com/en-us/products/app-service/web#overview) with the Node.js runtime stack.

Azure provides multiple [deployment methods](https://learn.microsoft.com/en-us/azure/app-service/deploy-local-git?tabs=cli) for your applications.

Install the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli). It's also worth noting that Azure has a powerful [https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice](extension for Visual Studio Code), which can execute the same commands.

Configure your [application settings](https://learn.microsoft.com/en-us/cli/azure/webapp/config/appsettings?view=azure-cli-latest) in Azure.

```
# convert the downloaded CA certificate from YugabyteDB Managed to a single line string, then Base64 encode it
# Azure Configuration Settings forbid special characters, so this ensures the cert can be passed properly to our application
# Tip: Run this command to convert cert file to base64 encoded single line string:
# cat /path/to/cert/file | base64


% az webapp config appsettings set -g GROUP_NAME -n APPLICATION_NAME --setting DB_HOST=[YB_DB_HOST] DB_USERNAME=admin DB_PASSWORD=[YB_DB_PASSWORD] DB_CERTIFICATE=[BASE_64_ENCODED_DB_CERTIFICATE]
```

Next, use the Azure CLI to deploy our application code to the cloud.

1. Install the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli).
2. In the Azure Deployment Center, configure your Local Git / FTPS Credentials under User Scope
3. Configure the project for local git deployment.

```
% az webapp deployment source config-local-git --name APPLICATION_NAME --resource-group RESOURCE_GROUP


# output will contain git URL, i.e.


{
"url": "https://[username]@[app_name].scm.azurewebsites.net/[app_name].git"
}
```

4. Set git remote for Azure using the URL from previous output.

```
% git remote add azure https://[username]@[app_name].scm.azurewebsites.net/[app_name].git
```

5. Push to the Azure remote.

```
% git push azure main:master
```

After pushing to the remote repository, Azure will automatically build and publish the application!
