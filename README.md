# FinanzApp

[![FinanzApp](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://finanzappdev.netlify.app/)

**FinanzApp** es una aplicación web para gestionar tus finanzas personales de forma sencilla y eficiente. Permite a los usuarios registrar transacciones, categorizarlas y analizar en qué se gasta el dinero. Además, incluye filtros para obtener información más precisa sobre las finanzas.

## 🚀 Características

- **Registro de Transacciones**: Añade ingresos o gastos con detalles como categoría, monto y fecha.
- **Filtrado de Datos**: Filtra las transacciones por tipo (ingreso o gasto) o categoría.
- **Visualización Clara**: Balance total dinámico que refleja la situación financiera del usuario.
- **Notificaciones Interactivas**: Se utilizan alertas atractivas y personalizadas con `Swal.fire`.
- **Arquitectura Modular**:
  - Carpeta `views`: Contiene las páginas principales de la aplicación.
  - Carpeta `components`: Contiene componentes reutilizables para construir la interfaz.
- **Estado Global con Hooks y Context**: Manejo centralizado del estado para compartir datos entre componentes.
- **Integración con Supabase**:
  - Almacenamiento seguro de datos.
  - Operaciones en tiempo real con la base de datos.

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - [React.js](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/) 
- **Backend**: [Supabase](https://supabase.io/) como servicio de backend completo.
- **Estilos**:
  - Tailwind

## 📂 Estructura del Proyecto

├── public/
<br>
│ └── index.html # Documento raíz de la aplicación <br>
├── src/ <br>
├── components/ # Componentes reutilizables (Cards) <br>
├── views/ # Páginas principales (Estadisticas,filtros, formFinance,transacciones,etc.) <br>
├── context/ # Configuración del Context API para el estado global <br>
├── App.tsx # Configuración principal de rutas y vistas

## 📄 Instrucciones de Uso

1. **Clonar el Repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/finanzapp.git
   cd finanzapp
   ```

2. **Instalar Dependencias**:

   ```bash
   npm install
   ```

3. **Configurar Supabase**:
   -Crea un proyecto en Supabase.
   -Configura las credenciales en un archivo .env para conectarte a tu base de datos.

4. **Ejecutar el Proyecto**:

   ```bash
   npm run dev
   ```

## 🌐 Demo en Vivo

Puedes probar la aplicación en FinanzApp:https://finanzappdev.netlify.app/

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar, abre un issue o realiza un pull request.
