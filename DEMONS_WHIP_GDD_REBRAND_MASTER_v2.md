# DEMONS WHIP
## GDD MASTER — Rebrand visual, conteúdo, normalização de assets e integração Pixlland

**Versão:** 2.0  
**Data:** 17/08/2026  
**Status:** Fonte principal de verdade para agentes de IA, artistas técnicos, designers e programadores  
**Projeto-base:** `levy-street/world-of-claudecraft`  
**Direção visual:** Dark Fantasy gótico, low-poly e texturas de baixa resolução inspiradas em demakes de PlayStation 1  
**Plataformas preservadas:** navegador, desktop e mobile, conforme suportado pelo projeto-base

> **Diretriz central:** Demons Whip é um **rebrand do jogo existente**, não um remake. O objetivo é preservar a maior quantidade possível de sistemas, conteúdo estrutural, código, dados, mapas e fluxos já funcionais, alterando principalmente apresentação visual, identidade, áudio, lore, nomes, bosses e pequenos aspectos de gameplay.

---

# 0. COMO USAR ESTE DOCUMENTO

Este GDD foi escrito para reduzir decisões improvisadas por agentes de IA. Ele define o que deve ser preservado, o que pode ser alterado e o que está fora de escopo.

Palavras normativas:

- **DEVE:** requisito obrigatório.
- **NÃO DEVE:** proibido sem aprovação explícita.
- **PODE:** permitido, desde que respeite orçamento, arquitetura e escopo.
- **EXIGE APROVAÇÃO:** interromper a implementação e pedir decisão humana.

## 0.1 Ordem de precedência

Quando documentos, código ou instruções entrarem em conflito, usar esta ordem:

1. Instrução explícita mais recente do proprietário do projeto.
2. Este GDD Master v2.0.
3. `ASSET_MAPPING_1TO1.md`.
4. `AGENTS.md`, `CLAUDE.md` raiz e os `CLAUDE.md` locais do repositório.
5. Código, testes e contratos realmente existentes na branch de trabalho.
6. `GDD_DemonsWhip.md` v1.0 apenas como referência histórica.
7. Imagens conceituais aprovadas.

## 0.2 Conflitos conhecidos já resolvidos

| Conflito | Decisão oficial deste GDD |
|---|---|
| O GDD v1 propõe uma conversão mecânica extensa para Soulslike, incluindo stamina, souls perdidas, bonfires e HUD totalmente novo. | O MVP será um **rebrand visual com Soulslike-lite**. Sistemas novos e complexos ficam fora do MVP, salvo aprovação separada. |
| O GDD v1 pede redesenho completo do HUD. | A UI será **reskinada e levemente reorganizada**, preservando estrutura, fluxos, responsividade e acessibilidade. |
| O repositório-base descreve nove classes, enquanto documentos anteriores mapeiam dez. | O MVP preserva a quantidade de classes realmente implementada na branch usada. Uma décima classe só entra se já existir funcionalmente ou for aprovada como expansão separada. |
| O GDD v1 permite o Clown Pack, enquanto o mapeamento 1:1 o proíbe. | **Clown Pack não será usado.** |
| O GDD v1 sugere reutilizar diretamente os modelos de jogadores originais. O mapeamento 1:1 pede novos modelos PS1. | Mecânicas, classes, rigs e animações são reaproveitados; os **visuais dos jogadores serão substituídos ou fortemente reestilizados** para o padrão aprovado. |
| Percentuais anteriores estimam que 80% dos assets estejam prontos. | Não usar percentuais como verdade técnica. O inventário real e o status de cada asset serão controlados no mapeamento 1:1 e no manifesto de normalização. |

## 0.3 Regra para agentes

Nenhum agente está autorizado a interpretar “rebrand” como permissão para:

- reescrever o combate;
- substituir o netcode;
- criar novo sistema de quests;
- trocar banco de dados;
- reconstruir o mundo do zero;
- alterar coordenadas do mapa sem necessidade;
- recriar UI inteira;
- adicionar um framework novo;
- mudar IDs internos apenas para combinar com o novo nome visual.

---

# 1. VISÃO DO PRODUTO

## 1.1 Conceito

**Demons Whip** é um MMO RPG de dark fantasy com estética de jogo 3D do fim dos anos 1990. O jogo aproveita a estrutura completa de World of ClaudeCraft e a apresenta como um universo mais sombrio, gótico, decadente e ameaçador.

A inspiração em demakes de Soulslike é prioritariamente:

- visual;
- atmosférica;
- sonora;
- narrativa;
- de ritmo e impacto do combate;
- de leitura de bosses e inimigos.

Ela **não significa copiar integralmente a arquitetura mecânica de Elden Ring ou Dark Souls**.

## 1.2 Fantasia do jogador

O jogador é um aventureiro marcado por um selo demoníaco, capaz de atravessar fendas que corromperam o mundo. Ele explora territórios decadentes, combate criaturas deformadas, reúne equipamentos, participa de grupos, enfrenta dungeons, bosses, eventos, PvP, crafting e economia social.

## 1.3 Proposta principal

- MMO completo e acessível diretamente pelo navegador.
- Aparência visual coesa de dark fantasy PS1.
- Mundo grande já funcional, recontextualizado por lore e direção de arte.
- Combate com mais peso, leitura e atmosfera, sem reescrever o core.
- Conteúdo social, progressão, crafting, guildas e multiplayer preservados.
- Monetização por Pixlland SDK sem pay-to-win.

## 1.4 Público

- Jogadores de RPGs retrô.
- Público interessado em Soulslike, dark fantasy e horror medieval.
- Jogadores que preferem MMO leve e acessível pelo navegador.
- Comunidades atraídas por estética PS1, jogos independentes e experiências nostálgicas.

## 1.5 Pilares

1. **Rebrand antes de reconstrução.**
2. **Um único padrão artístico.**
3. **Atmosfera forte com leitura clara.**
4. **Performance web e multiplayer como restrições de design.**
5. **Sistemas do template são ativos, não obstáculos.**
6. **Alterações mecânicas pequenas, mensuráveis e reversíveis.**
7. **Monetização não interfere na justiça competitiva.**
8. **Toda entrega deve ser verificável por agentes e testes.**

---

# 2. ESCOPO DO REBRAND

## 2.1 Matriz de preservação

| Camada | Preservar | Alterar | Não fazer no MVP |
|---|---|---|---|
| Simulação | Regras, entidades, progressão, quests, combate-base, economia, crafting, PvP | Tuning pontual de valores e bosses | Reescrever simulação ou criar segundo core |
| Networking | Protocolo, autoridade do servidor, WebSocket, paridade online/offline | Apenas eventos necessários ao SDK, se indispensáveis | Trocar netcode ou mover regras ao cliente |
| Persistência | Contas, personagens, inventário, banco, guildas, quests | Migrações mínimas de branding ou novos campos opcionais | Redesenhar schema sem necessidade |
| Mundo | Seed, coordenadas, terreno, zonas, estradas, hubs, dungeons e colisões | Texturas, materiais, iluminação, fog, nomes, decoração, modelos 1:1 | Refazer o mapa ou deslocar conteúdo em massa |
| Gameplay | Loop MMO e habilidades já existentes | Peso audiovisual, telegraph, câmera, velocidade e tuning leve | Implementar Soulslike completo de uma vez |
| Personagens | Classes, kits, equipamentos, estados e animações-base | Modelos, texturas, silhuetas, nomes e VFX | Alterar identidade mecânica de cada classe sem motivo |
| Inimigos | Templates, famílias, spawns, drops e habilidades | Modelos, nomes, cores, áudio, lore, stats e composição de habilidades | Criar nova IA geral |
| Bosses | Framework de encontros, eventos, AoE, adds e fases existentes | Novos visuais, nomes, arenas leves, telegraphs e sequências | Criar engine de boss paralela |
| UI/UX | DOM, painéis, fluxos, menus, inventário, chat, mapa, quests | Skin, tokens, hierarquia visual e pequenas melhorias | Reconstruir HUD do zero |
| Áudio | Engine, eventos, catálogos e chaves de reprodução | Músicas, SFX, ambiência e mix | Criar segundo motor de áudio |
| Plataformas | Web, desktop, mobile, offline e online conforme base | Branding, ícones, builds e SDK por plataforma | Remover plataforma sem decisão explícita |
| Conteúdo | Estrutura das quests, dungeons, profissões e eventos | Texto, nomes, iconografia, lore e recompensas cosméticas | Refazer grafos de quests em massa |

