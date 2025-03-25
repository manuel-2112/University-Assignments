CREATE OR REPLACE FUNCTION importar_artistas()

RETURNS void AS $$

DECLARE
  artista RECORD;
  datos_artista RECORD;
  username_artista VARCHAR(100);
  contrasena_generada VARCHAR(30);

BEGIN

    FOR datos_artista IN (SELECT * FROM artistas)
    LOOP
      SELECT lower(datos_artista.nombre_escenico) INTO username_artista;
      SELECT REPLACE(username_artista, ' ', '_') INTO username_artista;
      SELECT floor(random()* (999999-100000 + 1) + 100000) INTO contrasena_generada;
      INSERT INTO usuarios (username, contrasena, tipo) VALUES (username_artista, contrasena_generada, 'Artista');
    END LOOP;

END 
$$ language plpgsql