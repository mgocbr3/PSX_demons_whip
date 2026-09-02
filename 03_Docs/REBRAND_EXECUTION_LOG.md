# Execucao do Rebrand Completo -- Log Operacional

Objetivo desta pagina: controlar o avanco real do rebrand sem tocar na logica de jogo, rede, simulacao ou persistencia.

## Regra de ouro (sempre)

- O jogo base (core gameplay + dados + rede + progresso) nao sera alterado.
- assetes novos/reestilizados sao sempre:
  - padronizados por Blender,
  - exportados como GLB,
  - validados em catalogo/manifest,
  - testados visual e tecnicamente no contexto de jogo.
- IDs de sistema permanecem integros.
- Alteracoes de arte nao devem exigir mudanca de contratos de codigo.

## Status inicial confirmado

- Checklist principal criado em REBRAND_COMPLETO_CHECKLIST.md
- Estrutura de mapa de ativos ja existe em ASSET_MAPPING_1TO1.md
- Inventario de midia consolidado em asset_catalog.json/.csv (4694 itens, 4136 UNMAPPED)
- Pasta de personagens em 01_Assets_Organizados/Characters contem modelos e arquivos de animacao separados
- Fase 0 de preparacao iniciada.

## Etapa em curso (fase inicial)

### Fase 0 -- Preparacao e bloqueios

- [x] Normalizar o diretorio de trabalho do rebrand:
  - criado 01_Assets_Organizados/Characters|Enemies|Weapons|Dungeon|Props|Nature|Mounts|UI|Textures/_WORK
  - mantido 04_Code ausente neste workspace; validacao in-engine fica como dependencia externa.
- [x] Criar Style Bible v1 em 03_Docs/STYLE_BIBLE_DEMONS_WHIP_PS1.md (paleta Quake/Torment, materiais, teto de tris)
- [x] Criar Matriz Demake Nature/Dungeon em 03_Docs/NATURE_DUNGEON_DEMAKE_MATRIX.md (classificacao A/B/C para reaproveitamento)
- [x] Organizar zips soltos da raiz -> 00_Packs_Raw/_INCOMING (Artorias, darkknights, Individual_Assets, Medieval_Update_1.1, tarnished-house, Dracula GLB)
- [ ] Confirmar estrategia de branch para isolacao do rebrand no repositorio de origem.
- [ ] Conferir se ha acesso completo ao codigo/runtime principal (04_Code) no branch de origem.
- [ ] Criar branch dedicada do rebrand.
- [ ] Congelar mudancas de gameplay/simulador durante esta etapa.
- [ ] Definir dono das decisoes de arte, tecnica e QA (1 responsavel por tema).
- [ ] Registrar no repo o README de operacao do lote atual com criterios de aprovacao AAA.

### Fase 1 -- Branding core (safe path, sem runtime)

- [x] Abrir REBRAND_BATCH_01_UI_BRANDING.md como contrato de execucao do lote atual.
- [ ] Consolidar logo pack inicial: primario, secundario, mono, favicon set e hero/share.
- [ ] Padronizar identidade de home/menu e chrome UI.
- [ ] Definir paleta, tipografia e glossario visual para todos os assets de UI (usar Style Bible).
- [ ] Preparar pacote de pre-substituicao no diretorio:
  - 01_Assets_Organizados/UI/_WORK/logo_and_branding
- [ ] Registrar o resultado do lote em:
  - REBRAND_EXECUTION_LOG.md
  - asset_catalog.csv/.json
- [ ] Iniciar revisao de QA visual do lote

### Fase 1 -- Estrategia de animacao (antes de novos assets)

- [ ] Validar lista de animacoes base disponiveis em 01_Assets_Organizados/Characters
- [ ] Elaborar matriz de reaproveitamento (novo modelo + animacoes fonte) em lote pequeno.
- [ ] Definir ordem de adaptacao:
  1. Warrior/Vanguard
  2. Hunter
  3. Mage/Sorcerer
  4. Rogue/Assassin
  5. Knight/Paladin
  6. demais classes.
- [ ] Criar validacao de QA de animacoes por lote

### Fase 2 -- Pre-visual (Blender)

- [ ] Regras obrigatorias no Blender:
  - origem e escala unificadas,
  - pivots limpos (pe/centro de massa),
  - nomes de objetos e ossos consistentes,
  - materiais enxutos com paleta PSX,
  - texturas normalizadas por orcamento da familia.
- [ ] Exportar GLB para assets aprovados do lote.
- [ ] Atualizar asset_catalog de cada lote.

## Bloqueios atuais

- Blender nao encontrado nesta maquina -- previews e demake precisam ser rodados localmente com Blender instalado ou via Meshy + import Blender do usuario
- 7z/unrar nao encontrado -- extracao dos 5 .rar pendentes precisa ser feita manualmente: Characters_psx.rar, CreepyDoll.rar, Huntsman_Spider_FREE.rar, Vyrkael Dragon.rar, XenoWasp_FREE.rar
- Falta de 04_Code impede validacao in-engine final (FPS, hitbox, clipping)

## Proximo marco

- Entregar Lote 1 (branding) + batch A Nature/Dungeon com demake leve para aprovacao AAA antes de remix/meshy
