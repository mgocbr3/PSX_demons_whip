# DEMONS WHIP
## Auditoria do jogo-base e plano de rebrand fiel

**Versão:** 3.0  
**Data da auditoria:** 17/08/2026  
**Projeto-base:** `levy-street/world-of-claudecraft`  
**Base técnica auditada:** World of ClaudeCraft `v0.38.3`  
**Finalidade:** documento de direção para agentes de IA, programação, arte técnica, design, áudio, conteúdo, QA e publicação  
**Status:** substitui interpretações anteriores quando houver conflito

---

# 1. CONCLUSÃO EXECUTIVA

World of ClaudeCraft não é apenas um template visual de RPG 3D. Ele já é um **MMO clássico completo**, com simulação determinística, servidor autoritativo, mundo persistente, nove classes, 27 especializações, quests, dungeons, raid, rifts, delves, PvP, profissões, mercado, guildas, montarias, conquistas, localização, builds desktop/mobile e ferramentas robustas de QA.

O rebrand mais seguro e valioso não é transformar o projeto em um clone mecânico de Elden Ring. A direção correta é:

> **Manter o jogo como um MMO clássico de action bar, tab target, progressão por classes e conteúdo social, mas reapresentá-lo como um dark fantasy de PS1, com nova identidade, modelos, materiais, áudio, lore, bosses e sensação de impacto.**

Essa formulação preserva o que é caro e complexo no jogo-base e concentra o trabalho onde a mudança é mais percebida pelo público.

## 1.1 O que deve permanecer reconhecível

- Loop de MMO clássico.
- Nove classes e três especializações por classe.
- Action bar com múltiplas habilidades.
- Targeting, threat, aggro, roles, party e raid.
- Progressão de nível, talentos, equipamento e crafting.
- Mundo aberto, hubs, estradas, dungeons, rifts e delves.
- Quests, mercado, correio, banco, guildas e PvP.
- Controles desktop, mobile e gamepad.
- Arquitetura online/offline/headless compartilhada.
- Mundo autoritativo e persistente.

## 1.2 O que deve parecer completamente novo

- Nome, logo, identidade e comunicação.
- Personagens, NPCs, criaturas, bosses e montarias.
- Texturas, materiais, paleta e acabamento dos biomas.
- Construções e props que ainda leem como fantasia alegre.
- VFX, sangue, fumaça, fogo, magia e telegraphs.
- Música, ambiência, vozes e efeitos sonoros restritos.
- Lore, nomes de exibição, diálogos, descrições e apresentação dos encontros.
- Launcher, character select, loading screens e skin da UI.
- Monetização e serviços vinculados ao ecossistema anterior.

## 1.3 O principal risco do projeto

O maior risco não é técnico. É criar um produto visualmente escuro, mas mecanicamente confuso: personagens realistas demais, câmera próxima demais, fog excessivo, UI reduzida demais e telegraphs difíceis de enxergar. Isso destruiria a leitura de um MMO com vários jogadores, pets, summons, adds, nameplates, cooldowns e objetivos simultâneos.

O PS1 deve ser uma **direção de arte controlada**, não uma simulação literal das limitações do console.

---

# 2. FONTES DA AUDITORIA E GRAU DE CONFIANÇA

A auditoria cruza:

- `README.md` atual do repositório.
- `AGENTS.md`, `CLAUDE.md` raiz e instruções locais.
- Código de classes, simulação, renderer, personagens, terreno, UI, áudio e gráficos.
- `CREDITS.md` e regras de licença.
- Site oficial publicado.
- Página publicada na Steam.
- Aplicativo publicado para iPhone/iPad.
- Screenshots enviados na conversa.
- `ASSET_MAPPING_1TO1.md`.
- `GDD_DemonsWhip.md` e GDD Master v2.
- Conceitos visuais aprovados para o rebrand.

## 2.1 Limitação dos vídeos enviados

Os dois links do YouTube foram fornecidos como referências de gameplay, porém o ambiente desta auditoria não conseguiu obter reprodução, frames ou transcrição direta desses URLs. Portanto, este documento **não finge uma análise frame a frame dos vídeos**. A leitura de gameplay foi construída a partir do código atual, documentação oficial, jogo publicado e imagens fornecidas.

Uma auditoria temporal dos vídeos pode ser anexada depois, caso os arquivos MP4 sejam disponibilizados diretamente.

---

# 3. O QUE O JOGO-BASE REALMENTE É

## 3.1 Produto

World of ClaudeCraft é um micro-MMO clássico com:

- cliente WebGL/Three.js;
- servidor autoritativo;
- persistência em PostgreSQL;
- modo offline no navegador;
- ambiente headless de reinforcement learning;
- builds Electron para desktop;
- builds Capacitor para iOS e Android;
- integração de conquistas com plataformas;
- wiki gerada do conteúdo vivo;
- localização em 22 idiomas;
- ferramentas de operação, editor, testes e captura visual.

Isso significa que Demons Whip deve ser tratado como uma **operação de fork, produto e conteúdo**, não apenas como uma troca de modelos.

## 3.2 Um core em três hosts

A mesma simulação funciona em:

1. servidor multiplayer autoritativo;
2. mundo offline no navegador;
3. ambiente headless usado por agentes e benchmarks.

A consequência para o rebrand é absoluta: nenhuma mudança visual deve contaminar a simulação, o seed, o relógio ou a aleatoriedade determinística.

## 3.3 Loop principal atual

1. Criar conta ou entrar no modo offline.
2. Criar personagem e selecionar classe.
3. Entrar em Eastbrook Vale.
4. Obter quests, explorar hubs e combater mobs.
5. Aprender habilidades e distribuir talentos.
6. Conseguir loot, consumíveis, materiais e dinheiro.
7. Formar grupo, entrar em dungeons e enfrentar bosses.
8. Usar profissões, banco, correio e World Market.
9. Entrar em PvP, eventos, delves, rifts e raid.
10. Continuar no endgame por equipamento, coleções, conquistas e prestígio.

O rebrand deve reforçar esse loop, não substituí-lo.

---

# 4. INVENTÁRIO FUNCIONAL A PRESERVAR

## 4.1 Personagem e progressão

- Níveis 1 a 20 no arco clássico atual.
- XP e curvas de progressão clássicas.
- Stats, armor mitigation, hit, dodge, resist, haste, crit e threat.
- Equipamento, bags, banco e loot.
- Habilidades que sobem de rank.
- Três specs por classe.
- Builds exportáveis.
- Consumíveis, comida e bebida.
- Death, release spirit, graveyard e resurrection.
- Montarias e skins cosméticas.
- Prestige após level cap.

