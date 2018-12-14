CREATE DATABASE IF NOT EXISTS database_development;

GRANT ALL PRIVILEGES on database_development.*
TO 'root'@'%' IDENTIFIED BY 'password'
WITH GRANT OPTION;

FLUSH PRIVILEGES;