## 2.2 Sistemas que devem permanecer funcionais

O rebrand não é considerado concluído se quebrar sistemas existentes. Devem ser preservados, quando presentes na branch-base:

- autenticação e contas;
- criação e seleção de personagens;
- multiplayer persistente;
- modo offline;
- mundo determinístico;
- classes e talentos;
- inventário, equipamento, banco e correio;
- quests e diálogos;
- dungeons, delves, raids e world bosses;
- rifts ou portais procedurais;
- guildas, grupos e raids;
- PvP e arenas;
- crafting, gathering e profissões;
- mercado entre jogadores;
- mounts e pets;
- achievements, deeds e coleções;
- localização;
- configurações gráficas e governadores de performance;
- builds web, desktop e mobile;
- wiki ou documentação gerada pelo conteúdo;
- ferramentas de QA e testes do projeto-base.

## 2.3 Fora de escopo do MVP

- mundo totalmente novo;
- nova engine;
- migração para outro framework 3D;
- novo netcode;
- nova física geral;
- novo sistema de pathfinding;
- animação procedural complexa;
- combate idêntico a Elden Ring;
- perda de moeda na morte;
- sistema global de stamina;
- bonfires como novo sistema de persistência;
- parry universal;
- lock-on universal;
- HUD completamente novo;
- cinematics extensas;
- voice acting completo;
- conteúdo gerado infinitamente por IA;
- monetização que conceda vantagem direta em PvP ou economia.

Esses itens podem ser avaliados depois de o rebrand completo estar estável.

---

# 3. BASE TÉCNICA E INVARIANTES

## 3.1 Stack preservada

A implementação deve continuar usando a stack do projeto-base:

- TypeScript;
- Vite;
- Three.js;
- servidor autoritativo existente;
- WebSocket e persistência existentes;
- GLB/glTF 2.0 como formato principal de assets 3D;
- UI em DOM/Svelte onde já utilizado;
- pipeline e ferramentas já existentes no repositório;
- testes e gates já definidos pelo projeto.

## 3.2 Separação entre simulação e apresentação

- `src/sim/` continua sendo a fonte de verdade de gameplay.
- `src/render/` continua sendo uma camada de apresentação.
- UI e renderer não podem modificar estado de simulação diretamente.
- Dados ou ações novos devem atravessar as interfaces existentes, especialmente o seam de mundo usado pelo projeto.
- Efeitos PS1, color grading, novas malhas, animação visual, câmera e ads não devem contaminar a simulação determinística.

## 3.3 Regra de baixo risco

Para cada tarefa, o agente deve buscar nesta ordem:

1. Alterar dados.
2. Alterar configuração.
3. Reutilizar um módulo existente.
4. Reskinar um asset.
5. Criar um adapter fino.
6. Criar um pequeno módulo novo.
7. Alterar arquitetura apenas com aprovação explícita.

## 3.4 IDs internos versus nomes exibidos

- IDs de zonas, quests, habilidades, mobs, bosses e itens **não devem ser renomeados apenas por branding**.
- O novo nome deve entrar preferencialmente em dados de apresentação e localização.
- Um ID só muda quando há benefício técnico real e migração segura.
- O mapeamento 1:1 deve registrar o ID original, arquivo original, nome de exibição novo e asset substituto.

## 3.5 Assets e manifestos

- Todo asset enviado ao runtime deve estar no manifesto de mídia do projeto.
- Arquivos gerados não devem ser editados manualmente.
- Preloads devem seguir as regras atuais do repositório.
- Assets de mundo não devem iniciar downloads pesados na tela inicial sem necessidade.
- A troca visual não pode quebrar os conjuntos de preload entre níveis gráficos.
- Caches de GLB são tratados como imutáveis; clonar antes de mutar.

---

# 4. LOOP PRINCIPAL

## 4.1 Loop macro

1. Entrar na conta.
2. Selecionar ou criar um personagem.
3. Entrar em um hub seguro.
4. Aceitar quests, contratos, bounties ou objetivos sociais.
5. Explorar o mundo aberto.
6. Combater criaturas e eventos.
7. Coletar loot e materiais.
8. Melhorar equipamentos e profissões.
9. Formar grupos, guildas ou participar de PvP.
10. Entrar em dungeons, delves, rifts ou raids.
11. Derrotar bosses e obter recompensas.
12. Retornar ao hub, vender, craftar, negociar e planejar a próxima atividade.

## 4.2 O que muda na sensação

A sensação desejada é mais pesada e ameaçadora por meio de:

- animações com antecipação mais legível;
- áudio de impacto mais grave;
- VFX menos coloridos e mais materiais;
- inimigos com silhuetas ameaçadoras;
- menor saturação do mundo;
- contraste de luzes quentes contra ambientes frios;
- câmera mais próxima em combate, quando seguro;
- bosses com apresentação mais dramática;
- UI com menos brilho e mais textura;
- ambientação sonora constante.

A lógica principal do loop MMO permanece.

---

# 5. GAMEPLAY: SOULSLIKE-LITE

## 5.1 Princípio

O jogo deve parecer mais pesado sem se tornar outro jogo. Toda melhoria deve ser testada em multiplayer, latência, mobile e conteúdo já existente.

## 5.2 Ajustes aprovados para o MVP

### A. Feedback de ataque

- Melhorar efeitos de contato, sparks, sangue estilizado e poeira.
- Adicionar hit-pause **apenas visual e local**, entre 40 e 80 ms nos golpes mais fortes.
- Nunca pausar simulação, servidor ou outros jogadores.
- Ajustar áudio por família de arma.
- Adicionar câmera shake discreto e configurável.
- Aumentar leitura de stagger, block, dodge e miss.

### B. Telegraphs

- Ataques importantes devem possuir antecipação visual clara.
- A cor do telegraph deve respeitar a paleta do jogo e não parecer UI sci-fi.
- Telegraphs não devem ser escondidos por fog, partículas ou pós-processamento.
- Bosses devem usar combinações de telegraph, som e pose.

### C. Câmera

- Preservar a câmera-base e seus controles.
- Ajustar distância, FOV, lag e impacto por configuração, não por reescrita.
- Reduzir obstruções e clipping.
- Manter opções de reduced motion.
- Não implementar lock-on global no MVP.

### D. Movimento

- Preservar física, colisão e autoridade existentes.
- Ajustar aceleração, desaceleração e escala da animação para reduzir sensação de “flutuar”.
- Sincronizar velocidade dos pés com deslocamento.
- Corrigir root motion indevido nos novos assets.

### E. Morte

- Preservar o sistema funcional de morte, revive e respawn.
- Alterar apresentação: tela escurecida, mensagem temática, áudio e VFX.
- Não implementar perda de moeda ou recuperação de cadáver no MVP.

### F. Dodge opcional de baixo risco

Uma esquiva só entra no MVP se puder ser construída como:

- uma habilidade universal ou por classe;
- usando o pipeline de habilidades existente;
- com cooldown configurável;
- sem reescrever movimentação, física ou protocolo;
- com teste de latência e PvP.

Caso exija mudanças sistêmicas, mover para pós-MVP.

## 5.3 Ajustes proibidos sem aprovação

- stamina global para todas as ações;
- i-frames reimplementados em toda a simulação;
- parry universal;
- troca total do targeting;
- remoção da action bar;
- redução radical de habilidades para imitar Soulslike;
- alteração do tick do servidor por motivos visuais;
- root motion controlando deslocamento real do jogador.

## 5.4 Pós-MVP possível

Após o rebrand estar estável, poderão ser prototipados separadamente:

- stamina-lite;
- dodge universal;
- parry para classes específicas;
- checkpoints temáticos;
- armas com weapon arts;
- modo de dungeon mais punitivo;
- eventos de invasão;
- dificuldade heroica com regras Soulslike.

---

# 6. LORE E NARRATIVA

