# Checklist de Rebrand Completo (Demons Whip)

## Objetivo
Consolidar o rebrand visual e de mídia para direção **Dark Fantasy PS1/PSX unificada**, sem alterar gameplay base, APIs ou estabilidade do jogo existente.

## Princípios inegociáveis (sempre válidos)
- [ ] Não quebrar `base game` (lógica de simulação, IDs, persistência, rede, economia e fluxos principais).
- [ ] Não adicionar novos sistemas ou alterar contratos de gameplay sem aprovação de risco.
- [ ] Todo ativo novo/reestilizado deve seguir **padrão único de arte** (parecer 1 só pacote autoral).
- [ ] Exportação final de runtime: `GLB / glTF 2.0`.
- [ ] `mapping` e inventário devem refletir exatamente o que está ativo no jogo.
- [ ] Qualquer arquivo gerado de runtime (`manifest`/`runtime-pack`) deve ser regenerado, não editado manualmente.

---

## Visão real do repositório (estado atual)
- [ ] Confirmado: estrutura principal é de produção de assets + documentação; código-base de runtime não está presente no workspace atual (`04_Code/world-of-claudecraft-main` ausente).
- [ ] Confirmado: `asset_catalog` possui `4694` itens e estados críticos com maioria ainda `UNMAPPED`.
- [ ] Confirmado: ausência de alguns `.rar` pendentes e pacote `Audio` vazio em `01_Assets_Organizados/Audio`.
- [ ] Confirmado: diretrizes principais existem em:
  - `DEMONS_WHIP_GDD_REBRAND_MASTER_v2.md`
  - `03_Docs/ASSET_MAPPING_1TO1.md`
  - `03_Docs/REBRAND_MEDIA_AUDIT_ESTRATEGIA.md`
  - `03_Docs/asset_catalog.json/.csv`

> Este checklist parte do pressuposto de manter o código legado intacto e atuar por camada de conteúdo.

---

## Etapa 1 — Preparação de contrato de produção
- [ ] Definir owner e ordem de precedência de decisões:
  - `DEMONS_WHIP_GDD_REBRAND_MASTER_v2.md`
  - `ASSET_MAPPING_1TO1.md`
  - `asset_catalog`
  - `INVENTARIO_FINAL.md`
- [ ] Criar branch/tarefa específica para rebrand sem misturar refactors técnicos.
- [ ] Congelar mudanças fora do escopo de rebrand neste ciclo (sem mudanças de UI-logic, simulação, balance ou serviços).
- [ ] Definir nome de pacote visual mestre (ex.: `demons_whip_psx_unified`), com versão e changelog.
- [ ] Criar pasta de saída normalizada por etapa:
  - `01_Assets_Organizados/Characters/_WORK`
  - `01_Assets_Organizados/Enemies/_WORK`
  - `01_Assets_Organizados/Weapons/_WORK`
  - `01_Assets_Organizados/Dungeon/_WORK`
  - `01_Assets_Organizados/Props/_WORK`
  - `01_Assets_Organizados/Nature/_WORK`
  - `01_Assets_Organizados/Mounts/_WORK`
  - `01_Assets_Organizados/UI/_WORK`
  - `01_Assets_Organizados/Textures/_WORK`
- [ ] Criar checklist de aprovação por batch (quem aprova estilo, quem aprova técnica).

---

## Etapa 2 — Definir linguagem de arte única
- [ ] Criar “Style Bible” única (1 documento) com:
  - paleta geral, cor de negrito, contraste e temperatura (dune/ruína/necromântico).
  - tipos de material permitidos (metal/stone/wood/flesh/water).
  - regras de silhueta, desgaste, proporção de detalhes, escala e espessura.
  - limites de detalhe por classe de ativo.
- [ ] Definir padrões de resolução por família:
  - personagem/chefes, NPC/mob, arma, prop, árvore/pedra/ambiente.
- [ ] Definir limite máximo de polígonos e materiais por categoria (segundo metas internas + runtime).
- [ ] Selecionar “pacote de referência técnica” para normalização visual:
  - escolher 6–12 assets bons e já no estilo alvo.
- [ ] Definir `Shader/Material Baseline`:
  - menos variação especular
  - palette controlada por mapa mestre
  - menos normal maps complexos
  - emissões e fresnel mínimos e consistentes
