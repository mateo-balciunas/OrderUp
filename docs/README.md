## Testing con Postman

### Importar la colección

1. Abre Postman
2. Haz clic en "Import" en la esquina superior izquierda
3. Selecciona el archivo `docs/postman/OrderUp_API.postman_collection.json`
4. (Opcional) Importa también el environment `OrderUp_API.postman_environment.json`

### Variables de entorno

Configura las siguientes variables en tu environment de Postman:
- `baseUrl`: `http://localhost:3000`
- `organizationId`: ID de una organización válida
- `userId`: ID de un usuario válido
-  y las que se consideren necesarias para realizar las pruebas de los endpoints.