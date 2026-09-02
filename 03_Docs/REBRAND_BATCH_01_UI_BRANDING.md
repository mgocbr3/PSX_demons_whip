# Lote 01 — Branding & UI Core (Rebrand Seguro)

## Escopo do lote

Este lote é o início do rebrand e **não altera gameplay, rede, persistência ou balance**.  
Objetivo: transformar a linguagem visual de marca e interface para o padrão dark fantasy PS1/PSX, sem tocar lógica de jogo.

## Arquivos-alvo do lote

### Marca principal
- `worldofclaudecraft-logo.png`
- `woc-logo-guide.webp`
- `woc-logo-hero.webp`
- `woc_logo_square.webp`
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`

### UI/ambiente inicial
- `home-bg.mp4`
- ícones e chrome de UI que ainda carregam identidade legada
- componentes visuais de tela inicial, menu e telas de transição

## Entregáveis obrigatórios do lote

- 1 pacote de branding com padrão único:
  - logo primário
  - logo secundário
  - versão mono/monocromática
  - favicon family (`16, 32, 128, 512` no padrão final)
  - hero/share
- Chrome de UI padronizado por tema:
  - frames
  - botões
  - barras
  - tooltips críticos
  - estados (idle/hover/active/disabled)
- Home/menu visual alinhado ao mesmo vocabulário artístico
- Pasta de trabalho dedicada:
  - `01_Assets_Organizados/UI/_WORK/logo_and_branding/`
- Índice de decisão de troca:
  - manter/ajustar/substituir por quê
  - arquivo origem → arquivo destino de staging
  - aprovação de arte + aprovação técnica

## Critérios de aprovação AAA para este lote

- Unificação de linguagem (sem mistura de old branding com novo branding no mesmo estado visual).
- Identidade escura legível em diferentes fundos.
- Contraste e leitura em HUD e tela inicial.
- Sem alteração de posicionamento de gameplay (somente look and feel).
- Arquivos finais em path limpo, nome no padrão e prontos para export GLB apenas onde for ativo 3D.

## Regras de não-regressão

- Não mexer nos arquivos de lógica, balance, scripts de gameplay, animação base ou rede.
- Não atualizar runtime sem validação por lote e QA.
- Não misturar fontes tipográficas não aprovadas pelo `style bible`.
- Não substituir ícones funcionais com mudança semântica.

## Checklist de execução (sequência)

- [ ] Validar lista final de arquivos a substituir antes de início.
- [ ] Criar versões de staging em:
  - `01_Assets_Organizados/UI/_WORK/logo_and_branding/`
- [ ] Revisar contraste e coerência com direção de arte.
- [ ] Registrar decisão de cada item no `REBRAND_EXECUTION_LOG.md`.
- [ ] Aprovação de direção (arte) e aprovação técnica (consistência de mídia).
- [ ] Entregar lote para etapa seguinte de validação visual em build quando `04_Code` estiver disponível.

## Próximo gatilho

Após aprovação do Lote 01, iniciamos Lote 02:  
- adaptação de personagens + animação retarget com matriz `ANIMATION_REUSE_PLAYBOOK.md`.