- [ ] Definir gramática de VFX e áudio (não é só arte de modelo): tom, ruído e impacto.

---

## Etapa 3 — Governança de assets novos/reestilizados
- [ ] Atualizar `asset_catalog` antes de cada lote com: 
  - estado alvo (`MANTER/CRIAR/REESTILIZAR/REMOVE`)
  - origem,
  - target,
  - status de aprovação visual e técnica.
- [ ] Criar planilha de decisão por ativo:
  - `Canalizar` (origem) → `Substituir por` → `Status` → `Tamanho final` → `Triangulação` → `Materiais` → `Texturas` → `Validação`.
- [ ] Bloquear entrada de assets sem mapeamento 1:1 e sem target final.
- [ ] Bloquear import direto de FBX/OBJ no runtime; usar GLB somente.

---

## Etapa 4 — Blender Pipeline (obrigatório para novos ativos)
- [ ] Pré-processamento no Blender:
  - aplicar `scale/rotation`, limpar origem e origem no chão.
  - remover armature redundante e normalizar nomes de nós.
  - corrigir `pivots` conforme gameplay (pé/centro de massa).
  - corrigir orientação e `forward/up` padronizados.
- [ ] Padronização de geometria:
  - reduzir triângulos para teto de categoria.
  - conservar silhueta principal.
  - evitar edge nítido excessivo fora do estilo PSX.
  - manter proporções de mãos/arma/pés para evitar T-pose visual.
- [ ] Materiais:
  - converter a 1 pacote de materiais compartilháveis por região/família.
  - limitar variação de materiais por ativo, priorizar reutilização.
  - manter texturas com paleta comum PSX.
- [ ] Textura:
  - baking/resize para resolução de tabela definida.
  - atlas por contexto quando possível.
  - compressão consistente.
- [ ] Export:
  - GLB limpo com geometria única por ativo, sem lixo DCC.
  - nomes de arquivos em `snake_case`.
  - sem vírgulas/acentos no path.
- [ ] Validação local no Blender:
  - check de normais, UV inválido, material vazio, scale 1.0.

---

## Etapa 5 — Checklist de conteúdo (ordem por risco)

### 5.1 Nível Base (baixa complexidade, alto impacto visual)
- [ ] Rebrand de Branding/UI chrome:
  - favicon, ícones e identidade principal.
  - `home-bg`/menu inicial.
  - texturas de UI com paleta unificada.
- [ ] Audio baseline:
  - criar/selecionar trilhas e SFX por ambiente.
  - normalizar loudness.
  - remover dependências de biblioteca de áudio fora do rebrand.

### 5.2 Players (novo rosto do jogo)
- [ ] Reprocessar `10` classes visuais:
  - manter IDs, animações e rig de base.
  - novos looks reestilizados para PSX unificado.
  - validar colunas, hitboxes e proporções com colisão atual.
- [ ] Reutilizar assets existentes bons de `01_Assets_Organizados/Characters/*` como base quando viável.

### 5.3 Inimigos principais e bosses (MVP + expansão)
- [ ] Normalizar elenco de mobs em `ASSET_MAPPING_1TO1`.
- [ ] Reestilizar bosses com padrão único de material + silhouette forte.
- [ ] Confirmar telegraph visual e VFX de leitura de combate.
- [ ] Validar sem trocar mecânica.

### 5.4 Armas (e kits visuais)
- [ ] Padronizar família de armas por categoria (1–2 materiais base por família).
- [ ] Atualizar ícones mantendo vínculo funcional com IDs.
- [ ] Revisar nomes de exibição (sem quebrar chaves de código).

### 5.5 Props, dungeon e cenários
- [ ] Reprocessar props críticos por cluster:
  - dungeons, camp, beach, grave, town.
- [ ] Normalizar texturas de superfícies para coerência tonal PSX.
- [ ] Padronizar sinais, banners, baús e materiais recorrentes.

### 5.6 Natureza e mapa atual (árvores, pedras, água) — reaproveitar e demake
- [ ] Levantar assets atuais em `Nature`, `Dungeon` e `Textures/env` reutilizáveis.
- [ ] Classificar em:
  - **A)** manter com redução/retexturização mínima,
  - **B)** remix total de PSX,
  - **C)** recriar quando fora de linguagem.
