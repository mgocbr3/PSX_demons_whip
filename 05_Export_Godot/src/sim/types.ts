export type ClassId = "vanguard"|"paladin"|"sorcerer"|"assassin"|"hunter"|"cleric"|"inquisitor"|"necromancer"|"occultist"|"berserker";
export const CLASSES: Record<ClassId, { name:string, display:string, hp:number, dmg:number, color:number, desc:string, lore:string }> = {
  vanguard:   { name:"Vanguard",   display:"Vanguard (Warrior)",   hp:140, dmg:14, color:0x8b3a2a, desc:"Tanque de linha de frente. Whip pesado, stagger forte.", lore:"Marcado na primeira quebra de The Whip, jurou guardar as cinzas." },
  paladin:    { name:"Paladin",    display:"Paladin (Knight)",     hp:130, dmg:13, color:0xc9a86a, desc:"Holy warrior. Escudo + whip abençoado.", lore:"Cavaleiro da Cathedral of the Fallen, luz quente contra o frio." },
  sorcerer:   { name:"Sorcerer",   display:"Sorcerer (Mage)",      hp:80,  dmg:18, color:0x6a3aff, desc:"Arcano de longo alcance. VFX magic_01.", lore:"Estudou os Scars violetas de Veiled Hollow. Magia instável." },
  assassin:   { name:"Assassin",   display:"Assassin (Rogue)",     hp:90,  dmg:20, color:0x2a2a2a, desc:"Velocidade + crit. Hit-pause curto.", lore:"Caçador de sigilos, corta gargantas e selos." },
  hunter:     { name:"Hunter",     display:"Hunter (Ranger)",      hp:100, dmg:16, color:0x2f6b2f, desc:"Arqueiro. Usa bow_anims.", lore:"Rastreia o Wendigo em Thornpeak Gallows há invernos." },
  cleric:     { name:"Cleric",     display:"Cleric (Druid)",       hp:110, dmg:12, color:0x6abf6a, desc:"Suporte + cura. Druid rebrand.", lore:"Curandeira do apothecary, lily de sangue e fé." },
  inquisitor: { name:"Inquisitor", display:"Inquisitor (Paladin)", hp:125, dmg:15, color:0x7a1a1a, desc:"Holy melee anti-demon.", lore:"Queima hereges e demônios sem distinção. Ferro enferrujado." },
  necromancer:{ name:"Necromancer",display:"Necromancer (Warlock)",hp:85,  dmg:17, color:0x1a3a3a, desc:"Dark magic, pets sombrios.", lore:"Pacto com o Pit Lord, alma por poder. Voz do abismo." },
  occultist:  { name:"Occultist",  display:"Occultist (Shaman)",   hp:95,  dmg:16, color:0x6b2a5a, desc:"Blood magic, DoT.", lore:"Sangue é moeda em Drowned Mire. Ele paga." },
  berserker:  { name:"Berserker",  display:"Berserker (Barbarian)",hp:150, dmg:16, color:0x8b1a1a, desc:"Rage, hp alto, dano médio.", lore:"Barbaro do Frostveil Wastes, pele marcada pelo frio." },
};

export type EnemyId = "dreg"|"gnoll"|"wraith"|"golem"|"cave_crab"|"fungal_zombie"|"wildman"|"minotaur"|"corpse_hound"|"broodmother"|"plague_priest"|"blood_phantom";
export const ENEMIES: Record<EnemyId, { hp:number, dmg:number, color:number, scale:number, zone:string }> = {
  dreg: { hp:30, dmg:6, color:0x4a3a2a, scale:0.9, zone:"vale_of_cinders" },
  gnoll: { hp:45, dmg:8, color:0x5a4a2a, scale:1.0, zone:"vale_of_cinders" },
  wraith: { hp:25, dmg:10, color:0x8a9aaa, scale:1.1, zone:"veiled_hollow" },
  golem: { hp:120, dmg:14, color:0x6a6a6a, scale:1.4, zone:"cinder_drakelands" },
  cave_crab: { hp:35, dmg:7, color:0x6a2a1a, scale:0.9, zone:"forsaken_shore" },
  fungal_zombie: { hp:40, dmg:7, color:0x3a5a2a, scale:1.0, zone:"drowned_mire" },
  wildman: { hp:50, dmg:9, color:0x5a3a1a, scale:1.05, zone:"thornpeak_gallows" },
  minotaur: { hp:90, dmg:13, color:0x4a2a2a, scale:1.25, zone:"vale_of_cinders" },
  corpse_hound: { hp:32, dmg:7, color:0x2a241e, scale:0.92, zone:"vale_of_cinders" },
  broodmother: { hp:65, dmg:11, color:0x3a2a1a, scale:1.15, zone:"drowned_mire" },
  plague_priest: { hp:55, dmg:12, color:0x2a3a2a, scale:1.0, zone:"drowned_mire" },
  blood_phantom: { hp:48, dmg:13, color:0x6a151c, scale:1.08, zone:"cinder_drakelands" },
};

