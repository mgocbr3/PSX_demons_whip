# DEMONS WHIP - Game Design Document
## Soulslike PS1-Style MMO RPG

**Versão:** 1.0  
**Data:** 16/08/2026  
**Estilo Visual:** PS1/PSX Low-Poly Dark Fantasy (referência: Elden Ring PS1 Demake)

---

## 1. VISÃO GERAL

### 1.1 Conceito
**Demons Whip** é um MMO RPG soulslike com estética PS1, ambientado em um mundo sombrio e gótico inspirado em Elden Ring. O jogo combina o combate desafiador dos soulslikes com a progressão MMO, mantendo a estética retro de polígonos baixos e texturas pixeladas.

### 1.2 Pilares de Design
1. **Combate Punitivo e Justo** - Morte constante, mas sempre justa. Aprender é a mecânica central.
2. **Exploração Interconectada** - Mundo aberto sem mapeamento, com segredos eatalhos.
3. **Dark Fantasy Gótico** - Ambientação sombria, horror gótico, arquitetura medieval corrompida.
4. **Progressão MMO** - Level cap, gear, crafting, PvP, mas sem pay-to-win.
5. **Estética PS1** - Low-poly, texturas pixeladas, iluminação pre-renderizada, dithering.

### 1.3 Referências Visuais
- **Elden Ring PS1 Demake** (conceito principal)
- **Dark Souls** (combate e design de mundo)
- **Symphony of the Night** (exploração)
- **ICO/Shadow of the Colossus** (atmosfera)

---

## 2. ASSETS DISPONÍVEIS - CATÁLOGO COMPLETO

### 2.1 PERSONAGENS JOGÁVEIS

#### World of Claudecraft (Reutilizáveis com Rebrand)
| Asset | Arquivo | Uso em Demons Whip | Status |
|-------|---------|-------------------|--------|
| Warrior | `chars/players/warrior.glb` | **Vanguard** (Classe Tanque) | ✅ USAR |
| Knight | `chars/players/knight.glb` | **Paladin** (Classe Holy Warrior) | ✅ USAR |
| Mage | `chars/players/mage.glb` | **Sorcerer** (Classe Arcana) | ✅ USAR |
| Rogue | `chars/players/rogue.glb` | **Assassin** (Classe Velocidade) | ✅ USAR |
| Ranger | `chars/players/ranger.glb` | **Hunter** (Classe Arqueiro) | ✅ USAR |
| Druid | `chars/players/druid.glb` | **Cleric** (Classe Suporte) | ✅ USAR |
| Paladin | `chars/players/paladin.glb` | **Inquisitor** (Classe Holy Melee) | ✅ USAR |
| Warlock | `chars/players/warlock.glb` | **Necromancer** (Classe Dark Magic) | ✅ USAR |
| Shaman | `chars/players/shaman.glb` | **Occultist** (Classe Blood Magic) | ✅ USAR |
| Barbarian | `chars/players/barbarian.glb` | **Berserker** (Classe Rage) | ✅ USAR |

#### Packs Retro PSX (Novos Personagens)
| Asset | Arquivo | Uso em Demons Whip | Status |
|-------|---------|-------------------|--------|
| Dark Fantasy Monk | `dark_fantasy_monk__psx_style_low-poly.glb` | **Pilgrim** (Classe Faith) | ✅ USAR |
| PSX Knight | `ps1_psx_knight.glb` | **Elite Knight** (NPC/Cosmético) | ✅ USAR |
| Raging Wolf Knight | `raging_wolf_knight_psx.glb` | **Bloodhound Knight** (Boss) | ✅ USAR |
| Artorias PSX | `Artorias PSX/Artorias PSX.fbx` | **Abyss Walker** (Boss/Lenda) | ✅ USAR |
| War Servant | `psx_war_servant.glb` | **Undead Knight** (Inimigo) | ✅ USAR |

### 2.2 INIMIGOS E CRIATURAS

