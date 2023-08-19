
const 
      addShirtBtnAll = document.querySelectorAll(".btnadd"),
      shirtLists = document.querySelector("#shirtList .offcanvas-body"),
      shirtCount = document.querySelector("header .number"),
      totalCart = document.querySelector(" #shirtList .total");

let ShirtList = JSON.parse(localStorage.getItem("shirt list ")) || [] ;

// on click in any shirt button add to cart
addShirtBtnAll.forEach(btn =>{
  //prevent upddate page 
  btn.onclick  = event=>{
    event.preventDefault()
    // بتجيب البيانات وبتخزنها بل local 
    // collectData(btn);
    collect(btn);

  }
})

function collect(btn) {
  let title = document.querySelector(".p2text").innerText ,
  pic = document.querySelector("#bigimg").src ,
  price = document.querySelector(".span1text").innerText ,
  color = document.querySelector(".div-color.active-img").getAttribute("data-color") ,
  size = document.querySelector("#size-pro").value ,
  num = document.querySelector(".wrapper .num").innerText ;
  let ShirtObject ={}
  ShirtObject.img = pic 
  ShirtObject.name = title
  ShirtObject.color = color
  ShirtObject.size = size
  ShirtObject.price = price 
  ShirtObject.count = num 
  ShirtList.push(ShirtObject)

  storeEnd(ShirtList)

  
}
//والتخزين في لوكل shirtLists دالة جمع البيانات و التخزين في متغير 
function collectData(item) {
  let card = item.parentElement.parentElement.parentElement.parentElement.parentElement;
  // console.log(item.parentElement.parentElement.parentElement.parentElement.parentElement);
  let imgSrc = card.querySelector("img").src;
  let titel = card.querySelector("h4").innerText;
  let price = card.querySelector("#priceNumber").innerText;
  // let size = card.querySelector("option").value;
  let count = card.querySelector("input[type='number']").value;

// found , not found 
  let postioShirt = ShirtList.findIndex(item =>{
    return  item.name === titel
  })
  if (postioShirt >= 0 ) {
    let upddateCount =  +ShirtList[postioShirt].count 
    upddateCount += +count;
    ShirtList[postioShirt].count = upddateCount;
    storeEnd(ShirtList) 
  }else {
    let ShirtObject ={}
    ShirtObject.img = imgSrc 
    ShirtObject.name = titel
    ShirtObject.price = price 
    ShirtObject.count = count 
    ShirtList.push(ShirtObject)
    storeEnd(ShirtList)
  }
}
function showShirt(){
  let totalSum = 0 
  shirtLists.innerHTML = ""
  ShirtList.forEach((shirt , ind ) =>{
    let totalOneProduct = Number(shirt.price) * Number(shirt.count)
    console.log(totalOneProduct);
let shoping = `  
      <div class="row py-2">
      <div class="col">
        <img  src="${shirt.img}"  alt="img-shirt">
      </div>
      <div class="col">
       ${shirt.name}
      </div>
      <div class="col">
       ${shirt.count}
      </div>
      <div class="col">
      ${shirt.size}
     </div>
      <div class="col">
      $${shirt.price}
     </div>
     <div class="col">
     $${totalOneProduct.toFixed(2)}
    </div>
    <div class="col">
    <i id="delete"  aria-label="Close" data-id=${ind} class="fa-solid fa-trash-can"></i>
    </div>
    </div>`
    shirtLists.innerHTML += shoping ;
    totalSum += totalOneProduct 
  });
  if (totalSum <= 10) {
  totalCart.innerText = "0" + totalSum.toFixed(2)
  }else {
    totalCart.innerText = totalSum.toFixed(2)
  }
  shirtCount.innerText = ShirtList.length;
}
showShirt()
// delete all shirt list in cart 
 function deletALLshit() {
  ShirtList = [];
  storeEnd(ShirtList)
  // shirtLists.innerHTML = "empty" ;

 }
// delete one shirt list in cart 
addEventListener("click" ,   event=>{
  if (event.target.id == "delete") {
    let idd = event.target.getAttribute("data-id")
    ShirtList.splice(idd , 1 )
    storeEnd(ShirtList)

  }
})
function storeEnd(arr) {
  localStorage.setItem("shirt list ", JSON.stringify(ShirtList) )
  showShirt()
}


// function collect(btn) {
//   let title = document.querySelector(".p2text").innerText ,
//   pic = document.querySelector("#bigimg").src ,
//   price = document.querySelector(".span1text").innerText ,
//   color = document.querySelector(".div-color.active-img").getAttribute("data-color") ,
//   size = document.querySelector("#size-pro").value ,
//   count = document.querySelector(".wrapper .num").innerText ;

//   // found , not found 
//   let postioShirt = ShirtList.findIndex(btn =>{
//     return  btn.name === title
//   })
//   if (postioShirt >= 0 ) {
//     let upddateCount =  +ShirtList[postioShirt].count 
//     upddateCount += +count ;
//     ShirtList[postioShirt].count = upddateCount;
//     storeEnd(ShirtList) 
//   }else {
//     let ShirtObject ={}
//     ShirtObject.img = pic 
//     ShirtObject.name = title
//     ShirtObject.color = color
//     ShirtObject.size = size
//     ShirtObject.price = price 
//     ShirtObject.count = count 
//     ShirtList.push(ShirtObject)
//     storeEnd(ShirtList)
//   }
// }






// let shoping = `  
//       <div class="row">
//       <div class="col ">
//         <img src="../img/sec1-peg2/imgbig1.svg"  alt="">
//       </div>
//       <div class="col">
//         T-Shirt Summer Vibes <br>
//         <span class="text-secondary">#fff</span>
//       </div>
//       <div class="col">
//         White
//       </div>
//       <div class="col">
//         XL
//       </div>
//       <div class="col">
//         <button class="btn btn-outline-secondary"> - 1 + </button>
//       </div>
//       <div class="col">
//         $89.99
//       </div>
//       <div class="col "></div>
//     <button type="button" class="btn-close me-md-5" aria-label="Close"></button>
//     </div>
//     `