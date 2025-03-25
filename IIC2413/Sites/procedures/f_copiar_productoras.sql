CREATE OR REPLACE FUNCTION insertar_productora(username_productora varchar(100), contrasena_productora varchar(100), tipo_productora varchar(100))

RETURNS void AS $$

BEGIN    
  IF username_productora NOT IN (SELECT username FROM usuarios) THEN
    INSERT INTO usuarios (username, contrasena, tipo) VALUES (username_productora, contrasena_productora, tipo_productora);
  END IF;
END
$$ language plpgsql