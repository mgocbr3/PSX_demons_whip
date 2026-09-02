// Pixlland SDK adapter isolado - GDD 15.2/15.3
// Nao toca sim, somente UI/controller per separacao

export type ConsentState = { granted:boolean };
export type AdPlacement = "rewarded_dungeon_bonus"|"interstitial_hub"|"store_promo";
export type RewardedResult = { completed:boolean, reward?:string };
export type InterstitialResult = { shown:boolean };

export interface PixllandConfig { appId:string, testMode?:boolean }
export interface PixllandState { ready:boolean, version:string }

export interface PixllandPlatform {
  init(config: PixllandConfig): Promise<PixllandState>;
  isAvailable(): boolean;
  setConsent(consent: ConsentState): Promise<void>;
  track(event:string, payload?:Record<string,unknown>): void;
  canShow(placement:AdPlacement): boolean;
  showRewarded(placement:AdPlacement): Promise<RewardedResult>;
  showInterstitial(placement:AdPlacement): Promise<InterstitialResult>;
  dispose(): void;
}

// Mock adapter - real SDK mapeia quando docs chegarem (GDD 15.1)
export class PixllandMock implements PixllandPlatform {
  private ready=false;
  private lastInterstitial=0;
  private rewardedToday=0;
  private consent=true;
  async init(cfg:PixllandConfig): Promise<PixllandState>{
    console.log("[Pixlland] init mock", cfg);
    this.ready=true;
    return { ready:true, version:"mock-1.0" };
  }
  isAvailable(){ return this.ready; }
  async setConsent(c:ConsentState){ this.consent=c.granted; }
  track(event:string, payload?:Record<string,unknown>){
    if(!this.consent) return;
    console.log("[Pixlland] track", event, payload);
    // analytics sugeridos GDD 15.9
  }
  canShow(placement:AdPlacement){
    if(!this.ready) return false;
    if(placement.includes("interstitial")){
      const now=Date.now();
      if(now - this.lastInterstitial < 20*60*1000) return false;
      if(now < 10*60*1000) return false; // primeiros 10 min bloqueado (GDD 15.6)
    }
    if(placement.includes("rewarded") && this.rewardedToday>=5) return false;
    return true;
  }
  async showRewarded(placement:AdPlacement): Promise<RewardedResult>{
    if(!this.canShow(placement)) return { completed:false };
    this.rewardedToday++;
    this.track("ad_started",{placement});
    await new Promise(r=>setTimeout(r, 900));
    this.track("ad_completed",{placement});
    this.track("reward_claimed",{placement});
    return { completed:true, reward:"cosmetic_chest" };
  }
  async showInterstitial(placement:AdPlacement): Promise<InterstitialResult>{
    if(!this.canShow(placement)) return { shown:false };
    this.lastInterstitial=Date.now();
    this.track("ad_started",{placement});
    await new Promise(r=>setTimeout(r, 700));
    this.track("ad_completed",{placement});
    return { shown:true };
  }
  dispose(){ this.ready=false; }
}

export const pixlland: PixllandPlatform = new PixllandMock();
