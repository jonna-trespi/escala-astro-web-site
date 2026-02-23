# 🎨 Guía de Uso de Google Material Icons

Este proyecto utiliza [Google Material Icons](https://fonts.google.com/icons) para todos los iconos.

## 📦 Configuración

Los iconos ya están configurados en el proyecto. Se cargan desde Google Fonts en `src/pages/index.astro`.

## 🚀 Cómo Usar los Iconos

### Método 1: Usando el componente `Icon` (Recomendado)

```astro
---
import Icon from '../components/Icon.astro';
---

<!-- Icono básico -->
<Icon name="home" />

<!-- Con tamaño personalizado -->
<Icon name="search" size={32} />

<!-- Con clases CSS adicionales -->
<Icon name="settings" class="custom-icon" />

<!-- Estilo filled (relleno) -->
<Icon name="favorite" style="filled" />
```

### Método 2: Usando clases CSS directamente

```html
<!-- Material Icons (filled by default) -->
<span class="material-icons">home</span>

<!-- Material Symbols Outlined -->
<span class="material-symbols-outlined">search</span>
```

## 📚 Iconos Comunes del Proyecto

### Navegación
- `menu` - Menú hamburguesa
- `close` - Cerrar
- `expand_more` - Flecha abajo
- `expand_less` - Flecha arriba
- `chevron_right` - Flecha derecha
- `chevron_left` - Flecha izquierda
- `arrow_forward` - Flecha adelante
- `arrow_back` - Flecha atrás

### Acciones
- `add` - Agregar/Más
- `remove` - Quitar/Menos
- `edit` - Editar
- `delete` - Eliminar
- `save` - Guardar
- `download` - Descargar
- `upload` - Subir
- `share` - Compartir

### Comunicación
- `email` - Email
- `phone` - Teléfono
- `chat` - Chat
- `notifications` - Notificaciones
- `language` - Idioma

### Cloud/Tech
- `cloud` - Nube
- `cloud_upload` - Subir a la nube
- `cloud_download` - Descargar de la nube
- `cloud_done` - Nube completada
- `storage` - Almacenamiento
- `computer` - Computadora
- `devices` - Dispositivos
- `security` - Seguridad
- `lock` - Candado
- `vpn_key` - Llave/Acceso

### Redes Sociales
- `facebook` - Facebook (si está disponible)
- `twitter` - Twitter/X
- `linkedin` - LinkedIn
- `youtube` - YouTube
- `instagram` - Instagram

### Otros
- `check` - Check/Correcto
- `check_circle` - Check en círculo
- `error` - Error
- `warning` - Advertencia
- `info` - Información
- `help` - Ayuda
- `star` - Estrella
- `favorite` - Favorito/Corazón
- `visibility` - Ver
- `visibility_off` - Ocultar
- `play_arrow` - Play
- `pause` - Pausa
- `stop` - Stop

## 🎨 Personalización

### Tamaños
```astro
<Icon name="home" size={16} />  <!-- Pequeño -->
<Icon name="home" size={24} />  <!-- Normal (default) -->
<Icon name="home" size={32} />  <!-- Mediano -->
<Icon name="home" size={48} />  <!-- Grande -->
```

### Colores
Usa CSS para cambiar el color:

```css
.icon {
  color: var(--light-green-400);
}

.icon:hover {
  color: var(--aquamarine-500);
}
```

### En botones
```astro
<button class="btn">
  <Icon name="search" size={20} />
  Buscar
</button>
```

## 🔍 Buscar Iconos

Visita [Google Material Icons](https://fonts.google.com/icons) para buscar y explorar todos los iconos disponibles.

1. Busca el icono que necesitas
2. Copia el nombre del icono (ej: "cloud_done")
3. Úsalo con el componente `Icon`:
   ```astro
   <Icon name="cloud_done" />
   ```

## 💡 Tips

- Los nombres de los iconos usan `snake_case` (ej: `arrow_forward`, `cloud_done`)
- Por defecto se usa el estilo "outlined" (contorno)
- Usa `style="filled"` para iconos rellenos
- Los iconos heredan el color del texto por defecto
- Los iconos se alinean verticalmente con el texto automáticamente

## 📖 Ejemplos en el Proyecto

- **Header**: Flechas de dropdown (`expand_more`), icono de idioma (`language`)
- **Hero**: Icono de más (`add`) en botones
- **Navegación**: Iconos de menú (`menu`)

## 🎯 Variantes de Estilos

```astro
<!-- Outlined (default) - líneas -->
<Icon name="home" style="outlined" />

<!-- Filled - relleno -->
<Icon name="home" style="filled" />

<!-- Rounded - redondeado -->
<Icon name="home" style="rounded" />

<!-- Sharp - angular -->
<Icon name="home" style="sharp" />

<!-- Two Tone - dos tonos -->
<Icon name="home" style="two-tone" />
```