## 4.2 PvE

- Mundo aberto com mobs, raros, social pulls, chase e leash.
- Quests encadeadas.
- Dungeons para cinco jogadores.
- Solo crypt.
- Heroic tier.
- World bosses.
- Raid de dez jogadores.
- Procedural rifts com ranks.
- Delves para um ou dois jogadores com companion de IA.
- Infernal Citadel e conteúdo de endgame.

## 4.3 Social e multiplayer

- Parties de até cinco.
- Raid de dez.
- Guildas, ranks e chat.
- Trading atômico validado pelo servidor.
- Duels.
- Whispers, party chat e guild chat.
- AFK/DND.
- Tap rights e XP de grupo.
- Dungeon Finder por role e grupos premade.
- Calendário, leaderboards e eventos.

## 4.4 PvP e atividades paralelas

- Arenas 1v1 e 2v2.
- Fiesta 2v2.
- Protect Yumi 3v3 e 5v5.
- Honor e equipamento de PvP limitado em PvE.
- Vale Cup/boarball.
- Card Duel.

## 4.5 Economia e profissões

- Quatro gathering trades: mining, logging, herbalism e fishing.
- Dez crafting professions.
- Ferramentas por tier.
- Workstations.
- Masterwork e maker's mark.
- Commissions.
- World Market.
- Ravenpost.
- Personal bank.

## 4.6 Coleções e retenção

- Book of Deeds.
- Títulos e borders.
- Renown.
- Chronicles por zona.
- Reliquary.
- Mounts, skins, troféus e marcas.
- Leaderboards.
- Notícias na seleção de personagem.

---

# 5. AS NOVE CLASSES REAIS

O código atual possui nove classes, e não dez:

| ID interno | Nome atual | Recurso/identidade | Papel preservado |
|---|---|---|---|
| `warrior` | Warrior | Rage, stances, melee | tank e DPS físico |
| `paladin` | Paladin | Mana, holy melee | tank, healer e DPS |
| `hunter` | Hunter | Focus, ranged, pet | DPS ranged/melee e pet |
| `rogue` | Rogue | Energy e combo points | DPS, stealth e controle |
| `priest` | Priest | Mana, holy/shadow | healer e caster DPS |
| `shaman` | Shaman | Mana, imbues e elements | healer, melee e caster |
| `mage` | Mage | Mana e escolas mágicas | caster DPS e Chronomancy healer |
| `warlock` | Warlock | Shadow, curses e summons | caster DPS, demons e undead |
| `druid` | Druid | Mana e shapeshift | tank, healer, melee e caster |

## 5.1 Correção obrigatória

Os documentos anteriores que listam Knight, Ranger e Barbarian como classes independentes devem ser corrigidos. Esses nomes podem ser usados como:

- aparência de armor set;
- nome de spec;
- título;
- NPC faction;
- enemy archetype;
- skin cosmética.

Eles não devem criar novas classes no MVP.

## 5.2 Estratégia recomendada de nomes

Para preservar reconhecimento e reduzir custo de localização, a recomendação é **manter os nomes genéricos das classes no MVP** e alterar visual, descrição, specs, habilidades e iconografia.

Quando um nome dark fantasy for desejado, usar como subtítulo de arquétipo:

| Classe | Arquétipo visual de Demons Whip |
|---|---|
| Warrior | Reaver / Vanguard |
| Paladin | Inquisitor / Ashen Templar |
| Hunter | Huntsman / Beast Warden |
| Rogue | Nightblade / Cutthroat |
| Priest | Confessor / Mourning Saint |
| Shaman | Stormcaller / Hexspeaker |
| Mage | Arcanist / Chronomancer |
| Warlock | Gravebinder / Diabolist |
| Druid | Wildbound / Skinchanger |

IDs, save data, wire protocol e regras continuam com os nomes internos originais.

---

# 6. DNA DE GAMEPLAY: O QUE FAZ O JOGO FUNCIONAR

## 6.1 Combate

O jogo é um MMO clássico em tempo real, não um action RPG de colisão precisa. Ele depende de:

- targeting explícito;
- auto-attacks;
- swing timers;
- cast bars;
- global cooldown;
- action bars extensas;
- range checks;
- facing e line of sight;
- aggro/threat;
- buffs, debuffs, auras e absorbs;
- healer/tank/DPS;
- leitura de grupos e adds.

## 6.2 O Soulslike deve entrar na sensação

Permitido no MVP:

- animações com antecipação mais legível;
- ataques com melhor peso audiovisual;
- câmera com resposta mais firme;
- golpes de boss mais claros;
- silhuetas ameaçadoras;
- arenas mais dramáticas;
- VFX mais materiais e menos cartunescos;
- maior contraste entre perigo e ambiente;
- som de impacto e ambiência sombria;
- pequenas alterações de tuning com testes.

Não recomendado no MVP:

- stamina global;
- roll universal com i-frames;
- parry universal;
- lock-on estilo Souls;
- loss-and-recovery de souls;
- bonfire como novo sistema de save;
- reconstrução do targeting;
- remoção da action bar;
- combate baseado em hitboxes físicas por arma;
- root motion autoritativo.

## 6.3 Por que essa distinção importa

Uma reescrita Soulslike atingiria simultaneamente:

- simulação;
- servidor;
- cliente;
- bots/headless;
- PvP;
- bosses;
- AI;
- animações;
- mobile;
- netcode;
- balanceamento de 27 specs;
- dezenas de testes.

Ela deixaria de ser um rebrand e se tornaria outro projeto.

---

# 7. LEITURA VISUAL DO JOGO ATUAL

A identidade visual atual é composta por:

- personagens pequenos e cabeçudos;
- modelos low-poly de packs diferentes;
- terrenos verdes e saturados;
- construções medievais limpas;
- vegetação estilizada;
- forte visibilidade a longa distância;
- partículas brilhantes;
- UI clássica de MMO ocupando as bordas;
- muitos labels, quest markers e nameplates;
- minimap e quest tracker constantemente visíveis;
- action bar extensa;
- cenas que comportam vários jogadores e mounts.

## 7.1 O que não funciona para Demons Whip

