function getkeywordsmain() {
    console.log("button pressed");
    console.log("This is for review section");
    // var cmtsection = document.querySelector("#reviews > section > div.css-79elbk.border-color--default__09f24__NPAKY > div > ul").textContent;
    // var revsection = document.querySelector("#reviews > section > div:nth-child(2) > ul").textContent;
    // console.log(cmtsection);
    let revsection1 = "";
    var reviews_length = document.querySelector("#module-stream > ul").childElementCount;
    var common_words_1 = []
    console.log("reviews length")
    console.log(reviews_length)
    for(let i = 1; i <= reviews_length+1; i++)
    {
      // document.querySelector("#reviews > section > div:nth-child(2) > ul > li:nth-child("+ i +") > div > div.margin-b2__09f24__CEMjT.border-color--default__09f24__NPAKY > p > span")
      document.querySelector("#module-stream > ul > li:nth-child("+ i +")")
      try {
            var $text = document.querySelector("#module-stream > ul > li:nth-child("+ i +")").textContent;
        }
        catch(err) {
          var $text = "NULL NULL NULL NULL NULL NULL NULL NULL"
        }
        /* #reviews > section > div.css-79elbk.border-color--default__09f24__NPAKY > div > ul > li:nth-child("+ i +") > div > div:nth-child(4) > p > span */
        /* var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:5000/"+$text+"/", requestOptions)
            .then(response => response.text())
            .then(result => {
              console.log(result)
              document.querySelector("#reviews > section > div:nth-child(2) > ul > li:nth-child("+ i +") > div > div.margin-b2__09f24__CEMjT.border-color--default__09f24__NPAKY > p > span").innerHTML = result; 

          })
            .catch(error => console.log('error', error));
 */
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            "headline": $text
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            // crossorigin: true,
            // mode: 'no-cors'
          };

          fetch("http://localhost:5000/", requestOptions)
            .then(response => response.text())
            .then(result => {
              console.log(result);
              document.querySelector("#module-stream > ul > li:nth-child("+ i +")").innerHTML = result;
            })
            .catch(error => console.log('error', error));
            
            }
  
}  
  document.querySelector("body").addEventListener("click", function() {
    getkeywordsmain();
  
  
  });
  