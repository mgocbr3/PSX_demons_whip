# REBRAND_MEDIA_GAP_MATRIX

Data: 17/08/2026

## 1) Inventário atual (estado físico)

### 1.1 Runtime atual (`04_Code/world-of-claudecraft-main/public/`)
- Logos/brand renomeados: `demons-whip-logo.png`, `demons-whip-logo-square.webp`, `demons-whip-logo-guide.webp`, `demons-whip-logo-hero.webp`.
- Home background: `demons-whip-home-bg.png` e `demons-whip-home-bg.mp4`.
- UI + assets de jogo: 2.085 arquivos em `public/ui`.
- Modelos/texturas: 1.284 + 227.
- Áudio: 1.043 arquivos (`audio/sfx` 495, `audio/music` 19, `audio/voice` 525).
- Vídeos: 1 arquivo (`demons-whip-home-bg.mp4`).
- Favicon: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`.
- Marca antiga preservada no disco em `_legacy-brand-assets/` para controle.

### 1.2 Limitações atuais
- Os arquivos de logo e home foram renomeados para o padrão Demons Whip, mas ainda não foram recriados com a nova identidade.
- `01_Assets_Organizados/Audio` ainda permanece vazio.
- Nomenclatura, escala e paleta ainda estão heterogêneas por origem de pack.

## 2) O que já existe x o que precisa gerar

### 2.1 Logos
- Já existe: placeholders renomeados.
- Precisa gerar: logo principal final, secundário, versão mono, variações de cor, set de ícones, favicons completos e manifest.

### 2.2 UI e telas
- Já existe: UI atual do template.
- Precisa gerar: home/login/loading/menu/rebrand do chrome, overlays de marca e mensagens de tela inicial.

### 2.3 Áudio
- Já existe: 1.042 SFX, 19 trilhas, 525 vozes.
- Precisa gerar: trilha Demons Whip por zona, novo pacote de SFX de assinatura, revisão de mix/ducking e atualização de manifestos.

### 2.4 Vídeos
- Já existe: home bg único.
- Precisa gerar: novo home bg, e opcionalmente trailer e social clips.

## 3) O que ficou fora de lugar e foi organizado
- Arquivos movidos para:
  - `02_ConceptArt/rebrand_raw_assets/DEMONS_WHIP_logo_candidate_01.png`
  - `02_ConceptArt/rebrand_raw_assets/DEMONS_WHIP_logo_candidate_02.png`
  - `02_ConceptArt/rebrand_raw_assets/DEMONS_WHIP_logo_candidate_03.png`
  - `02_ConceptArt/rebrand_raw_assets/DEMONS_WHIP_logo_candidate_04.png`
  - `02_ConceptArt/rebrand_raw_assets/DEMONS_WHIP_reference_source_1024.jpg`

## 4) Próximo passo recomendável
- **Lote A:** substituir os 4 logos placeholder e finalizar homepage/chrome.
- **Lote B:** padronizar paleta e resoluções por família.
- **Lote C:** pacote de branding sonoro + runtime-pack.