- Proporções chibi.
- Cores alegres e limpas.
- Packs visualmente desconectados.
- Materiais PBR modernos misturados com modelos simples.
- Inconsistência de escala, densidade e textura.
- Arquitetura de vila genérica demais.
- VFX com leitura de fantasia colorida.
- Props sem desgaste e contexto narrativo.

## 7.2 O que deve ser preservado visualmente

- Leitura de silhouettes.
- Separação clara entre player, NPC, mob e boss.
- Visibilidade de quest givers e interactables.
- Telegraphs claros.
- Identificação de party e target.
- Contraste das barras e recursos.
- Navegação por estrada, hubs e landmarks.
- Legibilidade em crowd.
- Visibilidade mobile.

---

# 8. TESE VISUAL DO REBRAND

## 8.1 Frase de direção

> Um MMO clássico perdido de PlayStation 1 que recebeu uma versão online impossível: humanoides angulares, mundo decadente, texturas pequenas, luz dramática, fog e horror medieval, sem sacrificar a leitura de raids e combate em grupo.

## 8.2 Não copiar Elden Ring

A referência deve orientar:

- escala emocional;
- sensação de ruína;
- silhuetas;
- enquadramento;
- contraste;
- estranheza;
- bosses monumentais;
- melancolia.

Não copiar:

- personagens;
- armaduras específicas;
- nomes;
- bosses;
- símbolos;
- mapas;
- lore;
- UI;
- composição idêntica de key art.

## 8.3 PS1 controlado

Usar:

- low-poly real;
- texturas de 64 a 512 px conforme categoria;
- paleta reduzida;
- nearest filtering em assets adequados;
- dithering;
- banding intencional;
- vertex lighting ou flat shading em perfis selecionados;
- fog atmosférico;
- wobble sutil e opcional;
- resolução interna reduzida opcional;
- sombras simples;
- skyboxes degradados.

Não usar de forma obrigatória:

- baixa resolução da UI;
- textos pixelados ilegíveis;
- clipping agressivo;
- draw distance que esconda inimigos;
- jitter forte de vértices;
- warping que prejudique telegraphs;
- 4:3 obrigatório;
- 20 FPS como estética.

---

# 9. MATRIZ DE ESCOPO REAL

| Área | KEEP | RESKIN | LIGHT TUNE | LATER | PROIBIDO NO MVP |
|---|---|---|---|---|---|
| Sim e servidor | core completo | textos visíveis | números pontuais | novas mecânicas | reescrever autoridade |
| Classes | 9 IDs e kits | modelos, nomes de exibição, VFX | feedback/valores | nova classe | mudar IDs em massa |
| Talentos | 27 specs | ícones, nomes, descrições | balance pontual | árvore nova | reset estrutural |
| Mundo | seed, coordenadas, hubs | materiais, props, arquitetura 1:1 | lighting/fog | novas zonas | importar mapa substituto |
| Quests | objetivos e triggers | lore, diálogo, nomes | recompensa pontual | linhas novas | refazer grafo inteiro |
| Dungeons | instâncias e regras | ambientes, bosses, áudio | telegraphs | dungeon nova | novo framework |
| PvP | modos e honor | arenas e UI | balance | modo novo | vantagem por ads |
| Profissões | sistemas e recipes | nomes, arte, stations | tuning | recipes extras | nova economia |
| UI | estrutura e acessibilidade | tokens, borders, icons | reorganização leve | overhaul | refazer em framework novo |
| Áudio | engine e event keys | músicas/SFX/voices | mix | voice acting extenso | segundo motor de áudio |
| Monetização | account/economy seams | Pixlland branding | placements | features avançadas | empilhar SDK sobre WOC sem decisão |

---

# 10. ARQUITETURA: LIMITES QUE OS AGENTES NÃO PODEM QUEBRAR

## 10.1 Simulação

- `src/sim/` é a fonte de verdade.
- Não pode importar DOM, Three.js ou relógio externo.
- Aleatoriedade deve continuar seeded.
- O tick permanece a 20 Hz.
- Regras online/offline/headless devem ser idênticas.

## 10.2 Seam de mundo

- Renderer, UI e game layer usam `IWorld`.
- Uma nova informação de gameplay deve entrar na facet correta.
- Offline `Sim` e online `ClientWorld` devem manter paridade.
- Não alcançar diretamente estado mutável de `Sim` a partir de UI/renderer.

## 10.3 Renderer

- É apresentação, não autoridade.
- Pode alterar modelos, materiais, câmera, efeitos e animação visual.
- Não pode resolver dano, loot, quest ou economia.
- Efeitos de hit-pause devem ser exclusivamente visuais e locais.

## 10.4 UI

- É DOM + canvas, sem framework de componentes.
- Está otimizada por write-elision e budgets.
- Tem contratos de foco, teclado, touch e WCAG.
- Deve ser reskinada por tokens e CSS existente.

## 10.5 Assets

- Runtime contract em GLB/glTF 2.0.
- Preloads e media manifest são obrigatórios.
- Cache de asset é imutável.
- Assets de mundo entram em deferred preload quando esse é o padrão do módulo.
- Mudanças precisam respeitar iOS/WebKit e memória limitada.

---

# 11. ESTRATÉGIA DE CONVERSÃO DO MUNDO

## 11.1 Não reconstruir o mapa

O terreno é gerado em runtime por chunks, LOD, heightfield e materiais de splat. A forma correta de rebrandear é criar um **perfil visual Demons Whip** dentro da estrutura atual.

## 11.2 Camadas da conversão

### Camada 1: paleta e grade

- Criar grade global dark fantasy.
- Reduzir saturação seletiva.
- Preservar cores funcionais.
- Usar vignette moderada.
- Permitir desligar wobble/grain em acessibilidade.

### Camada 2: materiais de terreno

- Reprocessar ou substituir os albedos CC0.
- Manter splat weights e chunk geometry.
- Criar variantes PS1 de grass, dirt, rock, sand, mud e snow.
- Reduzir escala visual de detalhe moderno.
- Usar quantização e dithering no source.
- Manter a rota Lambert/vertex-color de baixo custo.

### Camada 3: procedural textures

Alterar os geradores em `src/render/textures.ts` para:

- stone mais angular;
- madeira mais suja;
- ground detail menos naturalista;
- grass seca e irregular;
- flower cards substituídos por ervas mortas/fungos;
- céu com gradientes e banding art-directed.

### Camada 4: haze, sky e weather

