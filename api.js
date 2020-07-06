function api(){
         // api
         var xhr = new XMLHttpRequest();
         xhr.open('GET', 'data1', false);
         xhr.send();
         if (xhr.status != 200) {
             alert(xhr.status + ': ' + xhr.statusText);
         }
         else {
             // array api
             var array = JSON.parse(xhr.responseText);

             for (var i = 0; i < array.length; i++) {
                 // тут должна быть реализована функция с ценами, но что-то нет
                 document.write("<button type='button'  onclick='price(1,2,3,4,5,6,7,8,9,10)' class='btn btn-outline-secondary'>" + array[i]["name"] + "<br>" + array[i]["address"] + "<br>" + array[i]["rate"] + "<br>" + "</button>");

             }

         }
         
         function search() {
             var Okrug = document.getElementById("Okrug").value;
             var area = document.getElementById("area").value;
             var type = document.getElementById("type").value;
             var xhr = new XMLHttpRequest();
             xhr.open('GET', 'http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1', false);
             xhr.send();

             var array = JSON.parse(xhr.responseText);



             // тут работает но только если выбрать одно или округ или район или тип
             if (Okrug) {
                 for (var i = 0; i < array.length; i++) {
                     if (array[i]["admArea"] == Okrug) {

                         document.write("<button type='button' id="+ array[i]["id"] + "   onclick='price()' class='btn btn-outline-secondary'>" + array[i]["name"] + "<br>" + array[i]["address"] + "<br>" + array[i]["rate"] + "<br>" + "</button>");
                     }
                 }
             }
             else if (area) {
                 for (var i = 0; i < array.length; i++) {
                     if (array[i]["district"] == area) {

                         document.write("<button type='button' onclick='price()' class='btn btn-outline-secondary'>" + array[i]["name"] + "<br>" + array[i]["address"] + "<br>" + array[i]["rate"] + "<br>" + "</button>");
                     }
                 }
             }
             else if (type) {
                 for (var i = 0; i < array.length; i++) {
                     if (array[i]["typeObject"] == type) {

                         document.write("<button type='button'  onclick='price()' class='btn btn-outline-secondary'>" + array[i]["name"] + "<br>" + array[i]["address"] + "<br>" + array[i]["rate"] + "<br>" + "</button>");
                     }
                 }
             }

         }
         let row;
         let select = document.getElementById("table");
         select.querySelectorAll("button").forEach(element=>{element.onclick=function(){
         row = array.find(item=>item.id==element.id);//присваивание выбранного элемента на кнопку(не работает)
         }})
         function price(price1, price2, price3, price4, price5, price6, price7, price8, price9, price10) {
             //вывод 
         }
}