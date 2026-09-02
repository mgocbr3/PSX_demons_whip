import { CLASSES, ClassId, EnemyId, ENEMIES, Item, ZoneId, BossId, ZONES, BOSSES } from "./types";

// Sim puro - sem Three, exceto pos (preserva autoridade sim per GDD 3.2)
export class PlayerSim {
  classId: ClassId;
  hp: number; maxHp:number; pos={x:0,z:0}; yaw=0; isDead=false; isMounted=false;
  level=1; xp=0; souls=0; // souls = currency-lite, nao perde na morte no MVP (GDD 5.2E)
  stamina=100; maxStamina=100;
  inventory: Item[] = [];
  equipped: Item | null = null;
  zone: ZoneId = "vale_of_cinders";
  bonfirePos: {x:number,z:number}|null = {x:0,z:0};
  questKills=0; questTarget=8; // GDD 6.3: mate 8 Corpse Hounds
  deeds: Set<string> = new Set();
  constructor(classId: ClassId){ this.classId=classId; const c=CLASSES[classId]; this.hp=c.hp; this.maxHp=c.hp; this.equipped={ id:"short_sword", name:"Short Sword", slot:"weapon", dmg:c.dmg, rarity:"common", desc:"Starter" }; }
  damage(n:number){ if(this.isDead) return; this.hp=Math.max(0,this.hp-n); if(this.hp<=0) this.isDead=true; }
  heal(n:number){ this.hp=Math.min(this.maxHp,this.hp+n); if(this.hp>0) this.isDead=false; }
  respawn(){ this.hp=this.maxHp; this.isDead=false; if(this.bonfirePos) this.pos={...this.bonfirePos}; else this.pos={x:0,z:0}; }
  restAtBonfire(p:{x:number,z:number}){ this.bonfirePos={...p}; this.hp=this.maxHp; this.stamina=this.maxStamina; this.isDead=false; }
  addSouls(n:number){ this.souls+=n; this.xp+=n; if(this.xp>=100){ this.level++; this.xp-=100; this.maxHp+=8; this.hp=this.maxHp; } }
  addItem(it:Item){ this.inventory.push(it); }
  equip(it:Item){ this.equipped=it; }
  useStamina(n:number){ if(this.stamina>=n){ this.stamina-=n; return true; } return false; }
  regenStamina(dt:number){ this.stamina=Math.min(this.maxStamina, this.stamina + 18*dt); }
}

export class EnemySim {
  id:EnemyId; hp:number; maxHp:number; pos:{x:number,z:number}; alive=true;
  constructor(id:EnemyId,pos:{x:number,z:number}){ this.id=id; this.pos=pos; const e=ENEMIES[id]; this.hp=e.hp; this.maxHp=e.hp; }
  damage(n:number){ this.hp-=n; if(this.hp<=0) { this.alive=false; this.hp=0; } }
  respawnAt(p:{x:number,z:number}){ this.pos={...p}; const e=ENEMIES[this.id]; this.hp=e.hp; this.maxHp=e.hp; this.alive=true; }
}

export class BossSim {
  id:BossId; hp:number; maxHp:number; pos:{x:number,z:number}; alive=true; phase=1;
  private enrage=false;
  constructor(id:BossId,pos:{x:number,z:number}){ this.id=id; this.pos=pos; const b=BOSSES[id]; this.hp=b.hp; this.maxHp=b.hp; }
  damage(n:number){
    this.hp=Math.max(0,this.hp-n);
    if(this.hp<=0) this.alive=false;
    if(this.hp < this.maxHp*0.5 && this.phase===1){ this.phase=2; this.enrage=true; }
  }
  isEnraged(){ return this.enrage; }
}

export class BonfireSim {
  zone: ZoneId; pos:{x:number,z:number}; lit=false; id:string;
  constructor(id:string, zone:ZoneId, pos:{x:number,z:number}){ this.id=id; this.zone=zone; this.pos=pos; }
  light(){ this.lit=true; }
}

export class QuestSim {
  id="whipbound_initiation";
  title="The Whip is Broken"; desc="Elimine 8 Dregs no Vale of Cinders e acenda a fogueira";
  kills=0; target=8; bonfireLit=false; completed=false; rewarded=false;
  update(kills:number, bonfire:boolean){ this.kills=kills; this.bonfireLit=bonfire; if(this.kills>=this.target && this.bonfireLit) this.completed=true; }
  claim(player:PlayerSim){ if(!this.completed||this.rewarded) return null; this.rewarded=true; player.addSouls(60); player.deeds.add("first_quest"); return { souls:60, item:"Ember Lilys" }; }
}
