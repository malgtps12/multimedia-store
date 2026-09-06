const products = [
  {id:1,name:"PAKET BELAJAR DESIGN",category:"design",type:"DESIGN",price:49999.99,visual:"design",symbol:"DESIGN",desc:"30 tekstur tipografi eksperimental untuk poster dan identitas visual."},
  {id:2,name:"TEMPLATE PHOTOSHOP",category:"photo",type:"PHOTO",price:69999.99,visual:"photo",symbol:"PHOTO",desc:"Preset warna dengan karakter urban, kontras, dan cinematic."},
  {id:3,name:"MENTAHAN VIDEO MEME",category:"video",type:"VIDEO",price:79999.99,visual:"video",symbol:"VIDEO",desc:"Kumpulan elemen editing untuk membangun ritme video yang lebih dinamis."},
  {id:4,name:"KUMPULAN AUDIO MEME",category:"audio",type:"AUDIO",price:59999.99,visual:"audio",symbol:"AUDIO",desc:"Sound texture untuk ambience, transition, motion graphics, dan short film."},
  {id:5,name:"MOTION GRID",category:"design",type:"MOTION",price:89999.99,visual:"design",symbol:"∞",desc:"Template motion modular untuk title, typography, dan social content."},
  {id:6,name:"PAKET BELAJAR 3D",category:"3d",type:"3D",price:99999.99,visual:"three",symbol:"3D",desc:"Kumpulan bentuk abstrak untuk eksplorasi visual 3D dan komposisi."},
  {id:7,name:"testing",category:"design",type:"TEST",price:1000,visual:"design",symbol:"T",desc:"Produk testing untuk pengecekan checkout dan pembayaran."}
];

let cart = JSON.parse(localStorage.getItem("nexa-cart") || "[]");

const productsEl = document.getElementById("products");
const countEl = document.getElementById("productCount");

function rupiah(n){
  return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
}

function renderProducts(list){
  productsEl.innerHTML = list.map(p => `
    <article class="product">
      <div class="product-visual ${p.visual}">
        <span class="badge">${p.type}</span>
        <span class="symbol">${p.symbol}</span>
      </div>
      <div class="product-info">
        <div class="product-meta"><span>NEXA / 0${p.id}</span><span>DIGITAL</span></div>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-bottom">
          <span class="price">${rupiah(p.price)}</span>
          <button class="add" data-id="${p.id}">+ ADD TO BAG</button>
        </div>
      </div>
    </article>
  `).join("");
  countEl.textContent = `${list.length} PRODUCTS`;
}

function saveCart(){
  localStorage.setItem("nexa-cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id){
  const item = products.find(p => p.id === id);
  if(!item) return;
  const found = cart.find(p => p.id === id);
  if(found) found.qty++;
  else cart.push({...item,qty:1});
  saveCart();
  openCart();
}

function renderCart(){
  const container = document.getElementById("cartItems");
  const count = cart.reduce((sum,p)=>sum+p.qty,0);
  document.getElementById("cartCount").textContent = count;

  if(!cart.length){
    container.innerHTML = `<div class="empty">YOUR BAG IS WAITING.<br>Tambahkan creative goods.</div>`;
  }else{
    container.innerHTML = `<div class="cart-items">${cart.map(p=>`
      <div class="cart-row">
        <div>
          <h4>${p.name}</h4>
          <small>${p.qty} × ${rupiah(p.price)}</small>
        </div>
        <button class="remove" data-remove="${p.id}">REMOVE</button>
      </div>
    `).join("")}</div>`;
  }

  const subtotal = cart.reduce((sum,p)=>sum+p.price*p.qty,0);
  document.getElementById("subtotal").textContent = rupiah(subtotal);
}

productsEl.addEventListener("click",e=>{
  const btn=e.target.closest(".add");
  if(btn) addToCart(Number(btn.dataset.id));
});

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    const cat=btn.dataset.category;
    renderProducts(cat==="all"?products:products.filter(p=>p.category===cat));
  });
});

document.getElementById("cartItems").addEventListener("click",e=>{
  const btn=e.target.closest("[data-remove]");
  if(!btn) return;
  cart=cart.filter(p=>p.id!==Number(btn.dataset.remove));
  saveCart();
});

const cartEl=document.getElementById("cart");
const overlay=document.getElementById("overlay");

function openCart(){cartEl.classList.add("open");overlay.classList.add("show")}
function closeCart(){cartEl.classList.remove("open");overlay.classList.remove("show")}

document.getElementById("cartButton").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);

const DANA_NUMBER = "089516353968";

function payWithDana(){
  if(!cart.length) return;

  const total = cart.reduce((sum,p)=>sum + p.price*p.qty,0);
  const message = `Halo, saya ingin membayar pesanan NEXA sebesar ${rupiah(total)}. Nomor tujuan DANA: ${DANA_NUMBER}`;

  try {
    navigator.clipboard.writeText(DANA_NUMBER);
  } catch (error) {
    console.log("Clipboard not available, using fallback.");
  }

  const danaAppURL = `dana://send?phone=${DANA_NUMBER}&amount=${Math.round(total)}&text=${encodeURIComponent("Pembayaran NEXA")}`;
  const whatsappURL = `https://wa.me/62${DANA_NUMBER.slice(1)}?text=${encodeURIComponent(message)}`;

  window.location.href = danaAppURL;

  setTimeout(() => {
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  }, 500);

  setTimeout(() => {
    alert(`Silakan kirim pembayaran ke DANA ${DANA_NUMBER}.\n\nTotal: ${rupiah(total)}\n\nNomor telah disalin ke clipboard. Jika DANA app tidak terbuka, silakan bayar via WhatsApp yang baru saja dibuka.`);
  }, 800);
}

document.getElementById("checkout").addEventListener("click", payWithDana);

renderProducts(products);
renderCart();
