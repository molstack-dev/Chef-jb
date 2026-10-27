# Chef Jonathan Buitrago

Plataforma web para presentar y administrar cursos de pastelería, inscripciones, asesorías, eventos y servicios de **Chef Jonathan Buitrago**. Incluye un sitio público, un área de usuario y herramientas administrativas.

> Esta guía se basa en el código presente en el repositorio. No sustituye las pruebas funcionales en un servidor configurado.

## Funcionalidades

- **Sitio público:** página informativa, catálogo, registro e inicio de sesión.
- **Área de usuario:** perfil, servicios e inscripciones, historial, certificados, contenido de cursos, asesorías, reservas y solicitudes de reembolso.
- **Administración:** gestión de usuarios, cursos y su contenido, inscripciones, certificados, servicios, pagos y reembolsos.
- **Backend:** endpoints PHP que responden con JSON, sesiones de autenticación y persistencia MySQL/MariaDB.

## Tecnologías

| Componente | Tecnología |
| --- | --- |
| Interfaz | HTML, CSS y JavaScript |
| Estilos | CSS propio y Tailwind CSS por CDN en algunas vistas |
| Servidor | PHP con Apache |
| Base de datos | MySQL o MariaDB |
| Acceso a datos | PDO y MySQLi |
| Desarrollo local | XAMPP |
| Control de versiones | Git |

## Estructura

~~~text
Chef-jb/
├── assets/                  # Hojas de estilo y JavaScript
├── backend/
│   ├── api/                 # Endpoints PHP
│   ├── config.php           # Configuración de conexión
│   ├── init_db.php          # Creación/migración del esquema
│   ├── seed.php             # Ejecuta el inicializador
│   └── *.sql                # Copia SQL incluida en el repositorio
├── img/                     # Imágenes e iconos
├── views/
│   ├── admin/               # Vistas administrativas
│   ├── user/                # Vistas del usuario
│   ├── catalogo              # Catálogo público
│   ├── informacion           # Página informativa
│   ├── registro              # Registro e inicio de sesión
│   └── forgot-password       # Recuperación de acceso
├── index                    # Documento de entrada principal
├── index.php                # Entrada PHP que incluye index
├── .htaccess                # Reglas de Apache
└── README.md
~~~

Algunas vistas no tienen extensión en el nombre del archivo. Comprueba los archivos y las reglas de Apache antes de añadir extensiones a una ruta.

## Requisitos

- Git.
- Apache y PHP compatibles con el código del proyecto.
- MySQL/MariaDB.
- Extensiones PHP <code>mysqli</code>, <code>pdo</code> y <code>pdo_mysql</code>.
- Navegador moderno.
- <code>mod_rewrite</code> si se utilizan las reglas de URL de <code>.htaccess</code>.

## Instalación local con XAMPP

### 1. Clonar el proyecto

~~~bash
git clone https://github.com/molstack-dev/Chef-jb.git
cd Chef-jb
~~~

### 2. Colocarlo en Apache

Ubica la carpeta del proyecto dentro del directorio público de Apache. Rutas habituales de XAMPP:

- Linux: <code>/opt/lampp/htdocs/Chef-jb</code>
- Windows: <code>C:\xampp\htdocs\Chef-jb</code>

**No elimines ni reemplaces <code>htdocs</code>.** El proyecto debe quedar dentro como subcarpeta. Si ya está en otra ubicación, configura Apache para servirlo desde allí.

### 3. Iniciar servicios y configurar la base de datos

Inicia Apache y MySQL desde XAMPP. Después revisa <code>backend/config.php</code> y confirma que la conexión use el host, puerto, usuario, contraseña y base de datos correctos para tu entorno local.

La configuración actual define las credenciales directamente en el código y distingue entre host local y no local; no asume automáticamente variables de entorno. No copies credenciales de producción al entorno local.

### 4. Inicializar el esquema

Con la conexión configurada, abre:

~~~text
http://localhost/Chef-jb/backend/init_db.php
~~~

El inicializador crea tablas faltantes y aplica migraciones al esquema. También contiene una rutina de datos de demostración que usa una marca en la base de datos para evitar volver a sembrarlos en cada ejecución.

Aunque está diseñado para conservar los registros existentes, realiza una copia de seguridad antes de ejecutarlo sobre una base de datos importante y revisa las migraciones antes de usarlo en producción. No dejes este endpoint accesible públicamente.

### 5. Abrir la aplicación

~~~text
http://localhost/Chef-jb/
~~~

Algunas rutas del frontend comienzan con <code>/</code> y pueden asumir que la aplicación está en la raíz del dominio. Si se instala en una subcarpeta, comprueba enlaces y recursos estáticos.

## Rutas principales

| Área | Ruta |
| --- | --- |
| Inicio | <code>/</code> |
| Información | <code>/views/informacion</code> |
| Catálogo | <code>/views/catalogo</code> |
| Registro y acceso | <code>/views/registro</code> |
| Recuperación de acceso | <code>/views/forgot-password</code> |
| Panel administrativo | <code>/views/admin/admin</code> |
| Usuarios | <code>/views/admin/admin-usuarios</code> |
| Servicios | <code>/views/admin/admin-servicios</code> |
| Inscripciones | <code>/views/admin/admin-inscripciones</code> |
| Certificados | <code>/views/admin/admin-certificados</code> |
| Reembolsos | <code>/views/admin/admin-reembolsos</code> |
| Panel de usuario | <code>/views/user/user</code> |
| Perfil | <code>/views/user/perfil</code> |
| Mis servicios | <code>/views/user/mis-servicios</code> |
| Historial | <code>/views/user/historial</code> |
| Certificados | <code>/views/user/certificados</code> |
| Agendar | <code>/views/user/agendar</code> |

