CREATE PROCEDURE get_roles_by_login_utilisateur (IN login_utilisateur VARCHAR(50))
BEGIN
    SELECT r.id, r.nom, r.description
    FROM role r
    INNER JOIN utilisateur_role ur ON r.id = ur.role_id
    INNER JOIN utilisateur u ON ur.utilisateur_id = u.id
    WHERE u.login = login_utilisateur;
END

-- to call
CALL get_roles_by_login_utilisateur('john_doe');

-- to EXEC
EXEC get_roles_by_login_utilisateur 'john_doe'

-- to SHOW
SHOW CREATE PROCEDURE get_roles_by_login_utilisateur


