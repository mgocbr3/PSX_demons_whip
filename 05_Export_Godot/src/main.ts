// @ts-nocheck
import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CLASSES, ENEMIES, BOSSES, WEAPONS, ZONES, type ClassId, type EnemyId, type ZoneId, type BossId } from "./sim/types";
import { PlayerSim, EnemySim, BossSim, BonfireSim, QuestSim } from "./sim/entities";
import { createPSXMaterial, createGroundForZone, telegraphRing } from "./render_psx";
import { audio } from "./audio";
import { pixlland } from "./platform/pixlland";

// --- bootstrap ---
const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const loadingEl = document.getElementById("loading")!;
const loadingFill = document.getElementById("loading-fill") as HTMLElement;
const charSelect = document.getElementById("char-select")!;
const classGrid = document.getElementById("class-grid")!;
const classDesc = document.getElementById("class-desc")!;
const enterBtn = document.getElementById("enter-world-btn") as HTMLButtonElement;
const hpFill = document.getElementById("hp-fill") as HTMLElement;
const hpText = document.getElementById("hp-text") as HTMLElement;
const staminaFill = document.getElementById("stamina-fill") as HTMLElement;
const staminaText = document.getElementById("stamina-text") as HTMLElement;
const xpFill = document.getElementById("xp-fill") as HTMLElement;
const hudFps = document.getElementById("hud-fps") as HTMLElement;
const hudZone = document.getElementById("hud-zone") as HTMLElement;
const zonePill = document.getElementById("zone-pill") as HTMLElement;
const centerMsg = document.getElementById("center-msg") as HTMLElement;
const deathScreen = document.getElementById("death-screen") as HTMLElement;
const respawnBtn = document.getElementById("respawn-btn") as HTMLElement;
const chatLog = document.getElementById("chat-log") as HTMLElement;
const questTracker = document.getElementById("quest-tracker") as HTMLElement;
const invGrid = document.getElementById("inv-grid") as HTMLElement;
const bossBar = document.getElementById("boss-bar") as HTMLElement;
const bossFill = document.getElementById("boss-fill") as HTMLElement;
const bossLabel = document.getElementById("boss-label") as HTMLElement;
const bonfireHint = document.getElementById("bonfire-hint") as HTMLElement;
const deedPopup = document.getElementById("deed-popup") as HTMLElement;
const minimapCoords = document.getElementById("minimap-coords") as HTMLElement;
const hudLvl = document.getElementById("hud-lvl") as HTMLElement;
const hudSouls = document.getElementById("hud-souls") as HTMLElement;
const hudEquip = document.getElementById("hud-equip") as HTMLElement;
const zoneSelectEl = document.getElementById("zone-select") as HTMLElement;
const zoneListEl = document.getElementById("zone-list") as HTMLElement;

let selectedClass: ClassId | null = null;
let playerSim: PlayerSim | null = null;
let questSim = new QuestSim();
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let playerMesh: THREE.Group;
let mountGroup: THREE.Group | null = null;
let ground: THREE.Mesh;
let enemies: any[] = [];
let bosses: any[] = [];
let bonfires: any[] = [];
let keys = new Set<string>();
let yaw=-0.4, pitch=0.35;
let lastAttack=0, isDodging=false, dodgeUntil=0;
let lowResTarget: THREE.WebGLRenderTarget;
let quadScene: THREE.Scene, quadCam: THREE.OrthographicCamera, quad: THREE.Mesh;
let currentZone: ZoneId = "vale_of_cinders";
let decorations: THREE.Group[] = [];
let audioEnabled=true;

// --- Character grid ---
(Object.keys(CLASSES) as ClassId[]).forEach(id=>{
  const c=CLASSES[id];
  const div=document.createElement("div");
  div.className="class-card";
  div.innerHTML=`<h3>${c.name}</h3><p>${c.desc}</p><div class="meta">ID: ${id} • HP ${c.hp} • DMG ${c.dmg} • ${c.display}</div><div style="font-size:9px; opacity:.5; margin-top:4px; font-style:italic">${c.lore}</div>`;
  div.onclick=()=>{
    document.querySelectorAll(".class-card").forEach(e=>e.classList.remove("selected"));
    div.classList.add("selected");
    selectedClass=id;
    classDesc.innerHTML=`<b>${c.display}</b> — ${c.desc}<br><small style="opacity:.7">${c.lore}</small><br><small style="opacity:.5">Cor PSX #${c.color.toString(16).padStart(6,"0")} • Rig Medium humanoide reaproveitado • Mesh: 2.5k tris target</small>`;
    enterBtn.disabled=false;
  };
  classGrid.appendChild(div);
});

// build zone selector
(Object.keys(ZONES) as ZoneId[]).forEach(z=>{
  const btn=document.createElement("button");
  btn.textContent = `${ZONES[z].display} — ${ZONES[z].boss}`;
  btn.onclick=()=> switchZone(z);
  zoneListEl.appendChild(btn);
});

// fake loading + pixlland init
let p=0; const t=setInterval(()=>{ p+=Math.random()*18; if(p>=100){ p=100; clearInterval(t); loadingFill.style.width=p+"%"; setTimeout(()=> loadingEl.classList.add("hidden"), 300);} loadingFill.style.width=p+"%"; }, 80);
pixlland.init({ appId:"demons-whip-psx", testMode:true });
audio.init();

