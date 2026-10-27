# Chef Jonathan Buitrago

Plataforma web para presentar y gestionar cursos, servicios y asesorías de pastelería de **Chef Jonathan Buitrago**. Incluye un catálogo público y espacios diferenciados para usuarios y administración.

<p align="center">
  <strong>Catálogo · Inscripciones · Perfil · Asesorías · Administración</strong>
</p>

## Tabla de contenido

- [Descripción](#descripción)
- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación local](#instalación-local)
- [Configuración de la base de datos](#configuración-de-la-base-de-datos)
- [Cuentas de demostración](#cuentas-de-demostración)
- [Estructura del proyecto](#estructura-del-proyecto)
- [API](#api)
- [Solución de problemas](#solución-de-problemas)
- [Seguridad](#seguridad)
- [Contribuciones](#contribuciones)

## Descripción

Chef Jonathan Buitrago es una aplicación web desarrollada para centralizar la oferta de formación en pastelería y facilitar la gestión de sus usuarios, cursos e inscripciones. La interfaz está construida con HTML, CSS y JavaScript, mientras que el backend utiliza PHP y MySQL.

La aplicación contempla dos roles principales:

- **Usuario:** consulta el catálogo, administra su perfil y accede a sus servicios, historial, certificados y opciones para agendar asesorías.
- **Administrador:** accede a paneles de gestión de usuarios, cursos/servicios e inscripciones.

## Funcionalidades

### Experiencia pública
- Página de información del proyecto.
- Catálogo de cursos y servicios.
- Registro e inicio de sesión.
- Interfaz adaptable a distintos tamaños de pantalla.

### Área de usuario
- Panel personal.
- Consulta de servicios e inscripciones.
- Historial y certificados.
- Actualización de datos del perfil y cambio de contraseña.
- Solicitud de asesorías y reservas.

### Área administrativa
- Panel de administración.
- Gestión y consulta de usuarios.
- Gestión de cursos y servicios.
- Administración de inscripciones.
- Gestión de clientes y revisión de registros.

### Inscripciones
- Consulta de la oferta formativa.
- Registro de inscripciones mediante la API.
- Flujo de confirmación de pago que puede dirigir al usuario a WhatsApp.

> La disponibilidad de cada acción depende de la configuración local del backend y de la base de datos.

## Tecnologías

| Capa | Tecnología |
| --- | --- |
| Interfaz | HTML5, CSS3 y JavaScript |
| Estilos | Tailwind CSS y estilos propios del proyecto |
| Backend | PHP 8.x |
| Base de datos | MySQL o MariaDB |
| Acceso a datos | PDO / MySQL |
| Servidor local recomendado | Apache mediante XAMPP |
| Navegador | Chrome, Firefox, Edge u otro navegador moderno |

## Requisitos

Antes de empezar, instala:

- [Git](https://git-scm.com/)
- [XAMPP](https://www.apachefriends.org/) con Apache, PHP y MySQL/MariaDB
- Un navegador web moderno

Comprueba que PHP tenga habilitadas las extensiones <code>pdo</code>, <code>pdo_mysql</code> y <code>mysqli</code>. En instalaciones donde corresponda, también debe estar disponible <code>mysqlnd</code>.

En Linux/Fedora, una instalación del sistema puede requerir:

    sudo dnf install -y httpd php php-cli php-pdo php-mysqlnd mariadb-server
    sudo systemctl enable --now httpd mariadb

Si utilizas XAMPP, asegúrate de comprobar las extensiones de la versión de PHP incluida con XAMPP, no solamente las del PHP del sistema.

## Instalación local

### 1. Clonar el repositorio

    git clone https://github.com/molstack-dev/Chef-jb.git

En XAMPP, coloca la carpeta del proyecto dentro del directorio público de Apache. Por ejemplo, en Linux:

    /opt/lampp/htdocs/Chef-jb

En Windows, puedes utilizar:

    C:\xampp\htdocs\Chef-jb

Si la carpeta tiene otro nombre, ajusta las rutas locales de los siguientes pasos.

### 2. Iniciar los servicios

Abre el panel de XAMPP e inicia **Apache** y **MySQL**.

### 3. Configurar la conexión

El archivo <code>backend/config.php</code> obtiene estos valores de variables de entorno:

| Variable | Valor predeterminado local |
| --- | --- |
| <code>DB_HOST</code> | <code>127.0.0.1</code> |
| <code>DB_USER</code> | <code>root</code> |
| <code>DB_PASS</code> | Vacío |
| <code>DB_NAME</code> | <code>chef_jonathan</code> |
| <code>DB_CHARSET</code> | <code>utf8mb4</code> |

Los valores predeterminados están orientados a un entorno local de desarrollo. Si tu servidor usa otras credenciales, configura las variables de entorno antes de ejecutar la aplicación. No uses credenciales predeterminadas en producción.

### 4. Inicializar la base de datos

Con Apache y MySQL activos, abre en el navegador:

    http://localhost/Chef-jb/backend/init_db.php

El script crea la estructura y carga datos de demostración, incluidos usuarios y cursos.

**Importante:** <code>backend/init_db.php</code> elimina y vuelve a crear varias tablas antes de cargar los datos iniciales. Esto puede borrar usuarios, cursos, inscripciones y otra información existente. Ejecútalo únicamente en una instalación local nueva o después de realizar una copia de seguridad. No lo vuelvas a ejecutar para una instalación que ya contiene datos que quieras conservar.

<code>backend/seed.php</code> incluye <code>init_db.php</code>; por tanto, también puede reinicializar y borrar datos. No lo ejecutes como un paso adicional rutinario.

### 5. Abrir la aplicación

Visita:

    http://localhost/Chef-jb/

Si instalaste el proyecto en una carpeta con otro nombre, utiliza esa ruta en la URL.

> **Nota:** el servidor integrado de PHP no sustituye automáticamente la configuración de Apache/XAMPP. Úsalo solo si tu entorno tiene instalados los drivers de base de datos necesarios y las rutas de la aplicación funcionan correctamente. Para la configuración prevista del proyecto, se recomienda Apache con PHP y MySQL.

## Cuentas de demostración

En una base de datos recién inicializada se crean las siguientes cuentas de prueba:

| Rol | Correo | Contraseña inicial |
| --- | --- | --- |
| Administrador | <code>admin@chefjonathan.com</code> | <code>Admin@2026</code> |
| Usuario | <code>edwinalex8712@gmail.com</code> | <code>User@2026</code> |

Estas credenciales son **solo para desarrollo local**. Cámbialas o elimina las cuentas de demostración antes de desplegar la aplicación o exponerla en una red pública. No utilices información personal real en entornos de prueba.

## Estructura del proyecto

La estructura funcional principal está organizada así:

    Chef-jb/
    ├── assets/                 # JavaScript, estilos y recursos de la interfaz
    ├── backend/
    │   ├── api/                # Endpoints PHP
    │   ├── config.php          # Conexión y configuración de MySQL
    │   ├── init_db.php         # Inicialización destructiva del esquema y datos demo
    │   └── seed.php            # Ejecuta la inicialización
    ├── views/
    │   ├── admin/              # Vistas de administración
    │   ├── user/               # Vistas del usuario
    │   ├── catalogo.html       # Catálogo de cursos
    │   ├── informacion.html    # Información pública
    │   └── registro.html       # Registro e inicio de sesión
    └── README.md

Entre las vistas principales se encuentran:

- **Administración:** <code>views/admin/admin.html</code>, <code>admin-usuarios.html</code>, <code>admin-inscripciones.html</code> y <code>admin-servicios.html</code>.
- **Usuario:** <code>views/user/user.html</code>, <code>perfil.html</code>, <code>mis-servicios.html</code>, <code>historial.html</code>, <code>certificados.html</code> y <code>agendar.html</code>.

## API

Los endpoints PHP del backend se encuentran en <code>backend/api/</code>. Los principales incluyen:

| Método | Endpoint | Propósito |
| --- | --- | --- |
| POST | <code>/backend/api/register.php</code> | Registro de usuarios |
| POST | <code>/backend/api/login.php</code> | Inicio de sesión |
| GET | <code>/backend/api/usuarios-get.php</code> | Consulta de usuarios |
| GET / POST / PUT / DELETE | <code>/backend/api/users.php</code> | Operaciones sobre usuarios |
| GET | <code>/backend/api/cursos-get.php</code> | Consulta de cursos |
| GET / POST / PUT / DELETE | <code>/backend/api/inscripciones.php</code> | Operaciones sobre inscripciones |
| POST | <code>/backend/api/profile-update.php</code> | Actualización del perfil |
| POST | <code>/backend/api/password-change.php</code> | Cambio de contraseña |
| POST | <code>/backend/api/advisory-registration.php</code> | Registro de asesorías |
| POST | <code>/backend/api/reservation-registration.php</code> | Registro de reservas |
| GET / POST / PUT / DELETE | <code>/backend/api/clients.php</code> | Operaciones sobre clientes |

Las rutas presuponen que el proyecto está publicado en la raíz de la URL local. Si lo instalas bajo otra ruta o un dominio, verifica la configuración de las peticiones del frontend.

## Solución de problemas

### La aplicación no conecta con MySQL
1. Confirma que MySQL/MariaDB esté iniciado.
2. Revisa <code>DB_HOST</code>, <code>DB_USER</code>, <code>DB_PASS</code> y <code>DB_NAME</code> en el entorno de ejecución.
3. Comprueba que PHP tenga activas <code>pdo</code> y <code>pdo_mysql</code>.
4. Revisa los registros de errores de Apache y PHP.

### El catálogo no muestra cursos o falla el inicio de sesión
1. Abre las herramientas de desarrollador del navegador (**F12**) y revisa la pestaña **Console**.
2. Revisa la pestaña **Network** para identificar peticiones fallidas a <code>backend/api/</code>.
3. Confirma que Apache y MySQL estén activos y que la base de datos contenga los datos esperados.
4. Verifica que la URL base coincida con la carpeta donde instalaste el proyecto.

### Comprobar extensiones PHP

Con el PHP del sistema:

    php -v
    php -m | grep -Ei 'pdo|mysql|mysqli'

Con PHP de XAMPP en Linux:

    /opt/lampp/bin/php -v
    /opt/lampp/bin/php -m | grep -Ei 'pdo|mysql|mysqli'

En Windows, consulta las extensiones habilitadas para la versión de PHP que utiliza Apache en XAMPP.

### Revisar registros
- Consola del navegador: errores de JavaScript y solicitudes HTTP.
- Registros de Apache/PHP: errores del servidor y de conexión a la base de datos.
- Respuesta del endpoint: revisa el código HTTP y el mensaje devuelto sin publicar datos sensibles.

## Seguridad

Antes de desplegar el proyecto en producción:

- Cambia las cuentas y contraseñas de demostración.
- No expongas públicamente <code>backend/init_db.php</code> ni <code>backend/seed.php</code>; sus operaciones pueden destruir datos.
- Configura credenciales de base de datos con privilegios mínimos y evita cuentas administrativas de MySQL.
- Usa HTTPS y valida/autentica las operaciones del backend según el rol.
- No guardes secretos, tokens ni datos personales en el repositorio.
- Realiza copias de seguridad antes de ejecutar migraciones o cambios en el esquema.
- Revisa la configuración de errores para evitar mostrar detalles internos del servidor al público.

## Contribuciones

1. Crea una rama para tu cambio.
2. Realiza cambios pequeños y prueba los flujos afectados.
3. Verifica el funcionamiento de la interfaz, las peticiones a la API y la persistencia en MySQL.
4. Abre un Pull Request con un resumen del cambio y los pasos de prueba.

## Licencia

No se especifica una licencia en este README. Antes de reutilizar o distribuir el proyecto, confirma la licencia aplicable con el propietario del repositorio.
