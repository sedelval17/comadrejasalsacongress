# Publicación de revisión en GitHub Pages

Cuenta autorizada por el usuario: **sedelval17**, personal.

Repositorio preparado: `https://github.com/sedelval17/comadrejasalsacongress`.

URL prevista después de publicar: `https://sedelval17.github.io/comadrejasalsacongress/`. La preparación local no significa que esa URL ya esté publicada.

El dominio actual de Comadreja no se modifica. La copia de revisión tiene `noindex, nofollow` y `robots.txt` con `Disallow: /`. Esto solicita que no se indexe; GitHub Pages sigue sirviendo un enlace público, sin autenticación de visitantes.

## Separación de cuentas

- La autenticación CLI usa exclusivamente `~/.config/gh-comadreja-personal`.
- No se cambia la cuenta activa, el ayudante de credenciales ni la configuración Git global de la empresa.
- `scripts/publish-github.sh` comprueba `gh api user` y exige **sedelval17**, además del remoto exacto de este proyecto.
- El script no hereda `GH_TOKEN` o `GITHUB_TOKEN` de otras sesiones.
- El workflow tiene un control adicional: se ejecuta únicamente si el propietario del repositorio es `sedelval17`.

## Autenticar la cuenta personal

Con GitHub CLI disponible:

```bash
GH_CONFIG_DIR="$HOME/.config/gh-comadreja-personal" gh auth login \
  --hostname github.com --git-protocol https --web --scopes workflow
```

En la pregunta sobre configurar la autenticación Git global, elegir **No**. Usar una ventana privada del navegador con la cuenta **sedelval17** para autorizar el código. No pegar contraseñas ni tokens en el chat.

Verificar el resultado antes de publicar:

```bash
GH_CONFIG_DIR="$HOME/.config/gh-comadreja-personal" gh api user --jq .login
```

Debe responder exactamente `sedelval17`.

## Preparación ya incluida

- Variables `COMADREJA_SITE_URL`, `COMADREJA_BASE_PATH` y `COMADREJA_PREVIEW` para el despliegue.
- Rutas, imágenes responsivas, videos, enlaces, canonical y Open Graph compatibles con el subdirectorio del proyecto.
- `.github/workflows/deploy.yml`: comprueba TypeScript, compila con Node 22 y publica mediante GitHub Actions.
- El contenido que se sirve es únicamente la salida estática de `dist/`.

## Publicar

```bash
git add .
git commit -m "Preparar revisión de Comadreja para GitHub Pages"
bash scripts/publish-github.sh
```

En esta sesión, el CLI está disponible en `/tmp/comadreja-gh/bin/gh`. Puede indicarse con `COMADREJA_GH_BIN=/tmp/comadreja-gh/bin/gh`. El script necesita autenticación personal confirmada antes de crear el repositorio público o escribir en él.

Después, consultar el workflow de Pages y verificar una respuesta HTTP exitosa de la URL antes de dar la publicación por terminada.
