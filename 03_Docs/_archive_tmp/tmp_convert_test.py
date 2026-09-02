import subprocess
from pathlib import Path
path=Path(r'C:\Users\PCSP\Documents\doc\PSX_demons_whip\01_Assets_Organizados\Enemies\goblin.glb')
out=Path(r'C:\Users\PCSP\Documents\doc\PSX_demons_whip\03_Docs\Previews_Entity_Map\tmp_test_copy.glb')
cmd=['npx','--yes','@gltf-transform/cli@latest','copy',str(path),str(out)]
res=subprocess.run(cmd,capture_output=True,text=True)
print('code',res.returncode)
print('out',res.stdout)
print('err',res.stderr)
