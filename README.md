# Chef Jonathan Buitrago — Plataforma web de pastelería

Aplicación web para presentar y gestionar cursos, servicios y asesorías de pastelería de **Chef Jonathan Buitrago**. El proyecto integra un catálogo público con espacios de administración y de usuario.

<p align="center">
  <strong>Catálogo · Cursos · Inscripciones · Asesorías · Perfil · Administración</strong>
</p>

## Contenido

- [Descripción](#descripción)
- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación local](#instalación-local)
- [Configuración de la base de datos](#configuración-de-la-base-de-datos)
- [Cuentas de demostración](#cuentas-de-demostración)
- [Estructura del proyecto](#estructura-del-proyecto)
- [API del backend](#api-del-backend)
- [Solución de problemas](#solución-de-problemas)
- [Seguridad antes de publicar](#seguridad-antes-de-publicar)

## Descripción

Chef Jonathan Buitrago es una aplicación web construida para presentar la oferta formativa de pastelería y facilitar la gestión de usuarios, cursos, inscripciones y asesorías. La interfaz utiliza HTML, CSS y JavaScript; la lógica del servidor utiliza PHP y una base de datos MySQL o MariaDB.

La interfaz de esta versión incorpora un tema visual ámbar. La aplicación contempla dos roles principales:

- **Administrador:** gestión de usuarios, cursos/servicios e inscripciones desde las vistas administrativas.
- **Usuario:** consulta del catálogo, gestión del perfil, revisión de sus servicios e inscripciones, historial, certificados y opciones para solicitar asesorías o reservas.

## Funcionalidades

### Sitio público
- Página informativa y catálogo de cursos.
- Registro e inicio de sesión.
- Interfaz adaptable a diferentes tamaños de pantalla.

### Área de usuario
- Panel personal y perfil.
- Consulta de servicios e inscripciones.
- Historial y certificados.
- Cambio de contraseña.
- Opciones para agendar asesorías y realizar reservas.

### Área administrativa
- Panel de administración.
- Consulta y gestión de usuarios.
- Gestión de cursos y servicios.
- Administración de inscripciones y clientes.

### Inscripciones
- Presentación de cursos desde los recursos del frontend.
- Gestión de inscripciones mediante endpoints PHP.
- Flujo de confirmación de pago que puede continuar por WhatsApp.

La disponibilidad de cada función depende de la configuración del servidor y de la base de datos.

## Tecnologías

| Capa | Tecnologías |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript |
| Estilos | Tailwind CSS y hojas de estilo propias |
| Backend | PHP 8.x |
| Base de datos | MySQL o MariaDB |
| Conectividad | PDO y extensiones PHP para MySQL |
| Servidor local recomendado | Apache y PHP incluidos en XAMPP |
| Navegadores | Chrome, Firefox, Edge y navegadores modernos |

## Requisitos

Antes de comenzar, instala:

- [Git](https://git-scm.com/)
- [XAMPP](https://www.apachefriends.org/) con Apache, PHP y MySQL/MariaDB, o un entorno equivalente.
- Un navegador web moderno.

Comprueba que la versión de PHP utilizada por Apache tenga activas las extensiones:

- `pdo`
- `pdo_mysql`
- `mysqli`
- `mysqlnd` (cuando la distribución de PHP lo requiera)

En Fedora o distribuciones compatibles, los paquetes pueden instalarse con:

```bash
sudo dnf install -y httpd php php-cli php-pdo php-mysqlnd mariadb-server
sudo systemctl enable --now httpd mariadb
```

Si utilizas XAMPP, comprueba las extensiones de la versión de PHP incluida en XAMPP; el PHP instalado por el sistema puede ser distinto.

## Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/molstack-dev/Chef-jb.git
cd Chef-jb
```

### 2. Ubicar el proyecto en el servidor web

En XAMPP, coloca la carpeta del proyecto dentro del directorio público de Apache. Por ejemplo:

- **Linux:** `/opt/lampp/htdocs/Chef-jb`
- **Windows:** `C:\xampp\htdocs\Chef-jb`

Conserva el directorio `htdocs` de tu instalación de XAMPP: es la carpeta que Apache utiliza para servir los archivos locales. No es necesario borrar ni reemplazar esa carpeta; basta con colocar el proyecto dentro de ella.

### 3. Iniciar Apache y MySQL

Abre el panel de control de XAMPP e inicia **Apache** y **MySQL**. Si utilizas otro entorno, inicia los servicios equivalentes.

### 4. Configurar la base de datos

El archivo `backend/config.php` utiliza variables de entorno para la conexión:

| Variable | Valor predeterminado local |
| --- | --- |
| `DB_HOST` | `127.0.0.1` |
| `DB_USER` | `root` |
| `DB_PASS` | Vacío |
| `DB_NAME` | `chef_jonathan` |
| `DB_CHARSET` | `utf8mb4` |

Estos valores están pensados para un entorno local de desarrollo. Si tu instalación tiene otras credenciales, configura las variables de entorno que lee `backend/config.php`. No uses una cuenta administrativa de MySQL ni contraseñas vacías en producción.

### 5. Inicializar la base de datos

Con Apache y MySQL activos, abre esta dirección en el navegador, ajustando el nombre de la carpeta si es diferente:

```text
http://localhost/Chef-jb/backend/init_db.php
```

El inicializador crea la estructura de tablas y carga los datos de demostración del proyecto.

> **Advertencia importante:** el inicializador puede eliminar y recrear tablas, por lo que podrías perder usuarios, cursos, inscripciones y otros datos existentes. Ejecútalo solo en una instalación nueva o después de hacer una copia de seguridad. No lo vuelvas a ejecutar en una base de datos con información que quieras conservar.

No ejecutes `backend/seed.php` como un paso adicional sin revisar su implementación: si vuelve a llamar al inicializador, también puede borrar y reconstruir datos.

### 6. Abrir la aplicación

Visita:

```text
http://localhost/Chef-jb/
```

Si el proyecto está instalado en otra carpeta, utiliza el nombre de esa carpeta en la URL.

### Nota sobre el servidor integrado de PHP

La aplicación está pensada principalmente para ejecutarse con Apache y la versión de PHP configurada en XAMPP. El comando `php -S` utiliza el PHP de consola del sistema y puede tener extensiones o configuración diferentes; úsalo solo después de comprobar que dispone de los drivers requeridos y que las rutas funcionan correctamente.

## Cuentas de demostración

En una base de datos inicializada con los datos de prueba se incluyen estas cuentas:

| Rol | Correo | Contraseña inicial |
| --- | --- | --- |
| Administrador | `admin@chefjonathan.com` | `Admin@2026` |
| Usuario | `edwinalex8712@gmail.com` | `User@2026` |

Estas credenciales son únicamente para desarrollo local. Cámbialas o elimina las cuentas de demostración antes de publicar la aplicación. No reutilices estas contraseñas en otros servicios.

## Estructura del proyecto

```text
Chef-jb/
├── assets/                 # JavaScript, estilos y recursos del frontend
├── backend/
│   ├── api/                # Endpoints PHP
│   ├── config.php          # Configuración de la conexión a MySQL
│   ├── init_db.php         # Inicialización de la base de datos
│   └── seed.php             # Script de carga/inicialización de datos
├── img/                    # Imágenes y recursos gráficos
├── views/
│   ├── admin/               # Vistas del panel administrativo
│   ├── user/                # Vistas del área de usuario
│   ├── catalogo              # Catálogo público
│   ├── registro               # Registro e inicio de sesión
│   └── informacion            # Información del proyecto
├── index.php                # Entrada PHP de la aplicación
├── index                    # Recurso de entrada presente en el repositorio
├── .htaccess                # Reglas de Apache
└── README.md                # Esta documentación
```

Los nombres y extensiones de algunas vistas pueden variar según el archivo concreto del repositorio. Para identificar una pantalla, consulta los archivos disponibles en `views/`.

## API del backend

Los endpoints PHP se encuentran en `backend/api/`. Entre los principales se incluyen:

| Método | Endpoint | Propósito |
| --- | --- | --- |
| POST | `/backend/api/register.php` | Registro de usuarios |
| POST | `/backend/api/login.php` | Inicio de sesión |
| GET | `/backend/api/usuarios-get.php` | Consulta de usuarios |
| GET / POST / PUT / DELETE | `/backend/api/users.php` | Operaciones de usuarios |
| GET | `/backend/api/cursos-get.php` | Consulta de cursos |
| GET / POST / PUT / DELETE | `/backend/api/inscripciones.php` | Operaciones de inscripciones |
| POST | `/backend/api/profile-update.php` | Actualización del perfil |
| POST | `/backend/api/password-change.php` | Cambio de contraseña |
| POST | `/backend/api/advisory-registration.php` | Registro de asesorías |
| POST | `/backend/api/reservation-registration.php` | Registro de reservas |
| GET / POST / PUT / DELETE | `/backend/api/clients.php` | Operaciones de clientes |

Los métodos disponibles, los campos requeridos y los permisos pueden variar según la implementación de cada endpoint. Consulta el código del endpoint antes de integrarlo con otro sistema.

## Solución de problemas

### No conecta con MySQL
1. Confirma que MySQL/MariaDB esté iniciado.
2. Comprueba las variables de conexión que utiliza `backend/config.php`.
3. Verifica que la versión de PHP de Apache tenga habilitadas `pdo` y `pdo_mysql`.
4. Revisa los registros de error de Apache y PHP.

### El catálogo aparece vacío o falla el inicio de sesión
1. Abre las herramientas de desarrollo del navegador con **F12**.
2. Revisa las pestañas **Console** y **Network** para detectar errores y solicitudes fallidas.
3. Confirma que la base de datos tenga los datos esperados.
4. Comprueba que las rutas de la API coincidan con la carpeta donde instalaste el proyecto.

### Comprobar la configuración PHP

Para el PHP del sistema:

```bash
php -v
php -m | grep -Ei 'pdo|mysql|mysqli'
```

En Linux con XAMPP:

```bash
/opt/lampp/bin/php -v
/opt/lampp/bin/php -m | grep -Ei 'pdo|mysql|mysqli'
```

Asegúrate de comprobar el mismo PHP que utiliza Apache para servir la aplicación.

## Seguridad antes de publicar

Antes de desplegar la aplicación en un servidor accesible desde Internet:

- Cambia las cuentas y contraseñas de demostración.
- Restringe o deshabilita el acceso público a `backend/init_db.php` y `backend/seed.php`; pueden destruir datos si reinicializan las tablas.
- Utiliza un usuario MySQL con privilegios mínimos y una contraseña segura.
- Habilita HTTPS.
- Verifica la autenticación, la autorización por rol y la validación de datos en cada endpoint.
- No publiques secretos, tokens ni datos personales.
- Realiza copias de seguridad antes de cambiar el esquema de la base de datos.
- Configura los errores para que los visitantes no vean información interna del servidor.

## Contribuciones

1. Crea una rama para tu cambio.
2. Mantén los cambios acotados y describe su propósito.
3. Prueba las pantallas y los endpoints afectados.
4. Abre un Pull Request con un resumen y los pasos de validación.

## Licencia

Este repositorio no declara una licencia de uso en esta documentación. Consulta al propietario antes de redistribuir o reutilizar el código.