## 6.1 Premissa

Séculos atrás, uma ordem religiosa construiu **The Whip**, uma cadeia de selos e rituais usada para aprisionar soberanos demoníacos sob diferentes regiões do mundo. A ordem desapareceu, mas os selos permaneceram.

Quando a corrente foi rompida, cada fragmento contaminou uma parte do reino. Fendas surgiram, criaturas sofreram mutações e os mortos passaram a responder ao chamado dos antigos carcereiros.

Os jogadores são **Whipbound**: aventureiros marcados por um fragmento do selo. A marca permite atravessar as fendas, mas aproxima cada personagem da corrupção que combate.

## 6.2 Objetivo narrativo

- Investigar quem rompeu The Whip.
- Recuperar ou destruir seus fragmentos.
- Descobrir a relação entre a antiga ordem, a igreja e os demônios.
- Derrotar os guardiões corrompidos de cada região.
- Escolher quais forças apoiar sem alterar o sistema-base de progressão.

## 6.3 Regra de adaptação de quests

A narrativa será alterada principalmente por substituição de conteúdo textual:

- nomes de NPCs;
- nomes de lugares;
- diálogos;
- descrições de itens;
- descrições de quests;
- nomes e lore de bosses;
- textos de loading;
- textos da wiki;
- títulos e achievements.

O agente **não deve mudar o grafo de objetivos** quando um rewrite textual resolver.

Exemplo:

- “mate 8 lobos” pode se tornar “elimine 8 Corpse Hounds”.
- “colecione 6 ervas” pode se tornar “reúna 6 Blood Lilies”.
- “fale com o prefeito” pode se tornar “apresente-se ao Warden”.

As coordenadas, contagens e triggers podem continuar iguais.

## 6.4 Mapeamento de regiões

Os IDs internos devem permanecer. Os nomes abaixo são nomes de exibição recomendados.

| Região-base | Novo nome de exibição | Direção | Paleta dominante | Boss sugerido |
|---|---|---|---|---|
| Eastbrook Vale | **Vale of Cinders** | Vale inicial, vilarejos decadentes e cemitérios | cinza, ferrugem, âmbar | The Executioner |
| Mirefen Marsh | **The Drowned Mire** | Pântano, doença, água negra e casas sobre estacas | verde doente, carvão, lua fria | Swamp Titan |
| Thornpeak Heights | **Thornpeak Gallows** | Montanhas, neve suja e fortalezas abandonadas | branco gasto, chumbo, vinho escuro | The Wendigo |
| Farshore | **The Forsaken Shore** | Costa, naufrágios, torres e mar contaminado | azul morto, areia cinza, cobre | The Cyclops |
| Veiled Hollow | **The Veiled Hollow** | Ruínas ocultas e presença cósmica | violeta profundo, cinza, ciano pálido | Eldritch Horror |
| Drakelands | **The Cinder Drakelands** | Cinzas, ossos de dragão e cultos | preto, laranja queimado, osso | Pit Lord ou Elder Dragon |
| Frostveil Reach | **Frostveil Wastes** | Vila congelada, cavernas e mortos preservados | azul frio, cinza, verde pálido | Flesh Golem |

## 6.5 Termos de rebrand

| Sistema-base | Nome de exibição possível |
|---|---|
| Rifts | Scars / Demon Scars |
| Reliquary | Reliquary of Ash |
| Book of Deeds | Black Ledger |
| World Market | Raven Market |
| Mail | Ravenpost |
| Prestige | Mark Rank |
| Heroic difficulty | Tormented difficulty |
| Dungeon Finder | Pilgrim Finder ou Party Finder |

Manter termos que já combinam com o universo quando a mudança não agregar valor.

---

# 7. BOSSES E ENCONTROS

## 7.1 Regra de produção

Boss novo significa, preferencialmente:

- novo modelo;
- nova textura;
- novo nome;
- nova lore;
- nova apresentação;
- recombinação de habilidades existentes;
- tuning de números;
- arena retexturizada;
- telegraphs melhorados.

Boss novo **não significa automaticamente nova IA, nova física ou novo framework de encounter**.

## 7.2 Roster recomendado

| Boss | Fonte visual | Papel | Mecânicas a compor com sistemas existentes | Identidade visual |
|---|---|---|---|---|
| **The Aberration** | `!NEW Abomination2` | Primeiro boss grotesco | slam frontal, adds, enraged phase | carne costurada, ferragens e olhos cegos |
| **Eldritch Horror** | `AnomalyMonster` | Boss arcano/cósmico | zonas persistentes, projéteis, teleporte | sombra violeta e luz pálida |
| **Pit Lord** | `Devil Demon` | Boss de fogo | charge, cone, meteor, lava temporária | armadura queimada e chifres |
| **The Titan** | `bigabomination` | Boss de escala | golpes lentos, shockwave, queda de pedras | massa monumental e correntes |
| **Swamp Titan** | `greengoliath` | Boss do pântano | poison pools, summon, stomp | musgo, fungos e gás verde |
| **The Executioner** | `black butcher` | Mini-boss inicial | cleave, hook ou gap close, execute telegraphed | capuz, cutelo e ferro enferrujado |
| **Blood Phantom** | `bloodwraith` | Boss móvel | dash, clones visuais, bleed zones | vermelho escuro e silhueta espectral |
| **The Wendigo** | `elkdemon` | Boss de caça | leap, fear, stalk phase | galhadas, ossos e pelo congelado |
| **The Cyclops** | `green cyclope` | Boss costeiro | boulder, stomp, charge | pele doente, cordas e âncora |
| **Flesh Golem** | `muscular abomination` | Boss de força | grab telegraphed, enrage, ground burst | carne, grampos e peças de armadura |

## 7.3 Boss acceptance

Cada boss deve possuir:

- silhueta legível a distância;
- altura normalizada;
- collider compatível;
- telegraph antes de ataques críticos;
- pelo menos duas variações de comportamento;
- áudio próprio ou família sonora distinta;
- nome e descrição localizados;
- loot mapeado a sistemas existentes;
- arena que não quebre pathfinding ou navegação;
- teste em solo e em grupo;
- teste mobile;
- validação de performance.

---

# 8. BÍBLIA VISUAL

## 8.1 Objetivo

Todos os assets devem parecer ter sido produzidos pelo mesmo estúdio, no mesmo período e para o mesmo jogo, mesmo quando vierem de packs, Meshy, modelos originais ou fornecedores diferentes.

## 8.2 Características obrigatórias

- proporções humanas e ameaçadoras, não chibi;
- low-poly visível e intencional;
- silhuetas simples e reconhecíveis;
- texturas pequenas e pintadas;
- paleta limitada;
- detalhes grandes, não microdetalhes;
- materiais secos, gastos e sujos;
- geometria angular;
- dithering e banding controlados;
- fog para profundidade e limitação visual;
- iluminação dramática, mas barata;
- emissivos raros;
- ausência de aparência PBR moderna excessivamente limpa.

## 8.3 Paleta global

| Nome | Hex aproximado | Uso |
|---|---:|---|
| Obsidian | `#141313` | sombras e metal escuro |
| Charcoal | `#282523` | base neutra |
| Ash | `#5A534A` | pedra, solo e tecido |
| Bone | `#C1B394` | ossos, pele pálida e highlights |
| Rust | `#7B382A` | metal e terra |
| Blood | `#6A151C` | capas, sangue e acentos |
| Ember | `#D07832` | fogo e pontos focais |
| Plague | `#6A7443` | pântano e veneno |
| Moon | `#7E8C9E` | noite e gelo |
| Void | `#3B2C49` | magia escura |
| Tarnished Gold | `#9B7A43` | UI e objetos raros |

Regras:

- Cada zona utiliza de cinco a sete cores dominantes.
- Cada asset utiliza uma subpaleta, não a paleta inteira.
- Saturação alta fica reservada a informação importante.
- Vermelho, âmbar, verde doente e violeta devem ter funções consistentes.

## 8.4 Materiais

Preferência:

1. vertex color;
2. baseColor de baixa resolução;
3. emissive discreto;
4. normal map apenas quando necessário;
5. roughness/metalness simples e compartilhados.

