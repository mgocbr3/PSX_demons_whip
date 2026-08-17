# REBRAND_MEDIA_MATRIX

## Objetivo
Guia de execução para rebrand de mídia (imagens, logos, áudio e vídeos), ligando o que já existe em produção ao que ainda precisa ser gerado para fechar o padrão Demons Whip.

Status em 2026-08-17.

## 1) Inventário atual (runtime ativo)

### 1.1 Estrutura principal
- Base: `04_Code/world-of-claudecraft-main/public/`

### 1.2 Contagem de arquivos por pasta
- `audio`: 1.043
  - `audio/sfx`: 495
  - `audio/music`: 19
  - `audio/voice`: 525
  - Manifesto: `audio/sfx/runtime-pack.json`
- `ui`: 2.085
- `textures`: 227
- `models`: 1.284
- `vfx`: 17
- `map_art`: 8
- `map_bg`: 15
- `guide-stills`: 88
- `claudium`: 44
- `env`: 39
- `basis`: 2
- `fonts`: 22
- total geral: 4.905 arquivos

### 1.3 Extensões encontradas (top)
- `.webp`: 2.130
- `.glb`: 1.260
- `.mp3`: 1.042
- `.jpg`: 197
- `.png`: 113
- `.ktx2`: 66
- `.hdr`: 32
- `.woff2`: 22
- `.json`: 14
- `.html`: 10
- `.mp4`: 1 (`home-bg.mp4`)

### 1.4 Estado da identidade de marca no runtime

- Arquivos de logo atuais (todos com marca anterior):
  - `public/worldofclaudecraft-logo.png`
  - `public/woc-logo-guide.webp`
  - `public/woc-logo-hero.webp`
  - `public/woc_logo_square.webp`
- Tela inicial/ambiente com marca atual anterior:
  - `public/home-bg.mp4`
  - `public/home-bg.png`

## 2) Inventário atual (source padronizado de assets)
- `01_Assets_Organizados/Buildings`: 3
- `01_Assets_Organizados/Characters`: 32
- `01_Assets_Organizados/Dungeon`: 403
- `01_Assets_Organizados/Enemies`: 97
- `01_Assets_Organizados/Mounts`: 9
- `01_Assets_Organizados/Nature`: 206
- `01_Assets_Organizados/Props`: 194
- `01_Assets_Organizados/Textures`: 259
- `01_Assets_Organizados/UI`: 2.085
- `01_Assets_Organizados/VFX`: 17
- `01_Assets_Organizados/Weapons`: 105
- `01_Assets_Organizados/Audio`: 0

> Notas:
> - Parte dos assets de runtime foi normalizada para 1 `public/` único.
> - O pacote `01_Assets_Organizados/` ainda não organiza áudios, nem metadados finais de rebrand (manifestos de mídia).

## 3) O que já existe vs. o que precisa gerar

### 3.1 Logos
- **Já existe**: 4 arquivos de logo antigos.
- **Precisa gerar**:
  - Logo principal (PNG + WEBP + opcional SVG)
  - Variante secundária
  - Variante mono/monocromática
  - Ícone/símbolo de app/favicons
  - Fallback de texto branco/escuro para overlays claros e escuros
- **Ação**: remover toda referência `woc*` / `worldofclaudecraft*` do runtime público.

### 3.2 UI + telas
- **Já existe**: 2.085 ícones/sprites em `public/ui`.
- **Precisa gerar**:
  - Chrome pack de UI com identidade Demons Whip
  - Conjunto de telas iniciais (loading, seleção, menus) em estilo consolidado
  - Rebranding de elementos de tela com texto de marca anterior

### 3.3 Áudio
- **Já existe**:
  - `495` SFX
  - `19` trilhas
  - `525` vozes NPC
  - `runtime-pack.json` em `audio/sfx/`
- **Precisa gerar/atualizar**:
  - Novas trilhas de marca (opcional por lote)
  - Ajustes de ambiência por bioma/era conforme identidade sonora Demons Whip
  - Regras de mixagem (`master`,`ducking`, EQ)
  - Regenerar `runtime-pack.json` após qualquer alteração de SFX.

### 3.4 Vídeos
- **Já existe**: 1 runtime de vídeo (`public/home-bg.mp4`).
- **Precisa gerar**:
  - `home-bg.mp4` rebrandizado
  - (Opcional) vídeo extra de trailer/promo em pasta dedicada.

### 3.5 Efeitos/ambientação
- **Já existe**: VFX e texturas com padrões mistos.
- **Precisa gerar**:
  - Harmonizar paleta e contraste com o guia Demons Whip
  - Reavaliar VFX críticos de UI/gameplay para consistência low-poly/PS1.

## 4) Matriz de decisão para próximos lotes

| Família | Status atual | Próxima decisão | Ação inicial |
|---|---|---|---|
| Logos | `SUBSTITUIR` | substitui_todos | Criar pack de logos Demons Whip e trocar no runtime |
| Home background | `SUBSTITUIR` | substitui | Regravar/reestilizar `home-bg.*` |
| UI core | `AJUSTAR` | lote A | Definir chrome/icons base e começar por telas críticas |
| SFX pack | `REGERAR` | lote D | Auditar nomenclatura e gerar novo `runtime-pack.json` |
| Music | `AJUSTAR` | lote D | Renomear e substituir trilhas por pacote novo |
| Voice | `MANUTER + AJUSTAR TAGGING` | lote D | Só ajustes de metadata/lore de personagem |
| Vídeo promocional | `CRIAR` | lote A | Definir se entra no escopo mínimo do rebrand |
| `01_Assets_Organizados` | `REORGANIZAR` | contínuo | Consolidar nomenclatura, polígono e resolução-alvo por pasta |

## 5) Saídas mínimas para fechar rebrand “total” da mídia

1. `public/worldofclaudecraft-logo.png` removido/replaced.
2. `public/woc-logo-guide.webp` removido/replaced.
3. `public/woc-logo-hero.webp` removido/replaced.
4. `public/woc_logo_square.webp` removido/replaced.
5. `public/home-bg.mp4` + `public/home-bg.png` rebrandizados.
6. `runtime-pack.json` regenerado após nova trilha de SFX.
7. Changelog de mídia (docs) indicando origem/pack, resolução e família para cada categoria.

## 6) Próximo passo recomendado

- **Sprint A (agora):** logos + home assets + inventário de telas por prioridade.
- **Sprint B:** UI chrome + primeiros personagens/artefatos.
- **Sprint C:** lotes de áudios (MVP + expansão por bioma).
- **Sprint D:** validação de runtime (`04_Code/world-of-claudecraft-main/public`) e atualização de manifestos.
