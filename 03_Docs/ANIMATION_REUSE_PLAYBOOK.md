# Playbook de Adaptação de Animações — Rebrand Demons Whip

## Princípio

Nenhuma lógica de combate será alterada. O objetivo é que os novos modelos:
- preservem o mesmo rig funcional;
- mantenham as mesmas janelas de ação;
- tenham tempo de animação comparável ao ativo base;
- se integrem ao pipeline atual sem novas dependências.

## Objetivo de animação para o rebrand

- Reutilizar animações existentes do jogo base.
- Adaptar novos modelos para ficarem compatíveis com esse padrão.
- Garantir que o impacto visual mude, sem mudar mecânica.

## Sequência de adaptação (batch por batch)

### 1) Diagnóstico por classe

- Mapear cada classe base para o ativo rebrandado:
  - Warrior → Vanguard
  - Knight → Paladin
  - Mage → Sorcerer
  - Rogue → Assassin
  - Ranger → Hunter
  - Druid → Cleric
  - Paladin → Inquisitor
  - Warlock → Necromancer
  - Shaman → Occultist
  - Barbarian → Berserker
  - + assets PSX já reutilizados conforme mapeamento.

### 2) Inventário de source clips

Clips principais disponíveis no workspace:
- `*_ability_anims.glb` (por classe)
- `*_hit_variety_anims.glb` (por classe)
- `bow_anims.glb` / `bow_hold_anim.glb` / `swim_anims.glb`
- `rogue_hooded_hit_variety_anims.glb` (reuso para variantes ocultas)

### 3) Estratégia de transferência por novo ativo

- Preservar estrutura de rig e nomenclatura de ossos existente.
- Usar `Retarget` para os mesmos nomes de ações.
- Ajustar offsets de root apenas para compatibilizar:
  - posição do pé,
  - alcance de arma,
  - alinhamento de olhar e cast.
- Validar em 3 níveis:
  - técnico (sem warnings críticos),
  - visual (não treme/encolhe),
  - gameplay (hit timing sem drift).

### 4) Ajustes em Blender obrigatórios

Antes do export:
- aplicar transforms;
- corrigir origem;
- remover armature constraints não suportadas em runtime;
- reduzir excesso de ossos não utilizados;
- uniformizar scale/rot em 1x sem deformar silhueta;
- checar colisão de calçados/posicionamento do pé em walk/run.

### 5) Testes de validação de animação por lote

- Não iniciar próximo lote até validar:
  - transição idle ↔ move ↔ attack ↔ dodge ↔ hit ↔ death (quando aplicável),
  - sem atrasos visuais em ação crítica,
  - sem loops com jitter.
- Comparar com referência base:
  - duração e taxa de quadros por loop,
  - eventos de combate (frame onde aplica hit),
  - impacto/percepção de recoil e telegraph.

### 6) Aceite de aprovação para cada lote (AAA-level checklist)

Checklist mínimo de aprovação:
- Consistência de timing (0 regressão perceptível no combate).
- Silhueta legível em mobile/desktop.
- Nenhum ajuste de lógica no código para “compensar” animação.
- Sem root motion não autorizado.
- Sem clipping de arma/ponte entre corpo e item.
- Sem perda de performance visual.

### 7) Registro no catálogo

- Para cada ativo adaptado:
  - atualizar estado em `asset_catalog` (ou controle equivalente),
  - registrar mapeamento de source/target,
  - registrar data de validação e aprovador.

## Observações de risco

- Ausência de alguns assets de base no workspace pode exigir validação em branch upstream antes da aprovação de lote.
- Sem essa validação, registrar como “aprovado para preview”, nunca como final de build.
