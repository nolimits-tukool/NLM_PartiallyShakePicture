/*==========================================================================
 NLM_PartiallyShakePicture.js
----------------------------------------------------------------------------
 (C)2026 NoLimits
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0  2026/09/11 初稿
============================================================================*/

/*:
 * @target MZ MV
 * @plugindesc ピクチャ部分シェイク・プラグイン (v1.0.0)
 * @author ノリミツ (NoLimits)
 * @url https://github.com/nolimits-tukool
 * 
 * @command startShake
 * @text 部分シェイク実行
 * @desc ピクチャの範囲を指定して、部分シェイクを実行する
 * 
 * @arg picId
 * @text ピクチャ番号
 * @desc 部分シェイクを実行するピクチャ番号　　　　　　　　　　　（すでに「ピクチャの表示」が実施されている番号を入力）
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg scaleX
 * @text ヨコ範囲％
 * @desc シェイクする画像のヨコ範囲％（デフォルト：50）
 * @type number
 * @max 100
 * @default 50
 * 
 * @arg scaleY
 * @text タテ範囲％
 * @desc シェイクする画像のタテ範囲％（デフォルト：20）
 * @type number
 * @max 100
 * @default 20
 * 
 * @arg dX
 * @text 中心ずれX
 * @desc シェイク中心（0だと画像中心）のX補正（デフォルト：0）　（左にずらす場合はマイナス値で入力）
 * @type number
 * @min -999999
 * @default 0
 * 
 * @arg dY
 * @text 中心ずれY
 * @desc シェイク中心（0だと画像中心）のY補正（デフォルト：0）　（上にずらす場合はマイナス値で入力）
 * @type number
 * @min -999999
 * @default 0
 * 
 * @arg sideToSide
 * @text 横揺れ
 * @desc 横揺れか（OFFの場合は縦揺れになる、デフォルト：OFF）
 * @type boolean
 * @default false
 * 
 * @command shakeConfig
 * @text 部分シェイク設定
 * @desc ゲーム途中でのシェイク設定を変更する（すでにシェイク中の画像に反映したい時は再度、部分シェイク実行をし直して下さい）
 * 
 * @arg duration
 * @text シェイク時間
 * @desc 部分シェイクする時間（フレーム）（初期値：60）　　　　　　（ 9999 を入力すると永続シェイクになる）
 * @type number
 * @default 60
 * 
 * @arg power
 * @text シェイク強さ
 * @desc 部分シェイクの強さ（初期値：6）（値が大きいほど強い）
 * @type number
 * @min 1
 * @default 6
 * 
 * @arg speed
 * @text シェイク速度
 * @desc 部分シェイクの速度（標準：7）（値が大きいほど速い）
 * @type number
 * @min 1
 * @default 7
 * 
 * @arg scaleMargin
 * @text 辺縁ぼかし％
 * @desc シェイク辺縁のぼかす範囲割合％（デフォルト：20）
 * @type number
 * @max 100
 * @default 20
 * 
 * @command stopShake
 * @text 部分シェイク停止
 * @desc 部分シェイク中のピクチャを停止させる
 * 
 * @arg picId
 * @text ピクチャ番号
 * @desc 部分シェイクを停止するピクチャ番号
 * @type number
 * @min 1
 * @default 1
 * 
 * 
 * @param duration
 * @text シェイク時間
 * @desc シェイクする時間（フレーム）の初期値（デフォルト：60）　　（ 9999 を入力すると永続シェイクになる）
 * @type number
 * @min 1
 * @default 60
 * 
 * @param power
 * @text シェイク強さ
 * @desc シェイクの強さの初期値（デフォルト：6）（大きいほど強い）（ゲーム途中で変更したい際はスクリプトを利用）
 * @type number
 * @min 1
 * @default 6
 * 
 * @param speed
 * @text シェイク速度
 * @desc シェイクの速度の初期値（標準：7）（大きいほど速い）　　　（ゲーム途中で変更したい際はスクリプトを利用）
 * @type number
 * @min 1
 * @default 7
 * 
 * @param scaleMargin
 * @text 辺縁ぼかし％
 * @desc シェイク辺縁のぼかす範囲割合％（デフォルト：20）　　　　　（ゲーム途中で変更したい際はスクリプトを利用）
 * @type number
 * @max 100
 * @default 20
 * 
 * 
 * @help
 * 
 * 【RPGツクールMZ/MV両用プラグイン】
 * すでに表示されているピクチャの一部範囲のみをシェイクさせます
 * 　MZの場合は、プラグインコマンドで簡単に実行できます
 * 　MVの場合は、下記スクリプトで実行して下さい
 * 
 * ＜スクリプトでのシェイク実行のしかた＞
 * 　$gameScreen.partiallyShake(ピクチャ番号, ヨコ範囲(％), タテ範囲(％),
 * 　　　　　　　　　　　　　　　　　　　　 中心ずれX, 中心ずれY, 横揺れか);
 * 　　中心ずれX：画像中央の場合が 0 、左にずらす場合はマイナス値で入力
 * 　　中心ずれY：画像中央の場合が 0 、上にずらす場合はマイナス値で入力
 * 　　横揺れか ：true だと横揺れになる。false または省略で縦揺れになる
 * 
 * 　例)    $gameScreen.partiallyShake(1, 50, 20, -5, 10, false);
 * 
 * ＜ゲーム途中のスクリプトでのシェイク設定変更法＞
 * 　$gameSystem.partiallyShakeConfig(時間, 強さ, 速度, 辺縁ぼかし割合);
 * 　　　　時間：シェイクの時間（初期値：60）（9999だと永続シェイク）
 * 　　　　強さ：シェイクの強さ（初期値：6） （大きいほど強い）
 * 　　　　速度：シェイクの速度（標準　：7） （大きいほど速い）
 * 　　　　辺縁ぼかし割合：シェイク辺縁のぼかす範囲割合％（初期値：20）
 * 
 * 　例)    $gameSystem.partiallyShakeConfig(120, 3, 8, 30);
 * 
 * 　 ※ 実行時と違い「$gameSystem」ですので入力を間違えないようにして下さい
 * 　 ※ すでにシェイク中の画像に反映したい時は再度シェイク実行をし直して下さい
 * 
 * ＜スクリプトでのシェイク停止のしかた＞
 *  　　　　$gameScreen.stopPartiallyShake(ピクチャ番号);
 * 
 * ＜注意＞
 * ・シェイクするピクチャの不透明度は 255 に設定して下さい（低いと表示が乱れる)
 * ・元ピクチャに対しコピー像を手前で揺らしているだけの簡単な原理ですので、絵が
 * 　 ダブって見える瞬間があるのは仕様です。シェイクしたい場所の中心に合わせて
 * 　 範囲を小さく絞ったりして、なるべく自然に見えるように調整して下さい
 * ・ウエイトを待たないため必要ならイベントコマンドのウエイトを適宜入れて下さい
 * ・同一のピクチャ番号で、一度にシェイクできるのは、一か所のみです
 * 　 （別番号の複数のピクチャを同時にシェイクさせることはできます）
 * ・シェイク終了直前に輪郭に微妙なずれ（座標計算誤差）が生じる場合は,範囲％の
 * 　 値を1ずらすことで直る場合があります
 * ・利用するCGの著作権は遵守して下さい
 * 
 * 利用規約はMITライセンスの通りです
 * MZでは ButtonPicture.js と組み合わせることで利用法が広がるかも知れません
 */

