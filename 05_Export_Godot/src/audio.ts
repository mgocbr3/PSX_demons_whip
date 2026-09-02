// Audio engine wrapper - preserva engine, troca conteúdo per GDD 14.1
export type MusicId = "title"|"hub"|"vale"|"mire"|"gallows"|"shore"|"hollow"|"drakelands"|"frostveil"|"dungeon"|"boss"|"death"|"pvp";
export class AudioDirector {
  private ctx?: AudioContext;
  private enabled=true;
  private current: MusicId | null = null;
  init(){
    try{ this.ctx = new (window.AudioContext|| (window as any).webkitAudioContext)(); } catch{ this.enabled=false; }
  }
  setEnabled(v:boolean){ this.enabled=v; if(!v) this.stop(); }
  playMusic(id:MusicId){
    if(!this.enabled) return;
    this.current=id;
    // em runtime real: trocar arquivo por trás da chave (GDD 14.3) sem mudar callsite
    console.log(`[Audio] music: ${id} - dark fantasy drone/choir/ritual per GDD 14.2`);
  }
  sfx(name:string){
    if(!this.enabled) return;
    console.log(`[SFX] ${name}`);
    // families metal/flesh/bone/wood/stone/magic per GDD 14.3
  }
  stop(){ this.current=null; }
  getCurrent(){ return this.current; }
}
export const audio = new AudioDirector();