- Criar presets por bioma.
- Diminuir distância atmosférica sem esconder gameplay.
- Preservar crossfade climático.
- Trocar clear/rain/snow por versões coerentes com a lore.
- Adicionar ash only where appropriate.

### Camada 5: foliage

- Normalizar famílias de árvores, shrubs, reeds, mushrooms e dead trees.
- Instancing e LOD permanecem.
- Reduzir alpha overdraw.
- Usar 3 a 5 variações por família, não dezenas de packs desconectados.

### Camada 6: construções

- Troca 1:1 por footprint.
- Preservar portas, NPC spots, service locations e colliders.
- Reutilizar kits modulares.
- Alterar telhados, silhuetas, atlas e desgaste.
- Não mover hubs antes de a zona funcionar completa.

### Camada 7: props

- Preservar função e interação.
- Trocar forma e material.
- Usar instancing/merge.
- Gerar no Meshy apenas itens de identidade ausentes.

---

# 12. PLANO POR REGIÃO

IDs internos e coordenadas permanecem. Nomes abaixo são de exibição propostos.

## 12.1 Eastbrook Vale → Vale of Cinders

### DNA funcional

- Starter zone 1-7.
- Hub de mercado.
- Wolf runs ao norte.
- Boar meadows a leste.
- Sableweb woods a oeste.
- Mirror Lake a noroeste.
- Copper dig a sudoeste.
- Ruined chapel a nordeste.
- Bandit camp a sudeste.

### Conversão

- Town central vira um assentamento construído ao redor de uma igreja em ruínas.
- Farms e boar fields viram campos queimados.
- Chapel torna-se o primeiro grande ponto de horror.
- Mine vira galeria de extração de minério amaldiçoado.
- Mirror Lake recebe água pálida e standing stones.
- Bandits viram deserters, cultists ou scavengers.

### Vertical slice ideal

Esta é a região correta para validar o pipeline inteiro porque contém:

- cidade;
- estrada;
- floresta;
- água;
- mina;
- cemitério;
- inimigos humanoides e animais;
- quests iniciais;
- dungeon/encounter próximo;
- serviços de MMO.

## 12.2 Mirefen Marsh → The Drowned Mire

### Preservar

- hub Fenbridge;
- chuva;
- água e passarelas;
- pântano e criaturas;
- progressão 6-13.

### Converter

- casas inclinadas e lanternas fracas;
- lodo, fungos, reeds e árvores mortas;
- culto aquático e corpos submersos;
- verde doente, azul lunar e âmbar;
- bosses com contaminação e doença.

## 12.3 Thornpeak Heights → Thornpeak Gallows

- Neve suja.
- Pines mortos.
- Highwatch como fortaleza penitencial.
- Gallows e ossadas como landmarks.
- Montanhas com fog de baixa visibilidade controlada.
- Inimigos de frio, caça e isolamento.

## 12.4 Farshore → The Forsaken Shore

- Naufrágios, torres e praias cinzas.
- Docks e boats preservados funcionalmente.
- Rift breaks reinterpretados como cicatrizes do selo.
- Pirates podem virar wreckers ou drowned raiders.

## 12.5 Veiled Hollow

O nome já combina com a direção. Priorizar:

- ruínas ocultas;
- iluminação violeta e pálida;
- arquitetura impossível;
- horror cósmico controlado;
- contraste com regiões de horror físico.

## 12.6 Drakelands → Cinder Drakelands

- Dunes e castle structures preservados.
- Ossos, cinza e metal queimado.
- Cultos, demons e dragon remains.
- Contraste de preto, ember e bone.

## 12.7 Frostveil Reach → Frostveil Wastes

- Village snowbound.
- Lanternas fracas.
- Corpos preservados e cavernas.
- Azul frio, cinza e verde pálido.

---

# 13. PERSONAGENS E CRIATURAS

## 13.1 Contrato atual

O renderer usa:

- `VisualDef` no manifesto;
- seleção por class/template/family;
- `SkeletonUtils` clone;
- `AnimationMixer` por entidade;
- `ClipMap` por rig;
- estados de animação;
- crowd LOD;
- far mesh baked;
- pooling de NPCs/mobs;
- tests de clips, weights e T-pose.

## 13.2 Regra do rebrand

Não criar um novo character controller. Os novos modelos devem entrar no contrato atual.

## 13.3 Rig strategy

1. Auditar rigs atuais.
2. Escolher rig canônico humanoide.
3. Preservar bone names e sockets.
4. Retargetar novos modelos para esse rig.
5. Reutilizar clips existentes sempre que possível.
6. Criar rig por família não humanoide.
7. Boss único pode ter rig próprio.

## 13.4 Estados mínimos

- idle;
- walk;
- walkBack;
- run;
- cast;
- spin;
- swim;
- sit;
- jump;
- attacks por estilo;
- hit;
- death;
- revive/flourish;
- mount quando aplicável.

## 13.5 Proibições

- root motion controlando deslocamento real;
- clip com escala diferente do rig;
- T-pose entre crossfades;
- modelo sem death/revive;
- arma embutida quando o sistema equipa item separado;
- material por peça sem atlas;
- runtime compensando erro de origem do source.

---

# 14. NORMALIZAÇÃO DE ASSETS

## 14.1 O problema real

Os assets vêm de KayKit, Quaternius, Kenney, ambientCG, Poly Haven, conteúdo procedural, arte gerada e futuras gerações Meshy. Sem pipeline, o resultado parecerá uma colagem.

## 14.2 Manifesto obrigatório

Criar `docs/rebrand/asset_manifest.csv` ou JSON equivalente com:

- `source_path`;
- `runtime_key`;
- `category`;
- `function`;
- `current_license`;
- `redistribution_status`;
- `source_triangles`;
- `target_triangles`;
- `materials`;
- `texture_count`;
- `max_texture_resolution`;
- `palette_profile`;
- `world_height`;
- `pivot_policy`;
- `rig`;
- `clip_map`;
- `replacement_path`;
- `status`;
- `art_approval`;
- `tech_approval`;
- `runtime_evidence`.

## 14.3 Status

- `DISCOVERED`
- `LICENSE_BLOCKED`
- `KEEP_TEMPORARY`
- `RESKIN_SOURCE`
- `REPLACE_PACK`
- `MESHY_REQUIRED`
- `NORMALIZING`
- `RIGGED`
- `TECH_APPROVED`
- `ART_APPROVED`
- `INTEGRATED`
- `QA_APPROVED`