enterBtn.onclick=()=>{ if(!selectedClass) return; charSelect.classList.add("hidden"); startGame(selectedClass!); };
respawnBtn.onclick=()=>{ playerSim?.respawn(); deathScreen.classList.add("hidden"); updateHUD(); showMsg("Respawned at Bonfire — Vale of Cinders", 1400); audio.sfx("respawn"); };

function logChat(text:string, kind:"system"|"quest"|"combat"|"loot"="system"){
  const div=document.createElement("div");
  const col = kind==="quest"? "#ffb86a" : kind==="combat"? "#ff6a6a" : kind==="loot"? "#6abf6a" : "#8a9aaa";
  div.innerHTML=`<span style="color:${col}">[${kind.toUpperCase()}]</span> ${text}`;
  chatLog.appendChild(div);
  chatLog.scrollTop=chatLog.scrollHeight;
  if(chatLog.children.length>60) chatLog.removeChild(chatLog.children[0]);
}

function showMsg(text:string, ms=1600){
  centerMsg.textContent=text; centerMsg.classList.remove("hidden");
  setTimeout(()=> centerMsg.classList.add("hidden"), ms);
}
function showDeed(text:string){
  deedPopup.textContent=`† DEED: ${text}`;
  deedPopup.classList.remove("hidden");
  setTimeout(()=> deedPopup.classList.add("hidden"), 2500);
  logChat(text,"quest");
}

function startGame(classId: ClassId){
  playerSim = new PlayerSim(classId);
  // starter inventory per GDD: 3 weapons
  WEAPONS.slice(0,4).forEach(w=> playerSim!.addItem(w));
  playerSim.equip(WEAPONS[0]);
  initThree(classId);
  spawnWorld();
  updateHUD(); updateQuestTracker(); updateInvGrid();
  showMsg(`Bem-vindo, ${CLASSES[classId].name} — The Whipbound`, 2200);
  logChat(`Whipbound ${CLASSES[classId].name} entrou em ${ZONES[currentZone].display}. The Whip está quebrado.`, "system");
  logChat(`Fale com o Warden em Vale e acenda a fogueira.`, "quest");
  logChat(`Use [Z] para viajar entre os 7 Scars. IDs preservados.`, "system");
  audio.playMusic("vale");
  pixlland.track("session_start",{ classId, zone: currentZone });
  animate();
}

