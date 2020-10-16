# PROJETO TCC CIÊNCIA DA COMPUTAÇÂO 7 PERÍODO

<div>
  <h4>Informações</h4>
  <p>Segue abaixo a lista contendo informações do sistema operacional de cada desenvolvedor.</p>

  <ul>
    <li><a>victorpsf2@hotmail.com</a> linux</li>
    <li><a>marcondes166@gmail.com</a> windows</li>
    <li><a>tiagosouza_tp@hotmail.com</a> windows</li>
  </ul>
</div>

<div>
  <h1>Tecnologias</h1>

  <p>segue a baixo a lista de tecnologias que estão sendo utilizadas no projeto.</p>
</div>

<div>
  <h3>Base de dados</h3>

  <ul>
    <li><a href="https://www.mongodb.com/">mongodb</a></li>
    <li><a href="https://dev.mysql.com/">mysql</a></li>
  <ul>
</div>

<div>
  <h3>Servidor</h3>

  <ul>
    <li><a href="https://nodejs.org/en/">nodejs</a></li>
  <ul>
</div>

<div>
  <h3>Interface</h3>

  <ul>
    <li><a href="https://vuejs.org/">vuejs</a></li>
  <ul>
</div>

<div>
  <h3>Modelagem do sistema</h3>
  <img src="https://user-images.githubusercontent.com/28913310/91219834-aa7c4880-e6f1-11ea-97f7-91e4c0ed52b1.png" alt="modelagem do sistema">
</div>

<div>
  <h3>Apresentação do Sistema</h3>
  <img src="https://user-images.githubusercontent.com/28913310/91220546-b4527b80-e6f2-11ea-8dd7-e3e41e12361e.png", alt="apresentação do sistema">
</div>

<div>
  <h3>Como utilizar o projeto</h3>

  <div style="margin: 10px 0px">
    <h4>Requisitos</h4>
    <ul>
      <li>nodejs instalado</li>
      <li>npm instalado</li>
      <li>vuejs instalado</li>
      <li>mysql-server instalado</li>
      <li>mongodb-community instalado</li>
    </ul>
  </div>

  <div style="margin: 10px 0px">
    <h4>Passos do servidor</h4>
    <ol>
      <li>Entrar do diretorio do servidor e rodar o comando 
        <pre>~/tcc_cco20207NA/servidor$ npm install</pre>
      </li>
      <li>Entar no diretorio da interface e rodar o comando
        <pre>~/tcc_cco20207NA/servidor/app/interface$ npm install</pre>
      </li>
    </ol>
    <p>Se você tiver o Mysql-Workbench e desejar realizar por lá fique a vontade.</br>Este exemplo foi realizado no linux.</p>
  </div>

  <div>
    <h4>Passos do mysql</h4>
    <ol>
      <li>Executar os scripts da pasta
        <pre>~/tcc_cco20207NA/database/mysql-scripts$ ls -l
</br>-rw-rw-r-- 1 $GROUP $USER  697 ago 24 22:23 access.sql
-rw-rw-r-- 1 $GROUP $USER 2145 jul 23 00:59 sql1.sql
-rw-rw-r-- 1 $GROUP $USER 2215 jul 23 00:59 sql2.sql
-rw-rw-r-- 1 $GROUP $USER 3734 jul 23 00:59 sql3.sql
-rw-rw-r-- 1 $GROUP $USER 2050 jul 23 00:59 sql4.sql
-rw-rw-r-- 1 $GROUP $USER 3853 jul 23 00:59 sql5.sql
-rw-rw-r-- 1 $GROUP $USER  400 ago 24 15:14 sql6.sql
-rw-rw-r-- 1 $GROUP $USER  398 ago 24 15:18 sql7.sql
</br>~/tcc_cco20207NA/database/mysql-scripts$ mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.0.21-0ubuntu0.20.04.4 (Ubuntu)

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>create database optica;
Query OK, 1 row affected (0.01 sec)
</br>mysql>exit
Bye
</br>~/tcc_cco20207NA/database/mysql-scripts$ mysql -u root -p optica < sql1.sql
~/tcc_cco20207NA/database/mysql-scripts$ mysql -u root -p optica < sql2.sql
~/tcc_cco20207NA/database/mysql-scripts$ mysql -u root -p optica < sql3.sql
~/tcc_cco20207NA/database/mysql-scripts$ mysql -u root -p optica < sql4.sql
~/tcc_cco20207NA/database/mysql-scripts$ mysql -u root -p optica < sql5.sql
~/tcc_cco20207NA/database/mysql-scripts$ mysql -u root -p optica < sql6.sql
~/tcc_cco20207NA/database/mysql-scripts$ mysql -u root -p optica < sql7.sql
~/tcc_cco20207NA/database/mysql-scripts$ mysql -u root -p optica < access.sql
        </pre>
      </li>
    </ol>
  </div>

  <div style="margin: 10px 0px">
    <h4>Passos do Mongodb</h4>
    <ol>
      <li>Importar o backup da pasta<pre>~/tcc_cco20207NA/database/mongodb$ ls -l
</br>-rw-rw-r-- 1 $GROUP $USER 2526544 ago 25 20:16 personConfig.json
~/tcc_cco20207NA/database/mongodb$ mongoimport --db=config --collection=person --file=personConfig.json
  </pre></li>
    </ol>
  </div>
</div>