Evitar:

- múltiplos mapas 2K ou 4K;
- reflexo espelhado moderno;
- subsurface scattering;
- transparência excessiva;
- dezenas de materiais por personagem;
- microdetalhes que somem na distância de gameplay.

## 8.5 Efeito PS1

O renderer pode usar uma camada visual configurável com:

- resolução interna reduzida ou pixel scaling;
- dithering;
- quantização leve de cor;
- fog e curta distância visual estilizada;
- vertex snapping ou wobble sutil;
- affine-like texture distortion moderada;
- grain discreto;
- sombras simplificadas.

A UI deve permanecer nítida e em resolução de tela. O efeito não pode prejudicar telegraphs, leitura de nomes, PvP ou acessibilidade.

## 8.6 Iluminação

- Uma fonte direcional principal.
- Luz ambiente controlada.
- Fontes locais limitadas a tochas, fogueiras, magia e landmarks.
- Evitar dezenas de point lights reais.
- Simular brilho com emissive, sprites e VFX quando possível.
- Sombras dinâmicas devem respeitar níveis gráficos e distância.

---

# 9. PADRÃO MESTRE DE NORMALIZAÇÃO DE ASSETS

## 9.1 Princípio

Nenhum asset externo entra diretamente no jogo. Todo asset passa por um pipeline de normalização antes de ser marcado como aprovado.

Status oficiais:

- `RAW`: recebido ou gerado, ainda sem limpeza.
- `AUDITED`: analisado e classificado.
- `NORMALIZING`: em ajuste.
- `RIGGED`: rig e clips aprovados, quando aplicável.
- `TECH_APPROVED`: passou validações técnicas.
- `ART_APPROVED`: passou revisão visual.
- `INTEGRATED`: presente no jogo e manifesto.
- `QA_APPROVED`: testado em runtime e plataformas.

## 9.2 Convenções de arquivo

- Formato de runtime: `.glb`.
- Nomes de arquivo: `snake_case` em minúsculas.
- Não incluir versão no nome do arquivo de runtime.
- Manter nomes de nós e bones estáveis.
- Não usar espaços, acentos ou caracteres especiais.
- Separar fonte editável, export intermediário e GLB final.
- Registrar proveniência e licença.

Estrutura recomendada:

```text
source_assets/
  characters/
  creatures/
  weapons/
  props/
  buildings/
  foliage/
  animations/

public/models/
  chars/
  creatures/
  weapons/
  props/
  biome/
  foliage/
```

A estrutura real deve respeitar o repositório e suas instruções locais.

## 9.3 Escala, orientação e pivô

### Humanoides

- Altura-base recomendada: 1,75 a 1,85 unidades de mundo.
- Chefes humanos podem usar 1,9 a 2,4.
- Gigantes e monstros usam tabela de escala própria.
- O root deve estar no centro dos pés.
- O mínimo de Y deve tocar o chão em `Y = 0`.
- O asset deve estar centrado em X/Z.
- Transformações devem ser aplicadas antes da exportação.
- Root scale final deve ser `1,1,1`.
- Não usar escala negativa.
- A orientação frontal deve copiar o rig canônico já aprovado no projeto. Não compensar erro de orientação com rotação ad hoc no runtime.

### Props

- Pivô no ponto de interação real.
- Porta: pivô na dobradiça.
- Baú: base central ou dobradiça, conforme animação.
- Arma: origem e orientação compatíveis com o sistema de grip existente.
- Construção: origem no centro da base e Y mínimo no chão.
- Vegetação: origem no centro da raiz.

## 9.4 Orçamento de polígonos

Valores em triângulos. A coluna “alvo” é preferida; “máximo” exige justificativa visual e teste.

| Categoria | Alvo | Máximo | Observação |
|---|---:|---:|---|
| Player completo | 2.500–4.500 | 6.000 | corpo, armadura e cabelo visíveis |
| NPC humanoide | 1.200–3.000 | 4.000 | usar variantes de textura quando possível |
| Mob pequeno | 300–1.000 | 1.500 | deve ser barato para grupos |
| Mob médio | 800–2.200 | 3.500 | principal população do mundo |
| Elite | 2.000–4.000 | 5.500 | detalhes maiores e legíveis |
| Boss | 4.000–8.000 | 12.000 | exceção medida e rara |
| Mount | 2.000–4.500 | 7.000 | considerar rider + mount no orçamento |
| Arma pequena | 100–500 | 800 | silhueta primeiro |
| Arma grande | 300–900 | 1.500 | boss weapon pode exceder com aprovação |
| Prop pequeno | 20–300 | 600 | barris, caixas, ossos |
| Prop médio | 200–1.200 | 2.000 | bancadas, altares, carroças |
| Construção | 1.500–7.000 | 12.000 | usar módulos, merge e instancing |
| Árvore | 80–500 | 900 | variantes e LOD |
| Grama/reed | 2–40 | 80 | instanciada |

Regras:

- Não aumentar polígonos para detalhes que podem ser textura ou vertex color.
- Personagens que aparecem em multidões devem ficar abaixo do teto.
- Bosses são exceções porque existem poucos simultaneamente.
- LOD e far mesh devem ser usados de acordo com o renderer atual.

## 9.5 Orçamento de materiais e draw calls

| Categoria | Materiais-alvo | Máximo |
|---|---:|---:|
| Player | 1–3 | 4 |
| NPC/mob | 1–2 | 3 |
| Boss | 2–4 | 5 |
| Arma | 1 | 2 |
| Prop | 1 | 2 |
| Construção modular | 1–4 | 6 |
| Foliage | 1 | 1 |

- Preferir atlas.
- Reutilizar materiais.
- Mesclar partes estáticas quando não houver necessidade de transformação independente.
- Não criar material único para cada pequeno detalhe.
- Emissive deve compartilhar material sempre que possível.

## 9.6 Resolução de texturas

| Categoria | Resolução preferida | Máximo padrão |
|---|---:|---:|
| Player | 256×256 | 512×512 |
| NPC/mob | 128×128 ou 256×256 | 512×512 |
| Boss | 256×256 | 512×512 |
| Mount | 256×256 | 512×512 |
| Arma | 64×64 ou 128×128 | 256×256 |
| Prop pequeno | 32×32 a 128×128 | 256×256 |
| Prop médio | 64×64 a 256×256 | 512×512 |
| Construção/atlas | 256×256 ou 512×512 | 512×512 |
| Foliage | 32×32 a 128×128 | 256×256 |
| Terrain atlas | 256×256 ou 512×512 | 512×512 por conjunto |

Regras:

- Proibido 2K/4K sem aprovação excepcional.
- Textura deve ser proporcional ao tamanho em tela.
- Usar atlas e repetição para construções.
- Preservar pixel art e evitar upscale artificial.
- O pipeline de shipping deve usar a compressão já suportada pelo projeto.
- O source pode ser PNG; o runtime deve seguir formato e compressão do pipeline existente.

## 9.7 Quantidade de cores

- Prop simples: 8 a 24 cores.
- Arma: 8 a 24 cores.
- Humanoide: 16 a 48 cores.
- Boss: 24 a 64 cores.
- Construção: 16 a 48 cores por atlas.
- Máximo recomendado por asset: 64 cores visuais dominantes.

Gradientes longos devem ser convertidos em faixas ou dithering controlado. Não quantizar telegraphs e ícones a ponto de perder legibilidade.

## 9.8 UV e atlas

- Evitar ilhas minúsculas.
- Espelhar partes quando não houver assimetria narrativa.
- Manter densidade de texel semelhante entre assets da mesma categoria.
- Usar padding suficiente para mipmaps e compressão.
- Não usar UDIM.
- Unificar partes de armadura em um atlas quando possível.
- Separar alpha apenas quando necessário.

## 9.9 LOD

### Personagens

- LOD próximo: rig completo.
- LOD médio: rig completo com menor frequência de atualização, conforme sistema atual.
- LOD distante: far mesh ou pose baked do pipeline existente.
- Não criar sistemas paralelos de LOD.

### Ambiente

- LOD0: silhueta completa.
- LOD1: 40% a 60% dos triângulos.
- LOD2: 10% a 25% dos triângulos ou impostor quando apropriado.
- Props pequenos repetidos podem desaparecer em distância controlada.