// --- Three ---
function initThree(classId: ClassId){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0605);
  updateZoneFog(currentZone);

  camera = new THREE.PerspectiveCamera(58, innerWidth/innerHeight, 0.1, 200);
  camera.position.set(6,5,9);

  renderer = new THREE.WebGLRenderer({ canvas, antialias:false, powerPreference:"high-performance" });
  renderer.setPixelRatio(1);
  const w=320, h=240;
  lowResTarget = new THREE.WebGLRenderTarget(w,h, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
  quadScene = new THREE.Scene();
  quadCam = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  const quadGeo = new THREE.PlaneGeometry(2,2);
  const quadMat = new THREE.ShaderMaterial({
    uniforms: { tDiffuse:{value: lowResTarget.texture}, uDither: { value: 0.03 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.); }`,
    fragmentShader: `
      uniform sampler2D tDiffuse; varying vec2 vUv; uniform float uDither;
      float dither(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453) * uDither; }
      void main(){
        vec3 c = texture2D(tDiffuse, vUv).rgb;
        c += dither(vUv*320.0) - 0.015;
        c = floor(c*16.0)/16.0;
        gl_FragColor = vec4(c,1.);
      }
    `
  });
  quad = new THREE.Mesh(quadGeo, quadMat);
  quadScene.add(quad);

  const amb = new THREE.HemisphereLight(0xffd8a0, 0x1a1210, 0.7);
  scene.add(amb);
  const dir = new THREE.DirectionalLight(0xffb86a, 1.1);
  dir.position.set(8,12,6);
  scene.add(dir);
  const rim = new THREE.PointLight(0x6abfff, 0.6, 30);
  rim.position.set(-6,3,-8);
  scene.add(rim);

  rebuildGround();

  playerMesh = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 1.0, 4, 8), createPSXMaterial(CLASSES[classId].color, { roughness:0.85 }));
  body.position.y=0.95;
  playerMesh.add(body);
  const whip = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.02,1.4,6), createPSXMaterial(0x1a0f0a));
  whip.position.set(0.45,1.0,0.2); whip.rotation.z=Math.PI/7; whip.name="whip";
  playerMesh.add(whip);
  const cape = new THREE.Mesh(new THREE.PlaneGeometry(0.7,0.9), createPSXMaterial(0x1a1210));
  cape.position.set(0,1.0,-0.38); cape.rotation.x=0.3;
  playerMesh.add(cape);
  playerMesh.position.set(0,0,0);
  scene.add(playerMesh);

  const loader = new GLTFLoader();
  const candidate = `/assets/characters/${classId}.glb`;
  loader.load(candidate, (gltf:any)=>{
    const m = gltf.scene;
    m.traverse((o:any)=>{ if(o.isMesh){ o.material = createPSXMaterial(CLASSES[classId].color); }});
    m.scale.setScalar(1.0);
    playerMesh.clear(); playerMesh.add(m);
    showMsg(`GLB carregado: ${classId}.glb (PSX normalizado)`, 1200);
  }, undefined, ()=>{});

  rebuildDecorations();

  addEventListener("resize", onResize);
  onResize();

  addEventListener("keydown", e=>{
    const k=e.key.toLowerCase();
    keys.add(k);
    if(k==="m") toggleMount();
    if(e.key===" " || k==="2") doDodge();
    if(k==="1" || e.key==="1") doAttack();
    if(k==="e") tryBonfire();
    if(k==="z") zoneSelectEl.classList.toggle("hidden");
    if(k==="i") document.getElementById("panel-inv")!.classList.toggle("hidden");
    if(k==="b") tryOpenPixllandReward();
    if(k==="r" && playerSim?.isDead) { playerSim.respawn(); deathScreen.classList.add("hidden"); updateHUD(); logChat("Respawned at bonfire", "system"); }
  });
  addEventListener("keyup", e=> keys.delete(e.key.toLowerCase()));
  canvas.addEventListener("mousedown", ()=>{ doAttack(); });
  canvas.addEventListener("mousemove", (e)=>{
    if(e.buttons===2 || e.buttons===1){ yaw -= e.movementX*0.004; pitch = Math.max(0.15, Math.min(1.1, pitch - e.movementY*0.004)); }
  });
  canvas.addEventListener("contextmenu", e=> e.preventDefault());
  let lastTouchX=0;
  canvas.addEventListener("touchstart", e=>{ lastTouchX=e.touches[0].clientX; doAttack(); }, {passive:true});
  canvas.addEventListener("touchmove", e=>{ const dx=e.touches[0].clientX-lastTouchX; yaw -= dx*0.008; lastTouchX=e.touches[0].clientX; }, {passive:true});
  canvas.addEventListener("wheel", e=>{ pitch = Math.max(0.15, Math.min(1.1, pitch + Math.sign(e.deltaY)*0.06)); }, {passive:true});

  document.getElementById("btn-inv")!.onclick=()=> document.getElementById("panel-inv")!.classList.toggle("hidden");
  document.getElementById("btn-map")!.onclick=()=> zoneSelectEl.classList.toggle("hidden");
  document.getElementById("btn-audio")!.onclick=()=>{ audioEnabled=!audioEnabled; audio.setEnabled(audioEnabled); showMsg(audioEnabled?"Audio ON":"Audio muted", 900); };
  document.getElementById("btn-ad")!.onclick=()=> tryOpenPixllandReward();
}

function updateZoneFog(z:ZoneId){
  const f = ZONES[z].fogColor;
  scene.fog = new THREE.Fog(f, 18, z==="veiled_hollow"? 48 : 58);
  (scene.background as THREE.Color).setHex( z==="frostveil_wastes"? 0x1e2a3a : z==="drowned_mire"? 0x0f1a14 : z==="cinder_drakelands"? 0x1a0f0a : 0x0a0605 );
}

function rebuildGround(){
  if(ground) scene.remove(ground);
  ground = createGroundForZone(ZONES[currentZone].ground);
  scene.add(ground);
}

function rebuildDecorations(){
  decorations.forEach(d=> scene.remove(d));
  decorations=[];
  // pedras demake PSX per NATURE_DUNGEON_DEMAKE_MATRIX A
  const stoneMat = createPSXMaterial(currentZone==="drowned_mire"? 0x2a3a2a : currentZone==="frostveil_wastes"? 0xc0c0c0 : currentZone==="cinder_drakelands"? 0x1a0f0a : 0x6a6a6a);
  for(let i=0;i<18;i++){
    const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5+Math.random()*0.6, 0), stoneMat);
    const a = Math.random()*Math.PI*2, r= 5+Math.random()*18;
    s.position.set(Math.cos(a)*r, 0.35, Math.sin(a)*r);
    s.rotation.set(Math.random(), Math.random(), Math.random());
    s.scale.set(0.8+Math.random()*0.6, 0.6+Math.random()*0.5, 0.8+Math.random()*0.6);
    scene.add(s); decorations.push(s as any);
  }
  // arvores por bioma
  const leafCol = currentZone==="drowned_mire"? 0x2a4a2a : currentZone==="frostveil_wastes"? 0xe0e0e0 : currentZone==="veiled_hollow"? 0x3B2C49 : currentZone==="cinder_drakelands"? 0x4a1a0a : 0x2f4a2a;
  for(let i=0;i<10;i++){
    const g=new THREE.Group();
    const dead = currentZone==="drowned_mire" || currentZone==="cinder_drakelands";
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.22, dead?1.1:1.6,6), createPSXMaterial(dead?0x1a0f0a:0x3a2416));
    trunk.position.y=dead?0.55:0.8;
    const leaves=new THREE.Mesh(new THREE.IcosahedronGeometry(dead?0.45:0.9,0), createPSXMaterial(leafCol));
    leaves.position.y=dead?1.2:2.1;
    if(dead) (leaves.material as any).transparent=true;
    g.add(trunk, leaves);
    const a=Math.random()*Math.PI*2, r=7+Math.random()*16;
    g.position.set(Math.cos(a)*r, 0, Math.sin(a)*r);
    scene.add(g); decorations.push(g);
  }
  // banners góticos
  for(let i=0;i<6;i++){
    const b=new THREE.Mesh(new THREE.PlaneGeometry(0.6,1.2), createPSXMaterial(currentZone==="frostveil_wastes"? 0x1a1a2a : 0x8b1a1a));
    const a=i/6*Math.PI*2, r=4;
    b.position.set(Math.cos(a)*r, 1.4, Math.sin(a)*r);
    b.lookAt(0,1.4,0);
    scene.add(b); decorations.push(b as any);
  }
}

function switchZone(z:ZoneId){
  if(!playerSim) return;
  currentZone = z;
  playerSim.zone = z;
  playerSim.pos.x = (Math.random()-0.5)*4;
  playerSim.pos.z = (Math.random()-0.5)*4;
  updateZoneFog(z);
  rebuildGround();
  rebuildDecorations();
  // reposition bonfires
  bonfires.forEach(b=> scene.remove(b.mesh));
  bonfires=[]; spawnBonfires();
  // reposition enemies by zone
  enemies.forEach(e=>{ const zone = ENEMIES[e.sim.id].zone as ZoneId; e.mesh.visible = zone===z || Math.random()>0.6; });
  hudZone.textContent = ZONES[z].display;
  zonePill.textContent = `ZONE: ${ZONES[z].display.toUpperCase()}`;
  document.querySelector(".brand-sub")!.textContent=`PSX • v0.2 • ${ZONES[z].display}`;
  showMsg(`Traveling to ${ZONES[z].display} — ${ZONES[z].dir}`, 1800);
  logChat(`Entered ${ZONES[z].display}. ${ZONES[z].dir}`, "system");
  const musicMap: any = { vale_of_cinders:"vale", drowned_mire:"mire", thornpeak_gallows:"gallows", forsaken_shore:"shore", veiled_hollow:"hollow", cinder_drakelands:"drakelands", frostveil_wastes:"frostveil" };
  audio.playMusic(musicMap[z]);
  pixlland.track("zone_entered",{ zone:z });
  zoneSelectEl.classList.add("hidden");
}

function onResize(){
  const w=innerWidth, h=innerHeight;
  renderer.setSize(w,h,false);
  camera.aspect=w/h; camera.updateProjectionMatrix();
}

function toggleMount(){
  if(!playerSim || playerSim.isDead) return;
  if(!playerSim.useStamina(12)) { showMsg("Stamina baixa!", 700); return; }
  playerSim.isMounted = !playerSim.isMounted;
  if(playerSim.isMounted){
    if(!mountGroup){
      mountGroup=new THREE.Group();
      const body=new THREE.Mesh(new THREE.BoxGeometry(1.1,0.6,1.8), createPSXMaterial(0x4a2a1a));
      body.position.y=0.5;
      const head=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.7), createPSXMaterial(0x3a2416));
      head.position.set(0,0.7,0.9);
      mountGroup.add(body, head);
    }
    if(!mountGroup.parent) scene.add(mountGroup);
    showMsg("Warhorse summoned — [M] to dismount", 1400);
    hudZone.textContent=ZONES[currentZone].display + " • Mounted";
    logChat("Warhorse summoned", "system");
  } else {
    if(mountGroup?.parent) mountGroup.parent.remove(mountGroup);
    hudZone.textContent=ZONES[currentZone].display;
    showMsg("Dismounted", 900);
  }
  audio.sfx("mount");
}

function doDodge(){
  if(!playerSim || playerSim.isDead || isDodging) return;
  const now=performance.now();
  if(now - lastAttack < 250) return;
  if(!playerSim.useStamina(18)) { showMsg("Sem stamina!", 700); return; }
  isDodging=true; dodgeUntil=now+320;
  showMsg("Dodge!", 300);
  staminaFill.style.width=(playerSim.stamina/playerSim.maxStamina*100)+"%";
  audio.sfx("dodge");
  setTimeout(()=> isDodging=false, 320);
}

function doAttack(){
  if(!playerSim || playerSim.isDead) return;
  const now=performance.now();
  if(now - lastAttack < 420) return;
  if(!playerSim.useStamina(10)) { showMsg("Sem stamina! Aguarde.", 800); return; }
  lastAttack=now;
  const whip = playerMesh.getObjectByName("whip") as THREE.Mesh | null;
  if(whip){
    const orig = whip.rotation.z;
    whip.rotation.z = orig + 0.9;
    setTimeout(()=> whip.rotation.z = orig, 110);
  }
  const ox = (Math.random()-0.5)*0.12, oz=(Math.random()-0.5)*0.12;
  playerMesh.position.x+=ox; playerMesh.position.z+=oz;
  setTimeout(()=>{ playerMesh.position.x-=ox; playerMesh.position.z-=oz; }, 60);
  // hit pause visual only (GDD 5.2A)
  const t0=performance.now(); while(performance.now()-t0 < 40){}

  let hit=false;
  const dmg = (playerSim.equipped?.dmg ?? CLASSES[playerSim.classId].dmg) + (Math.random()*4|0);
  // enemies
  enemies.forEach(e=>{
    if(!e.sim.alive) return;
    const dx=e.sim.pos.x - playerSim!.pos.x, dz=e.sim.pos.z - playerSim!.pos.z;
    const d=Math.hypot(dx,dz);
    const ang = Math.atan2(dz,dx) - playerSim!.yaw;
    const ad = Math.abs(((ang+Math.PI)%(Math.PI*2))-Math.PI);
    if(d<2.4 && ad < 1.15){
      e.sim.damage(dmg);
      hit=true;
      spawnSlash(e.mesh.position);
      (e.mesh.children[0] as THREE.Mesh).material = createPSXMaterial(0xffffff);
      setTimeout(()=> (e.mesh.children[0] as THREE.Mesh).material = createPSXMaterial(ENEMIES[e.sim.id].color), 80);
      audio.sfx("hit_flesh");
      if(!e.sim.alive){
        showMsg(`${e.sim.id} defeated! +${10} souls`, 900);
        logChat(`${e.sim.id} defeated (+10 souls)`, "combat");
        playerSim!.addSouls(10);
        playerSim!.questKills++;
        questSim.update(playerSim!.questKills, bonfires.some(b=>b.sim.lit));
        updateQuestTracker();
        if(playerSim!.questKills===4) showDeed("Blood on Ash");
        // loot chance
        if(Math.random()<0.22){
          const w = WEAPONS[Math.floor(Math.random()*WEAPONS.length)];
          playerSim!.addItem(w);
          logChat(`Loot: ${w.name} [${w.rarity}]`, "loot");
          showDeed(`Found ${w.name}`);
          updateInvGrid();
        }
        e.mesh.visible=false;
        pixlland.track("enemy_defeated",{ id:e.sim.id, zone: currentZone });
        setTimeout(()=>{ e.sim.respawnAt(e.basePos); e.mesh.visible=true; }, 6000);
        if(questSim.completed && !questSim.rewarded){
          const rew = questSim.claim(playerSim!);
          if(rew){ showDeed("Whispers Below concluída!"); logChat(`Quest complete! +${rew.souls} souls`, "quest"); updateHUD(); }
        }
      }
    }
  });
  // bosses
  bosses.forEach(b=>{
    if(!b.sim.alive) return;
    const dx=b.sim.pos.x - playerSim!.pos.x, dz=b.sim.pos.z - playerSim!.pos.z;
    const d=Math.hypot(dx,dz);
    const ang = Math.atan2(dz,dx) - playerSim!.yaw;
    const ad = Math.abs(((ang+Math.PI)%(Math.PI*2))-Math.PI);
    if(d<3.0 && ad<1.2){
      b.sim.damage(dmg);
      hit=true;
      spawnSlash(b.mesh.position);
      b.telegraph.material = createPSXMaterial(0xffffff) as any;
      setTimeout(()=> b.telegraph.material = createPSXMaterial(0xff2a2a) as any, 80);
      if(!b.sim.alive){
        showMsg(`${BOSSES[b.sim.id].name} FALLEN!`, 1800);
        logChat(`${BOSSES[b.sim.id].name} defeated! Boss Soul acquired.`, "quest");
        showDeed(`Boss Soul: ${BOSSES[b.sim.id].name}`);
        const soulItem = { id:`boss_soul_${b.sim.id}`, name:`Soul of ${BOSSES[b.sim.id].name}`, slot:"consumable" as const, rarity:"legendary" as const, desc: BOSSES[b.sim.id].lore };
        playerSim!.addItem(soulItem as any);
        playerSim!.addSouls(120);
        playerSim!.deeds.add(`boss_${b.sim.id}`);
        pixlland.track("boss_defeated",{ boss:b.sim.id });
        b.mesh.visible=false; b.telegraph.visible=false;
        updateInvGrid();
      } else if(b.sim.phase===2 && !b.mesh.userData.enrageNotified){
        b.mesh.userData.enrageNotified=true;
        showMsg(`${BOSSES[b.sim.id].name} ENRAGED!`, 1200);
        logChat(`${BOSSES[b.sim.id].name} enraged — telegraph intensified`, "combat");
      }
    }
  });
  if(!hit) { showMsg("Whip — *swish*", 400); audio.sfx("whip_miss"); }
  updateHUD();
}

function spawnSlash(pos: THREE.Vector3){
  const g=new THREE.Mesh(new THREE.PlaneGeometry(1.2,0.35), new THREE.MeshBasicMaterial({ color:0xffd8a0, transparent:true, opacity:0.85, side:THREE.DoubleSide }));
  g.position.copy(pos); g.position.y+=0.9;
  g.lookAt(camera.position);
  scene.add(g);
  let o=0.85;
  const id=setInterval(()=>{ o-=0.18; (g.material as THREE.MeshBasicMaterial).opacity=o; g.scale.x+=0.14; if(o<=0){ clearInterval(id); scene.remove(g);} }, 30);
}

function spawnWorld(){
  const ids: EnemyId[] = ["dreg","gnoll","wraith","golem","cave_crab","fungal_zombie","wildman","minotaur","corpse_hound","broodmother"];
  for(let i=0;i<12;i++){
    const id = ids[i % ids.length];
    const base = { x:(Math.random()-0.5)*28, z:(Math.random()-0.5)*28 };
    const sim = new EnemySim(id, base );
    const group=new THREE.Group();
    const col = ENEMIES[id].color, sc=ENEMIES[id].scale;
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.35*sc, 0.8*sc, 4, 6), createPSXMaterial(col));
    body.position.y=0.7*sc;
    group.add(body);
    const eye=new THREE.Mesh(new THREE.SphereGeometry(0.06,6,6), new THREE.MeshBasicMaterial({ color:0xff3a2a }));
    eye.position.set(0.12,0.95*sc,0.28);
    group.add(eye);
    group.position.set(sim.pos.x, 0, sim.pos.z);
    const hpGeo=new THREE.PlaneGeometry(0.8,0.08);
    const hpMat=new THREE.MeshBasicMaterial({ color:0x33ff33, side:THREE.DoubleSide });
    const hpBar=new THREE.Mesh(hpGeo, hpMat);
    hpBar.position.set(0,1.6*sc,0);
    group.add(hpBar);
    scene.add(group);
    enemies.push({ sim, mesh: group, hpBar, basePos: base });
  }

  // bosses 7.2 roster - spawn per zone
  const bossIds: BossId[] = ["executioner","aberration","swamp_titan","wendigo","cyclops","eldritch_horror","pit_lord","blood_phantom_boss","titan","flesh_golem"];
  const bossPositions = [{x:0,z:-22},{x:18,z:-10},{x:-16,z:12},{x:12,z:16},{x:-18,z:-14},{x:0,z:22},{x:22,z:0},{x:-22,z:0},{x:0,z:-32},{x:0,z:32}];
  bossIds.forEach((bid, i)=>{
    const pos = bossPositions[i % bossPositions.length];
    const sim = new BossSim(bid, pos);
    const group=new THREE.Group();
    const bcol = BOSSES[bid].color, sc = BOSSES[bid].scale;
    const bossBody=new THREE.Mesh(new THREE.BoxGeometry(1.2*sc,1.1*sc,0.9*sc), createPSXMaterial(bcol));
    bossBody.position.y=0.9*sc;
    const bossHead=new THREE.Mesh(new THREE.BoxGeometry(0.55*sc,0.45*sc,0.62*sc), createPSXMaterial(0x6a1a1a));
    bossHead.position.set(0,1.45*sc,0.45*sc);
    group.add(bossBody,bossHead);
    group.position.set(pos.x,0,pos.z);
    const telegraph = telegraphRing(BOSSES[bid].zone===currentZone? 0xff3a2a : 0x6a6a6a);
    telegraph.scale.setScalar(sc);
    telegraph.visible=false;
    group.add(telegraph);
    const hpBar=new THREE.Mesh(new THREE.PlaneGeometry(1.4*sc,0.12), new THREE.MeshBasicMaterial({ color:0xff2a2a, side:THREE.DoubleSide }));
    hpBar.position.y=2.2*sc;
    group.add(hpBar);
    scene.add(group);
    bosses.push({ sim, mesh: group, telegraph, hpBar });
  });

  spawnBonfires();
}

function spawnBonfires(){
  const positions = [{x:2,z:2},{x:-12,z:-10},{x:14,z:8}];
  positions.forEach((p,i)=>{
    const sim = new BonfireSim(`bonfire_${i}`, currentZone, p);
    const g=new THREE.Group();
    const base=new THREE.Mesh(new THREE.CylinderGeometry(0.6,0.7,0.25,6), createPSXMaterial(0x3a2416));
    base.position.y=0.12;
    const fire=new THREE.Mesh(new THREE.ConeGeometry(0.32,0.7,6), new THREE.MeshBasicMaterial({ color: sim.lit? 0xff6a2a : 0x4a2a1a }));
    fire.position.y=0.6;
    const light = new THREE.PointLight(0xff6a2a, sim.lit?1.2:0, 10);
    light.position.y=0.8;
    g.add(base, fire, light);
    g.position.set(p.x,0,p.z);
    (g as any).fireMesh=fire; (g as any).light=light;
    scene.add(g);
    bonfires.push({ sim, mesh:g });
  });
}

function tryBonfire(){
  if(!playerSim) return;
  let near: any = null;
  let min=1.8;
  bonfires.forEach(b=>{
    const d=Math.hypot(b.sim.pos.x - playerSim!.pos.x, b.sim.pos.z - playerSim!.pos.z);
    if(d<min){ min=d; near=b; }
  });
  if(!near){ showMsg("Nenhuma fogueira por perto", 900); return; }
  near.sim.light();
  playerSim.restAtBonfire(near.sim.pos);
  questSim.update(playerSim.questKills, true);
  // visual lit
  const fire = (near.mesh as any).fireMesh as THREE.Mesh;
  (fire.material as THREE.MeshBasicMaterial).color.setHex(0xff6a2a);
  const light = (near.mesh as any).light as THREE.PointLight;
  light.intensity=1.2;
  showMsg(`Bonfire acesa — ${ZONES[currentZone].display}. HP/Stamina restaurados.`, 1800);
  logChat(`Bonfire lit at ${ZONES[currentZone].display}`, "quest");
  audio.sfx("bonfire");
  showDeed("Bonfire Lit");
  updateHUD(); updateQuestTracker();
  if(questSim.completed && !questSim.rewarded){
    const rew=questSim.claim(playerSim);
    if(rew) { showDeed("Quest completa!"); updateHUD(); updateInvGrid(); }
  }
  pixlland.track("bonfire_lit",{ zone: currentZone });
}

async function tryOpenPixllandReward(){
  if(!pixlland.canShow("rewarded_dungeon_bonus")){ showMsg("Ad não disponível agora (cooldown)", 1300); return; }
  showMsg("Abrindo reward ad... (mock Pixlland)", 1000);
  const res= await pixlland.showRewarded("rewarded_dungeon_bonus");
  if(res.completed){
    const cosmetic={ id:`cosmetic_${Date.now()}`, name:"Raven Chest (Cosmetic)", slot:"accessory" as const, rarity:"rare" as const, desc:"Baú visual sem poder (GDD 15.4)" };
    playerSim?.addItem(cosmetic as any);
    showMsg("Recompensa cosmética recebida!", 1400);
    showDeed("Cosmetic Chest");
    updateInvGrid();
  }
}

function updateHUD(){
  if(!playerSim) return;
  const pct = Math.max(0, playerSim.hp/playerSim.maxHp);
  hpFill.style.width=(pct*100)+"%";
  hpText.textContent=`${Math.ceil(playerSim.hp)}/${playerSim.maxHp}`;
  if(staminaText) staminaText.textContent=`${Math.ceil(playerSim.stamina)}`;
  staminaFill.style.width=(playerSim.stamina/playerSim.maxStamina*100)+"%";
  const xpPct = (playerSim.xp/100)*100;
  xpFill.style.width=xpPct+"%";
  hudLvl.textContent=String(playerSim.level);
  hudSouls.textContent=String(playerSim.souls);
  hudEquip.textContent=playerSim.equipped?.name ?? "—";
  if(playerSim.isDead){
    deathScreen.classList.remove("hidden");
    audio.playMusic("death");
  } else {
    // boss bar logic - show nearest alive boss within 14
    let nearest: any =null; let md=14;
    bosses.forEach(b=>{
      if(!b.sim.alive) return;
      const d=Math.hypot(b.sim.pos.x - playerSim!.pos.x, b.sim.pos.z - playerSim!.pos.z);
      if(d<md){ md=d; nearest=b; }
    });
    if(nearest){
      bossBar.classList.remove("hidden");
      const bid = nearest.sim.id as BossId;
      bossLabel.textContent = `${BOSSES[bid].name} — ${BOSSES[bid].telegraph}`;
      bossFill.style.width=(Math.max(0, nearest.sim.hp/nearest.sim.maxHp)*100)+"%";
      if((nearest.sim as BossSim).isEnraged()) bossFill.style.background="linear-gradient(90deg, #ff3a2a, #ffb86a)";
    } else {
      bossBar.classList.add("hidden");
    }
    // bonfire hint
    const nearBon = bonfires.some(b=> Math.hypot(b.sim.pos.x - playerSim!.pos.x, b.sim.pos.z - playerSim!.pos.z) < 1.8);
    bonfireHint.classList.toggle("hidden", !nearBon);
  }
}

function updateQuestTracker(){
  questTracker.innerHTML=`
    <div class="q-title">${questSim.title}</div>
    <div style="opacity:.7; font-size:10px; margin:4px 0">${questSim.desc}</div>
    <div><span class="mono">${questSim.kills}/${questSim.target} Dregs eliminados</span> <span class="q-progress">${questSim.kills>=questSim.target?"✓":"..."}</span></div>
    <div>Bonfire: ${questSim.bonfireLit?"<span style='color:#6abf6a'>acesa ✓</span>":"<span style='opacity:.5'>apague</span>"}</div>
    <div style="margin-top:6px; font-size:9px; opacity:.6">Recompensa: 60 souls + Ember Lilys • Zona: ${ZONES[currentZone].display}</div>
    ${questSim.completed && !questSim.rewarded ? `<button id="quest-claim" style="margin-top:6px; padding:4px 8px; background:#ffb86a; border:none; font-weight:700; cursor:pointer; font-size:10px">CLAIM</button>` : questSim.completed? `<div style="color:#6abf6a; margin-top:4px">✔ Concluída</div>` : ``}
  `;
  const btn=document.getElementById("quest-claim");
  if(btn) btn.onclick=()=>{ const r=questSim.claim(playerSim!); if(r){ showMsg(`Quest reward: +${r.souls} souls`, 1400); updateHUD(); updateQuestTracker(); } };
}

function updateInvGrid(){
  if(!playerSim) return;
  invGrid.innerHTML="";
  const slots=12;
  for(let i=0;i<slots;i++){
    const div=document.createElement("div");
    div.className="inv-slot";
    const it=playerSim.inventory[i];
    if(it){
      div.classList.add("has");
      div.textContent=it.name.slice(0,10);
      div.title=`${it.name} [${it.rarity}] — ${it.desc} ${it.dmg?` DMG ${it.dmg}`:""}`;
      div.onclick=()=>{ playerSim!.equip(it); hudEquip.textContent=it.name; showMsg(`Equipado: ${it.name}`, 900); audio.sfx("equip"); };
    } else {
      div.textContent="—";
    }
    invGrid.appendChild(div);
  }
}

let lastT=performance.now(), frames=0, fpsT=0;
function animate(){
  requestAnimationFrame(animate);
  const now=performance.now();
  const dt=Math.min(0.033, (now-lastT)/1000); lastT=now;
  frames++; fpsT+=dt; if(fpsT>0.5){ hudFps.textContent=`${Math.round(frames/fpsT)} FPS • PSX 320×240 • ${ZONES[currentZone].display}`; frames=0; fpsT=0; }

  if(!playerSim) return;
  playerSim.regenStamina(dt);
  if(!isDodging) staminaFill.style.width=(playerSim.stamina/playerSim.maxStamina*100)+"%";

  let mx=0, mz=0;
  if(keys.has("w")) mz-=1;
  if(keys.has("s")) mz+=1;
  if(keys.has("a")) mx-=1;
  if(keys.has("d")) mx+=1;
  const len=Math.hypot(mx,mz);
  if(len>0){ mx/=len; mz/=len; }
  const cos=Math.cos(yaw), sin=Math.sin(yaw);
  const wx = mx*cos - mz*sin;
  const wz = mx*sin + mz*cos;
  const speed = isDodging ? 7.5 : (playerSim.isMounted ? 6.5 : 3.2);
  if(!playerSim.isDead){
    playerSim.pos.x += wx * speed * dt;
    playerSim.pos.z += wz * speed * dt;
    if(len>0) playerSim.yaw = Math.atan2(wz, wx);
  }
  playerSim.pos.x = Math.max(-55, Math.min(55, playerSim.pos.x));
  playerSim.pos.z = Math.max(-55, Math.min(55, playerSim.pos.z));

  playerMesh.position.set(playerSim.pos.x, 0, playerSim.pos.z);
  playerMesh.rotation.y = playerSim.yaw;
  if(mountGroup && mountGroup.parent){
    mountGroup.position.copy(playerMesh.position);
    mountGroup.rotation.y = playerMesh.rotation.y;
    playerMesh.position.y=0.65;
  } else {
    playerMesh.position.y=0;
  }
  if(len>0 && !playerSim.isDead){
    playerMesh.position.y += Math.sin(now*0.012*speed)*0.035;
  }

  const camDist = playerSim.isMounted ? 9 : 7.5;
  const camH = 3.2 + pitch*1.8;
  const cx = playerSim.pos.x - Math.cos(yaw)*camDist;
  const cz = playerSim.pos.z - Math.sin(yaw)*camDist;
  camera.position.lerp(new THREE.Vector3(cx, camH, cz), 0.12);
  camera.lookAt(playerSim.pos.x, 0.9, playerSim.pos.z);

  enemies.forEach(e=>{
    if(!e.sim.alive) return;
    const dx=playerSim!.pos.x - e.sim.pos.x, dz=playerSim!.pos.z - e.sim.pos.z;
    const d=Math.hypot(dx,dz);
    if(d<0.9 && !playerSim!.isDead){
      if(now % 700 < 16) { playerSim!.damage(ENEMIES[e.sim.id].dmg*dt*7); updateHUD(); }
    } else if(d<9 && d>1.0){
      e.sim.pos.x += (dx/d)*0.95* dt;
      e.sim.pos.z += (dz/d)*0.95* dt;
    }
    e.mesh.position.set(e.sim.pos.x, 0, e.sim.pos.z);
    if(d<9) e.mesh.lookAt(playerSim!.pos.x, 0, playerSim!.pos.z);
    const hpPct = Math.max(0, e.sim.hp/e.sim.maxHp);
    e.hpBar.scale.x = hpPct;
    e.hpBar.lookAt(camera.position);
  });

  bosses.forEach(b=>{
    if(!b.sim.alive) return;
    const dx=playerSim!.pos.x - b.sim.pos.x, dz=playerSim!.pos.z - b.sim.pos.z;
    const d=Math.hypot(dx,dz);
    // telegraph handling GDD 5.2B: show ring 1.2s before slam if close
    const shouldTelegraph = d<6 && d>1.2;
    b.telegraph.visible = shouldTelegraph;
    if(shouldTelegraph){
      b.telegraph.rotation.z += dt*1.2;
      (b.telegraph.material as THREE.MeshBasicMaterial).opacity = 0.55 + Math.sin(now*0.008)*0.25;
    }
    if(d<1.2 && !playerSim!.isDead){
      // boss damage spike
      if(Math.floor(now/900)%2===0) { playerSim!.damage( BOSSES[b.sim.id].hp >400? 18*dt*2 : 14*dt*2 ); updateHUD(); }
    } else if(d<11 && d>1.4){
      const sp = b.sim.phase===2? 1.4 : 0.95;
      b.sim.pos.x += (dx/d)* sp * dt;
      b.sim.pos.z += (dz/d)* sp * dt;
    }
    b.mesh.position.set(b.sim.pos.x, 0, b.sim.pos.z);
    if(d<11) b.mesh.lookAt(playerSim!.pos.x, 0, playerSim!.pos.z);
    const hpPct = Math.max(0, b.sim.hp/b.sim.maxHp);
    b.hpBar.scale.x = hpPct;
    b.hpBar.lookAt(camera.position);
  });

  if(minimapCoords) minimapCoords.textContent=`${playerSim.pos.x.toFixed(1)}, ${playerSim.pos.z.toFixed(1)} • ${playerSim.zone}`;
  // update bonfire pulsing
  bonfires.forEach(b=>{
    if(b.sim.lit){
      b.mesh.rotation.y += dt*0.2;
    }
  });

  renderer.setRenderTarget(lowResTarget);
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);
  renderer.render(quadScene, quadCam);
}