#### World of Claudecraft (Reutilizáveis com Rebrand)
| Asset | Arquivo Original | Novo Nome | Tipo | Status |
|-------|-----------------|-----------|------|--------|
| Demon | `creatures/demon.glb` | **Fallen Angel** | Boss | ✅ USAR |
| Demon Alt | `creatures/demonalt.glb` | **Abyssal Demon** | Elite | ✅ USAR |
| Ghost | `creatures/ghost.glb` | **Wraith** | Mob | ✅ USAR |
| Spider | `creatures/spider.glb` | **Broodmother** | Mob | ✅ USAR |
| Goblin | `creatures/goblin.glb` | **Dregs** | Mob Fraco | ✅ USAR |
| Orc | `creatures/orc.glb` | **Orc Slave** | Mob | ✅ USAR |
| Orc Enemy | `creatures/orcenemy.glb` | **Orc Berserker** | Elite | ✅ USAR |
| Wolf | `creatures/wolf.glb` | **Shadow Hound** | Mob | ✅ USAR |
| Wolf Basic | `creatures/wolf_basic.glb` | **Corpse Dog** | Mob | ✅ USAR |
| Giant | `creatures/giant.glb` | **Golem** | Elite | ✅ USAR |
| Bear | `creatures/bear_form.glb` | **Dire Bear** | Elite | ✅ USAR |
| Dragonkin Mob | `creatures/dragonkin_mob.glb` | **Dragon Acolyte** | Mob | ✅ USAR |
| Dragonkin Elite | `creatures/dragonkin_elite.glb` | **Dragon Knight** | Elite | ✅ USAR |
| Dragonkin Baby | `creatures/dragonkin_baby.glb` | **Whelp** | Mob | ✅ USAR |
| Mushroom Pixie | `creatures/mushroom_pixie.glb` | **Fungal Zombie** | Mob | ✅ USAR |
| Training Dummy | `creatures/training_dummy.glb` | **Target Dummy** | Teste | ✅ USAR |

#### PSX Horror-Fantasy Megapack (Novos Inimigos)
| Asset | Arquivo | Uso em Demons Whip | Status |
|-------|---------|-------------------|--------|
| Abomination | `abomination/abomination.glb` | **Aberration** (Elite) | ✅ USAR |
| !NEW Abomination2 | `!NEW Abomination2/` | **Greater Aberration** (Boss) | ✅ USAR |
| AnomalyMonster | `AnomalyMonster/` | **Eldritch Horror** (Boss) | ✅ USAR |
| Devil Demon | `Devil Demon/` | **Pit Lord** (Boss) | ✅ USAR |
| Alien Invader | `alieninvader/` | **Star Spawn** (Elite) | ✅ USAR |
| Big Abomination | `bigabomination/` | **Titan Aberration** (Boss) | ✅ USAR |
| Bigfoot | `bigfoot/` | **Mountain Giant** (Elite) | ✅ USAR |
| Black Butcher | `black butcher/` | **Executioner** (Mini-Boss) | ✅ USAR |
| Bloodwraith | `bloodwraith/` | **Blood Phantom** (Elite) | ✅ USAR |
| Elkdemon | `elkdemon/` | **Wendigo** (Elite) | ✅ USAR |
| Eyehead | `eyehead/` | **Grave Warden** (Mob) | ✅ USAR |
| Green Cyclope | `green cyclope/` | **Cyclops** (Elite) | ✅ USAR |
| Green Goliath | `greengoliath/` | **Swamp Titan** (Boss) | ✅ USAR |
| Horror Dolls Pack | `horror dolls pack/` | **Possessed Dolls** (Mobs) | ✅ USAR |
| Killer Pig | `killer pig/` | **Demon Boar** (Mob) | ✅ USAR |
| MrZ | `mrZ/` | **Undead Judge** (Mini-Boss) | ✅ USAR |
| Muscular Abomination | `muscular abomination/` | **Flesh Golem** (Elite) | ✅ USAR |
| Plague Doctor | `plague doctor/` | **Plague Priest** (Caster) | ✅ USAR |
| Werewolf | `werewolf/werewolfgodot.glb` | **Lycanthrope** (Elite) | ✅ USAR |
| Clown Pack | `clowns pack/` | **Mad Clown** (Mob Elite) | ✅ USAR |