## 9.10 Colisão

- Preservar colliders do mundo quando a troca for 1:1.
- O novo visual deve caber no footprint do asset original.
- Não usar a malha renderizada completa como collider por padrão.
- Criar proxies simples apenas quando necessário.
- Alterar collider exige teste de quests, nav, NPC, câmera e combate.
- Um asset visual que ultrapassa o collider original deve ser redimensionado ou redesenhado.

## 9.11 Proveniência e licença

Todo asset deve registrar:

- origem;
- autor ou fornecedor;
- licença;
- permissão para uso comercial e derivativo;
- data de aquisição;
- modificações realizadas;
- arquivo original;
- arquivo final;
- responsável pela aprovação.

Asset sem licença clara não pode ser enviado ao build de produção.

---

# 10. PERSONAGENS, RIGS E TRANSFERÊNCIA DE ANIMAÇÕES

## 10.1 Objetivo

Os novos personagens devem usar as animações e estados do jogo-base, evitando recriar um sistema de animação.

## 10.2 Rig canônico

Antes da produção em massa, realizar uma auditoria dos rigs atuais.

Decisão preferida:

- usar o rig humanoide compartilhado já existente no projeto, como `Rig_Medium`, caso ele cubra todos os estados necessários;
- caso isso não seja possível, escolher um único rig existente como `canonical_humanoid_v1`;
- documentar bone names, orientação, rest pose, sockets e escala;
- todos os novos humanoides de Meshy devem ser adaptados a esse rig.

Não criar um esqueleto novo para cada classe.

## 10.3 Estados mínimos

Todo player deve suportar, quando já utilizados pelo jogo:

- idle;
- walk;
- walk backward;
- run;
- cast;
- spin ou habilidade equivalente;
- swim;
- sit;
- jump;
- ataques por estilo de arma;
- hit reaction;
- death;
- revive ou flourish.

Estados opcionais após aprovação:

- dodge;
- parry;
- stagger forte;
- emotes novos;
- weapon arts.

## 10.4 Regras de animação

- Animações de locomoção devem ser in-place.
- Root motion não controla posição real.
- Pés não devem deslizar de forma perceptível.
- A rest pose deve corresponder ao rig canônico.
- Pesos de skin não podem deformar mãos, ombros, joelhos ou capa de modo crítico.
- Clipes devem ter nomes estáveis ou um `ClipMap` explícito.
- O renderer continua sendo o driver dos estados visuais.
- Não disparar animação a partir de módulos paralelos.
- O personagem nunca pode cair em T-pose por peso zero do mixer.

## 10.5 Pipeline de transferência

1. Selecionar o asset visual aprovado.
2. Importar o GLB/FBX fonte em Blender.
3. Aplicar escala e rotação.
4. Remover bones, lights, cameras e materiais desnecessários.
5. Importar o rig canônico e o modelo animado fonte.
6. Ajustar a malha à rest pose do rig.
7. Transferir ou refazer pesos.
8. Testar deformação nos extremos.
9. Reutilizar os clips do rig original.
10. Remover root motion quando presente.
11. Fazer bake somente quando o runtime não puder reutilizar diretamente.
12. Exportar GLB com skin e clips necessários.
13. Otimizar pelo pipeline do projeto.
14. Registrar no manifesto visual.
15. Atualizar `VisualDef`, famílias e `ClipMap` necessários.
16. Executar testes de contrato dos clips.
17. Testar death, revive, troca de arma, mount, swim e crowd LOD.

## 10.6 Criaturas não humanoides

- Reutilizar o rig original quando a anatomia for compatível.
- Criar rigs por família, não por indivíduo.
- Lobos, cães e criaturas quadrúpedes devem compartilhar uma família quando possível.
- Bosses únicos podem ter rig exclusivo, mas continuam usando o mesmo pipeline de `VisualDef`, clips e mixer.

## 10.7 Capas e acessórios

- Capas devem ser leves.
- Evitar cloth simulation completa no MVP.
- Usar bones simples, animação baked ou sway visual barato.
- Armas, escudos e acessórios devem usar grips e sockets existentes.
- Não embutir arma permanentemente no corpo se o sistema permite troca.

---

# 11. PRODUÇÃO COM MESHY

## 11.1 Princípio

Meshy é ferramenta de criação, não etapa final de shipping. Nenhum output bruto do Meshy é considerado pronto.

## 11.2 Quando usar

- classe ou NPC sem substituto adequado;
- boss ausente;
- criatura necessária ao mapeamento 1:1;
- mount sem versão dark fantasy;
- arma ou escudo importante;
- prop de identidade que não existe nos packs;
- arquitetura gótica específica.

## 11.3 Quando não usar

- existe asset compatível que pode ser retexturizado;
- o objeto é simples e pode ser feito proceduralmente;
- a mudança pode ser resolvida por textura e material;
- o asset ficará muito distante ou pequeno;
- o custo de rig/retopo será maior que adaptar um asset existente.

## 11.4 Prompt-base recomendado

```text
Late-1990s PlayStation 1 dark fantasy game asset, low-poly, strong readable silhouette,
human proportions, angular geometry, hand-painted low-resolution texture, limited muted
palette, worn medieval materials, no modern PBR look, no micro-detail, no cinematic base,
no text, no logo, no environment, neutral T-pose when humanoid, separate weapons, designed
for a browser MMO with many characters on screen.
```

O prompt deve acrescentar:

- função do asset;
- altura-alvo;
- orçamento de polígonos;
- paleta da zona;
- materiais permitidos;
- rig esperado;
- presença ou ausência de arma;
- vista de referência aprovada.

## 11.5 Pipeline Meshy

1. Gerar pelo menos três variações de silhueta.
2. Selecionar pela forma, não pelo detalhe da textura.
3. Aprovar conceito frontal, lateral e traseiro.
4. Baixar o melhor source disponível.
5. Limpar geometria e remover peças invisíveis.
6. Corrigir topologia crítica.
7. Reduzir para o orçamento de triângulos.
8. Recriar UV ou atlas quando necessário.
9. Quantizar cores e aplicar paleta do jogo.
10. Reduzir materiais.
11. Riggar ou transferir para rig canônico.
12. Transferir animações.
13. Exportar GLB.
14. Otimizar, validar e comparar.
15. Integrar apenas após aprovação técnica e visual.

## 11.6 Critérios de rejeição

Rejeitar um asset Meshy quando:

- tem anatomia incoerente;
- possui detalhes de alta frequência incompatíveis;
- depende de normal map para funcionar;
- tem materiais demais;
- não aceita o rig sem deformação grave;
- não cabe no collider ou escala do asset original;
- parece de outro jogo;
- possui símbolos, logos ou texto não solicitados;
- não tem licença ou proveniência registrável.

---

# 12. CONVERSÃO DO MUNDO OPEN WORLD

## 12.1 Regra principal

Preservar:

- seed;
- altura do terreno;
- coordenadas;
- estradas;
- rios e lagos;
- volumes de água;
- zonas;
- spawns;
- quest locations;
- colliders;
- dungeons;
- hubs;
- portas e pontos de interação.

Alterar apresentação, não geografia.

## 12.2 Terreno

A forma mais barata e segura de converter o mundo é:

- trocar a paleta dos materiais;
- reduzir resolução e variedade de texturas;
- alterar splat maps ou regras de mistura;
- reescrever texturas procedurais existentes;
- usar banding, dithering e ruído controlado;
- reduzir brilho e saturação;
- acrescentar dead grass, pedras e árvores coerentes;
- usar fog para encurtar horizonte visual;
- manter chunking, LOD e streaming existentes.

Não substituir o terreno por um novo mesh gigante.

## 12.3 Construções

Aplicar a regra 1:1:

- uma construção visual substitui uma construção funcional;
- preservar footprint;
- preservar entradas;
- preservar altura mínima de portas;
- preservar sockets, NPC spots e posições de serviço;
- retexturizar primeiro;
- usar módulos PSX para reconstrução apenas quando a silhueta original não puder ser adaptada.

## 12.4 Vegetação

