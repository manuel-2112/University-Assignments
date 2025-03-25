CREATE OR REPLACE FUNCTION crear_tabla_usuarios()

RETURNS void AS $$

BEGIN
  DROP TABLE IF EXISTS usuarios;
  CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    username varchar(100),
    contrasena varchar(30),
    tipo varchar(30));
END
$$ language plpgsql