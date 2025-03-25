import React from "react";
import Hero from "@/components/Hero"
import Form from "@/components/JoinUs/Form";

const JoinUs: React.FC = () => {

  return (
    <div>
      <Hero
        title="Unete a nosotros "
        description="Encuentra la solución a tus problemas..."
        ctaText="Conoce más"
        backgroundImage="https://cdn.builder.io/api/v1/image/assets/TEMP/66ac1e199725de9c90f7c3536f3db58a6e91705e82ca4d3fec7f4c4ac28727b7?apiKey=56cba86632ee4f3a9ab1bf0ddb1b767f&"
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/dc362d5b0139f4babe74526e90444659dce69376e6fbda51138002b1af7c505b?apiKey=56cba86632ee4f3a9ab1bf0ddb1b767f&"
      />

      <Form></Form>
    </div>
  )
}

export default JoinUs;