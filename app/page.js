"use client"; // Marca o arquivo como Client Component

import { useEffect } from "react";
import Home from "./views/home/page";

export default function HomeRedirect() {
  useEffect(() => {
    // Adiciona o nó modal-root se ainda não existir
    if (!document.getElementById("modal-root")) {
      const modalRoot = document.createElement("div");
      modalRoot.id = "modal-root";
      document.body.appendChild(modalRoot);
    }

    // Adiciona o link para a biblioteca Font Awesome se ainda não existir
    if (!document.querySelector("link[href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css']")) {
      const fontAwesomeLink = document.createElement("link");
      fontAwesomeLink.rel = "stylesheet";
      fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
      document.head.appendChild(fontAwesomeLink);
    }
  }, []); // Executa apenas uma vez, ao carregar o componente

  return <Home />;
}