- Árvores vivas tornam-se secas, retorcidas ou descoloridas.
- Pântano usa reeds, fungos e troncos mortos.
- Montanha usa pines finos, neve suja e rochas escuras.
- Costa usa vegetação seca, mastros, naufrágios e pedras.
- Vegetação deve ser instanciável.
- Evitar alpha overdraw excessivo.

## 12.5 Água

- Preservar sistema de água.
- Alterar cor, transparência, reflectivity e fog subaquático.
- Pântanos: preto/verde, pouca reflexão.
- Costa: azul frio e turvo.
- Água corrompida pode usar emissive discreto apenas em áreas especiais.

## 12.6 Céu, clima e fog

- Preservar clima por bioma.
- Trocar presets de cor e intensidade.
- Usar fog como parte da identidade PS1.
- Chuva, neve e cinzas devem respeitar performance.
- Céu não deve dominar a leitura do gameplay.

## 12.7 Props

O `ASSET_MAPPING_1TO1.md` é o catálogo obrigatório. Cada item deve ser marcado como:

- manter;
- retexturizar;
- reestilizar;
- substituir por pack;
- criar no Meshy;
- remover por incompatibilidade.

Nenhum agente deve criar um segundo catálogo concorrente.

---

# 13. UI/UX

## 13.1 Objetivo

A interface deve parecer pertencer a Demons Whip sem perder as funções e o fluxo do MMO-base.

## 13.2 O que preservar

- estrutura DOM;
- responsividade;
- inventário;
- action bars;
- chat;
- party e raid frames;
- quest tracker;
- minimap;
- configurações;
- acessibilidade;
- navegação por teclado, mouse e touch;
- localização;
- estados de loading e erro.

## 13.3 O que alterar

- cores;
- backgrounds;
- bordas;
- botões;
- frames;
- sombras;
- tipografia;
- ícones de classes e dungeons;
- barras de vida, mana e recursos;
- telas de login, seleção e loading;
- feedback de raridade;
- popups de boss e morte.

## 13.4 Direção visual

- painéis carvão ou pedra escura;
- bordas em ferro envelhecido;
- acentos em ouro gasto;
- estados perigosos em vermelho profundo;
- textos principais em off-white;
- títulos góticos, mas corpo altamente legível;
- elementos pixelados sem perder nitidez;
- animações curtas e discretas.

## 13.5 Melhorias leves permitidas

- colapsar painéis secundários;
- reduzir elementos redundantes;
- melhorar espaçamento;
- aumentar contraste;
- tornar prompts de interação mais claros;
- reorganizar opções no menu;
- melhorar leitura mobile;
- criar modo de HUD compacto.

## 13.6 Proibições

- remover recursos funcionais;
- mover UI crítica para dentro do WebGL;
- substituir inventário, chat ou mapa por sistemas novos;
- usar fontes ilegíveis;
- colocar ads sobre gameplay;
- esconder telegraphs atrás de UI;
- quebrar locale ou acessibilidade.

---

# 14. ÁUDIO E MÚSICA

## 14.1 Estratégia

Preservar o motor de áudio, eventos e chaves. Substituir o conteúdo sonoro e seus mapeamentos.

## 14.2 Música

Categorias mínimas:

- launcher/title;
- criação e seleção de personagem;
- hub inicial;
- exploração por bioma;
- pântano;
- montanha/neve;
- costa;
- dungeon;
- combate comum;
- boss;
- vitória/loot raro;
- morte;
- PvP;
- evento social.

Direção:

- drones;
- cordas graves;
- coros discretos;
- percussão ritual;
- sinos;
- instrumentos medievais degradados;
- ruído e textura analógica;
- loops longos e pouco repetitivos.

## 14.3 SFX

- Manter as chaves existentes sempre que possível.
- Trocar o arquivo por trás da chave, em vez de alterar dezenas de call sites.
- Criar famílias por material: metal, carne, osso, madeira, pedra e magia.
- Sons de UI devem ser curtos e escuros.
- Passos devem variar por terreno.
- Bosses precisam de presença sonora própria.
- Ads devem respeitar mute, pausa e restauração de volume.

## 14.4 Normalização

- Usar o mesmo sample rate e codecs aceitos pelo pipeline existente.
- Normalizar loudness por categoria.
- Evitar clipping.
- Limitar vozes simultâneas.
- Testar headphones, desktop e mobile.
- Não introduzir arquivos enormes quando loops comprimidos resolvem.

---

# 15. PIXLLAND SDK E ADS

## 15.1 Princípio

A integração Pixlland deve ser isolada do core do jogo. O SDK não pode se tornar fonte de verdade de gameplay.

> O contrato real do Pixlland SDK não foi fornecido neste documento. Agentes não devem inventar nomes da API externa. Devem criar um adapter interno e mapear os métodos oficiais do SDK quando a documentação estiver disponível.

## 15.2 Responsabilidades do adapter

Interface interna conceitual:

```ts
interface PixllandPlatform {
  init(config: PixllandConfig): Promise<PixllandState>;
  isAvailable(): boolean;
  setConsent(consent: ConsentState): Promise<void>;
  track(event: PixllandEvent, payload?: Record<string, unknown>): void;
  canShow(placement: AdPlacement): boolean;
  showRewarded(placement: AdPlacement): Promise<RewardedResult>;
  showInterstitial(placement: AdPlacement): Promise<InterstitialResult>;
  dispose(): void;
}
```

Isso é um contrato interno sugerido, não a API oficial do SDK.

## 15.3 Separação arquitetural

- SDK não entra em `src/sim/`.
- Renderer não chama SDK diretamente.
- UI ou um controller de plataforma solicita a exibição.
- `main.ts` ou compositor equivalente conecta os módulos.
- Recompensa online deve ser validada pelo servidor quando o SDK fornecer proof/token.
- Falha do SDK nunca impede jogar.
- Modo offline ou plataforma não suportada deve continuar funcional.

## 15.4 Placements permitidos

### Rewarded ads

- bônus cosmético após dungeon;
- moeda cosmética account-bound;
- reroll cosmético;
- baú visual extra sem item de poder;
- unlock temporário de preview cosmético;
- recompensa de login cosmética.

### Interstitials

- retorno ao character select;
- fim de sessão;
- depois de voltar a um hub seguro;
- após conclusão de conteúdo, nunca antes da recompensa principal.

### Banner ou promoção

- launcher;
- patch notes;
- loja cosmética;
- tela de seleção;
- nunca no viewport normal de gameplay.

## 15.5 Placements proibidos

- durante combate;
- durante boss;
- em dungeon ativa;
- em PvP;
- enquanto o jogador estiver em grupo em atividade;
- em fila de matchmaking;
- sobre inventário ou quest crítica;
- em momento de risco de morte;
- para recuperar loot perdido;
- para conceder equipamento competitivo.

## 15.6 Frequência inicial recomendada

Valores iniciais, controláveis por remote config:

- nenhum interstitial nos primeiros 10 minutos;
- mínimo de 20 minutos entre interstitials;
- máximo de 3 interstitials por sessão;
- rewarded sempre iniciado pelo usuário;
- máximo recomendado de 5 rewarded por dia por conta;
- não repetir anúncio após falha ou cancelamento imediato.

## 15.7 Recompensas

Permitidas:

- cosméticos;
- títulos;
- molduras;
- emotes;
- skins;
- currency cosmética não negociável;
- conveniência sem impacto competitivo.

Proibidas:

- armas melhores;
- poder de combate;
- rating PvP;
- moeda negociável que afete o mercado;
- loot obrigatório;
- acesso exclusivo a progressão principal.

## 15.8 Estado do jogo durante ad

- Exibir somente em safe state.
- Bloquear input local.
- Pausar ou abaixar áudio de forma reversível.
- Não pausar o servidor.
- Em online, garantir que o personagem esteja em local seguro.
- Restaurar focus, áudio, cursor e controles após o ad.
- Tratar background/resume no mobile.

## 15.9 Eventos de analytics sugeridos

