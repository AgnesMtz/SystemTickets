import { ComentarioTicket } from "@/components/ticket/Comentarios-Ticket/comentarioTicket";
import FotoTicket from "@/components/ticket/Foto-Ticket/FotoTicket";
import InformacionTicket from "@/components/ticket/Informacion-Ticket/InformacionTicket";
import SeguimientoTicket from "@/components/ticket/Seguimiento-Ticket/SeguimientoTicket";
import { MyContext } from "@/layouts";
import { useContext, useState } from "react";
export function Ticket() {
  
  const context = useContext(MyContext);
  const rol = context.rol;
  console.log('rol', rol)
  return (
    <div className="mx-10 flex flex-wrap justify-center">
      <InformacionTicket rol={rol}/>
      <div className="flex flex-col">
        <ComentarioTicket rol={rol}/>
        {rol !== "0" && <SeguimientoTicket rol={rol}/>}
      </div>
      <FotoTicket rol={rol}/>
    </div>
  );
}