## 14.4 Pipeline

1. Descobrir e registrar.
2. Verificar licença.
3. Capturar bounds, triângulos, materiais e texturas.
4. Classificar por função.
5. Aprovar silhouette target.
6. Limpar source no DCC.
7. Aplicar escala e orientação.
8. Reduzir polígonos.
9. Unificar materiais.
10. Refazer UV/atlas.
11. Aplicar paleta.
12. Retargetar rig e clips.
13. Exportar GLB.
14. Otimizar pelo pipeline do projeto.
15. Validar GLB.
16. Registrar media manifest/preload.
17. Criar/atualizar `VisualDef` ou adapter.
18. Rodar testes.
19. Capturar turntable.
20. Capturar desktop/mobile in-game.
21. Aprovar ao lado de assets vizinhos.

## 14.5 Budgets iniciais provisórios

Os números abaixo devem ser calibrados com o inventário real antes de virarem hard gates.

| Categoria | Triângulos-alvo | Materiais | Textura preferida |
|---|---:|---:|---:|
| Player | 2.500-4.500 | 1-3 | 256 ou 512 |
| NPC humanoide | 1.200-3.000 | 1-2 | 128 ou 256 |
| Mob pequeno | 300-1.000 | 1 | 64 ou 128 |
| Mob médio | 800-2.200 | 1-2 | 128 ou 256 |
| Elite | 2.000-4.000 | 1-3 | 256 |
| Boss | 4.000-8.000 | 2-4 | 256 ou 512 |
| Mount | 2.000-4.500 | 1-3 | 256 ou 512 |
| Arma | 100-900 | 1 | 64 ou 128 |
| Prop pequeno | 20-300 | 1 | 32 a 128 |
| Prop médio | 200-1.200 | 1-2 | 64 a 256 |
| Construção | 1.500-7.000 | 1-4 | atlas 256 ou 512 |
| Árvore | 80-500 | 1 | 64 a 256 |

## 14.6 Paleta por asset

- Prop simples: 8-24 cores dominantes.
- Arma: 8-24.
- Humanoide: 16-48.
- Boss: 24-64.
- Construção: 16-48 por atlas.

A contagem é uma meta visual, não uma quantização cega que destrua a arte.

---

# 15. MESHY: USO CORRETO

## 15.1 Meshy é intake, não shipping

Output bruto nunca entra no jogo.

## 15.2 Usar quando

- nenhum pack cobre a silhouette aprovada;
- boss precisa de identidade própria;
- player class precisa de set icônico;
- landmark da lore não existe;
- criatura precisa de anatomia específica;
- mount não tem equivalente coerente.

## 15.3 Não usar quando

- retextura resolve;
- alteração de materiais resolve;
- prop é simples e procedural;
- objeto aparece pequeno;
- rig/retopo custará mais que adaptar pack;
- há asset CC0 adequado.

## 15.4 Sequência

1. Concept art aprovado.
2. Front/side/back.
3. Prompt com budget e função.
4. Três variações de silhouette.
5. Seleção.
6. Download source.
7. Retopo/decimation controlada.
8. UV e atlas.
9. Paleta.
10. Rig canônico.
11. Transferência de clips.
12. GLB e validação.
13. Teste em crowd e mobile.

---

# 16. BOSSES E ENCONTROS

## 16.1 Princípio de baixo custo

Um boss rebrand deve ser composto por:

- novo modelo;
- nome e lore novos;
- arena retexturizada;
- nova trilha/ambiência;
- telegraphs reestilizados;
- recombinação de habilidades existentes;
- tuning;
- drops renomeados/reestilizados.

A IA e o framework de encounter só mudam quando o encontro realmente não puder ser expresso pelo sistema existente.

## 16.2 Critério de identidade

Cada boss precisa de:

- silhouette reconhecível em miniatura;
- uma cor focal;
- um material dominante;
- um som de assinatura;
- uma mecânica principal;
- uma mecânica de grupo;
- uma mudança de fase ou pressão;
- um troféu/loot coerente;
- uma relação explícita com a região.

## 16.3 Prioridade de produção

1. Rebrand de bosses existentes.
2. Elites existentes como mini-bosses.
3. World bosses.
4. Raid finale.
5. Bosses realmente novos apenas após o vertical slice.

---

# 17. QUESTS, LORE E LOCALIZAÇÃO

## 17.1 Não reescrever os grafos primeiro

A maior parte da transformação pode ocorrer sem alterar objetivos:

- kill count permanece;
- collect count permanece;
- NPC/target permanece;
- coordenada permanece;
- trigger permanece;
- reward category permanece.

Mudam:

- nomes de exibição;
- textos;
- contexto;
- ícones;
- modelo;
- áudio;
- descrição do reward.

## 17.2 Camada de lore proposta

O mundo foi mantido por uma cadeia de selos chamada **The Whip**. Quando seus segmentos foram quebrados, cada região recebeu uma forma diferente de corrupção. Os jogadores são marcados pela corrente e conseguem atravessar as cicatrizes que outros não sobrevivem.

Essa premissa acomoda:

- rifts;
- dungeons;
- resurrection;
- classes mágicas;
- demons;
- undead;
- regiões diversas;
- raid;
- prestige;
- repetição de conteúdo sem quebrar canon.

## 17.3 Glossário central

Criar um glossary versionado antes de reescrever centenas de strings:

- nomes de regiões;
- cidades;
- factions;
- classe/spec;
- escolas de magia;
- moeda;
- raridade;
- rifts;
- professions;
- titles;
- systems;
- monetização.

## 17.4 Localização

- Preservar keys existentes.
- Alterar fonte em inglês e regenerar traduções pelo pipeline.
- Não embutir strings em renderer/UI.
- Revisar PT-BR manualmente para o lançamento.
- Não renomear ID de conteúdo por motivo cosmético.

---

# 18. UI/UX: RESKIN, NÃO RECONSTRUÇÃO

## 18.1 DNA a preservar

- Player/target frames.
- Party/raid frames.
- Action bars.
- Cast bars.
- Auras.
- Chat e combat log.
- Quest tracker.
- Minimap e map.
- Bags, character, spellbook, talents, crafting.
- PvP, dungeon finder, professions, deeds e Reliquary.
- Tooltips e floating combat text.

## 18.2 Estratégia