// --- ZONES GDD 6.4 ---
export type ZoneId = "vale_of_cinders"|"drowned_mire"|"thornpeak_gallows"|"forsaken_shore"|"veiled_hollow"|"cinder_drakelands"|"frostveil_wastes";
export const ZONES: Record<ZoneId, { display:string, dir:string, palette:string[], fogColor:number, ground:number, sky:string, boss:string }> = {
  vale_of_cinders: { display:"Vale of Cinders", dir:"Vale inicial, vilarejos decadentes e cemitérios", palette:["#5A534A","#7B382A","#C1B394"], fogColor:0x1a1210, ground:0x3a2416, sky:"cinza ferrugem âmbar", boss:"The Executioner" },
  drowned_mire:    { display:"The Drowned Mire", dir:"Pântano, doença, água negra e casas sobre estacas", palette:["#6A7443","#282523","#7E8C9E"], fogColor:0x0f1a14, ground:0x1a2a1a, sky:"verde doente carvão lua fria", boss:"Swamp Titan" },
  thornpeak_gallows:{ display:"Thornpeak Gallows", dir:"Montanhas, neve suja e fortalezas abandonadas", palette:["#C1B394","#282523","#6A151C"], fogColor:0x1a1e26, ground:0xd0c8b8, sky:"branco gasto chumbo vinho", boss:"The Wendigo" },
  forsaken_shore:  { display:"The Forsaken Shore", dir:"Costa, naufrágios, torres e mar contaminado", palette:["#7E8C9E","#5A534A","#9B7A43"], fogColor:0x121a24, ground:0x6a6a6a, sky:"azul morto areia cinza cobre", boss:"The Cyclops" },
  veiled_hollow:   { display:"The Veiled Hollow", dir:"Ruínas ocultas e presença cósmica", palette:["#3B2C49","#5A534A","#7E8C9E"], fogColor:0x1a1224, ground:0x28223a, sky:"violeta profundo cinza ciano pálido", boss:"Eldritch Horror" },
  cinder_drakelands:{ display:"The Cinder Drakelands", dir:"Cinzas, ossos de dragão e cultos", palette:["#141313","#D07832","#C1B394"], fogColor:0x1a0f0a, ground:0x1a0f0a, sky:"preto laranja queimado osso", boss:"Pit Lord" },
  frostveil_wastes:{ display:"Frostveil Wastes", dir:"Vila congelada, cavernas e mortos preservados", palette:["#7E8C9E","#5A534A","#6A7443"], fogColor:0x1e2a3a, ground:0xe8e0d0, sky:"azul frio cinza verde pálido", boss:"Flesh Golem" },
};

