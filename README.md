# Projeto aberto iniciado como ideia de TCC

<h3>Desenvolvedores</h3>

<ul>
  <li><label>João Victor - </label><a href="https://github.com/VitinhoLindo">victorpsf2@hotmail.com</a></li>
</ul>

<h3>Linguagens</h3>

<ul>
  <li>EcmaScript - es6/es5</li>
  <li>Html5</li>
  <li>Css3</li>
</ul>

<h3>Banco de Dados</h3>

<ul>
  <li>Mysql</li>
  <li>MongoDB</li>
</ul>


<h3>Servidor</h3>

<ul>
  <li>Nodejs</li>
  <li>Mysql</li>
</ul>

<h3>Frameworks</h3>

<ul>
  <li>Vuejs - v3</li>
  <li>Express</li>
</ul>

<h2>Configuração e instalação</h2>


<h5>clonando projeto</h5>
<pre>
~$ git clone https://github.com/VitinhoLindo/tcc_cco20207NA.git
</pre>

<h5>instalando Nodejs</h5>
<a href="https://github.com/nodesource/distributions/blob/master/README.md">package manager</a>
<pre>
~$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
~$ sudo apt-get install -y nodejs
</pre>

<h5>Versão do Nodejs</h5>
<pre>
~$ node --version
v14.14.0
~$ npm --version
6.14.8
</pre>

<h5>instalando Mysql</h5>
<pre>
~$ sudo apt-get install -y mysql-server
</pre>

<h5>configuração Mysql</h5>
<pre>
~$ sudo mysql -u root -p
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.21-0ubuntu0.20.04.4 (Ubuntu)

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> use mysql
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> update user set plugin='caching_sha2_password' where User='root';
Query OK, 1 row affected (0.02 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> select user.User, user.Host, user.plugin from user;
+------------------+-----------+-----------------------+
| User             | Host      | plugin                |
+------------------+-----------+-----------------------+
| debian-sys-maint | localhost | caching_sha2_password |
| mysql.infoschema | localhost | caching_sha2_password |
| mysql.session    | localhost | caching_sha2_password |
| mysql.sys        | localhost | caching_sha2_password |
| root             | localhost | caching_sha2_password |
+------------------+-----------+-----------------------+
6 rows in set (0.00 sec)

mysql> exit
Bye
~$ sudo systemctl restart mysql.service
</pre>

<h5>Versão Mysql</h5>
<pre>
~$ sudo apt-get install -y mysql-server
</pre>

<h5>Instalando Mongodb</h5>
<pre>
~$ wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
OK
~$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
~$ sudo apt-get update
~$ sudo apt-get install -y mongodb
</pre>

<h5>Criando usuário MongoDB</h5>
<pre>
~$ mongo
MongoDB shell version v3.6.8
connecting to: mongodb://127.0.0.1:27017
Implicit session: session { "id" : UUID("efd0ee4f-ff9a-48b1-8b53-5959394b5d93") }
MongoDB server version: 3.6.8
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
        http://docs.mongodb.org/
Questions? Try the support group
        http://groups.google.com/group/mongodb-user
Server has startup warnings: 
2020-10-24T22:30:06.319+0000 I STORAGE  [initandlisten] 
2020-10-24T22:30:06.319+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2020-10-24T22:30:06.319+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2020-10-24T22:30:20.102+0000 I CONTROL  [initandlisten] 
2020-10-24T22:30:20.104+0000 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2020-10-24T22:30:20.104+0000 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2020-10-24T22:30:20.104+0000 I CONTROL  [initandlisten] 
> use admin
switched to db admin
db.createUser({ user: "root", pwd: "123456", roles: [ "readWrite", {role: "userAdminAnyDatabase" , db:"admin"} ] })
Successfully added user: {
  "user" : "root",
  "roles" : [
    "readWrite",
    {
      "role" : "userAdminAnyDatabase",
      "db" : "admin"
    }
  ]
}
> exit
bye
</pre>

<h5>Importando dados Mongodb</h5>
<pre>
~$ mongoimport --host=[host] --port=[port] --username=[user] --collection=person --db=config --file=personConfig.json
~$ mongoimport --host=[host] --port=[port] --username=[user] --collection=configuration --db=apps --file=appConfiguration.json
</pre>