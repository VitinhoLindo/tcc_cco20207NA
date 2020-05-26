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
    <tr>
      <td>Php7.14</td>
      <td><a href="https://www.php.net/manual/pt_BR/intro-whatis.php">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://www.php.net/manual/pt_BR/intro-whatis.php</td>
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
      <td>Nginx</td>
      <td><a href="https://www.nginx.com/">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://www.nginx.com/</td>
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
    <tr>
      <td>Laravel</td>
      <td><a href="https://laravel.com/docs/7.x">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://laravel.com/docs/7.x</td>
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
    <!-- <tr>
      <td>MongoDB</td>
      <td><a href="https://docs.mongodb.com/">aqui</a></td>
      <td>sim</td>
      <td style="text-align:left;">https://docs.mongodb.com/</td>
    </tr> -->
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
~$ cd platform/
~$ npm install
~$ npm run serve
</pre>

<h2>Instalar o vscode e o visual studio</h2>

<p>Basta acessar o link do top da pagina, que contem o site oficial.<br/>Dependendo de sua condição financeira baixe o interprise, caso não tenha baixa o comunity e é nós.<br/>O vscode é gratuito.</p>

<h2>OBS: Utilize a Chave do produto caso não seja open source</h2>

<h2>Intalando Php</h2>

<pre>
~$ sudo apt install software-properties-common
~$ sudo add-apt-repository ppa:ondrej/php
~$ sudo apt-get update
~$ sudo apt install php7.4
~$ sudo apt install nginx
~$ sudo apt remove --purge apache2
~$ sudo apt install php7.4-fpm
</pre>

<h2>Configurando nginx</h2>

<p>se no seu caso o path for este /etc/nginx/sites-enabled/default<br/><strong>siga o tutorial abaixo.</strong><p>
 
<pre>
~$ sudo nano /etc/nginx/sites-enabled/default
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Default server configuration
#
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	# SSL configuration
	#
	# listen 443 ssl default_server;
	# listen [::]:443 ssl default_server;
	#
	# Note: You should disable gzip for SSL traffic.
	# See: https://bugs.debian.org/773332
	#
	# Read up on ssl_ciphers to ensure a secure configuration.
	# See: https://bugs.debian.org/765782
	#
	# Self signed certs generated by the ssl-cert package
	# Don't use them in a production server!
	#
	# include snippets/snakeoil.conf;

	#access_log /var/log/nginx/laravel-access.log;
	#error_log /var/log/nginx/laravel-error.log;
        root /var/www/html/

	# Add index.php to the list if you are using PHP
	index index.php index.html index.htm index.nginx-debian.html;

	server_name _;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ /index.php?$query_string;
	}

	# pass PHP scripts to FastCGI server
	#
	location ~ \.php$ {
		include snippets/fastcgi-php.conf;
		# With php-fpm (or other unix sockets):
		fastcgi_pass unix:/var/run/php/php-fpm.sock;
		# With php-cgi (or other tcp sockets):
		#fastcgi_pass 127.0.0.1:9000;
	}

	# deny access to .htaccess files, if Apache's document root
	# concurs with nginx's one
	#
	#location ~ /\.ht {
	#	deny all;
	#}
}


# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#	listen 80;
#	listen [::]:80;
#
#	server_name example.com;
#
#	root /var/www/example.com;
#	index index.html;
#
#	location / {
#		try_files $uri $uri/ =404;
#	}
#}

</pre>

<h3>Mude para</h3>

<pre>
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Default server configuration
#
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	# SSL configuration
	#
	# listen 443 ssl default_server;
	# listen [::]:443 ssl default_server;
	#
	# Note: You should disable gzip for SSL traffic.
	# See: https://bugs.debian.org/773332
	#
	# Read up on ssl_ciphers to ensure a secure configuration.
	# See: https://bugs.debian.org/765782
	#
	# Self signed certs generated by the ssl-cert package
	# Don't use them in a production server!
	#
	# include snippets/snakeoil.conf;

	#access_log /var/log/nginx/laravel-access.log;
	#error_log /var/log/nginx/laravel-error.log;
	root <strong>[path_project]</strong>;

	# Add index.php to the list if you are using PHP
	index index.php index.html index.htm index.nginx-debian.html;

	server_name _;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ /index.php?$query_string;
	}

	# pass PHP scripts to FastCGI server
	#
	location ~ \.php$ {
		try_files $uri =404;
		fastcgi_split_path_info ^(.+\.php)(/.+)$;
		fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
		fastcgi_index index.php;
		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
		include fastcgi_params;
	}

	# deny access to .htaccess files, if Apache's document root
	# concurs with nginx's one
	#
	#location ~ /\.ht {
	#	deny all;
	#}
}


# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#	listen 80;
#	listen [::]:80;
#
#	server_name example.com;
#
#	root /var/www/example.com;
#	index index.html;
#
#	location / {
#		try_files $uri $uri/ =404;
#	}
#}

<strong>[ctrl+o]</strong>
<strong>[enter]</strong>
<strong>[ctrl+x]</strong>
</pre>

<p>apos mudar as configurações de restart no nginx</p>

<pre>
~$ sudo systemctl restart nginx
~$ sudo /etc/init.d/php7.4-fpm restart
</pre>

<h2>Continuar instalação do php</h2>

<pre>
~$ sudo apt-get install -y libcurl4-openssl-dev php-dev libmcrypt-dev php-pear php-mbstring php-xml php7.3-intl php7.3-curl php7.3-xsl php7.3-xsl php7.3-zip php7.3-soap php7.3-gd
~$ 
</pre>