#### PSX Horror Assets Avulsos
| Asset | Arquivo | Uso em Demons Whip | Status |
|-------|---------|-------------------|--------|
| Horror Entity | `psx_horror_entity.glb` | **Eldritch Abomination** (Boss) | ✅ USAR |
| Horror Creature | `psx_horror_creature.glb` | **Flesh Beast** (Elite) | ✅ USAR |
| Hands Monster | `psx_hands_monster_ps2_style.glb` | **Hand Crawler** (Mob) | ✅ USAR |
| PSX Monster | `psx_monster.glb` | **Crypt Crawler** (Mob) | ✅ USAR |
| Dead Tree Pack | `psx_dead_tree_pack.glb` | **Withered Trees** (Ambiente) | ✅ USAR |

### 2.3 ARMAS

#### World of Claudecraft (100+ armas - Principais para Demons Whip)
| Tipo | Assets Principais | Uso em Demons Whip |
|------|------------------|-------------------|
| Espadas 1H | `sword_1handed.glb`, `sword_a` a `sword_g.glb` | **Armas Leves** |
| Espadas 2H | `sword_2handed.glb`, `adv_sword_2handed.glb` | **Armas Pesadas** |
| Machados 1H | `axe_1handed.glb`, `axe_a` a `axe_d.glb` | **Armas de Machado** |
| Machados 2H | `axe_2handed.glb`, `adv_axe_2handed.glb` | **Greataxes** |
| Adagas | `dagger.glb`, `dagger_a` a `dagger_c.glb` | **Armas Rápidas** |
| Martelos | `hammer_a` a `hammer_d.glb` | **Armas de Impacto** |
| Lanças | `spear_a.glb` | **Armas de Alcance** |
| Arcos | `fletcher_s_guild_bow.glb`, `simple_farmhand_crossbow.glb` | **Armas Ranged** |
| Cetros | `staff_a` a `staff_d.glb`, `adv_staff.glb` | **Armas Arcanas** |
| Varinhas | `wand_a.glb`, `wand_b.glb`, `adv_wand.glb` | **Foco Arcano** |
| Cajados | `adv_druid_staff.glb`, `knotted_oak_stave.glb` | **Armas de Faith** |
| Machados de Mão | `brasscap_hatchet.glb`, `notched_woodaxe.glb` | **Armas Arremessáveis** |
| Luvas | `halberd.glb` | **Armas Híbridas** |
| Escudos | `shield_round.glb`, `shield_square.glb`, `shield_badge.glb` | **Defesa** |
| Espadas Únicas | `emberfang_sword.glb`, `moonlight_blade.glb` | **Armas Lendárias** |
| Necromancer | `skeleton_axe.glb`, `skeleton_blade.glb`, `skeleton_staff.glb` | **Armas Dark** |

#### Demonic Weapons Pack (Dark Fantasy)
| Asset | Arquivo | Uso em Demons Whip | Status |
|-------|---------|-------------------|--------|
| Demonic Sword | `sword/demonicswordgodot.glb` | **Infernal Blade** | ✅ USAR |
| Demonic Axe | `axe/demonicaxegodot.glb` | **Hellcleaver** | ✅ USAR |
| Demonic Scythe | `scythe/demonicscythe.glb` | **Reaper's Scythe** | ✅ USAR |
| Demonic Greatsword | `greatsword/` | **Abyssal Greatsword** | ✅ USAR |
| Demonic Dagger | `dagger/` | **Bloodstinger** | ✅ USAR |
| Demonic Spear | `spear/` | **Infernal Lance** | ✅ USAR |

#### Avulsos
| Asset | Arquivo | Uso em Demons Whip | Status |
|-------|---------|-------------------|--------|
| Moonlight Blade | `moonlight_blade.glb` | **Moonlight Greatsword** (Lendária) | ✅ USAR |
| Low Poly Sword | `low_poly_sword_handpainted.glb` | **Starting Sword** | ✅ USAR |
| Firewood | `podvarak_firewood.glb` | **Weapon Handle** | ⚠️ REVISAR |

