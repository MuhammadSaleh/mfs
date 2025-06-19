import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getCountFromServer, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDAE8Of5JPGaZi7_C50DN_snFP-kpTuihw",
    authDomain: "mfsupps-data.firebaseapp.com",
    projectId: "mfsupps-data",
    storageBucket: "mfsupps-data.firebasestorage.app",
    messagingSenderId: "352644387592",
    appId: "1:352644387592:web:05aca7c4217b5aea4052bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const tbody = document.querySelector(".table tbody"),
    dialog = document.querySelector(".dialog"),
    dialogContent = document.querySelector(".dialog-content"),
    q = query(collection(db, "products"), limit(500)),
    products = await getDocs(q)


window.showDialog = (content) => {
    dialogContent.innerHTML = content;
    dialog.classList.add("open");
    document.body.classList.add("no-overflow");
}
window.hideDialog = () => {
    dialog.classList.remove("open");
    setTimeout(() => { dialogContent.innerHTML = "" }, 500)
    document.body.classList.remove("no-overflow");
}
document.querySelector(".close-dialog").addEventListener("click", hideDialog)
document.querySelector(".copy-content").addEventListener("click", function () {
    navigator.clipboard.writeText(dialogContent.innerHTML).then(() => alert("Copied!")).catch(err => alert("Failed to copy: " + err));
})


products.forEach((doc) => {
    let product = doc.data();
    tbody.insertAdjacentHTML("beforeend", `
        <tr data-id="${doc.id}">
            <td><a class="name" href="${product.url}" target="_blank" rel="noopener noreferer">${product.name}</a></td>
            <td><div class="pricing"><del class="old-price">${product.price}</del><ins class="price">${product.price}</ins></div></td>
            <td><div class="brands">${product.brands}</div></td>
            <td><div class="images">${product.images.map((img) => `<a href="${img}" target="_blank" rel="noopener noreferer"><img src="${img}" height="30" loading="lazy"></a>`).join("")}</div></td>
            <td>${product.overview.trim().length ? `<button class="view-overview" onclick="showDialog(\`${product.overview.trim()}\`)">View Overview</button>` : "-"}</td>
            <td>${product.description.trim().length ? `<button class="view-description" onclick="showDialog(\`${product.description.trim()}\`)">View Description</button>` : "-"}</td>
        </tr>
    `)
});