- `session_start`;
- `session_end`;
- `character_created`;
- `zone_entered`;
- `quest_completed`;
- `dungeon_started`;
- `dungeon_completed`;
- `boss_started`;
- `boss_defeated`;
- `player_death`;
- `ad_offer_shown`;
- `ad_started`;
- `ad_completed`;
- `ad_skipped`;
- `ad_failed`;
- `reward_claimed`;
- `reward_rejected`;
- `sdk_init_failed`.

Não enviar PII desnecessária. Respeitar consentimento, idade, região e política de privacidade.

---

# 16. PERFORMANCE E SHIPPING

## 16.1 Meta

O rebrand não pode piorar a experiência do jogo-base por usar assets de fontes diferentes.

## 16.2 Regras

- Preservar os níveis gráficos e o governador adaptativo.
- Não criar preload diferente por tier quando isso quebrar o contrato atual.
- Usar instancing para foliage e props repetidos.
- Usar merge para módulos estáticos quando seguro.
- Manter quantidade de materiais baixa.
- Usar LOD de personagens já existente.
- Comprimir geometria e texturas pelo pipeline suportado.
- Evitar pós-processamento pesado em mobile.
- Medir draw calls, triângulos, memória de textura e tempo de frame.

## 16.3 Orçamento inicial de arquivo comprimido

Valores de referência; ajustar após medir assets atuais.

| Categoria | Alvo de GLB | Máximo sem aprovação |
|---|---:|---:|
| Player | até 1,5 MB | 2,5 MB |
| NPC/mob | até 750 KB | 1,5 MB |
| Boss | até 2 MB | 4 MB |
| Mount | até 1,5 MB | 3 MB |
| Arma | até 150 KB | 350 KB |
| Prop pequeno | até 100 KB | 250 KB |
| Prop médio | até 300 KB | 750 KB |
| Construção | até 1 MB | 2,5 MB |

Assets maiores exigem relatório de justificativa e evidência de runtime.

## 16.4 Meta de frame

- Desktop médio: buscar 60 FPS em gameplay comum.
- Mobile suportado: mínimo jogável de 30 FPS.
- Áreas lotadas devem acionar LOD e governadores atuais.
- Ads e analytics não podem criar hitch durante gameplay.
- Compilação de shaders e prewarm devem seguir os mecanismos existentes.

## 16.5 PS1 sem destruir performance

A estética PS1 deve ajudar a performance:

- low-poly real;
- texturas pequenas;
- fog;
- poucos materiais;
- iluminação simples;
- menos transparência;
- menos partículas;
- silhueta em vez de microdetalhe.

---

# 17. QUALIDADE E DEFINITION OF DONE

## 17.1 DoD de asset 3D

Um asset só está pronto quando:

- possui licença registrada;
- nome e caminho estão corretos;
- escala está normalizada;
- pivô está correto;
- transformações estão aplicadas;
- triângulos dentro do orçamento;
- materiais dentro do orçamento;
- texturas dentro do orçamento;
- paleta aprovada;
- não há mesh invisível desnecessário;
- não há light/camera acidental;
- collider ou footprint compatível;
- rig e clips funcionam, quando aplicável;
- não aparece T-pose;
- não há root motion indevido;
- GLB passa por validate/inspect;
- asset foi otimizado;
- manifesto foi atualizado pela ferramenta correta;
- existe preview em múltiplos ângulos;
- existe captura in-game;
- foi testado em pelo menos desktop e mobile;
- foi aprovado visualmente ao lado de assets vizinhos.

## 17.2 DoD de zona

Uma zona só está pronta quando:

- terreno usa paleta PS1;
- céu, fog e clima combinam;
- foliage está normalizado;
- construções têm footprint correto;
- NPCs e mobs usam novos visuais;
- música e ambiência foram trocadas;
- nomes e quests principais foram reescritos;
- boss ou encounter principal está integrado;
- nenhuma quest ficou inacessível;
- colisões e portas funcionam;
- performance foi medida;
- não há asset claramente fora de estilo.

## 17.3 DoD de UI

- função original preservada;
- layout responsivo;
- texto legível;
- todos os estados de hover/focus/disabled;
- teclado, mouse e touch funcionam;
- locale funciona;
- contraste aceitável;
- sem ads sobre gameplay;
- sem regressão no character select, inventory, chat e settings.

## 17.4 DoD de SDK

- init fail-safe;
- consentimento tratado;
- placements respeitados;
- frequency cap aplicado;
- áudio e focus restaurados;
- reward validada;
- offline funciona sem SDK;
- desktop/mobile/web testados conforme disponibilidade;
- eventos de analytics documentados;
- nenhum dado sensível enviado sem necessidade.

---

# 18. PROTOCOLO OPERACIONAL PARA AGENTES DE IA

## 18.1 Antes de editar

O agente DEVE:

1. Ler este GDD.
2. Ler `ASSET_MAPPING_1TO1.md`.
3. Ler `AGENTS.md` e `CLAUDE.md` raiz.
4. Ler o `CLAUDE.md` local antes de trabalhar em uma pasta.
5. Verificar a branch de release atual e as regras de worktree.
6. Executar `git status --short`.
7. Preservar trabalho não relacionado.
8. Inspecionar o código e testes existentes.
9. Classificar a tarefa como `KEEP`, `RESKIN`, `LIGHT_TUNE`, `NEW_ASSET` ou `NEW_SYSTEM`.
10. Interromper se a tarefa virar `NEW_SYSTEM` sem aprovação.

## 18.2 Classificação de mudanças

| Tipo | Significado | Aprovação |
|---|---|---|
| `KEEP` | Não alterar lógica; apenas validar | automática |
| `RESKIN` | Trocar visual, texto ou áudio | automática dentro deste GDD |
| `LIGHT_TUNE` | Ajustar valores ou feedback sem mudar arquitetura | permitida com testes |
| `NEW_ASSET` | Criar asset ausente pelo pipeline | permitida se mapeado |
| `NEW_MODULE` | Pequeno adapter ou módulo isolado | exige justificativa |
| `NEW_SYSTEM` | Mecânica, serviço ou arquitetura nova | exige aprovação humana |

## 18.3 Relatório de impacto antes da implementação

Toda tarefa relevante deve responder:

- Qual sistema existente será reutilizado?
- Qual asset ou dado será substituído?
- Quais IDs internos permanecem?
- Há mudança em simulação?
- Há mudança em protocolo ou banco?
- Há risco mobile?
- Há risco de preload/memória?
- Quais testes cobrem a mudança?
- Que evidência visual será gerada?

## 18.4 Regras de implementação

- Fazer o menor diff possível.
- Não duplicar uma solução existente.
- Não editar arquivos gerados manualmente.
- Não adicionar dependência sem necessidade concreta.
- Não mover regra de gameplay para render/UI.
- Não corrigir asset ruim com transformação permanente no runtime quando o source puder ser corrigido.
- Não alterar conteúdo não relacionado.
- Não fazer commit, push, issue ou PR sem autorização.
- Novos módulos devem ser pequenos e testáveis.
- Lógica pura deve ficar separada de renderer/DOM quando o padrão do repositório exigir.

## 18.5 Validação mínima

Selecionar testes proporcionais à mudança. Para uma entrega final relevante, considerar:

```sh
npm run check:types
npm test
npm run asset:budget
npm run build
node scripts/gate_select.mjs
```

Além disso:

- executar validators de GLB;
- regenerar media manifest pela ferramenta;
- executar testes de clip maps para personagens;
- capturar screenshots desktop/mobile;
- testar online e offline quando a mudança tocar surfaces compartilhadas;
- relatar comandos exatos e resultados.

## 18.6 Formato do relatório final do agente

```text
Objetivo:
Classificação da mudança:
Sistemas preservados:
Arquivos alterados:
Assets alterados:
IDs preservados:
Testes executados:
Evidência visual:
Riscos restantes:
Itens não executados:
```

## 18.7 Stop conditions

O agente deve parar e pedir decisão quando:

- licença de asset for incerta;
- Pixlland SDK não tiver contrato disponível;
- o rig canônico não suportar a anatomia;
- a mudança exigir novo protocolo;
- uma substituição 1:1 não couber no collider;
- o asset exceder orçamento de forma relevante;
- o visual aprovado conflitar com a legibilidade;
- a mudança quebrar mobile;
- dois documentos de mesma prioridade entrarem em conflito;
- um “ajuste leve” virar reescrita de sistema.