### 2.4 AMBIENTAÇÃO E CONSTRUÇÕES

#### World of Claudecraft (Dungeon/Props)
| Categoria | Assets | Uso em Demons Whip |
|-----------|--------|-------------------|
| Dungeon | 382 arquivos em `models/dungeon/` | **Masmorras e Ruínas** |
| Props | 185 arquivos em `models/props/` | **Itens de Cenário** |
| Biome | 206 arquivos em `models/biome/` | **Vegetação e Terreno** |
| Foliage | 25 arquivos em `models/foliage/` | **Plantas** |
| Resources | 137 arquivos em `models/resources/** | **Recursos Coletáveis** |
| Quest | 14 arquivos em `models/quest/` | **Itens de Quest** |

#### PSX Modular Medieval (Construções Modulares)
| Categoria | Assets | Uso em Demons Whip |
|-----------|--------|-------------------|
| Building Blocks | 70 arquivos (paredes, pisos, escadas) | **Construções Base** |
| Decorations | 88 arquivos (portas, janelas, chaminés) | **Detalhes** |
| Market | 168 arquivos (barris, caixas, comida) | **Mercado/Cidades** |
| Roofs | 68 arquivos (telhados variados) | **Coberturas** |
| Textures | Texturas PBR | **Materiais** |

#### Kenney Retro Medieval Kit
| Asset | Uso em Demons Whip |
|-------|-------------------|
| Models (56 assets) | **Props Medievais** |
| Previews (107 imagens) | **Referências Visuais** |

#### 3D Retro Medieval Fantasy Kit
| Asset | Uso em Demons Whip |
|-------|-------------------|
| Blend file + 22 Textures | **Assets Fantasy Retro** |

### 2.5 ESTRUTURAS ESPECÍFICAS

#### Igrejas e Locais Sagrados
| Asset | Arquivo | Uso em Demons Whip | Status |
|-------|---------|-------------------|--------|
| Abandoned Church | `psx_abandoned_church.glb` | **Cathedral of the Fallen** | ✅ USAR |
| Church | `psx_church.glb` | **Chapel of Light** | ✅ USAR |
| Altar Ruins | `altar_ruins.glb` | **Ruined Altar** | ✅ USAR |
| Candle | `psx_candle.glb` | **Iluminação** | ✅ USAR |

#### Cemitérios e Locais de Morte
| Asset | Arquivo | Uso em Demons Whip | Status |
|-------|---------|-------------------|--------|
| Coffin | `psx_coffin.glb`, `low_poly_coffin.glb` | **Caixões** | ✅ USAR |
| Dead Trees | `psx_dead_tree_pack.glb` | **Árvores Mortas** | ✅ USAR |
| Wood Log Pile | `wood_log_pile_-_ps1_low_poly.glb` | **Lenha** | ✅ USAR |

#### Dragões
| Asset | Arquivo | Uso em Demons Whip | Status |
|-------|---------|-------------------|--------|
| Dragon Figurine | `medieval_mini_dragon_figurine.glb` | **Dragão Decorativo** | ✅ USAR |
| Bahamut | `final_fantasy_8_-_bahamut.glb` | **Ancient Dragon** (Boss) | ✅ USAR |

### 2.6 NATUREZA E TERRENO

| Asset | Arquivo | Uso em Demons Whip | Status |
|-------|---------|-------------------|--------|
| Trees/Flowers/Grass | `low_poly_trees_flowers_and_grass.glb` | **Vegetação Base** | ✅ USAR |
| Pine Tree | `psxps1_style_pine_tree.glb` | **Árvores Floresta** | ✅ USAR |
| Retro Nature Pack | `retro_nature_pack/` | **Natureza PS1** | ✅ USAR |
| Turtle | `pet_turtle_psx.glb` | **Tartaruga** (Mascote/Mob) | ⚠️ REVISAR |
| Fish | `fish_green.obj`, `fish_red.obj` | **Peixes** (Coletável) | ✅ USAR |
| Raven | `raven.blend` | **Corvo** (NPC/Animais) | ✅ USAR |

### 2.7 UI E EFEITOS

#### World of Claudecraft UI
| Categoria | Assets | Uso em Demons Whip |
|-----------|--------|-------------------|
| Item Icons | 825+ ícones em `public/ui/items/` | **Ícones de Itens** |
| Mob Icons | 232 ícones em `public/ui/mobs/` | **Ícones de Inimigos** |
| Weapon Icons | 86 ícones em `public/ui/weapons/` | **Ícones de Armas** |
| Class Icons | 11 ícones em `public/ui/classes/` | **Ícones de Classes** |
| Skill Icons | 11 ícones em `public/ui/skills/` | **Ícones de Habilidades** |
| Deed Icons | 273 ícones em `public/ui/deeds/` | **Conquistas** |
| Dungeon Icons | 16 ícones em `public/ui/dungeons/` | **Ícones de Dungeons** |
| Map Markers | 31 ícones em `public/ui/map-markers/` | **Marcadores de Mapa** |
| Emotes | 15 ícones em `public/ui/emotes/` | **Emotes** |

#### VFX e Efeitos
| Asset | Arquivo | Uso em Demons Whip | Status |
|-------|---------|-------------------|--------|
| Fire | `public/vfx/fire_01.png` | **Fogo** | ✅ USAR |
| Magic | `public/vfx/magic_01.png`, `magic_04.png` | **Magia** | ✅ USAR |
| Slash | `public/vfx/slash_02.png` | **Golpe** | ✅ USAR |
| Spark | `public/vfx/spark_04.png`, `spark_06.png` | **Faíscas** | ✅ USAR |
| Smoke | `public/vfx/smoke_05.png` | **Fumaça** | ✅ USAR |
| Light | `public/vfx/light_01.png`, `light_02.png` | **Luz** | ✅ USAR |
| Meteor | `public/vfx/fel_meteor_impact.png` | **Impacto** | ✅ USAR |
| Star | `public/vfx/star_07.png` | **Estrela** | ✅ USAR |
| Trace | `public/vfx/trace_05.png` | **Rastro** | ✅ USAR |
| Twirl | `public/vfx/twirl_01.png` | **Efeito Arcano** | ✅ USAR |

### 2.8 MOUNTS (MONTARIAS)

| Asset | Arquivo | Uso em Demons Whip | Status |
|-------|---------|-------------------|--------|
| Valorsteed | `mounts/valorsteed.glb` | **Warhorse** | ✅ USAR |
| Drake Raptor | `mounts/drakemaw_raptor.glb` | **Wyvern** | ✅ USAR |
| Bear | `mounts/grag_bear.glb` | **Dire Bear Mount** | ✅ USAR |
| Shadow Toad | `mounts/shadowjump_toad.glb` | **Giant Toad** | ✅ USAR |
| Snail | `mounts/stalkglider_snail.glb` | **Giant Snail** (Comedy) | ⚠️ REVISAR |
| Griffin | `mounts/stormfeather_griffin.glb` | **Griffin** | ✅ USAR |
| Ground Shaker | `mounts/terrorspark_groundshaker.glb` | **Mammoth** | ✅ USAR |
| Gobbler | `mounts/thunderstrut_gobbler.glb` | **Turkey** (Event) | ⚠️ REVISAR |
| Hover Cycle | `mounts/aether_hover_cycle.glb` | **Magic Chariot** | ⚠️ REVISAR |

---

## 3. SISTEMAS DO JOGO (Reutilizados do Claudecraft)

### 3.1 SISTEMAS A SEREM REINTRODUZIDOS

| Sistema | Arquivo Original | Adaptação para Demons Whip |
|---------|-----------------|---------------------------|
| Combat Core | `src/sim/combat/` | **Sistema Soulslike** (dodge, stamina, parry) |
| Classes | `src/sim/content/classes.ts` | **10 Classes** com builds diferentes |
| Items | `src/sim/content/items.ts` | **Gear System** (armas, armaduras, acessórios) |
| Quests | `src/sim/content/*.ts` | **NPCs e Quests** |
| Dungeons | `src/sim/content/dungeons.ts` | **Masmorras Instanciadas** |
| Professions | `src/sim/professions/` | **Crafting e Gathering** |
| PvP | `src/sim/pvp/` | **Arena PvP** |
| Market | `src/sim/market.ts` | **Player Market** |
| Mail | `src/sim/mail/` | **Sistema de Cartas** |
| Bank | `src/sim/bank.ts` | **Banco Pessoal** |
| Guild | `src/sim/guild_bank.ts` | **Guild System** |
| Mounts | `src/sim/mounts.ts` | **Montarias** |
| Pets | `src/sim/pet/` | **Companions** |
| Reliquary | `src/sim/reliquary.ts` | **Bestiário/Coleção** |
| Deeds | `src/sim/deeds.ts` | **Conquistas** |

### 3.2 SISTEMAS NOVOS PARA DEMONS WHIP

| Sistema | Descrição | Prioridade |
|---------|-----------|------------|
| **Stamina System** | Barra de stamina para ataques, esquiva e bloqueio | CRÍTICO |
| **Dodge Roll** | Esquiva com invincibility frames | CRÍTICO |
| **Parry System** | Defesa perfeita com riposta | ALTA |
| **Souls/Currency** | Sistema de moeda que é perdida na morte | CRÍTICO |
| **Bonfires** | Pontos de descanso e respawn | CRÍTICO |
| **Weapon Arts** | Habilidades especiais por arma | ALTA |
| **Armor Sets** | Sets com bônus de防especial | ALTA |
| **Covenants** | Facções com recompensas | MÉDIA |
| **Boss Souls** | Itens únicos de bosses para craftar armas | ALTA |
| **Hollowing** | Sistema de "morte" visual | MÉDIA |

---

## 4. CRUZAMENTO DE ASSETS - O QUE FALTA

### 4.1 ASSETS QUE PRECISAM SER CRIADOS/COMPRADOS

#### CRÍTICO (Precisa desde agora)
| Asset | Descrição | Motivo | Sugestão |
|-------|-----------|--------|----------|
| **Armors PSX** | 5-10 conjuntos de armadura low-poly | Claudecraft não tem visual PS1 para armaduras | Comprar pack de armaduras PS1 ou criar no Meshy AI |
| **Weapons PSX** | 15-20 armas com estilo PS1 | As atuais são muito "high fantasy" | Reestilizar existentes ou criar novas |
| **Shield PSX** | 5-10 escudos | Escudos atuais são genéricos | Criar packs de escudos góticos |
| **Player Animations** | Animações de morte, esquiva, parry | Claudecraft não tem essas animações | Criar ou comprar pack de animações |
| **Boss Arena** | 3-5 arenas de boss | Precisa de espaços para fights épicas | Criar com PSX Modular Medieval |
| **HUD Soulslike** | Interface estilo Dark Souls | Interface atual é MMO genérica | Redesenhar completamente |
| **Bonfire Model** | Modelo de fogueira/checkpoint | Não existe equivalente | Criar no Meshy AI |
| **Death Animation** | Animação de morte do jogador | Não existe | Criar |
| **Blood VFX** | Efeitos de sangue e impacto | VFX atuais são mágicos, não sangrentos | Criar ou comprar pack de VFX |

#### ALTA (Próxima fase)
| Asset | Descrição | Motivo | Sugestão |
|-------|-----------|--------|----------|
| **Undead Variants** | 5-10 variantes de mortos-vivos | Mobs atuais não são "undead" suficiente | Criar no Meshy AI |
| **Dark Knights** | 5-10 cavaleiros sombrios | Packs existentes são limitados | Usar darkknights pack + criar mais |
| **Demons** | 10-15 demônios variados | Packs de horror são genéricos | Complementar com Meshy AI |
| **Gothic Architecture** | Paredes, colunas, arcos góticos | PSX Modular Medieval é muito "medievalbright" | Criar assets góticos |
| **Fog/Darkness VFX** | Efeitos de névoa e escuridão | Não existem | Criar |
| **Torch/Light Props** | Tochas e fontes de luz | PSX Candle existe, mas precisa mais variedade | Criar pack de iluminação |
| **Boss Weapons** | 5-10 armas lendárias únicas | Claudecraft tem armas, mas não "boss weapons" | Criar designs únicos |
| **Armor Pieces** | Peças individuais (capacetes, luvas, etc) | Claudecraft tem sets completos, não peças | Criar sistema modular |

#### MÉDIA (Futuro)
| Asset | Descrição | Motivo | Sugestão |
|-------|-----------|--------|----------|
| **PvP Arena Maps** | 2-3 mapas de arena | Battleground atual é genérico | Criar arenas góticas |
| **Town Hub** | Cidade segura principal | Claudecraft tem, precisa rebrand | Adaptar existente |
| **Shop NPCs** | Vendedores variados | Existem no Claudecraft | Reestilizar |
| **Mounts PSX** | Montarias estilo PS1 | Montarias atuais são high-poly | Criar versões low-poly |
| **Pet Companions** | Companheiros de combate | Sistema existe, precisa de novos modelos | Criar demônios pequenos |
| **Fishing Spots** | Locais de pesca | Assets de peixe existem | Integrar |
| **Cooking Station** | Estação de cozinhar | Props existem | Reestilizar |
| **Blacksmith** | Ferraria para upgrades | Props existem | Reestilizar |

### 4.2 ASSETS QUE PODEM SER DIRETAMENTE REUTILIZADOS

#### ✅ PRONTOS PARA USO (100% compatíveis)
- **Todos os 90+ creatures do Claudecraft** → Rebrand para dark fantasy
- **Todos os 100+ weapons do Claudecraft** → Manter como base, criar variações PS1
- **Todos os 382 dungeon props** → Usar diretamente
- **Todos os 185 general props** → Usar diretamente
- **Todos os 206 biome assets** → Usar diretamente
- **Todos os VFX** → Adaptar para dark fantasy
- **Todos os ícones de UI** → Reutilizar com novos nomes
- **Sistema de crafting** → Adaptar receitas
- **Sistema de quests** → Reescrever narrativa
- **Sistema de dungeons** → Manter estrutura, mudar conteúdo

#### ⚠️ REquer ADAPTAÇÃO
- **Player Classes** → 9 classes → 10 classes (adicionar Berserker)
- **Mounts** → Remover mount sci-fi, manter fantasia
- **Town Layout** → Rebrand para cidade gótica
- **Music/SFX** → Criar trilha sombria

### 4.3 CONCEITO ART DISPONÍVEL

| Imagem | Arquivo | Uso |
|--------|---------|-----|
| Elden Ring PS1 Demake | `elden-ring-ps1-demake.jpg` | **Referência Visual Principal** |
| Elden Ring PS1 Trailer | `Elden-Ring-PS1-demake-trailer.avif` | **Referência de Estilo** |
| Elden Ring Cover | `3E6j6X.png` | **Arte Conceitual** |
| Character Reference | `-1645789044982.jpg.webp` | **Referência de Personagem** |
| Tree Monster | `olha que gente simpatica na arvore.jpg` | **Referência de Criatura** |
| Other Reference | `rUL7QG.png` | **Arte Conceitual** |
| Other Reference | `images.jpeg` | **Arte Conceitual** |

---

## 5. PLANO DE AÇÃO POR PRIORIDADE

### FASE 1 - CORE (Semanas 1-4)
1. **Migrar engine do Claudecraft** → Copiar base do jogo
2. **Implementar Stamina System** → Nova mecânica central
3. **Implementar Dodge Roll** → movement.ts
4. **Criar HUD Soulslike** → Redesenhar interface
5. **Rebrand de 3-5 classes** → Warrior→Vanguard, Mage→Sorcerer, etc.
6. **Criar Bonfire Model** → Primeiro asset novo
7. **Testar combate básico** → Game loop funcional

### FASE 2 - CONTENT (Semanas 5-8)
1. **Criar 5 bosses** → Usar assets de horror pack
2. **Criar 10 inimigos** → Rebrand de creatures existentes
3. **Criar 5 armas únicas** → Boss weapons
4. **Criar 3 masmorras** → Usar dungeon props
5. **Implementar Souls/Currency** → Sistema de morte
6. **Criar sistema de bonfires** → Checkpoints

### FASE 3 - POLISH (Semanas 9-12)
1. **Criar mais armaduras PS1** → Packs ou Meshy AI
2. **Adicionar mais bosses** → Usar horror packs
3. **Implementar PvP** → Arena system
4. **Criar town hub** → Cidade segura
5. **Adicionar crafting** → Professions adaptado
6. **平衡调整** → Tuning de classes e drops

### FASE 4 - LAUNCH (Semanas 13-16)
1. **Testes completos** → QA em todos os sistemas
2. **平衡 final** → Números finais
3. **Otimização** → Performance PS1
4. **Documentação** → Wiki e guides
5. **Deploy** → Lançamento

---

## 6. ESTIMATIVA DE ASSETS NECESSÁRIOS

### Para MVP (Mínimo Viável)
| Categoria | Quantidade | Fonte |
|-----------|------------|-------|
| Player Classes | 10 | Claudecraft (9) + 1 novo |
| Player Models | 10 | Claudecraft + PSX packs |
| Bosses | 5 | Horror packs + Meshy AI |
| Regular Mobs | 15 | Claudecraft + Horror packs |
| Weapons | 30 | Claudecraft (100+) |
| Armor Sets | 5 | **CRIAR** (pack PS1) |
| Shields | 5 | **CRIAR** ou adaptar |
| Dungeon Rooms | 20 | Claudecraft dungeon props |
| Town Props | 30 | PSX Modular Medieval |
| Nature Assets | 50 | Claudecraft biome + retro nature |
| VFX | 20 | Claudecraft VFX |
| UI Icons | 100 | Claudecraft UI |
| Sound Effects | 50 | **CRIAR** ou comprar |
| Music Tracks | 5 | **CRIAR** ou comprar |

### Para Lançamento Completo
| Categoria | Quantidade | Fonte |
|-----------|------------|-------|
| Player Classes | 10 | Claudecraft |
| Player Models | 10+ variações | Claudecraft + PSX packs |
| Bosses | 15-20 | Horror packs + Meshy AI |
| Regular Mobs | 40-50 | Claudecraft + Horror packs |
| Weapons | 100+ | Claudecraft |
| Armor Sets | 15-20 | **CRIAR** (packs PS1) |
| Shields | 10-15 | **CRIAR** |
| Dungeon Rooms | 100+ | Claudecraft dungeon props |
| Town Props | 100+ | PSX Modular Medieval |
| Nature Assets | 200+ | Claudecraft biome |
| VFX | 50+ | Claudecraft VFX |
| UI Icons | 500+ | Claudecraft UI |
| Sound Effects | 200+ | **CRIAR** |
| Music Tracks | 20+ | **CRIAR** |

---

## 7. CONCLUSÃO

### Assets Disponíveis: ~80% do necessário
O World of Claudecraft fornece uma base SÓLIDA com:
- Sistema de combate completo
- 90+ criaturas
- 100+ armas
- Sistema de crafting, quests, dungeons
- UI completa
- VFX variados

### O Que Falta Criar: ~20%
1. **Visual PS1** → Reestilizar assets existentes ou criar novos
2. **Animações Soulslike** → Dodge, parry, morte
3. **HUD Soulslike** → Interface completamente nova
4. **Boss Designs** → Usar horror packs como base
5. **Armaduras** → Criar packs PS1
6. **Áudio** → Músicas e efeitos sonoros sombrios

### Próximos Passos Imediatos
1. Criar diretório do projeto Demons Whip
2. Migrar base do Claudecraft
3. Implementar Stamina System
4. Criar HUD prototype
5. Rebrand das 3 classes principais

---

*Documento gerado em 16/08/2026*
*Baseado na análise completa dos assets disponíveis no projeto*
