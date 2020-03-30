# PROJETO TCC CIÊNCIA DA COMPUTAÇÂO 7 PERÍODO

<h2>Tecnologias Utilizadas Para desenvolvimento.</h2>

<h4>Linguagem de Programação</h4>

<table style="text-align:center;border:1px solid;">
  <thead>
    <tr>
      <th>Linguagem</th>
      <th>Documentação</th>
      <th>Open Source</th>
      <th>Link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>C#</td>
      <td><a href="https://docs.microsoft.com/pt-br/dotnet/csharp/">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://docs.microsoft.com/pt-br/dotnet/csharp/</td>
    </tr>
    <tr>
      <td>JavaScript ES6</td>
      <td><a href="https://www.ecma-international.org/ecma-262/5.1/">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://www.ecma-international.org/ecma-262/5.1/</td>
    </tr>
    <tr>
      <td>HTML5</td>
      <td><a href="https://dev.w3.org/html5/html-author/">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://dev.w3.org/html5/html-author/</td>
    </tr>
    <tr>
      <td>Css3</td>
      <td><a href="https://devdocs.io/css/">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://devdocs.io/css/</td>
    </tr>
  </tbody>
</table>

<h4>Tecnologias de fornecimento de serviços</h4>

<table style="text-align:center;border:1px solid;">
  <thead>
    <tr>
      <th>Tecnologia</th>
      <th>Documentação</th>
      <th>Open Source</th>
      <th>Link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>NodeJS</td>
      <td><a href="https://nodejs.org/api/">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://nodejs.org/api/</td>
    </tr>
  </tbody>
</table>

<h4>FrameWorks</h4>


<table style="text-align:center;border:1px solid;">
  <thead>
    <tr>
      <th>FrameWork</th>
      <th>Documentação</th>
      <th>Open Source</th>
      <th>Link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Vue.js</td>
      <td><a href="https://vuejs.org/">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://vuejs.org/</td>
    </tr>
  </tbody>
</table>

<h4>Banco de Dados</h4>

<table style="text-align:center;border:1px solid;">
  <thead>
    <tr>
      <th>Tecnologia</th>
      <th>Documentação</th>
      <th>Open Source</th>
      <th>Link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>MySql</td>
      <td><a href="https://dev.mysql.com/doc/">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://dev.mysql.com/doc/</td>
    </tr>
    <tr>
      <td>MongoDB</td>
      <td><a href="https://docs.mongodb.com/">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://docs.mongodb.com/</td>
    </tr>
  </tbody>
</table>

<h4>Software edição de texto</h4>

<table style="text-align:center;border:1px solid;">
  <thead>
    <tr>
      <th>Software</th>
      <th>Site</th>
      <th>Open Source</th>
      <th>Link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Visual Studio Code</td>
      <td><a href="https://code.visualstudio.com/download">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://code.visualstudio.com/download</td>
    </tr>
    <tr>
      <td>Visual Studio 2019 Comunity</td>
      <td><a href="https://visualstudio.microsoft.com/pt-br/vs/">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://visualstudio.microsoft.com/pt-br/vs/</td>
    </tr>
  </tbody>
</table>

<h4>Configurando Ambiente</h4>
<h2>Servidores de Banco de Dados</h2>

<p>se não estiver no linux instale uma vm com LINUX SERVER</p>
<h5>mysql</h5>
<pre>
~$ sudo apt-get install -y mysql-server
~$ mysql -u root -p
</pre>

<p>caso não de acesso é por causa do plugin do usuário root que já vem configurado com connection socket</p>

<pre>
~$sudo su
USER# mysql -u root -p
mysql> use mysql;
Database changed
mysql> select user.Host, user.User, user.Plugin from user;
+-----------+------------------+-----------------------+
| Host      | User             | Plugin                |
+-----------+------------------+-----------------------+
| localhost | root             | authentication_socket |
| localhost | mysql.session    | mysql_native_password |
| localhost | mysql.sys        | mysql_native_password |
| localhost | debian-sys-maint | mysql_native_password |
+-----------+------------------+-----------------------+
mysql> update user set Plugin="mysql_native_password" where User="root";
Query OK, 0 rows affected (0.02 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> flush privileges;
Query OK, 0 rows affected (0.05 sec)
mysql> exit;
Bye
USER# exit
~$ sudo systemctl restart mysql.service
~$ mysql -u root -p
mysql>
</pre>

<p>pronto agora você tem acesso a base</p>

<h4>MongoDB</h4>

<pre>
~$ wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
~$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
~$ sudo apt-get update
~$ sudo apt-get install -y mongodb
~$ mongo
MongoDB shell version v3.6.3
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.6.3
Server has startup warnings: 
2020-03-19T20:25:49.153-0300 I STORAGE  [initandlisten] 
2020-03-19T20:25:49.153-0300 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2020-03-19T20:25:49.153-0300 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2020-03-19T20:25:53.802-0300 I CONTROL  [initandlisten] 
2020-03-19T20:25:53.802-0300 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2020-03-19T20:25:53.802-0300 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2020-03-19T20:25:53.802-0300 I CONTROL  [initandlisten] 
> exit
bye
~$
</pre>

<h2>Nodejs</h2>

<p>No ambiente Windows é só baixar o instalador clicar em next e pronto.</p>
<p>Agora no linux eu aconcelho a baixar o tar.xz ou tar.gz contendo a versão mais atual.<br/>E extrair e colocar os arquivos nos repositorios do systema.<br/>caso não saiba como fazer isto assista <a href="https://www.youtube.com/watch?v=lLasE80ouzA&t=1219s">o vídeo de titio diolinux</a>.
</p>

<h2>Configurando Frameworks</h2>

<pre>
~$ sudo npm install --save @vue/cli
~$ sudo npm install --save nodemon
~$ sudo npm install --save pm2
</pre>

<h3>Depois de instalado</h3>

<pre>
~$ cd Server/
~$ npm install
~$ sudo chmod -x ./start.sh
~$ ./start.sh
> server@1.0.0 serve /home/victor/Documentos/Projects/tcc/Server
> nodemon index.js

[nodemon] 2.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
</pre>

<h2>Instalar o vscode e o visual studio</h2>

<p>Basta acessar o link do top da pagina, que contem o site oficial.<br/>Dependendo de sua condição financeira baixe o interprise, caso não tenha baixa o comunity e é nós.<br/>O vscode é gratuito.</p>

<h2>OBS: Utilize a Chave do produto caso não seja open source</h2>