- [ ] Aplicar demake PSX:
  - reduzir detalhe excessivo
  - paleta unificada,
  - materiais mais simples,
  - normal map mínimo,
  - iluminação/roughness consistente.
- [ ] Gerar transições de terreno/áreas sem colar estilos diferentes.

### 5.7 Montarias
- [ ] Reestilizar os `9` mounts para coerência global.
- [ ] Manter `mount IDs` e comportamento.

---

## Etapa 6 — Árvore de mapeamento (anti-inconsistência)
- [ ] Todos os itens com status `⚠️ CRIAR` devem ter:
  - pasta origem,
  - arquivo final,
  - nome de exibição,
  - aprovação de arte + aprovação técnica.
- [ ] Todos os itens com status `⚠️ REESTILIZAR` devem registrar:
  - fonte original,
  - target final,
  - evidência antes/depois.
- [ ] Ativos `UNMAPPED` só podem ficar nesse estado com decisão explícita de “não usado ainda no runtime”.
- [ ] Ativos `MANTER` devem continuar mapeados com razão de compatibilidade.

---

## Etapa 7 — Normalização de mídia geral
- [ ] Unificar pasta `UI`: ícones, tooltips e classes em linguagem visual única.
- [ ] Consolidar texturas de terreno/ambiente sob mesmas paletas por zona.
- [ ] Revisar nomes e pastas com padrão único (sem legado quebrado nos arquivos de runtime).
- [ ] Atualizar manifests gerados (runtime assets e catálogo de áudio) apenas por geradores.
- [ ] Regerar qualquer manifest de media e mapear hash/versionamento.

---

## Etapa 8 — Validação técnica por lote (sem quebrar base)
- [ ] Para cada lote de assets:
  - abrir em teste rápido de gameplay.
  - validar desktop/mobile.
  - validar clipping/roots/offsets de mãos e pés.
  - validar telegraph e legibilidade com combate.
- [ ] Medir impacto:
  - FPS desktop mínimo.
  - FPS mobile mínimo.
  - draw calls, memória e tempo de load.
- [ ] Rejeitar ativo que introduza regressão de performance.
- [ ] Bloquear mudança de comportamento de combate, rede, progression ou persistência.

---

## Etapa 9 — Controle de qualidade final (pré-merge)
- [ ] Fazer sweep por pasta com check de 3 perguntas:
  - combina com direção artística única?
  - respeita mapeamento 1:1?
  - não altera sistema base?
- [ ] Conferir consistência narrativa/nomes para lore sem quebrar IDs.
- [ ] Executar validação de assets (nome, escala, materiais, pivots).
- [ ] Checar que arquivos `.rar` pendentes estejam tratados/importados ou justificados.
- [ ] Conferir licença e atribuição (ex.: `Torment Textures`) para itens de terceira parte.

---

## Etapa 10 — Entrega e operação contínua
- [ ] Gerar pacote final de mídia com manifest consolidado.
- [ ] Atualizar documentos:
  - `DEMONS_WHIP_GDD_REBRAND_MASTER_v2.md`
  - `REBRAND_MEDIA_AUDIT_ESTRATEGIA.md`
  - `ASSET_MAPPING_1TO1.md`
  - `asset_catalog.json/.csv`
- [ ] Registrar o que ficou para fases futuras (não essenciais para MVP).
- [ ] Definir checklist de manutenção mensal:
  - remoção de inconsistências visuais,
  - revisitar outliers,
  - monitorar regressão de performance.

---

## Ordem operacional recomendada (sem datas, apenas sequência)
1. Governança + Style Bible
2. Pipeline de Blender padronizado
3. Rebrand do UI/Branding Core
4. Rebrand de Players (10)
5. Rebrand de Inimigos/Mobs principais
6. Rebrand de Weapons + Mounts
7. Rebrand de Dungeon/Props mais usados
8. Rebrand de Natureza/Terreno/Água com demake PSX
9. Rebrand de bosses
10. Ajustes de áudio/VFX
11. Validação por lote + manifest + QA
12. Go-live de mídia e documento final

---

> Resultado esperado: o jogo inteiro deve parecer produzido com uma única direção, sem mistura de estilos e sem alterar mecânica-base.