// --- BOSSES GDD 7.2 ---
export type BossId = "aberration"|"eldritch_horror"|"pit_lord"|"titan"|"swamp_titan"|"executioner"|"blood_phantom_boss"|"wendigo"|"cyclops"|"flesh_golem";
export const BOSSES: Record<BossId, { name:string, zone:ZoneId, hp:number, color:number, scale:number, lore:string, telegraph:string }> = {
  aberration: { name:"The Aberration", zone:"vale_of_cinders", hp:340, color:0x4a2a2a, scale:1.9, lore:"Carne costurada, ferragens e olhos cegos. Primeiro horror.", telegraph:"slam frontal + adds" },
  eldritch_horror: { name:"Eldritch Horror", zone:"veiled_hollow", hp:420, color:0x3B2C49, scale:2.1, lore:"Sombra violeta e luz pálida, teleporte.", telegraph:"zonas persistentes + projeteis" },
  pit_lord: { name:"Pit Lord", zone:"cinder_drakelands", hp:520, color:0x7B382A, scale:2.3, lore:"Armadura queimada e chifres, senhor do fogo.", telegraph:"charge cone meteor lava" },
  titan: { name:"The Titan", zone:"vale_of_cinders", hp:480, color:0x5A534A, scale:2.4, lore:"Massa monumental e correntes.", telegraph:"shockwave queda de pedras" },
  swamp_titan: { name:"Swamp Titan", zone:"drowned_mire", hp:460, color:0x6A7443, scale:2.2, lore:"Musgo, fungos e gás verde.", telegraph:"poison pools summon stomp" },
  executioner: { name:"The Executioner", zone:"vale_of_cinders", hp:280, color:0x282523, scale:1.7, lore:"Capuz, cutelo e ferro enferrujado. Tutorial boss.", telegraph:"cleave hook execute" },
  blood_phantom_boss: { name:"Blood Phantom", zone:"cinder_drakelands", hp:360, color:0x6A151C, scale:1.8, lore:"Vermelho escuro e silhueta espectral.", telegraph:"dash clones bleed" },
  wendigo: { name:"The Wendigo", zone:"thornpeak_gallows", hp:400, color:0x8a7a5a, scale:2.0, lore:"Galhadas, ossos e pelo congelado.", telegraph:"leap fear stalk" },
  cyclops: { name:"The Cyclops", zone:"forsaken_shore", hp:440, color:0x5A6A43, scale:2.2, lore:"Pele doente, cordas e âncora.", telegraph:"boulder stomp charge" },
  flesh_golem: { name:"Flesh Golem", zone:"frostveil_wastes", hp:500, color:0x6a3a3a, scale:2.3, lore:"Carne, grampos e peças de armadura.", telegraph:"grab enrage burst" },
};

// --- ITEMS / WEAPONS (sim) ---
export type ItemId = string;
export interface Item { id: ItemId, name:string, slot:"weapon"|"armor"|"accessory"|"consumable", dmg?:number, def?:number, rarity:"common"|"rare"|"epic"|"legendary", desc:string }

export const WEAPONS: Item[] = [
  { id:"infernal_blade", name:"Infernal Blade", slot:"weapon", dmg:22, rarity:"epic", desc:"Sword do pack demonico, lâmina do abismo." },
  { id:"hellcleaver", name:"Hellcleaver", slot:"weapon", dmg:26, rarity:"epic", desc:"Machado demoníaco, corta alma." },
  { id:"reapers_scythe", name:"Reaper's Scythe", slot:"weapon", dmg:24, rarity:"epic", desc:"Foice do coletor." },
  { id:"moonlight_greatsword", name:"Moonlight Greatsword", slot:"weapon", dmg:34, rarity:"legendary", desc:"Lendária. Luz pálida, referência PS1." },
  { id:"short_sword", name:"Vanguard Short Sword", slot:"weapon", dmg:14, rarity:"common", desc:"Starting sword PSX 256px." },
  { id:"emberfang", name:"Emberfang", slot:"weapon", dmg:28, rarity:"rare", desc:"Cinderbrand family." },
  { id:"skeleton_blade", name:"Bone Sword", slot:"weapon", dmg:16, rarity:"common", desc:"Skeleton blade rebrand." },
  { id:"pilgrim_staff", name:"Pilgrim Staff", slot:"weapon", dmg:18, rarity:"rare", desc:"Holy staff, brilho âmbar." },
];

export type Vec2 = { x:number, z:number };
export function dist(a:Vec2,b:Vec2){ const dx=a.x-b.x, dz=a.z-b.z; return Math.hypot(dx,dz); }
