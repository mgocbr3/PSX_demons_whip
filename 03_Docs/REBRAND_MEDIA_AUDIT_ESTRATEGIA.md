# Rebrand Medial Atlas — Demons Whip (Imagens, Logos, Sons, Vídeos e Relacionados)

## 1) Estado atual do acervo (snapshot em 17/08/2026)

### 1.1 Bases disponíveis no repositório

- `00_Packs_Raw/` = pacotes originais (entrada bruta)
- `01_Assets_Organizados/` = assets já organizados para uso
- `02_ConceptArt/` = conceito visual complementar
- `03_Docs/` = contratos de projeto e mapeamentos
- `04_Code/world-of-claudecraft-main/public/` = mídia de runtime atual do jogo

### 1.2 Inventário bruto por pacote (raw)

- Artorias PSX — 3 arquivos
- Cabin in the Woods DEMO — 24
- Castel Pack — 8
- kenney_retro-medieval-kit — 562
- Medieval — 202
- PS1 Dark Fantasy Horror Game Assets (by Stark Crafts) — 33
- PSX Graveyard Demo — 3
- PSX Horror-Fantasy Megapack — 73
- PSX_Dungeon — 67
- PSX_Modular_Medieval — 395
- TownTileSet — 10
- clownspack — 9
- darkknights — 21
- demonic weapons pack — 18
- ps1_alpaca_capybara_byobliviist — 10
- retro_nature_pack — 222
- Individual_Assets — 360

**Observação importante:** existem `.rar` pendentes no inventário (`Characters_psx.rar`, `CreepyDoll.rar`, `Huntsman_Spider_FREE.rar`, `Vyrkael...`, `XenoWasp_FREE.rar`) que não estão no fluxo de arquivos rastreados ainda.

### 1.3 Inventário organizado atual

- `01_Assets_Organizados/Characters` — 32
- `01_Assets_Organizados/Enemies` — 97
- `01_Assets_Organizados/Weapons` — 105
- `01_Assets_Organizados/Dungeon` — 379
- `01_Assets_Organizados/Props` — 194
- `01_Assets_Organizados/Nature` — 230
- `01_Assets_Organizados/Mounts` — 9
- `01_Assets_Organizados/VFX` — 17
- `01_Assets_Organizados/Textures` — 259
- `01_Assets_Organizados/UI` — 2.085
- `01_Assets_Organizados/Audio` — vazio

No `INVENTARIO_FINAL.md` também aparece o mesmo recorte com `UI Icons (1969)` e status de estrutura fechado por pasta.

### 1.4 Público atual de runtime (public/

No runtime atual (`04_Code/world-of-claudecraft-main/public/`) a mídia já em uso já é muito densa:

- `public/models` com folders principais de world/characters/weapons/mounts/creatures.
- `public/textures` com subpastas de terreno/estrutura/follage/biom.
- `public/ui` com ícones, classes, skills, mobs, itens, store, map markers etc.
- `public/vfx` com os efeitos atuais (`fire_01.png`, `magic_01.png`, `slash_02.png` ...)
- `public/audio/sfx` com catálogo volumoso de efeitos
- `public/audio/music` com trilhas por bioma/evento
- `public/audio/voice` com falas por NPC
- `public/fonts` com família tipográfica pronta (arquivos `.woff2`)

Contagem geral de mídia rastreada no `public`:

- `png`: 113
- `jpg`: 197
- `webp`: 2.130
- `mp3`: 1.042
- `mp4`: 1
- `wav/ogg/m4a/aac`: 0
- `otf/ttf/woff/woff2`: presentes (principalmente 21 arquivos `.woff2`)

## 2) O que já existe para rebrand

### 2.1 Logos e identidade visual (o que existe de “branding” hoje)

Existem assets de marca legados do projeto-base:

- `public/worldofclaudecraft-logo.png`
- `public/woc-logo-guide.webp`
- `public/woc-logo-hero.webp`
- `public/woc_logo_square.webp`
- `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`

No restante, nomes de logo/marca aparecem em alguns nomes de itens/skills/mobs (`ashbone_war_brand`, `ruinous_brand`, `guildmark_...`), mas não há um **pack de branding Demons Whip** consolidado.

### 2.2 Imagens, texturas e UI

- Há grande volume de UI/icons (2.085 na pasta organizada e 1.969 no snapshot `INVENTARIO_FINAL.md`), com nomenclaturas mistas e origens múltiplas.
- Há VFX de combate/ambiente já consolidados, mas ainda no padrão misto de origem.
- `01_Assets_Organizados` tem assets de ambiente, personagens, inimigos, montarias, armamentos e VFX, porém sem padrão único aplicado.

