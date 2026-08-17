# Demons Whip — Design do Catálogo Técnico e Visual de Assets

## Objetivo

Criar uma fonte única de verdade para todos os assets do rebrand Demons Whip antes de iniciar substituições, retarget de animações, redução de polígonos, normalização de texturas, escala, pivôs e licenças.

## Fontes auditadas

1. **Template:** `mgocbr3/world-of-claudecraft`, com foco em `public/` e seus modelos, texturas, UI, VFX, áudio e mídia de suporte.
2. **Assets novos:** `mgocbr3/PSX_demons_whip`, incluindo `00_Packs_Raw`, `01_Assets_Organizados`, `02_ConceptArt` e `Torment Textures`.

Cada registro preserva a origem e o caminho real. Arquivos duplicados aparecem no inventário, mas recebem o mesmo grupo SHA-256 para que a próxima etapa não repita trabalho.

## Unidade de catálogo

A unidade é o **arquivo de asset catalogável**. Modelos com texturas externas recebem uma ficha principal e a lista das texturas vinculadas; as texturas também aparecem como assets próprios. Arquivos `.blend` com vários objetos representam uma unidade técnica de cena/pack. Contêineres compilados são registrados como contêineres e não têm dados internos inventados.

## Metadados

### Comuns

ID, origem, repositório, pack/fonte, categoria, subcategoria, nome, caminho, formato, tamanho, SHA-256, duplicações, licença encontrada, status técnico, imagem e notas.

### Modelos 3D

Objetos, meshes, vértices, faces, triângulos, materiais, UVs, vertex colors, shape keys, dimensões, bounds, armatures, bones, skinned meshes, clips, duração, root-motion candidato, LODs, colliders, imagens/texturas vinculadas e ausências.

### Imagens e texturas

Resolução, formato, modo, canais, alpha, bit depth estimado, power-of-two, papel provável, frames, memória decodificada estimada e cores amostradas.

### Áudio e vídeo

Codec, duração, canais, layout, sample rate, bitrate, resolução, FPS e preview técnico.

### Fontes e contêineres

Família, subfamília, nome completo, glifos; ou quantidade de membros e tamanho descompactado quando o formato permite.

## Estados de precisão

- `OK`: campos principais extraídos e preview produzido.
- `PARTIAL`: parte dos campos depende de ferramenta ou fonte adicional.
- `UNSUPPORTED`: não há parser compatível no pipeline.
- `ERROR`: leitura/importação/renderização falhou.

Nenhum campo ausente será estimado como se fosse medido.

## Entregáveis

- Word e PDF mestre.
- Volumes detalhados separados por origem, categoria e tipo.
- CSV e JSON completos.
- Grupos duplicados.
- Itens parciais/não suportados.
- Matriz vazia para mapear template → asset novo.
- Auditoria de todas as páginas geradas.
- ZIP final para download.

## Estratégia de escala

O catálogo é dividido em volumes para evitar arquivos únicos de centenas de megabytes. Modelos usam uma ficha por página; assets 2D e mídia usam cartões compactos. Previews são reduzidos para documentação e não substituem os arquivos originais.

## Publicação

O gerador e os documentos ficam na branch `docs/full-asset-catalog-2026-08-17`. O workflow copia para o repositório todos os outputs abaixo do limite regular do GitHub e publica o pacote completo como artifact do GitHub Actions.

## Critérios de aceite

1. A soma dos assets dos volumes é igual à soma do inventário.
2. Todo asset tem preview real ou placeholder técnico explícito.
3. DOCX e PDF abrem sem corrupção.
4. Todas as páginas de todos os PDFs são renderizadas pela auditoria.
5. Nenhuma página é detectada como vazia.
6. O ZIP contém Word, PDF, CSV, JSON e QA.
7. Assets do template e novos nunca são misturados sem marcação de origem.
