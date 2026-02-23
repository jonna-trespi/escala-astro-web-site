# Escala - Página Web

Sitio web corporativo desarrollado con Astro, enfocado en servicios de cloud computing con AWS.

## 🚀 Stack Tecnológico

- **Framework**: Astro 4.15
- **Lenguaje**: TypeScript
- **Estilos**: CSS nativo
- **Tipografía**: Roboto (Google Fonts)
- **Iconos**: Google Material Icons

## 🎨 Diseño

### Colores

#### Neutral
- `--neutral-100`: #FFFFFF
- `--neutral-800`: #1A1A1A

#### Light Green
- `--light-green-400`: #F3FF62 (Principal)
- `--light-green-500`: #CDD847

#### Aquamarine
- `--aquamarine-500`: #00B0D3
- `--aquamarine-600`: #0085A0

### Tipografía
- **Font Family**: Roboto
- **Headline 1**: 96px / ExtraBold
- **Headline 2**: 60px / Bold
- **Headline 3**: 48px / Medium
- **Body Primary**: 18px / Regular

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 🏗️ Estructura del Proyecto

```
/
├── public/
│   ├── images/                   # Imágenes del sitio
│   ├── logos/                    # Logos (principal y clientes)
│   ├── icons/                    # Iconos personalizados
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro          # Navbar sobrepuesto
│   │   ├── HeroSlider.astro      # Hero con slider
│   │   └── Icon.astro            # Componente de iconos
│   ├── pages/
│   │   └── index.astro           # Página principal
│   └── styles/
│       └── global.css            # Estilos globales
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── README.md
└── ICONS.md                      # Guía de uso de iconos
```

## ✨ Características

- ✅ Header/Navbar sobrepuesto con efecto blur
- ✅ Hero Slider con 2 slides y auto-play
- ✅ Animaciones suaves y efectos de gradiente
- ✅ Diseño responsive
- ✅ TypeScript strict mode

## 🚧 En Construcción

El sitio se está desarrollando sección por sección:

- [x] Header/Navbar
- [x] Hero Slider
- [ ] Barra de estadísticas (cyan)
- [ ] Sección "¿Qué es lo siguiente?"
- [ ] Sección de soluciones
- [ ] Logos de clientes
- [ ] Sección AWS Partner
- [ ] Casos reales
- [ ] Formulario de contacto
- [ ] Footer

## 📝 Comandos

| Comando                | Acción                                      |
|:-----------------------|:--------------------------------------------|
| `npm install`          | Instala dependencias                        |
| `npm run dev`          | Inicia servidor local en `localhost:4321`   |
| `npm run build`        | Construye el sitio en `./dist/`             |
| `npm run preview`      | Preview del build local antes de deploy     |
| `npm run astro ...`    | Ejecuta comandos CLI de Astro              |

## 🌐 Puerto de Desarrollo

El servidor de desarrollo corre en: `http://localhost:4321`

## 🎨 Recursos

- **Iconos**: [Google Material Icons](https://fonts.google.com/icons) - Ver [ICONS.md](./ICONS.md) para guía de uso
- **Tipografía**: [Roboto en Google Fonts](https://fonts.google.com/specimen/Roboto)
- **Paleta de colores**: Ver sección "Colores" arriba