(() => {
  "use strict";

  const pluginName = "NLM_PartiallyShakePicture";
  const parameters = PluginManager.parameters(pluginName);
  const NPPSparam = Object.values(parameters).map(param => Number(param) || 0);

  if (Utils.RPGMAKER_NAME === "MZ") {
    PluginManager.registerCommand(pluginName, "startShake", args => {
      const a = Object.values(args).map(arg => Number(arg) || 0);
      a[5] = args.sideToSide === "true";
      $gameScreen.partiallyShake(a[0], a[1], a[2], a[3], a[4], a[5]);
    });

    PluginManager.registerCommand(pluginName, "shakeConfig", args => {
      const b = Object.values(args).map(arg => Number(arg) || 0);
      $gameSystem.partiallyShakeConfig(b[0], b[1], b[2], b[3]);
    });

    PluginManager.registerCommand(pluginName, "stopShake", args => {
      $gameScreen.stopPartiallyShake(Number(args.picId) || 0);
    });
  }

  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.apply(this, arguments);
    this.NPPSinitialize();
  };

  Game_System.prototype.NPPSinitialize = function() {
    this.partiallyShakeConfig(NPPSparam[0], NPPSparam[1], NPPSparam[2], NPPSparam[3]);
  };

  Game_System.prototype.partiallyShakeConfig = function(duration, power, speed, scaleMargin) {
    this._NPPSduration = duration    || 0;
    this._NPPSpower    = power       || 6;
    this._NPPSspeed    = speed       || 7;
    this._NPPSscaleM   = scaleMargin || 0;
  };

  Game_Screen.prototype.partiallyShake = function(picId, scaleX, scaleY, dX, dY, sTs) {
    if (picId && this.picture(picId)) {
      const picture  = this.picture(picId);
      const system   = $gameSystem;
      const duration = system._NPPSduration;
      const power    = system._NPPSpower;
      const speed    = system._NPPSspeed;
      const scaleM   = system._NPPSscaleM;
      picture._NPPSarray = [scaleX, scaleY, dX, dY, sTs, duration, power, speed, scaleM];
      picture._NPPSstartShake = true;
    }
  };

  Game_Screen.prototype.stopPartiallyShake = function(picId) {
    if (picId && this.picture(picId)) {
      this.picture(picId)._NPPSstopShake = true;
    }
  };

  const _Game_Picture_initialize = Game_Picture.prototype.initialize;
  Game_Picture.prototype.initialize = function() {
    _Game_Picture_initialize.apply(this, arguments);
    this.NPPSinitialize();
  };

  Game_Picture.prototype.NPPSinitialize = function() {
    this._NPPSstartShake = false;
    this._NPPSstopShake  = false;
    this._NPPSarray = [];
  };

  const _Sprite_Picture_initialize = Sprite_Picture.prototype.initialize;
  Sprite_Picture.prototype.initialize = function(pictureId) {
    this.NPPSclearShake();
    _Sprite_Picture_initialize.apply(this, arguments);
  };

  Sprite_Picture.prototype.NPPSclearShake = function() {
    this._NPPSstart = false;
    this._NPPSshake = 0;
    this._NPPSduration  = 0;
    this._NPPSdirection = 1;
    if (this._NPPSsprite1) {
      this._NPPSsprite1.bitmap = null;
      this._NPPSsprite2.bitmap = null;
    }
  };

  const _Sprite_Picture_update = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    _Sprite_Picture_update.apply(this, arguments);
    this.NPPSupdate();
  };

  Sprite_Picture.prototype.NPPSupdate = function() {
    this.NPPSstartShake();
    if (this._NPPSstart && this.bitmap && this.visible) {
      this.NPPSupdatePartialSprites();
      this.NPPSupdateShake();
      this.NPPSupdatePosition();
    }
  };

  Sprite_Picture.prototype.NPPSstartShake = function() {
    const picture = this.picture(); 
    if (!picture) return;
    if (picture._NPPSstartShake) {
      const array = picture._NPPSarray;
      this._NPPSscaleX     = array[0] || 0;
      this._NPPSscaleY     = array[1] || 0;
      this._NPPSdX         = array[2] || 0;
      this._NPPSdY         = array[3] || 0;
      this._NPPSsideToSide = array[4];
      this._NPPSduration   = array[5];
      this._NPPSpower      = array[6];
      this._NPPSspeed      = array[7];
      this._NPPSscaleM     = array[8];
      this._NPPSstart      = true;
      picture._NPPSstartShake   = false;
      picture._NPPSarray.length = 0
    }
    if (picture._NPPSstopShake || (this._NPPSduration <= 0 && !this._NPPSshake)) {
      this.NPPSclearShake();
      picture._NPPSstopShake = false;
    }
  };

  Sprite_Picture.prototype.NPPSupdatePartialSprites = function() {
    const bitmap = this.bitmap;
    const width  = bitmap.width;
    const height = bitmap.height;
    this.NPPScreatePartialSprites();
    this._NPPSsprite1.bitmap = bitmap;
    this._NPPSsprite2.bitmap = bitmap;
    const sw1 = Math.floor(width  * Math.min(this._NPPSscaleX / 100, 1));
    const sh1 = Math.floor(height * Math.min(this._NPPSscaleY / 100, 1));
    const sx1 = Math.floor((width  - sw1) / 2 + this._NPPSdX);
    const sy1 = Math.floor((height - sh1) / 2 + this._NPPSdY);
    const d   = Math.min(sw1, sh1) * this._NPPSscaleM / 100;
    const sw2 = Math.floor(Math.max(sw1 - d, 0));
    const sh2 = Math.floor(Math.max(sh1 - d, 0));
    const sx2 = Math.floor((width  - sw2) / 2 + this._NPPSdX);
    const sy2 = Math.floor((height - sh2) / 2 + this._NPPSdY);
    this._NPPSsprite1.setFrame(sx1, sy1, sw1, sh1);
    this._NPPSsprite2.setFrame(sx2, sy2, sw2, sh2);
  };

  Sprite_Picture.prototype.NPPScreatePartialSprites = function() {
    if (!this._NPPSsprite1) {
      this._NPPSsprite1 = new Sprite();
      this._NPPSsprite1.anchor.x = 0.5;
      this._NPPSsprite1.anchor.y = 0.5;
      this.addChild(this._NPPSsprite1);
      this._NPPSsprite2 = new Sprite();
      this._NPPSsprite2.anchor.x = 0.5;
      this._NPPSsprite2.anchor.y = 0.5;
      this.addChild(this._NPPSsprite2);
      this._NPPSsprite1.opacity = this.NPPSspriteOpacity();
      this._NPPSsprite2.opacity = 255;
    }
  };

  Sprite_Picture.prototype.NPPSspriteOpacity = function() {
    return 100;
  };

  Sprite_Picture.prototype.NPPSupdateShake = function() {
    const delta = this._NPPSpower * this._NPPSspeed * this._NPPSdirection / 20;
    if (this._NPPSduration === 15 || this.NPPSduration === 7) {
      this._NPPSpower = Math.max(this._NPPSpower - 2, 1);
    }
    if (this._NPPSduration <= 1 && this._NPPSshake * (this._NPPSshake + delta) < 0) {
      this._NPPSshake = 0;
    } else {
      this._NPPSshake += delta;
    }
    if (this._NPPSshake > this._NPPSpower) {
      this._NPPSdirection = -1;
    }
    if (this._NPPSshake < -this._NPPSpower) {
      this._NPPSdirection = 1;
    }
    if (this._NPPSduration !== 9999) {
      this._NPPSduration--;
    }
  };

  Sprite_Picture.prototype.NPPSupdatePosition = function() {
    const ox = !this.picture().origin() ? this.bitmap.width  / 2 : 0;
    const oy = !this.picture().origin() ? this.bitmap.height / 2 : 0;
    const shake = Math.round(this._NPPSshake);
    const kx = this._NPPSsideToSide ? shake : 0;
    const ky = this._NPPSsideToSide ? 0 : shake;
    this._NPPSsprite1.x = ox + this._NPPSdX + kx;
    this._NPPSsprite1.y = oy + this._NPPSdY + ky;
    this._NPPSsprite2.x = ox + this._NPPSdX + kx;
    this._NPPSsprite2.y = oy + this._NPPSdY + ky;
  };
})();