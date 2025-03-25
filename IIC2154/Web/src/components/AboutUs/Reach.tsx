import React from "react";

interface ReachProps {
    startupNumber: string;
    categoryNumber: string;
    microbusinessNumber: string;
    memberNumber: string;
    internationalPercentage: string;
    bigNumber: string;
  }

const Reach: React.FC<ReachProps> = ({ 
    startupNumber,
    categoryNumber,
    microbusinessNumber,
    memberNumber,
    internationalPercentage,
    bigNumber,
}) => {
    return (
        <div className="flex flex-col px-5">
          <div className="self-center text-4xl font-semibold tracking-wide text-center text-gray-900 leading-[75.95px]">
            Alcance
          </div>
          <div className="mt-16 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
                <div className="grow justify-center p-2.5 w-full bg-lime-500 rounded-3xl shadow-sm max-md:px-5 max-md:mt-5 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col items-center text-xl font-bold tracking-wider text-center text-indigo-50 leading-[58px] max-md:mt-10">
                      <img
                        loading="lazy"
                        // download images and store them locally instead
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/29676ecec10c960329d6a13d92dc32d2780dfb44192e560e780992005408b79f?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/29676ecec10c960329d6a13d92dc32d2780dfb44192e560e780992005408b79f?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/29676ecec10c960329d6a13d92dc32d2780dfb44192e560e780992005408b79f?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/29676ecec10c960329d6a13d92dc32d2780dfb44192e560e780992005408b79f?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/29676ecec10c960329d6a13d92dc32d2780dfb44192e560e780992005408b79f?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/29676ecec10c960329d6a13d92dc32d2780dfb44192e560e780992005408b79f?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/29676ecec10c960329d6a13d92dc32d2780dfb44192e560e780992005408b79f?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/29676ecec10c960329d6a13d92dc32d2780dfb44192e560e780992005408b79f?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&"
                        className="w-24 aspect-square"
                    />
                        <div className="mt-6">
                          {startupNumber} <span className="font-medium">Startups</span>
                        </div>
                        <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/dc7a36c4a49d3def7158c78955a2b72a8a37a7b7518d729be06862a244ae645b?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc7a36c4a49d3def7158c78955a2b72a8a37a7b7518d729be06862a244ae645b?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc7a36c4a49d3def7158c78955a2b72a8a37a7b7518d729be06862a244ae645b?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc7a36c4a49d3def7158c78955a2b72a8a37a7b7518d729be06862a244ae645b?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc7a36c4a49d3def7158c78955a2b72a8a37a7b7518d729be06862a244ae645b?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc7a36c4a49d3def7158c78955a2b72a8a37a7b7518d729be06862a244ae645b?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc7a36c4a49d3def7158c78955a2b72a8a37a7b7518d729be06862a244ae645b?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc7a36c4a49d3def7158c78955a2b72a8a37a7b7518d729be06862a244ae645b?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&"
                          className="mt-10 w-24 aspect-square"
                        />
                        <div className="self-stretch mt-6">
                          {memberNumber} <span className="">Miembros</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
                      <div className="grow max-md:mt-10 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow items-center text-xl font-bold tracking-wider text-center text-indigo-50 max-md:mt-6">
                              <img
                                loading="lazy"
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/85a3fef828411123470c580d2a33808ab4c10680f0e28eef65b320497a5e401c?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/85a3fef828411123470c580d2a33808ab4c10680f0e28eef65b320497a5e401c?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/85a3fef828411123470c580d2a33808ab4c10680f0e28eef65b320497a5e401c?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/85a3fef828411123470c580d2a33808ab4c10680f0e28eef65b320497a5e401c?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/85a3fef828411123470c580d2a33808ab4c10680f0e28eef65b320497a5e401c?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/85a3fef828411123470c580d2a33808ab4c10680f0e28eef65b320497a5e401c?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/85a3fef828411123470c580d2a33808ab4c10680f0e28eef65b320497a5e401c?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/85a3fef828411123470c580d2a33808ab4c10680f0e28eef65b320497a5e401c?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&"
                                className="w-24 aspect-square"
                              />
                              <div className="mt-5 leading-[58px]">
                                {categoryNumber} <span className="">categorías</span>{" "}
                              </div>
                              <img
                                loading="lazy"
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/211170cb0135c4fd35b64da5de6b70759ac0813e6de0609fb6d2e7a2b1341ae7?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/211170cb0135c4fd35b64da5de6b70759ac0813e6de0609fb6d2e7a2b1341ae7?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/211170cb0135c4fd35b64da5de6b70759ac0813e6de0609fb6d2e7a2b1341ae7?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/211170cb0135c4fd35b64da5de6b70759ac0813e6de0609fb6d2e7a2b1341ae7?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/211170cb0135c4fd35b64da5de6b70759ac0813e6de0609fb6d2e7a2b1341ae7?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/211170cb0135c4fd35b64da5de6b70759ac0813e6de0609fb6d2e7a2b1341ae7?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/211170cb0135c4fd35b64da5de6b70759ac0813e6de0609fb6d2e7a2b1341ae7?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/211170cb0135c4fd35b64da5de6b70759ac0813e6de0609fb6d2e7a2b1341ae7?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&"
                                className="mt-11 w-24 aspect-square max-md:mt-10"
                              />
                              <div className="self-stretch mt-5 leading-6">
                                {internationalPercentage}{" "}
                                <span className="">
                                  comercializa internacionalmente
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow items-center text-xl font-bold tracking-wider text-center text-indigo-50 max-md:mt-6">
                            <img
                                loading="lazy"
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3cf97ba74c1d50113bbd01fcd172c134541bcaacf36ef5f68d0ec7f23c24dbec?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3cf97ba74c1d50113bbd01fcd172c134541bcaacf36ef5f68d0ec7f23c24dbec?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3cf97ba74c1d50113bbd01fcd172c134541bcaacf36ef5f68d0ec7f23c24dbec?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3cf97ba74c1d50113bbd01fcd172c134541bcaacf36ef5f68d0ec7f23c24dbec?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3cf97ba74c1d50113bbd01fcd172c134541bcaacf36ef5f68d0ec7f23c24dbec?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3cf97ba74c1d50113bbd01fcd172c134541bcaacf36ef5f68d0ec7f23c24dbec?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3cf97ba74c1d50113bbd01fcd172c134541bcaacf36ef5f68d0ec7f23c24dbec?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3cf97ba74c1d50113bbd01fcd172c134541bcaacf36ef5f68d0ec7f23c24dbec?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&"
                                className="w-24 aspect-square"
                            />
                              <div className="self-stretch mt-5 leading-[58px]">
                                {microbusinessNumber} <span className="">microempresas</span>
                              </div>
                              <img
                                loading="lazy"
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f4559a8a6f29e826ff6b6943d769ba9bad8dd381bdfdfffe18bb4a6a196648d6?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f4559a8a6f29e826ff6b6943d769ba9bad8dd381bdfdfffe18bb4a6a196648d6?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f4559a8a6f29e826ff6b6943d769ba9bad8dd381bdfdfffe18bb4a6a196648d6?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f4559a8a6f29e826ff6b6943d769ba9bad8dd381bdfdfffe18bb4a6a196648d6?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f4559a8a6f29e826ff6b6943d769ba9bad8dd381bdfdfffe18bb4a6a196648d6?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f4559a8a6f29e826ff6b6943d769ba9bad8dd381bdfdfffe18bb4a6a196648d6?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f4559a8a6f29e826ff6b6943d769ba9bad8dd381bdfdfffe18bb4a6a196648d6?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f4559a8a6f29e826ff6b6943d769ba9bad8dd381bdfdfffe18bb4a6a196648d6?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&"
                                className="mt-11 w-24 aspect-square max-md:mt-10"
                            />
                              <div className="mt-5 leading-6">
                                {bigNumber}{" "}
                                <span className="">&lt; de 9 colaboradores</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
                <div className="grow justify-center p-2.5 w-full bg-lime-500 rounded-3xl shadow-sm max-md:px-5 max-md:mt-5 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow mt-1.5 text-xl font-bold tracking-wider text-center text-indigo-50 leading-[58px] max-md:mt-10">
                        <div>Huella Hídrica</div>
                        <div className="mt-3 font-light leading-[210%]">
                          10.000 lt al año
                        </div>
                        <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c95a53c3a125bfec398f1f941e50827dcfe29ab76bb1e13307b2b4aafb8e7b47?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c95a53c3a125bfec398f1f941e50827dcfe29ab76bb1e13307b2b4aafb8e7b47?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c95a53c3a125bfec398f1f941e50827dcfe29ab76bb1e13307b2b4aafb8e7b47?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c95a53c3a125bfec398f1f941e50827dcfe29ab76bb1e13307b2b4aafb8e7b47?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c95a53c3a125bfec398f1f941e50827dcfe29ab76bb1e13307b2b4aafb8e7b47?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c95a53c3a125bfec398f1f941e50827dcfe29ab76bb1e13307b2b4aafb8e7b47?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c95a53c3a125bfec398f1f941e50827dcfe29ab76bb1e13307b2b4aafb8e7b47?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c95a53c3a125bfec398f1f941e50827dcfe29ab76bb1e13307b2b4aafb8e7b47?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&"
                          className="self-center mt-6 w-24 aspect-square"
                        />
                        <div className="self-center mt-9">Carbono</div>
                        <div className="mt-4 font-light leading-[210%]">
                          500 tCO2 al año
                        </div>
                        <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b58f265b30650949dc50bdf49bd033a03367e149ba8fa3990c030ba6a6c41461?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b58f265b30650949dc50bdf49bd033a03367e149ba8fa3990c030ba6a6c41461?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b58f265b30650949dc50bdf49bd033a03367e149ba8fa3990c030ba6a6c41461?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b58f265b30650949dc50bdf49bd033a03367e149ba8fa3990c030ba6a6c41461?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b58f265b30650949dc50bdf49bd033a03367e149ba8fa3990c030ba6a6c41461?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b58f265b30650949dc50bdf49bd033a03367e149ba8fa3990c030ba6a6c41461?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b58f265b30650949dc50bdf49bd033a03367e149ba8fa3990c030ba6a6c41461?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b58f265b30650949dc50bdf49bd033a03367e149ba8fa3990c030ba6a6c41461?apiKey=35f0fdbcb98941d2a1de72fab15a6ef3&"
                          className="self-center mt-7 w-24 aspect-square"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col items-center text-xl font-bold tracking-wider text-center leading-[58px] text-zinc-100 max-md:mt-10">
                        <div>Ingresos sector</div>
                        <div className="mt-12 font-light leading-[210%] max-md:mt-10">
                          $US 48M
                        </div>
                        <div className="mt-14 max-md:mt-10">Trabajos Generados</div>
                        <div className="mt-12 font-light leading-[210%] max-md:mt-10">
                          405
                        </div>
                        <div className="self-stretch mt-14 max-md:mt-10">
                          Participación Femenina
                        </div>
                        <div className="mt-12 font-light leading-[210%] max-md:mt-10">
                          18.1%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
};

export default Reach;