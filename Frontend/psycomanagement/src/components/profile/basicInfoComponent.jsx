3/* eslint-disable react/prop-types */
import { Image, Input } from "@nextui-org/react";

const BasicInfoComponent = ({ myInfo, edit }) => {
    return (
        <div className="flex flex-col w-full p-14 bg-cuarter rounded-3xl shadow-lg shadow-cuarter transition-all">
          <h3 className="text-3xl py-5 text-center text-tertiary">
            Información básica del terapéuta
          </h3>
          <div className="w-full flex">
            <div className="flex flex-col">
              <span className="text-lg">Usuario desde: {myInfo.data.register_date.split(" ")[0]}</span>
              {edit ? <Input className="h-8 mb-3"  value={myInfo.data.birth_date} label={"Nombres: "} /> :<span className="text-lg">Fecha nacimiento: {myInfo.data.birth_date}</span>}
            </div>
            <Image
              width={300}
              height={200}
              alt="psyco-management profile"
              src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
              className="self-end ml-32 shadow-lg shadow-quinary mb-5"
            />
          </div>
          {edit ? <Input className="h-8 mb-3"  value={myInfo.data.names} label={"Nombres: "} /> : <span className="text-lg mb-3">Nombres: {myInfo.data.names}</span>}
          {edit ? <Input className="h-8 mb-3"  value={myInfo.data.age} label={"Edad: "} /> : <span className="text-lg mb-3">Edad: {myInfo.data.age == 2024 ? "Sin calcular" : "Pendiente"}</span>}
          {edit ? <Input className="h-8 mb-3"  value={myInfo.data.genre} label={"Género: "} /> : <span className="text-lg mb-3">Género: {myInfo.data.genre}</span>}
          {edit ? <Input className="h-8 mb-3"  value={myInfo.data.email} label={"Correo electrónico: "} /> : <span className="text-lg mb-3">Correo electrónico: {myInfo.data.email}</span>}
        </div>
    );
}


export default BasicInfoComponent;
