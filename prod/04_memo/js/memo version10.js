"use strict";
window.addEventListener('DOMContentLoaded',
    function () {
        if (typeof localStorage === "underfined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();
            saveLocalStorage();
            delLocalStrorage();
            allClearStrorage();
            selectTable();
        }
    }
);
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;


            if (key == "" || value == "") {
                Swal.fire({
                    title: "Memo app"
                    , html: "Key,Memoはいずれも必須です"
                    , type: "error"
                    , alllowOutsideClick: false
                });
                return;

            } else {
                let w_msg = "localStorageに\n" + key + " " + value + "\nを保存(save)しますか?";
                Swal.fire({
                    title: "Memo app"
                    , html: w_msg
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorageに" + key + "," + value + "を保存しました";
                        Swal.fire({
                            title: "Memo app"
                            , html: w_msg
                            , type: "success"
                            , alllowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }


                }
                );

            }
        }
    )
};

function delLocalStrorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;
            w_cnt = selectCheckBox("del");
            if (w_cnt >= 1) {
                let w_confirm = "localStorageから選択されている" + w_cnt + "件を削除(delete)しますか?";
                Swal.fire({
                    title: "Memo app"
                    , html: w_confirm
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {
                        for (let i = 0; i < chkbox1.length; i++) {
                            if (chkbox1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viewStorage();
                        let w_msg = "LocalStorageから" + w_cnt + "件を削除しました";
                        Swal.fire({
                            title: "Memo app"
                            , html: w_msg
                            , type: "success"
                            , alllowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                }
                );
            }
        }, false
    );
    const table1 = document.getElementById("table1");
  table1.addEventListener("click", (e) => {  // eはイベントの対象要素…変数なので、名前はなんでもよい。
      if(e.target.classList.contains("trash") === true){
          let tr = e.target.parentNode.parentNode;
          tr.parentNode.deleteRow(tr.sectionRowIndex); // trのインデックスを取得して行を削除する
      }
  });
};
function allClearStrorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = "localStorageのデータを全て削除(allClear)します\nよろしいですか?";
            Swal.fire({
                title: "Memo app"
                , html: w_confirm
                , type: "question"
                , showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {
                    localStorage.clear();
                    viewStorage();
                    let w_msg = "LocalStorageのデータを全て削除(all clear)しました";
                    Swal.fire({
                        title: "Memo app"
                        , html: w_msg
                        , type: "success"
                        , alllowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
            );
        }, false
    );
};
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox("select");
        }, false
    );
};
function selectCheckBox(mode) {
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";
    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    if (mode === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            let w_msg = "1つ選択(select)してください。";
            Swal.fire({
                title: "Memo app"
                , html: w_msg
                , type: "error"
                , alllowOutsideClick: false
            });

        }
    }
    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            let w_msg = "1つ以上選択(select)してください。";
            Swal.fire({
                title: "Memo app"
                , html: w_msg
                , type: "error"
                , alllowOutsideClick: false
            });

        }
    }


};

function viewStorage() {
    const list = document.getElementById("list");
    while (list.rows[0]) list.deleteRow(0);
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";

        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";

    }
    $("#table1").tablesorter(
        {
            sortList: [[1, 0]]
        }
    );
    $("#table1").trigger("update");

}