1. Criar novo preset em `src/ui/theme.ts`.
2. Atualizar tokens em `src/styles/tokens.css`.
3. Reskinar `shell.css` para launcher/char select.
4. Reskinar HUD em `hud.css`.
5. Reskinar windows em `components.css`.
6. Atualizar mobile em `hud.mobile.css`.
7. Substituir icons restritos.
8. Preservar focus, touch targets e contrast.
9. Manter UI fora do pixelation pass do mundo.

## 18.3 Melhorias leves autorizadas

- diminuir brilho e ruído visual;
- melhorar spacing;
- agrupar botões secundários;
- compactar HUD opcionalmente;
- tornar target/boss mais dramático;
- melhorar legibilidade mobile;
- reduzir bordas redundantes;
- substituir ornamentos por ferro/stone.

## 18.4 Proibido

- migrar para React/Svelte por conveniência;
- reescrever HUD inteiro;
- remover funções do template;
- quebrar keyboard navigation;
- reduzir touch target;
- aplicar nearest scaling ao texto;
- usar ads como overlay permanente no gameplay.

---

# 19. ÁUDIO

## 19.1 O que preservar

- `MusicDirector`.
- `sfx` e `voice` singletons.
- event keys.
- manifests.
- spatial playback.
- crossfades.
- volume settings.
- mobile audio unlock.

## 19.2 O que trocar

- músicas de zona, dungeon, combat e boss;
- ambiências;
- SFX restritos por licença;
- vozes e falas que carregam a marca anterior;
- UI cues;
- mix de hits e armas.

## 19.3 Padrão técnico

- MP3 44.1 kHz, 192 kbps.
- Mono para positional SFX.
- Stereo somente para beds explicitamente não posicionais.
- Loudness normalizado.
- Catálogo completo.
- `npm run sfx:check` verde.

## 19.4 Identidade sonora

- drones e ruído de vento;
- cordas graves;
- metal, madeira e pedra secos;
- coros raros;
- sinos e correntes;
- percussão ritual;
- loops longos;
- magia menos brilhante e mais física;
- bosses com stinger de fase.

---

# 20. MONETIZAÇÃO: MIGRAÇÃO PARA PIXLLAND

## 20.1 Descoberta crítica

O jogo-base já possui:

- wallet Solana;
- $WOC;
- Claudium;
- cosmetic store;
- daily rewards;
- holder flair;
- links Steam/Epic/GitHub;
- in-app purchases declaradas em plataformas.

Portanto, Pixlland SDK não deve ser apenas adicionado por cima. É preciso escolher:

### Opção recomendada

**Substituir a camada WOC/Claudium/Store por uma camada Pixlland**, mantendo os seams de conta, cosméticos e persistência quando úteis.

### Opção temporária

Desligar WOC/store por feature flag no fork e integrar apenas analytics/ads Pixlland no vertical slice.

### Opção não recomendada

Manter duas moedas, dois stores, wallet, daily rewards e ads simultaneamente.

## 20.2 Adapter

Criar adapter isolado fora de `src/sim/`:

- init;
- availability;
- consent;
- analytics;
- rewarded;
- interstitial;
- lifecycle;
- proof/token de reward;
- fail-open.

O contrato real do SDK deve ser copiado da documentação oficial quando for fornecido. Agentes não inventam API externa.

## 20.3 Placements

Permitidos:

- rewarded voluntário em hub;
- rewarded pós-conteúdo e fora de grupo ativo;
- interstitial em character select ou transição segura;
- promoção no launcher/store;
- reward cosmético/account-bound.

Proibidos:

- durante combate;
- boss;
- PvP;
- dungeon ativa;
- party/raid encounter;
- loot roll;
- morte/respawn;
- trade;
- marketplace;
- reward de poder;
- moeda negociável.

## 20.4 Server validation

Reward com efeito persistente deve ser validado pelo servidor quando o SDK oferecer proof. O cliente não concede item, currency ou entitlement sozinho.

---

# 21. LICENÇA E REBRAND COMERCIAL

## 21.1 O que está liberado

- Código sob MIT.
- Grande parte de KayKit, Quaternius, Kenney, ambientCG e Poly Haven sob licenças redistribuíveis.
- Assets marcados como `With the project only` podem permanecer dentro do fork conforme o registro, mas não podem ser extraídos como pack.

## 21.2 O que precisa ser removido ou licenciado

- Nome World of ClaudeCraft.
- Levy Street branding e logos.
- CraftPix class ability icons sem licença própria.
- Áudio @jamiecypher em uso comercial sem permissão.
- Store/prestige/commissioned art reservada.
- Permission-only icons e recordings.
- Third-party brand marks conforme necessidade.
- Qualquer asset ausente de `CREDITS.md` até esclarecer direitos.

## 21.3 Gate legal obrigatório

Nenhum release comercial de Demons Whip pode sair sem:

- export do inventário de mídia;
- join com `CREDITS.md`;
- lista `KEEP/REPLACE/REMOVE/BUY_LICENSE`;
- substituição de todos os itens `No, permission required`;
- revisão de branding;
- atualização de credits/notices;
- registro de fontes Meshy/AI e termos do plano usado.

---

# 22. PLANO DE IMPLEMENTAÇÃO POR SUBPROJETOS

O rebrand deve ser dividido. Cada subprojeto produz software testável.

## Subprojeto A — Fork, legal e neutralização de marca

**Objetivo:** criar uma base legalmente redistribuível e sem identidade visual do projeto anterior.

### Entregas

- descobrir branch de release ativa;
- criar fork e worktree;
- trocar package/app identifiers de forma planejada;
- trocar nome, logos, icons e protocol scheme;
- feature flag para WOC/store;
- asset license matrix;
- CI baseline.

### Arquivos-alvo

- `package.json`
- `index.html`
- `play.html`
- `electron/`
- `android/`
- `ios/`
- `build/`
- `src/main.ts`
- `src/styles/shell.css`
- `CREDITS.md`
- `THIRD_PARTY_NOTICES.md`

### Aceitação

- build abre com Demons Whip;
- nenhum logo/nome anterior aparece em launcher;
- online/offline iniciam;
- testes baseline documentados;
- assets bloqueados identificados.

## Subprojeto B — Asset audit e normalizer

**Objetivo:** transformar o rebrand em pipeline, não em trabalho manual descontrolado.

### Criar

- `docs/rebrand/asset_manifest.csv`
- `docs/rebrand/art_bible.md`
- `docs/rebrand/license_matrix.csv`
- `scripts/rebrand/audit_assets.mjs`
- `scripts/rebrand/validate_asset.mjs`
- `tests/rebrand_asset_manifest.test.ts`