### 2.3 Áudio

- `public/audio/sfx` com 1.042 arquivos `.mp3` + manifesto de runtime (`public/audio/sfx/runtime-pack.json`).
- `public/audio/music` com 19 faixas.
- `public/audio/voice` com 525 arquivos de voz, distribuídos em ~90 personagens.
- Há manifesto de runtime com **275 entradas em `clips`**.

### 2.4 Vídeos

- Atualmente o runtime tem 1 arquivo de vídeo visível: `public/home-bg.mp4`.
- Não há biblioteca de trailers/cutscenes estruturada para rebrand além disso.

## 3) Lacunas: o que precisa gerar para “rebrand total”

## Modo recomendado: começar por uma só identidade visual antes de trocar tudo

1. Criar pack de identidade (mínimo viável)
   - Logotipo primário, logotipo secundário e versão monocolor
   - Ícone de app/square icon
   - Hero image/share card
   - Favicon set completo (`16,32,128,512`)
   - Marca d’água para assets de UI/menus (opcional)

2. UI + Marca no jogo
   - Refonir chrome de UI (bars, janelas, tooltips, HUD) para linguagem dark fantasy/PS1 consistente.
   - Revisar `public/ui/*` com inventário de ativos com estética antiga e renomear/realocar para padrão único.
   - Unificar tons de ícone e silhuetas para leitura uniforme.

3. Rebrand de mundos e objetos-chave
   - Ajustar personagens, inimigos, bosses, montarias e armas mais importantes por pack de estilo.
   - Padronizar materiais e texturas em atlas por zona para reduzir variação de paleta.

4. Áudio completo de rebrand
   - Criar/compilar trilhas de zona por tema (`combat`, `ambiente`, `hub`, `dungeon`, `boss`).
   - Reprocessar SFX de combate e ambiência com assinatura de impacto mais densa e menos moderna.
   - Reaproveitar voz por NPC apenas onde fizer sentido de lore; revisar texto + VO para referências de nome/brand.
   - Regerar `runtime-pack.json` + processo de conformidade (`sfx` pipeline) e validar bundle.

5. Vídeo/ambientação inicial
   - Substituir ou reestilizar `public/home-bg.mp4` para versão de marca.
   - Definir se haverá trailer/promo e pasta dedicada para mídia não-jogo.

## 4) Critérios de padronização (para evitar misturar estilos)

- Direção visual padrão: **Dark fantasy gótico, low-poly PS1-style** (curto no briefing).
- Tabela de resolução-alvo recomendada (segundo guia de rebrand):
  - Player: base 256×256, máximo 512×512
  - NPC/mob: 128×128 ou 256×256, máximo 512×512
  - Boss: 256×256, máximo 512×512
  - Montaria: 256×256, máximo 512×512
  - Arma: 64×64 a 128×128, máximo 256×256
  - Prop pequeno: 32×32 a 128×128
  - Prop médio: 64×64 a 256×256
  - Construção/atlas: 256×256 ou 512×512
  - Foliage: 32×32 a 128×128
  - Terrain atlas: 256×256 ou 512×512 por conjunto
- Nome de arquivo: `snake_case`, sem versão embutida no runtime.
- Prioridade de otimização: reduzir poli para leitura de forma, priorizar textura e vertex color.
- Paleta por zona (não usar a paleta inteira por asset; usar subpaletas coerentes).
- Evitar texto/logotipos “encravados” em modelos e props genéricos, salvo marca intencional.

## 5) O que não pode ficar com padrão antigo (checklist obrigatório)

- Evitar pacotes de origem fora do padrão escolhido (incluindo reutilização de estilos de terceiros fora da identidade única).
- Não manter mix de logos antigos (`WOC`, etc.) dentro da marca final.
- Não trocar modelo, UI e áudio sem atualizar o respectivo manifesto/registro de referência.
- Arquivos gerados de runtime (`manifest.generated.ts`, `runtime-pack.json`) devem ser regenerados, não editados manualmente.

## 6) Próximo passo de organização pro time de arte

1. Criar `REBRAND_MEDIA_MATRIX.md` derivado deste documento (por asset family + status). 
2. Marcar cada item como: `MANTER`, `AJUSTAR`, `RECRIAR`, `SUBSTITUIR`, `REMOVE`.
3. Rodar um pass por lote:
   - Lote A: logos + UI chrome + telas iniciais
   - Lote B: personagens + inimigos principais
   - Lote C: armas + VFX + partículas
   - Lote D: sons (com re-gen de manifest)
4. Após cada lote, validar no build de mídia e checklist de manifesto.