---

# 19. ROADMAP DE PRODUÇÃO

## Fase 0 — Fork, auditoria e baseline

### Entregas

- criar fork/projeto Demons Whip;
- registrar versão-base;
- criar baseline visual e de performance;
- inventariar classes realmente existentes;
- auditar rigs e clips;
- auditar assets, licenças e paths;
- confirmar contratos do Pixlland SDK;
- definir branch e fluxo de updates do upstream.

### Exit criteria

- jogo-base roda online e offline;
- testes-base conhecidos;
- screenshots e métricas de referência;
- nenhum rebrand ainda aplicado sem inventário.

## Fase 1 — Style foundation

### Entregas

- paleta global;
- presets por zona;
- shader/post-process PS1 configurável;
- padrão de textura;
- asset profile schema;
- rig canônico;
- scripts de validação;
- primeiro player normalizado;
- primeiro mob normalizado;
- primeiro prop normalizado.

### Exit criteria

- três assets de fontes diferentes parecem do mesmo jogo;
- pipeline é repetível;
- nenhum asset é corrigido manualmente no runtime.

## Fase 2 — Vertical slice: Vale of Cinders

### Entregas

- hub inicial;
- terreno, sky, fog e foliage;
- 3 classes visuais;
- 6 a 10 mobs;
- 1 elite;
- The Executioner;
- uma dungeon;
- UI skin inicial;
- música e SFX-base;
- lore e quests iniciais reescritas.

### Exit criteria

- sessão de 30 a 60 minutos totalmente coerente;
- todos os sistemas-base continuam funcionais;
- desktop e mobile aprovados;
- performance não inferior ao baseline além da margem definida.

## Fase 3 — Produção de assets em ondas

Ordem recomendada:

1. Players.
2. NPC humanoides.
3. Mobs comuns.
4. Elites e mini-bosses.
5. Bosses.
6. Mounts.
7. Weapons e shields.
8. Town buildings.
9. Dungeon props.
10. Biome e foliage.

Cada onda usa o mesmo pipeline e os mesmos gates.

## Fase 4 — Conversão de regiões

Ordem sugerida:

1. Vale of Cinders.
2. The Drowned Mire.
3. Thornpeak Gallows.
4. The Forsaken Shore.
5. The Veiled Hollow.
6. Cinder Drakelands.
7. Frostveil Wastes.

## Fase 5 — UI, áudio e conteúdo textual

- reskin final da UI;
- ícones críticos;
- soundtrack por região;
- SFX por material;
- nomes, tooltips, quests e wiki;
- loading screens;
- branding e packaging.

## Fase 6 — Pixlland SDK

1. Adapter e mock.
2. Consentimento.
3. Analytics.
4. Rewarded ad em safe zone.
5. Interstitial em transição segura.
6. Validação de reward.
7. Remote config.
8. QA web/mobile/desktop.

## Fase 7 — Boss pass e gameplay polish

- bosses do roster;
- telegraphs;
- áudio;
- câmera;
- hit feedback;
- tuning de dificuldade;
- teste solo/grupo/PvP;
- revisão de loot.

## Fase 8 — Full QA e lançamento

- regressão de todos os sistemas;
- asset audit final;
- performance tour;
- crowd test;
- memory test;
- locale;
- acessibilidade;
- SDK/ads;
- build web, desktop e mobile;
- documentação e créditos;
- revisão de licenças.

---

# 20. CRITÉRIOS DO MVP

O MVP de rebrand não exige converter todo o universo de uma vez. Ele deve demonstrar que a estratégia é sustentável.

MVP aprovado quando existir:

- uma região completa;
- um hub funcional;
- três classes visuais normalizadas;
- pelo menos oito inimigos coerentes;
- dois encounters de elite ou boss;
- uma dungeon completa;
- terreno e mundo em estilo PS1;
- UI reskinada sem perda de função;
- trilha e SFX coerentes;
- lore inicial reescrita;
- pipeline Meshy → normalize → rig → animate → GLB → runtime comprovado;
- Pixlland SDK integrado em modo fail-safe ou, caso a API ainda não esteja disponível, adapter e mock aprovados;
- gameplay-base, multiplayer, quests, loot e crafting funcionais;
- performance equivalente ou melhor que o baseline no conteúdo convertido.

---

# 21. CRITÉRIOS DO REBRAND COMPLETO

- Todo asset relevante está mapeado.
- Nenhum asset cru de pack ou Meshy aparece em produção.
- Todos os personagens compartilham escala, paleta e padrão de animação.
- Todas as regiões principais têm materiais, clima, sky e áudio coerentes.
- Bosses principais possuem identidade visual e telegraphs.
- UI, branding, ícones essenciais e áudio foram convertidos.
- Quests principais, NPCs e wiki usam a nova lore.
- O jogo não contém referências visíveis a World of ClaudeCraft, exceto créditos ou licenças quando obrigatórios.
- SDK e ads não interrompem gameplay nem concedem poder competitivo.
- Todos os sistemas do template continuam funcionais.
- Performance e estabilidade atendem às metas.
- Licenças e créditos estão completos.

---

# 22. TEMPLATE DE FICHA DE ASSET

```json
{
  "id": "creature_shadow_hound",
  "sourceAsset": "creatures/wolf.glb",
  "targetAsset": "creatures/shadow_hound.glb",
  "mappingStatus": "NORMALIZING",
  "category": "mob_medium",
  "displayName": "Shadow Hound",
  "internalIdChanged": false,
  "targetHeight": 1.15,
  "triangles": {
    "target": 1400,
    "hardMax": 2500
  },
  "materials": {
    "target": 1,
    "hardMax": 2
  },
  "textures": [
    {
      "channel": "baseColor",
      "size": 256,
      "palette": "drowned_mire_v1"
    }
  ],
  "rig": "quadruped_canine_v1",
  "requiredClips": ["idle", "walk", "run", "attack", "hit", "death"],
  "colliderPolicy": "reuse_original",
  "lodPolicy": "existing_character_lod",
  "license": "<license_and_source_record>",
  "artApproved": false,
  "techApproved": false,
  "runtimeApproved": false,
  "notes": "Must preserve original spawn footprint and attack reach."
}
```

---

# 23. TEMPLATE DE TAREFA PARA AGENTE

```text
TÍTULO
Normalizar e integrar <asset> como <novo nome>

OBJETIVO
Substituir visualmente <asset original> sem alterar sua lógica, ID, spawn, collider ou comportamento.

FONTES
- Este GDD
- ASSET_MAPPING_1TO1.md
- Asset original
- Concept aprovado
- CLAUDE.md da pasta

ESCOPO
- Normalizar escala, polígonos, materiais, textura e paleta
- Transferir rig/animações
- Exportar GLB
- Integrar ao manifest
- Atualizar VisualDef/ClipMap se necessário
- Criar testes e evidência visual

FORA DE ESCOPO
- Alterar AI
- Alterar stats
- Alterar drop
- Alterar collider
- Alterar protocolo

ACEITAÇÃO
- Dentro dos budgets
- Sem T-pose
- Sem root motion
- Visual coerente
- Testes passam
- Desktop/mobile aprovados

RELATÓRIO
- Arquivos alterados
- Comandos executados
- Screenshots
- Riscos restantes
```

---

# 24. DECISÃO FINAL DE DESIGN

Demons Whip deve ser construído como uma nova identidade sobre uma fundação já completa.

A equipe e os agentes devem resistir à tendência de recriar sistemas que já funcionam. O valor do projeto está em:

- transformar visualmente um MMO pronto;
- unificar assets de origens diferentes;
- preservar a profundidade do template;
- criar uma direção de arte forte;
- adaptar lore e bosses;
- melhorar a sensação do combate com mudanças pequenas;
- integrar a plataforma Pixlland de maneira segura;
- entregar rapidamente um jogo que pareça novo sem carregar o custo de um desenvolvimento do zero.

> **Regra de ouro:** quando houver duas soluções equivalentes, escolher a que preserva mais do template, altera menos código, mantém os testes existentes e produz o maior ganho visual percebido.
