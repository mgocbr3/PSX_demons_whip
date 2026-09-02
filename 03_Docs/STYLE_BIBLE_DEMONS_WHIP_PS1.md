# Style Bible -- Demons Whip PS1 Dark Fantasy (v1.0)

Objetivo: fazer todo asset parecer produzido pelo mesmo estudio, no mesmo ano, para o mesmo jogo PS1. Nenhum pack entra cru.
Regra de ouro: todo GLB passa por Blender + export limpo. Meshy AI pode gerar base, mas normalizacao e obrigatoria.

## 1. Direcao Visual Unica
- Referencia: Elden Ring PS1 demake + Torment Textures (Quake palette) + PSX Horror-Fantasy Megapack como teto
- Silhueta: leitura a 3 metros > detalhe de perto. Evitar micro-detalhe, priorizar forma grande
- Desgaste: pedra lascada, metal oxidado, madeira apodrecida, carne rasgada. Nada plastico/liso
- Proporcao: maos e armas 10-15% maiores para leitura em camera isometrica

## 2. Paleta Mestra (subpaletas por zona)
- Mestra: Quake/Torment (dessaturados, amarelos sujos, vermelhos sangue seco, verdes pantano)
- Zona Catedral/Ruina: cinza pedra + ocre + vermelho desbotado
- Zona Pantano/Floresta Morta: verde musgo escuro + marrom podre + nevoa acinzentada
- Zona Deserto/Osso: areia queimada + osso amarelado + sombra roxa
- Zona Abismo: preto/vermelho queimado + emissao minima laranja
- Regra: 1 asset usa no maximo 1 subpaleta. Nunca arco-iris.

## 3. Materiais (max 2 por asset)
- Permitidos: stone, wood_old, metal_rusted, flesh, cloth_heavy
- Proibidos no MVP: metal espelhado, plastico, vidro limpo, emissao forte
- Shader baseline: Roughness 0.7-1.0, Specular 0.15-0.3, Normal map leve ou ausente
- Textura: 256px props, 512px players/bosses, 128px foliage pequeno. Atlas por familia

## 4. Geometria PS1
- Teto por categoria: Player 1800-2500 tris, Mob 800-1500, Boss 2500-4000, Prop 150-600, Arvore 300-800, Pedra 80-200
- Regras: quads triangulados, sem ngon, manter silhueta com 50% dos tris
- Pivots: pe no chao (0,0,0), forward -Z, up Y, scale 1,1,1 aplicado
- Nomes: snake_case, sem acento

## 5. Passo Blender Obrigatorio
- [ ] Apply All Transforms, origem no pe
- [ ] Limpar armature, nomes ossos = Rig_Medium quando humanoide
- [ ] Decimate mantendo silhueta
- [ ] Unificar materiais para 1-2, bake/atlas na paleta da zona
- [ ] Checar normais/UV
- [ ] Export GLB 2.0 sem Draco no MVP

## 6. VFX e Audio
- VFX base: circle_05, slash_02, fire_01 -- usar como base
- Audio: loudness normalizado, sem SFX cartoon

## 7. O que reprova no QA AAA
Mistura de paletas, material plastico, tris acima do teto, pivo flutuando, textura HD destoando, nome fora do padrao
