import React from "react";


interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, children }) => (
  <a href={href} className="text-base font-medium tracking-tight leading-6">
    {children}
  </a>
);

const socialLinks = [
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "X" },
  { href: "#", label: "Facebook" },
];

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, children }) => (
  <div className="flex flex-col grow text-white max-md:mt-10">
    <h3 className="text-xl font-semibold tracking-tight leading-8">{title}</h3>
    <div className="mt-12 text-base font-medium tracking-tight leading-6 max-md:mt-10">
      {children}
    </div>
  </div>
);

const footerSections = [
  {
    title: "Sobre nosotros",
    links: ["Cómo trabajamos", "Trabaja con nosotros", "Auspiciadores", "Relación de negocios"],
  },
  {
    title: "Comunidad",
    links: ["Eventos", "Blog", "Podcast", "Invita a un amigos"],
  },
];

const Footer: React.FC = () => (
  <footer className="flex flex-col justify-center bg-white">
    <div className="flex flex-col px-20 pt-3 pb-12 w-full bg-stone-900 max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col items-start">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f9723682b7f28d3b92ce8f242dfd64c5d7fa9f33a97bbfd719f36cf5b959532?apiKey=56cba86632ee4f3a9ab1bf0ddb1b767f&"
            alt="Agrotech Chile logo"
            className="max-w-full aspect-[0.96] w-[190px]"
          />
          <div className="flex gap-5 mt-8 ml-5 max-md:ml-2.5">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa1ed273ec569036fe5c689397cd818f27249913c3637c50a54d7211f361e100?apiKey=56cba86632ee4f3a9ab1bf0ddb1b767f&" alt="" className="shrink-0 aspect-[1.03] w-[35px]" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9893b034e4e6f83c05168fb84963a03e2870b1edfb88fec902bbf0e39ecd9e96?apiKey=56cba86632ee4f3a9ab1bf0ddb1b767f&" alt="" className="shrink-0 aspect-[1.03] w-[35px]" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c743b380e460e476b9e54e3f2b202071c24438c372009ba9c196f953957d9159?apiKey=56cba86632ee4f3a9ab1bf0ddb1b767f&" alt="" className="shrink-0 w-9 aspect-[1.06]" />
          </div>
          <p className="self-stretch mt-5 text-base font-medium tracking-tight leading-6 text-white">
            Promover una cultura productiva, eficiente y sostenible
          </p>
        </div>
        <div className="flex-auto self-end mt-20 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {footerSections.map(({ title, links }) => (
              <div key={title} className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
                <FooterSection title={title}>
                  {links.map((link) => (
                    <React.Fragment key={link}>
                      {link}
                      <br />
                      <br />
                    </React.Fragment>
                  ))}
                </FooterSection>
              </div>
            ))}
            <div className="flex flex-col ml-5 w-[15%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col text-white whitespace-nowrap max-md:mt-10">
                <h3 className="text-xl font-semibold tracking-tight leading-8">Social</h3>
                <div className="mt-12 text-base font-medium tracking-tight leading-6 max-md:mt-10">
                  {socialLinks.map(({ href, label }) => (
                    <SocialLink key={label} href={href}>
                      {label}
                      <br />
                      <br />
                    </SocialLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="shrink-0 mt-7 h-0.5 bg-green-500 border border-green-500 border-solid " />
      <div className="flex gap-5 self-center mt-7 w-full text-base font-semibold tracking-tight max-w-[1274px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex-auto leading-6 text-white">
          ©2023 Agrotech Chile. Todos los derechos reservados
        </div>
        <div className="flex gap-5 my-auto text-right text-gray-900 leading-[150%]">
          <div className="grow">Política y privacidad</div>
          <div className="flex-auto">Términos y condiciones</div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;