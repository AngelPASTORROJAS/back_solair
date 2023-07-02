RENAME USER 'root' TO 'new_root'; -- Attention
SELECT user FROM mysql.user;
SELECT DISTINCT User FROM mysql.user;
CREATE USER 'Angel'@'containers-us-west-88.railway.app' IDENTIFIED BY '#UnM0t2P4SS?';