La existencia de una ruta no significa que deba ser accesible sin autenticación. Verifica los permisos en el servidor.

## API

Los endpoints se encuentran en <code>backend/api/</code> y, en general, responden con JSON. Algunos archivos principales:

| Endpoints | Propósito |
| --- | --- |
| <code>health.php</code> | Estado del backend |
| <code>login.php</code>, <code>logout.php</code>, <code>register.php</code> | Autenticación y registro |
| <code>forgot-password.php</code>, <code>reset-password.php</code> | Recuperación de acceso |
| <code>users.php</code>, <code>usuarios.php</code>, <code>usuarios-get.php</code> | Gestión de usuarios |
| <code>courses.php</code>, <code>cursos-get.php</code> | Cursos |
| <code>course-content.php</code>, <code>course-content-get.php</code>, <code>content-progress.php</code> | Contenido y progreso de cursos |
| <code>inscripciones.php</code>, <code>inscripciones-get.php</code> | Inscripciones |
| <code>advisory-registration.php</code>, <code>advisories-get.php</code> | Asesorías |
| <code>reservation-registration.php</code> | Reservas |
| <code>certificados.php</code> | Certificados |
| <code>refund-request.php</code>, <code>refunds-get.php</code>, <code>refund-process.php</code> | Reembolsos |
| <code>profile-update.php</code>, <code>password-change.php</code> | Perfil y contraseña |
| <code>notifications.php</code> | Notificaciones |

La ruta completa suele ser <code>/backend/api/&lt;archivo&gt;.php</code>. Los métodos HTTP, campos y permisos varían por endpoint; consulta su implementación antes de integrarlo.

## Validación local

Antes de dar un cambio por listo:

1. Comprueba que Apache y MySQL inicien correctamente.
2. Revisa los logs de PHP y la consola del navegador.
3. Prueba registro, inicio y cierre de sesión.
4. Verifica permisos de usuario y administrador.
5. Prueba las vistas y endpoints afectados con datos de prueba.
6. Revisa enlaces y recursos desde la ruta de despliegue real.

Para revisar PHP desde terminal:

~~~bash
php -v
php -m
~~~

En Linux con XAMPP:

~~~bash
/opt/lampp/bin/php -v
/opt/lampp/bin/php -m
~~~

Comprueba las extensiones del PHP que utiliza Apache; puede ser distinto del PHP del sistema.

## Seguridad antes de desplegar

> **Importante: revisa los secretos y archivos de datos antes de publicar o mantener este repositorio público.**

- <strong>Credenciales:</strong> <code>backend/config.php</code> contiene credenciales de base de datos incrustadas. Rota la contraseña afectada y elimina los secretos del código versionado. Si se publicaron en commits, editar el archivo no invalida la contraseña anterior ni la elimina del historial.
- <strong>Configuración segura:</strong> adapta la configuración para leer secretos desde variables de entorno o un archivo externo al repositorio y fuera del directorio público.
- <strong>Copia SQL:</strong> revisa <code>backend/if0_43089123_chef_jonathan.sql</code> antes de distribuirlo. No publiques volcados que contengan datos personales o información de producción.
- <strong>Inicializador:</strong> restringe <code>backend/init_db.php</code> y <code>backend/seed.php</code> a tareas administrativas locales.
- <strong>Cuentas de demostración:</strong> cambia o elimina las cuentas iniciales y sus contraseñas antes de desplegar.
- <strong>Base de datos:</strong> usa un usuario MySQL con privilegios mínimos; no uses <code>root</code> en producción.
- <strong>Transporte y sesiones:</strong> habilita HTTPS y configura las cookies de sesión de forma segura.
- <strong>Autorización:</strong> comprueba permisos en cada endpoint privado.
- <strong>Errores:</strong> registra detalles en el servidor sin mostrar información técnica o secretos al visitante.
- <strong>Copias de seguridad:</strong> realiza backups antes de ejecutar migraciones.

## Solución de problemas

**Error de conexión:** verifica que MySQL esté activo, revisa la configuración y confirma que PHP tenga <code>mysqli</code>, <code>pdo</code> y <code>pdo_mysql</code>.

**Vistas o imágenes no cargan:** comprueba la ubicación dentro de <code>htdocs</code>, busca errores 404 en la pestaña Network y revisa las rutas absolutas que comienzan con <code>/</code>.

**Un endpoint devuelve error:** confirma el método HTTP, el formato de la solicitud, la sesión y el rol requerido; consulta los logs del servidor.

## Contribuciones

1. Crea una rama para tu cambio.
2. Mantén el cambio acotado y describe su propósito.
3. Prueba las vistas y endpoints afectados.
4. Abre un Pull Request con resumen y validaciones realizadas.

## Licencia

Esta documentación no identifica una licencia de código abierto. Consulta al propietario antes de redistribuir o reutilizar el código.
