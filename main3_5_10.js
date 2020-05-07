'use strict'
// リスト3-5-10　商品オブジェクトにキーを追加する
// 数値を通貨書式「#,###,###」に変換するフィルター
// 注意：filterは、そのフィルターを利用するコンポーネントよりも先に定義すること
Vue.filter('number_format', function (val) {
  return val.toLocaleString();
});


// Vue.jsを読み込む
// 商品一覧コンポーネント
let app = new Vue({
  el: '#app',
  data: {
    // 商品リスト以外のデータには初期値を設定しておく 

    // セール対象のチェック状態(true:チェック有、f:無し)
    showSaleItem: false,
    // 送料無料のチェック状態(true:チェック有、f:無し)
    showDelvFree: false,
    // 「並び替え」の選択値(1:標準, 2:価格が安い順)
    sortOrder: 1,

    // 商品リスト
    products: [
      { id: 1, name: 'Michael<br>スマホケース', price: 1580, image: 'images/01.jpg', delv: 0, isSale: true },
      { id: 2, name: 'Raphael<br>スマホケース', price: 1580, image: 'images/02.jpg', delv: 0, isSale: true },
      { id: 3, name: 'Gabriel<br>スマホケース', price: 1580, image: 'images/03.jpg', delv: 240, isSale: true },
      { id: 4, name: 'Uriel<br>スマホケース', price: 980, image: 'images/04.jpg', delv: 0, isSale: true },
      { id: 5, name: 'Ariel<br>スマホケース', price: 980, image: 'images/05.jpg', delv: 0, isSale: false },
      { id: 6, name: 'Azrael<br>スマホケース', price: 1580, image: 'images/06.jpg', delv: 0, isSale: false }
    ]
  },  //←オプションを区切る。,忘れずに

  computed: {
    // 絞り込み後の商品リストを返す算出プロパティ
    filteredList: function () {
      // 絞り込み後の商品リストを格納する新しい配列
      let newList = [];
      for (let i = 0; i < this.products.length; i++) {
        // 表示対象かどうかを判定するフラグ
        let isShow = true;
        // 1番目の商品が表示対象かどうかを判定する
        if (this.showSaleItem && !this.products[i].isSale) { //「セール対象」チェック有で、セール対象ではない場合
          isShow = false; // この商品は表示しない
        }
        if (this.showDelvFree && this.products[i].delv > 0) { //「送料無料」チェック有で、送料有の商品の場合
          isShow = false; // この商品は表示しない
        }
        //else 表示対象の商品だけを新しい配列に追加する
        if (isShow) {
          newList.push(this.products[i]);
        }
      }
      // 新しい配列を並び変える
      if (this.sortOrder == 1) { // 並び替えのセレクトボックスで「標準：sortOrder: 1」を選んだ時
        //元の順番にpushしているので並び替え済み「newList.push(this.products[i])」
      }
      else if (this.sortOrder == 2) {
        // 価格が安い順に並び替える
        newList.sort(function (a, b) { //配列newList.をソートする
          return a.price - b.price; //a.priceは、newList.price。bも同じ。a-bのように書くと、それぞれ配列のprice要素を代入していき、安い順に自動的に並び替えをしてくれる。高い順にしたいときは、aとbの位置を入れ替える
        });
      }
      // 絞り込み後の商品リストを返す
      return newList;
    },
    // リスト3-5-7　絞り込みの後の商品リストを返す算出プロパティ
    count: function () {
      return this.filteredList.length;
    }
  },
  watch: { // 上記で算出プロパティを用いたので、結果的にこのウォッチャを削除しても動作する
    // 「セール対象」チェックボックスの状態を監視するウォッチャ
    showSaleItem: function (newVal, oldVal) { //newVal,oldValにはtrueかfalse（チェック前の状態）が入る
      // ここでproductsの配列を書き換える
      console.log('showSaleItemウォッチャが呼び出されました');
    },
    // 「送料無料」チェックボックスの状態を監視するウォッチャ
    showDelvFree: function (newVal, oldVal) {
      // ここでproductsの配列を書き換える
      console.log('showDelvFreeウォッチャが呼び出されました');
    }
  }
});