### Saída do auditor

- GLB path;
- bytes;
- scenes/nodes/meshes;
- triangles;
- materials;
- textures/resolutions;
- skins/bones;
- animation names/durations;
- bounds;
- compression extensions;
- manifest/preload coverage.

### Aceitação

- 100% dos GLBs listados;
- nenhuma duplicidade de runtime key;
- budgets por categoria;
- licenças anexadas;
- relatório HTML/CSV reproduzível.

## Subprojeto C — PS1 render profile

**Objetivo:** fazer o mundo atual parecer Demons Whip antes da troca total de assets.

### Arquivos-alvo

- `src/render/gfx.ts`
- `src/render/renderer.ts`
- `src/render/terrain.ts`
- `src/render/textures.ts`
- `src/render/sky.ts`
- `src/render/biome_haze_field.ts`
- módulos de grade/postprocess existentes
- tests de gfx/render

### Entregas

- preset `demonsWhip` ou perfil de estilo independente do tier;
- grade, dithering e grain;
- optional vertex wobble;
- texture filtering policy;
- terrain palette profile;
- accessibility toggles;
- dev kill switches para medir cada efeito.

### Aceitação

- mundo reconhecível e navegável;
- UI permanece nítida;
- telegraphs não desaparecem;
- low/medium/high/ultra continuam funcionando;
- mobile profile não excede baseline de memória;
- screenshots A/B por zona.

## Subprojeto D — Vertical slice Vale of Cinders

**Objetivo:** validar toda a cadeia em uma zona real.

### Conteúdo

- Eastbrook town;
- surrounding biome;
- 3 players classes;
- 6-10 mob families;
- NPC services;
- one dungeon or elite route;
- one boss;
- UI skin MVP;
- audio pack MVP;
- first story arc;
- Pixlland mock/analytics only.

### Aceitação

- 30-60 minutos sem asset fora do padrão;
- todas as quests da área funcionam;
- multiplayer e offline equivalentes;
- desktop/mobile evidence;
- performance dentro do baseline.

## Subprojeto E — Migração das nove classes

### Ordem recomendada

1. Warrior.
2. Mage.
3. Rogue.
4. Paladin.
5. Hunter + pet.
6. Priest.
7. Shaman.
8. Warlock + summons.
9. Druid + forms.

A ordem começa por rigs simples e termina em classes com pets/forms que ampliam o escopo.

### Arquivos-alvo

- `src/render/characters/manifest.ts`
- `src/render/characters/assets.ts`
- `src/render/characters/anim_state.ts`
- `src/render/characters/visual.ts`
- `src/render/characters/modular.ts`
- grip/socket modules
- `public/models/chars/`
- `public/models/creatures/`
- tests de visual/clip/rig/T-pose

### Aceitação por classe

- criação de personagem;
- idle/walk/run/backpedal;
- cast/attack/hit/death/revive;
- weapons e sheathe;
- swim/sit/jump;
- mount;
- portrait;
- far LOD;
- 10+ players em crowd test.

## Subprojeto F — Regiões em ondas

1. Drowned Mire.
2. Thornpeak Gallows.
3. Forsaken Shore.
4. Veiled Hollow.
5. Cinder Drakelands.
6. Frostveil Wastes.

Cada onda deve fechar terreno, buildings, props, foliage, mobs, NPCs, audio, lore e boss antes da próxima.

## Subprojeto G — UI, icons e áudio final

- theme tokens;
- shell;
- HUD;
- windows;
- mobile;
- replacement icon library;
- music pack;
- SFX pack;
- NPC voice strategy;
- loading/news/launcher.

## Subprojeto H — Pixlland SDK

1. adapter e mock;
2. consent;
3. analytics;
4. safe-state detector;
5. rewarded;
6. server validation;
7. interstitial;
8. remote config;
9. platform lifecycle;
10. policy and QA.

## Subprojeto I — Full regression e release

- online/offline/headless parity;
- combat/quests/economy;
- dungeons/raid/rifts/delves;
- PvP;
- professions;
- all locales;
- browser/desktop/mobile;
- legal/credits;
- store/platform submissions;
- performance and memory.

---

# 23. ORDEM DE PRIORIDADE REAL

## Primeiro

1. Legal/branding.
2. Baseline técnico e screenshots.
3. Asset manifest e normalizer.
4. PS1 render profile.
5. Um player, um mob, um prop, uma building.
6. Vertical slice Eastbrook.

## Depois

7. Nove classes.
8. Zonas em ondas.
9. UI/audio/lore completo.
10. Boss pass.
11. Pixlland production integration.
12. Full QA.

## Não começar por

- nova lore de todo o mundo;
- todos os bosses;
- refazer HUD inteiro;
- criar 100 assets Meshy;
- stamina/dodge/parry;
- ads em produção;
- reconstruir o terreno;
- renomear todos os IDs.

---

# 24. TESTES E GATES

## 24.1 Comandos-base

```bash
npm test
node scripts/gate_select.mjs
npm run gate
npm run build
npm run test:browser
npm run asset:budget
npm run sfx:check
```

## 24.2 Evidência visual

```bash
node scripts/visual_tour.mjs
node scripts/tour_temple.mjs
node scripts/perf_tour.mjs
node scripts/crowd_fps_bench.mjs
```

Usar também os scripts específicos de multiplayer, arena, squad e raid existentes no repositório.

## 24.3 Gates por asset

- `gltf-transform inspect`;
- `gltf-transform validate`;
- bounds e floor seating;
- source fingerprint quando aplicável;
- media manifest;
- preload coverage;
- clip map coverage;
- no T-pose;
- screenshot turntable;
- desktop/mobile capture;
- frame/memory delta.

## 24.4 Gate de fidelidade

Uma entrega só passa quando:

- continua funcionando como o jogo-base;
- parece pertencer a Demons Whip;
- não introduz sistema paralelo;
- não mistura estilos;
- não perde informação jogável;
- não quebra mobile;
- não usa mídia sem licença.

---

# 25. PROTOCOLO PARA AGENTES DE IA

## 25.1 Antes de trabalhar

