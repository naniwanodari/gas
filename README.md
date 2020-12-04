# 朝会グループ分けスクリプト
## 概要
朝会のグループ分けスクリプトです。
GASを利用しています。

## ディレクトリ構成
- Logic 評価ロジック等
- Model オブジェクト
- Repository スプレッドシートとの接続、モデルへの詰め替え作業

## グループ分けのフロー
1. ランダムに100グループ作成します。
2. 各グループに対して、以下のような評価を行います。
    - 過去の履歴と比較してメンバーが重複していないか(重複した人数に応じて減点)
    - 新しい人とマッチしているか(新しい人との組み合わせがあれば加点)
    - いろいろなラボが混じっているか(ラボの種類ごとに加点)
3. 評価が一番高いグループを朝会グループとなります。

## 備考
グループの並びはID順です。