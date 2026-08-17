# Demons Whip Asset Catalog Generator

Gera um inventário técnico e visual completo cruzando:

- `mgocbr3/world-of-claudecraft` — assets do template;
- `mgocbr3/PSX_demons_whip` — packs brutos, assets organizados, concept art e texturas novas.

## Saídas

- Word e PDF mestre;
- volumes detalhados com imagem e ficha de cada asset;
- inventário CSV/JSON;
- grupos duplicados por SHA-256;
- matriz vazia de substituição/normalização;
- relatório de itens parciais ou não suportados;
- ZIP de entrega.

## Execução local

```bash
python tools/asset_catalog/generate_catalog.py \
  --demons-root /path/PSX_demons_whip \
  --template-root /path/world-of-claudecraft \
  --output-dir /tmp/demons-whip-catalog \
  --repository-output-dir 03_Docs/Asset_Catalog \
  --delivery-zip /tmp/Demons_Whip_Asset_Catalog_FULL.zip
```

Dependências externas: Blender, LibreOffice, FFmpeg/FFprobe e fontes DejaVu.

## Política de precisão

O gerador não inventa dados. Formatos compilados ou sem parser recebem status `PARTIAL`, `UNSUPPORTED` ou `ERROR`, com nota explícita. A licença é apenas detectada documentalmente e ainda exige revisão jurídica.
