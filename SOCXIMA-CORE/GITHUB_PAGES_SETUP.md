# 🚀 SOCXIMA-CORE - Guía de Despliegue en GitHub Pages

## Estado: ✅ LISTO PARA PRODUCCIÓN

Tu aplicación **SOCXIMA-CORE** está 100% funcional y lista para desplegarse en:
```
https://eveliollo.github.io/SOCXIMA/SOCXIMA-CORE/
```

---

## 📋 INSTALACIÓN RÁPIDA

### Local (Desarrollo)
```bash
cd SOCXIMA-CORE
npm install
npm run dev
```
Abre: `http://localhost:3000`

### Build Producción
```bash
npm run build
```
Genera carpeta `dist/` lista para servir.

---

## 🔧 CONFIGURAR GITHUB PAGES

### Opción 1: Manual (Sin GitHub Actions)

1. **Hacer push de la rama `main`**
2. Ir a **Settings → Pages**
3. Seleccionar:
   - **Source:** Deploy from a branch
   - **Branch:** main
   - **Folder:** / (root)
4. Guardar y esperar ≈ 3 minutos

### Opción 2: Con GitHub Actions (Recomendado)

Crea el archivo `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy SOCXIMA-CORE to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install & Build
        working-directory: ./SOCXIMA-CORE
        run: |
          npm install
          npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './SOCXIMA-CORE/dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v2
        id: deployment
```

---

## 📱 ESTRUCTURA DEL PROYECTO

```
SOCXIMA-CORE/
├── public/
│   ├── index.html          # HTML principal
│   └── favicon.svg         # Icono neón
├── src/
│   ├── main.jsx            # Entry point React
│   ├── App.jsx             # Router principal
│   ├── components/
│   │   └── Navigation.jsx  # Menú principal
│   ├── pages/
│   │   ├── Home.jsx        # Página inicio
│   │   ├── Dashboard.jsx   # Panel usuario
│   │   ├── Admin.jsx       # Panel admin
│   │   ├── AI.jsx          # Chatbot IA
│   │   └── Marketplace.jsx # Tienda P2P
│   └── styles/
│       ├── global.css      # Estilos base
│       ├── App.css
│       ├── Navigation.css
│       └── pages/
│           ├── Home.css
│           ├── Dashboard.css
│           ├── Admin.css
│           ├── AI.css
│           └── Marketplace.css
├── package.json
├── vite.config.js
└── .gitignore
```

---

## 🎨 CARACTERÍSTICAS

✅ **Diseño Neón Quantum**
- Colores: Cyan, Magenta, Azul
- Efectos glow y animaciones
- 100% Responsivo

✅ **5 Páginas Funcionales**
- 🏠 Inicio - Hero + Características
- 📊 Dashboard - Panel de control
- 🛡️ Admin - Gestión del sistema
- 🤖 IA - Chat interactivo
- 💱 Mercado - Tienda P2P

✅ **Tecnologías**
- React 18
- Vite
- React Router v6
- Lucide React (iconos)

---

## 🌐 URLs IMPORTANTES

| Recurso | URL |
|---------|-----|
| **Sitio Web** | https://eveliollo.github.io/SOCXIMA/SOCXIMA-CORE/ |
| **Repositorio** | https://github.com/eveliollo/SOCXIMA |
| **Issues** | https://github.com/eveliollo/SOCXIMA/issues |

---

## 📝 COMANDOS DISPONIBLES

```bash
# Desarrollo con hot-reload
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Instalar dependencias
npm install
```

---

## ✅ CHECKLIST ANTES DE PUBLICAR

- [x] Código generado y probado
- [x] Estilos neón aplicados
- [x] Componentes React funcionales
- [x] Router configurado
- [x] Base path configurado para GitHub Pages
- [x] package.json con dependencias
- [x] vite.config.js optimizado
- [ ] Conectar wallet Solana (opcional)
- [ ] Implementar backend API (opcional)

---

## 🐛 TROUBLESHOOTING

### La página no carga
1. Verifica que base path sea `/SOCXIMA/SOCXIMA-CORE/`
2. Revisa la consola del navegador (F12)
3. Borra cache: Ctrl+Shift+Del

### GitHub Pages no actualiza
1. Ve a Settings → Pages
2. Verifica que esté habilitado
3. Espera 2-5 minutos
4. Haz un hard refresh: Ctrl+Shift+R

### Build falla
```bash
rm -rf node_modules
npm install
npm run build
```

---

## 🚀 PRÓXIMOS PASOS

1. **Local Testing**: `npm run dev`
2. **Build**: `npm run build`
3. **Push a GitHub**: `git push origin main`
4. **GitHub Pages Settings**: Activar despliegue
5. **Verificar**: Visita la URL en ≈5 minutos

---

**Creado por:** Evelio Llovera  
**Versión:** 1.0.0  
**Estado:** ✅ Producción  
**Última actualización:** 2026-05-28
