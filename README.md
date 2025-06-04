# Módulo de Prácticas – ExposIA

Este módulo permite gestionar grabaciones, notas y fragmentos de audio asociados a presentaciones tipo slide, como parte del sistema ExposIA. Implementado en TypeScript con NestJS, está diseñado para integrarse con otros módulos desarrollados en diferentes lenguajes, siguiendo una arquitectura modular basada en casos de uso.

---

## 📁 Estructura del Proyecto

```
src/
├── common/middleware        # Middleware para autenticación
├── controllers              # Controladores REST por entidad
├── database                 # ( Aun no esta hecho ) Configuración TypeORM (si aplica)
├── models                   # Entidades y DTOs
├── services                 # Lógica de negocio por entidad
├── use-cases                # Casos de uso independientes
├── main.ts                  # Entry point
├── app.module.ts            # Módulo raíz
test/
├── test-practica.ts         # Script automatizado de prueba
uploads/
├── audio/                   # Grabaciones originales
├── fragmentos/              # Fragmentos recortados
```

---

## 🧠 Funcionalidades Implementadas

| Funcionalidad         | Descripción                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| 📤 Subida de audio     | Permite subir un archivo `.mp3` vinculado a un usuario y una presentación |
| 🧭 Navegación de slides| Registra eventos de navegación (inicio, siguiente) con timestamps          |
| 📝 Notas por slide     | Asocia contenido textual y tiempo específico a un slide                    |
| ✂️ Fragmentos de audio | Recorta el audio entre eventos o manualmente (usando FFmpeg)               |
| 📘 Historial de práctica| Registra duración, fechas y estado final de una grabación                 |
| 🧪 Test automatizado    | Script `test-practica.ts` que prueba todo el flujo                        |
| 🔍 Endpoint de debug    | Consulta completa de una grabación con notas, fragmentos, historial, etc. |

---

## 🔐 Seguridad

Este módulo implementa un middleware que valida un token en los headers. Por defecto, espera una variable de entorno llamada `API_KEY`:

```
# .env
API_KEY=supersecreta123
```

**Agregar al header de cada petición:**
```
Authorization: supersecreta123
```

---

## 🧪 Test Automatizado

El archivo `test-practica.ts` ejecuta el flujo completo:
1. Sube una grabación (usando `1mb.mp3`)
2. Registra navegación por 4 slides
3. Asigna una nota a cada slide
4. Genera un fragmento por cada slide
5. Registra el historial de práctica
6. Guarda un reporte en `./reporte-practica.txt`

**Ejecutar:**
```bash
npx ts-node test-practica.ts
```

---

## 📌 Consideraciones

- Este módulo depende de una base de datos única del grupo.
- Los documentos y slides se reciben desde el módulo PHP.
- La IA se integrará desde el módulo Python, que analizará los datos generados aquí.

---

## ✅ Estado del Módulo

- [x] Casos de uso separados
- [x] Subida de archivos y generación de fragmentos
- [x] DTOs validados con `class-validator`
- [x] Middleware de seguridad por token

---

## 🧠 Autor
> Módulo desarrollado por **Dwesk / Luis Figueroa** – ULEAM – 5to semestre de Ingeniería en Software