- Ler este documento.
- Ler `ASSET_MAPPING_1TO1.md`, sabendo que a lista de classes precisa ser corrigida.
- Ler `AGENTS.md`.
- Ler `CLAUDE.md` raiz.
- Ler o `CLAUDE.md` local.
- Verificar branch de release atual.
- Rodar `git status --short`.
- Identificar testes existentes.
- Declarar classificação da tarefa.

## 25.2 Classificações

- `KEEP`
- `RESKIN`
- `LIGHT_TUNE`
- `NEW_ASSET`
- `NEW_ADAPTER`
- `NEW_SYSTEM`

`NEW_SYSTEM` exige aprovação humana.

## 25.3 Perguntas obrigatórias

- Qual sistema existente será reutilizado?
- Qual ID interno permanece?
- A mudança toca `src/sim/`?
- Toca protocolo ou banco?
- Pode ser resolvida por dados/asset?
- Qual budget?
- Qual licença?
- Qual teste falhará antes?
- Qual evidência visual comprova?
- Qual impacto mobile?

## 25.4 Stop conditions

- licença incerta;
- API Pixlland ausente;
- necessidade de protocolo novo;
- rig incompatível;
- collider/footprint não preservável;
- budget excedido;
- telegraph ilegível;
- memória mobile regressiva;
- tarefa virou reescrita de sistema;
- conflito entre documentos de mesma prioridade.

## 25.5 Formato de entrega

```text
Objetivo:
Classificação:
Sistema preservado:
IDs preservados:
Arquivos alterados:
Assets alterados:
Licenças:
Testes executados:
Evidência visual:
Performance:
Riscos restantes:
Itens não executados:
```

---

# 26. CORREÇÕES AOS DOCUMENTOS ANTERIORES

## 26.1 `GDD_DemonsWhip.md`

Substituir:

- dez classes por nove;
- Soulslike completo por Soulslike-lite;
- stamina/dodge/parry/souls/bonfires como MVP por experimentos pós-rebrand;
- HUD completamente novo por reskin via tokens;
- cronograma que começa por sistemas novos por cronograma que começa por legal, pipeline e vertical slice;
- estimativa de 80% pronto por inventário mensurado.

## 26.2 `ASSET_MAPPING_1TO1.md`

Corrigir:

- roster para nove classes reais;
- player models por `VisualDef` e runtime keys reais;
- adicionar license status;
- adicionar rig/ClipMap;
- adicionar original bounds e collider footprint;
- separar source asset, shipping asset e display name;
- converter checklist em manifesto verificável;
- não considerar “substituído” sem runtime evidence.

## 26.3 GDD Master v2

Manter:

- estratégia de rebrand;
- normalização;
- Meshy como source;
- low-risk gameplay;
- UI leve;
- audio replacement;
- Pixlland adapter;
- roadmap por fases.

Acrescentar/alterar conforme este v3:

- inventário real do jogo-base;
- nove classes;
- sistema WOC/store existente;
- licenças restritas;
- mundo runtime-generated;
- paths e gates reais do repo;
- vertical slice mais fiel ao conteúdo atual.

---

# 27. DEFINIÇÃO DO MVP

MVP não é “todo o MMO rebrandado”. MVP é uma prova de que a operação pode escalar.

## 27.1 Conteúdo mínimo

- branding Demons Whip;
- base legal auditada;
- WOC/store desligado ou isolado;
- PS1 render profile;
- Eastbrook/Vale of Cinders completo;
- três classes completas;
- seis a dez mobs;
- NPC services;
- uma dungeon/elite route;
- um boss;
- UI skin MVP;
- audio pack MVP;
- primeiro arco de lore;
- asset normalizer;
- Pixlland mock/analytics;
- online/offline/mobile funcionando.

## 27.2 Critério de sucesso

- Jogador reconhece um produto novo em 10 segundos.
- Jogador veterano do template encontra todas as funções essenciais.
- Nenhuma quest da zona fica quebrada.
- Nenhum asset cru destoa.
- Performance está dentro da margem do baseline.
- Pipeline produz o próximo asset sem improvisação.

---

# 28. DEFINIÇÃO DO REBRAND COMPLETO

- Nenhuma marca anterior visível.
- Todos os assets bloqueados substituídos.
- Todas as classes e forms no padrão.
- Todas as regiões convertidas.
- UI, icons e áudio convertidos.
- Lore e nomes consistentes.
- Bosses principais rebrandados.
- Pixlland SDK validado.
- Online/offline/headless preservados.
- Builds web/desktop/mobile aprovados.
- 22 locales processados.
- CREDITS e notices completos.
- Sem mistura de estilos.
- Sem regressão crítica de performance ou acessibilidade.

---

# 29. DECISÃO FINAL

Demons Whip deve ser vendido e desenvolvido como:

> **Um MMO clássico completo, acessível pelo navegador e plataformas nativas, reimaginado como um dark fantasy low-poly de PS1, com nova identidade, lore, modelos, bosses, áudio e monetização Pixlland.**

Não deve ser desenvolvido como:

> Um Soulslike novo tentando reutilizar incidentalmente um MMO antigo.

A diferença entre essas duas frases define o custo, o risco e a chance de conclusão do projeto.

---

# 30. FONTES TÉCNICAS PRINCIPAIS NO REPOSITÓRIO

- `README.md`
- `CREDITS.md`
- `AGENTS.md`
- `CLAUDE.md`
- `src/CLAUDE.md`
- `src/sim/types.ts`
- `src/sim/content/classes.ts`
- `src/sim/content/talents.ts`
- `src/render/CLAUDE.md`
- `src/render/gfx.ts`
- `src/render/terrain.ts`
- `src/render/textures.ts`
- `src/render/sky.ts`
- `src/render/biome_haze_field.ts`
- `src/render/characters/CLAUDE.md`
- `src/render/characters/manifest.ts`
- `src/render/characters/assets.ts`
- `src/render/characters/anim_state.ts`
- `src/render/characters/visual.ts`
- `src/game/CLAUDE.md`
- `src/game/music.ts`
- `src/game/music_tracks.ts`
- `src/game/sfx.ts`
- `src/ui/CLAUDE.md`
- `src/ui/theme.ts`
- `src/styles/CLAUDE.md`
- `src/styles/tokens.css`
- `src/styles/hud.css`
- `src/styles/components.css`
- `src/styles/shell.css`
- `src/styles/hud.mobile.css`
- `scripts/assets/`
- `scripts/build_media_manifest.mjs`
- `docs/image-to-glb-asset-workflow.md`
- `docs/qa-gate.md`
- `tests/`

