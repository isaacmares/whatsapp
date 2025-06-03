read -p "Nombre del contenedor: " CONTENEDOR
read -p "Puerto a mapear (host:contenedor): " PUERTO
echo "Creando contenedor $CONTENEDOR en puerto $PUERTO..."
docker run -it -d --name "$CONTENEDOR" -p $PUERTO:$PUERTO ubuntu bash
docker start "$CONTENEDOR"
echo "Docker creado, ejecuta docker exec -it $CONTENEDOR bash"




 