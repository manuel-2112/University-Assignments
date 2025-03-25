import React, { useState } from 'react';

const Form = () => {
    // Estados para manejar los valores de entrada
    const [perfil, setPerfil] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [telefono, setTelefono] = useState('');
    const [pais, setPais] = useState('');

    // Funciones para manejar el cambio de estado
    const handleChangePerfil = (event: React.ChangeEvent<HTMLInputElement>) => setPerfil(event.target.value);
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handleChangeEmpresa = (event: React.ChangeEvent<HTMLInputElement>) => setEmpresa(event.target.value);
    const handleChangeTelefono = (event: React.ChangeEvent<HTMLInputElement>) => setTelefono(event.target.value);
    const handleChangePais = (event: React.ChangeEvent<HTMLInputElement>) => setPais(event.target.value);

    const handleBorrar = () => {
        setPerfil('');
        setEmail('');
        setEmpresa('');
        setTelefono('');
        setPais('');
    };

    const handleEnviar = () => {
        
        console.log({ perfil, email, empresa, telefono, pais });
    };

    return (
        <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 text-xl font-semibold leading-6 min-h-[1432px] max-md:px-5">
            <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4a4a2102704c587ca20b5da3fb0e1ca4e617a411152ef0de64ee3da564d9963e?apiKey=7ba4eda58ee64c5193dc77021c949f3b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a4a2102704c587ca20b5da3fb0e1ca4e617a411152ef0de64ee3da564d9963e?apiKey=7ba4eda58ee64c5193dc77021c949f3b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a4a2102704c587ca20b5da3fb0e1ca4e617a411152ef0de64ee3da564d9963e?apiKey=7ba4eda58ee64c5193dc77021c949f3b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a4a2102704c587ca20b5da3fb0e1ca4e617a411152ef0de64ee3da564d9963e?apiKey=7ba4eda58ee64c5193dc77021c949f3b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a4a2102704c587ca20b5da3fb0e1ca4e617a411152ef0de64ee3da564d9963e?apiKey=7ba4eda58ee64c5193dc77021c949f3b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a4a2102704c587ca20b5da3fb0e1ca4e617a411152ef0de64ee3da564d9963e?apiKey=7ba4eda58ee64c5193dc77021c949f3b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a4a2102704c587ca20b5da3fb0e1ca4e617a411152ef0de64ee3da564d9963e?apiKey=7ba4eda58ee64c5193dc77021c949f3b&width=2000 2000w"
                className="object-cover absolute inset-0 size-full"
            />
            <div className="flex relative flex-col px-14 py-20 mt-20 w-full rounded-3xl bg-zinc-200 bg-opacity-60 max-w-[1308px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="self-center mt-5 text-4xl leading-10 text-center text-gray-900 capitalize">
                    Inscríbete
                </div>

                <div className="mt-36 text-black leading-[90%] max-md:mt-10 max-md:max-w-full">
                    Soy
                </div>
                <input
                    type="text"
                    value={perfil}
                    onChange={handleChangePerfil}
                    placeholder="Elige tu perfil"
                    className="justify-center items-start p-4 mt-2 bg-white rounded-lg border border-solid border-stone-300 text-stone-500 max-md:pr-5 max-md:max-w-full"
                />
                <div className="mt-14 text-black leading-[90%] max-md:mt-10 max-md:max-w-full">
                    Correo Electrónico
                </div>
                <input
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="tucorreo@tuempresa.com"
                    className="justify-center items-start p-4 mt-2 whitespace-nowrap bg-white rounded-lg border border-solid border-stone-300 text-stone-500 max-md:pr-5 max-md:max-w-full"
                />
                <div className="mt-14 text-black leading-[90%] max-md:mt-10 max-md:max-w-full">
                    Empresa
                </div>
                <input
                    type="text"
                    value={empresa}
                    onChange={handleChangeEmpresa}
                    placeholder="Ingresa el nombre de la empresa"
                    className="justify-center items-start p-4 mt-2 bg-white rounded-lg border border-solid border-stone-300 text-stone-500 max-md:pr-5 max-md:max-w-full"
                />
                <div className="mt-14 text-black leading-[90%] max-md:mt-10 max-md:max-w-full">
                    Teléfono de contacto
                </div>
                <input
                    type="tel"
                    value={telefono}
                    onChange={handleChangeTelefono}
                    placeholder="+56 9 999 999"
                    className="justify-center items-start p-4 mt-2 bg-white rounded-lg border border-solid border-stone-300 text-stone-500 max-md:pr-5 max-md:max-w-full"
                />
                <div className="mt-14 text-black leading-[90%] max-md:mt-10 max-md:max-w-full">
                    País
                </div>
                <input
                    type="text"
                    value={pais}
                    onChange={handleChangePais}
                    placeholder="Ingresa país"
                    className="justify-center items-start p-4 mt-2 bg-white rounded-lg border border-solid border-stone-300 text-stone-500 max-md:pr-5 max-md:max-w-full"
                />
                <div className="flex gap-5 justify-between mt-14 mb-12 text-center whitespace-nowrap max-md:flex-wrap max-md:my-10 max-md:max-w-full">
                    <button
                        onClick={handleBorrar}
                        className="justify-center p-4 bg-lime-200 rounded-lg text-stone-500"
                    >
                    Borrar
                    </button>
                    <button
                        onClick={handleEnviar}
                        className="justify-center p-4 bg-lime-500 rounded-lg text-stone-900"
                    >
                    Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Form;
