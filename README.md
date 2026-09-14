## ピクチャ部分シェイク・プラグイン（NLM_PartiallyShakePicture.js）
### RPGツクールMZ/MV両用プラグイン

ピクチャの一部範囲のみをシェイクさせます  
（コピー像を手前で揺らしているだけの簡単な作りなので、高度な画像変形技術は使用していません）

- MZの場合は、プラグインコマンドで簡単に実行できます  
- MVの場合は、プラグインヘルプ記載のスクリプトで実行して下さい

### 注意
- シェイクするピクチャの不透明度は 255 に設定して下さい（低値だと表示が乱れます）
- 元ピクチャはそのままで切り抜きコピー像を手前で動かしているだけなので（透過部や輪郭辺縁部で）絵がダブって見える瞬間があるのは仕様です。シェイクの強さを小さくしたり、範囲を小さく絞ったりして、調整して下さい
- ウエイトを待たないため、必要ならイベントコマンドのウエイトを適宜入れて下さい
- 利用するCGの著作権は遵守して下さい

少々欠点のあるプラグインですが、簡単に絵に動きをつけられる利点もあります

# download

現在のバージョン： v1.1.0 (2026/09/14)（中心ずれ値が大きいとスプライトずれが生じていた点を修正）
プラグインの download は、[右クリック「名前を付けてリンク先を保存」](https://raw.githubusercontent.com/nolimits-tukool/NLM_PartiallyShakePicture/refs/heads/main/NLM_PartiallyShakePicture.js)  
RPGツクールMZ/MV両用です

Windows11の[「スマートアプリコントロール」でブロックされる場合](https://github.com/nolimits-tukool/HandlingSmartAppControl)

![挿絵](PartiallyShake.png)

# license

　MITライセンスの通りです


## [リポジトリ 一覧へ](https://github.com/nolimits-tukool?tab=repositories)
