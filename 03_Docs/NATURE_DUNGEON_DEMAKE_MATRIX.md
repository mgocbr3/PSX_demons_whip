# Matriz Demake PS1 -- Nature / Dungeon / Terreno / Agua

Objetivo: reaproveitar maximo, reduzir textura e unificar para PSX sem recriar tudo.

## Classificacao A/B/C

### A) Manter com demake leve (70% -- ja bom, so reduzir)
Aplicar: resize 256px, remover normal map, roughness 0.85, paleta da zona, sem re-modelar

Nature A:
- pine_1..5, oak_1..5, dead_1..3, twisted_1..3 (todas arvores base)
- rock_1..3, cave_rocks_a/b, desert_boulder_1/2, desert_rock_formation_1..3
- bush, bush_flowers, fern, mushroom
- beach_rock_sand_a/b/c, beach_rocks_1/2

Dungeon/Props A:
- kcas_wall, kcas_wall_half, kcas_wall_corner, kcas_pillar, kcas_column, kcas_floor_large
- arch, arch_gate, banner_blue/brown/green (paleta unica), cave_pillar, cave_platform
- hex_tile_grass/road/water, hex_wall, hex_tower (hex kit inteiro)

### B) Remix total PSX (20% -- forma ok, textura errada)
Aplicar: re-atlas + re-bake na paleta mestra, possivel decimate leve, manter forma

- low_poly_trees_flowers_and_grass.glb -> remix para floresta morta
- psx_dead_tree_pack.glb -> referencia, levar outros para ele
- hex_castle, hex_church, hex_tavern (hex buildings coloridos -> dessaturar)
- beach_palm_1..3, beach_ship, desert_cactus_* (vegetacao saturada -> dessaturar)
- city_vine_1/2, city_arch (city kit limpo -> sujar)

### C) Recriar ou substituir via Meshy AI + Blender (10% -- fora de linguagem)
- sea_* (peixes, shark, whale, dolphin) -- nao combina com dark fantasy
- hex_ship_blue/green/red, hex_trough, hex_windmill (muito cartoon)
- Individual_Assets com plastico/HD -- gerar substituto PSX na mesma silhueta

## Agua / Terreno
- Texturas water/terrain em 01_Assets_Organizados/Textures/textures/terrain|water -- reduzir para 256, paleta pantano para pantano, areia para deserto
- Tiles hex_tile_water -- manter geometria, trocar textura para escura com dithering
- Transicao entre zonas: faixa de 2 tiles com mistura de paleta, nunca corte seco

## Ordem de ataque (sem datas)
1. A) batch Nature + Dungeon base (maior ganho visual com menor risco)
2. B) remix hex/beach
3. C) criar substitutos marinhos/cartoon via Meshy

Critério AAA: lado a lado, A/B/C devem parecer produzidos juntos. Se destoar, volta para Blender.
