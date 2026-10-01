# AVA-EDUCA+

AVA-EDUCA+ es un sistema sencillo para ayudar a organizar alumnos y cursos. Fue creado para reunir esta información en un solo lugar y facilitar tareas del día a día, como consultar cursos y registrar un nuevo alumno.

El sistema tiene:

- Pantalla de entrada con usuarios de prueba;
- Panel con el total de alumnos, cursos y el próximo curso;
- Registro de alumnos con datos personales y dirección;
- Completar la dirección al informar el código postal;
- Mensajes para avisar cuando algún campo tiene un error;
- Guardado de los alumnos en el navegador;
- Botón para cerrar la sesión.
Esta es una versión de demostración. Todavía no usa un servidor ni una base de datos, por lo que la información queda solamente en el navegador utilizado.

## Tecnologías utilizadas

Se utilizaron tecnologías comunes para crear páginas web:

- HTML para crear las páginas y los formularios;
- CSS para organizar el sistema y adaptarlo a diferentes pantallas;
- JavaScript para el inicio de sesión, las validaciones, los registros y el panel;
- `sessionStorage` para mantener al usuario conectado durante la sesión;
- `localStorage` para guardar los alumnos registrados;
- ViaCEP para buscar la dirección por el código postal;
- Moment.js para comprobar las fechas de nacimiento.

## Estructura del proyecto

```text
AVA-EDUCA/
├── index.html              # Pantalla de entrada
├── dashboard.html          # Panel principal
├── cadastroAluno.html      # Registro de alumno
├── package.json            # Configuración del proyecto
├── css/
│   └── style.css           # Estilos de las páginas
└── js/
	├── Aluno.js            # Datos del alumno
	├── alunos.js           # Registro de alumnos
	├── app.js              # Funcionamiento del panel
	├── auth.js             # Entrada y salida del sistema
	├── cadastroAluno.js    # Formulario y validaciones
	├── cursos.js           # Consulta de cursos
	├── listagemAlunos.js   # Alumnos iniciales
	├── listagemCursos.js   # Cursos de ejemplo
	└── listagemUsuarios.js # Usuarios de prueba
```

## Cómo ejecutar

Para abrir el sistema, se recomienda usar VS Code con la extensión **Live Server**:

1. Abre la carpeta del proyecto en VS Code.
2. Haz clic derecho en `index.html`.
3. Elige **Open with Live Server**.
4. Abre en el navegador la dirección mostrada, normalmente `http://127.0.0.1:5500`.

### Usuarios de prueba

Para entrar, usa una de estas cuentas:

| Usuario | Contraseña |
|---|---|
| `ana.silva@edutech.com` | `123456` |
| `carlos.santos@edutech.com` | `654321` |
| `mariana.costa@edutech.com` | `edu2026` |

Después del inicio de sesión, entra en **Alunos** para registrar un estudiante. Al informar un código postal de ocho números, el sistema intenta completar la dirección automáticamente.

## Mejoras posibles

- Permitir editar y eliminar alumnos;
- Crear un área para registrar cursos;
- Usar una base de datos para guardar la información;
- Crear un inicio de sesión real y más seguro;
- Añadir pruebas para comprobar el funcionamiento;
- Crear diferentes tipos de acceso, como administrador y profesor.

Las cuentas y los datos mostrados son solo ejemplos para probar el proyecto. No deben utilizarse en un sistema real.
