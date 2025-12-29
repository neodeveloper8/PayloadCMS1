# Sistema ERP - Prueba Técnica Next.js + Payload CMS

Este proyecto es una aplicación Full Stack para la gestión de inventario con control de acceso basado en roles (RBAC).

"He implementado la solución utilizando Next.js con Payload CMS integrado nativamente. Esta arquitectura Full Stack permite tener el Frontend (React) y el Backend (API) en un mismo repositorio, optimizando el rendimiento y la seguridad de tipos (TypeScript) entre ambos."


## 🚀 Tecnologías

- **Backend:** Payload CMS 3.0 (Node.js)
- **Database:** MongoDB Atlas
- **Frontend:** Next.js 15 (App Router)
- **Estilos:** Tailwind CSS
- **Lenguaje:** TypeScript

## ✨ Funcionalidades

1.  **Autenticación y Roles:**
    - Login nativo con sesiones seguras.
    - Dos roles: **Admin** (Acceso total) y **User** (Acceso condicional).
    
2.  **Gestión de Permisos Granular:**
    - El Admin puede asignar permisos específicos (Ver, Crear, Editar, Borrar) por módulo (Inventario, Ventas, Cobranzas) a cada usuario.
    - La seguridad se valida tanto en el Frontend (UI) como en el Backend (API Access Control).

3.  **Módulo de Inventario:**
    - CRUD completo (Crear, Leer, Actualizar, Borrar).
    - Paginación integrada.
    - Visualización condicional de botones según permisos.

## 🛠️ Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone <TU_URL_DEL_REPO>
    cd <NOMBRE_CARPETA>
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    - Crea un archivo `.env` en la raíz basándote en `.env.example`.
    - Agrega tu conexión a MongoDB.

4.  **Correr el proyecto:**
    ```bash
    npm run dev
    ```
    - Frontend: `http://localhost:3000`
    - Panel Admin: `http://localhost:3000/admin`

## 🧪 Credenciales de Prueba

Para facilitar la revisión, puedes usar estos usuarios (o crear los tuyos en la BD):

- **Admin:** `gonzaloast8@gmail.com` / (Tu contraseña)
- **User (Sin permisos):** `alonso@gmail.com` / (Tu contraseña)

---
Desarrollado por **Gonzalo Sierra**.