import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "@/components/Layouts/BaseLayout";
import Home from "./Home"
import AboutUs from "./AboutUs";
import Solutions from "./Solutions";
import Members from "./Members";
import News from "./News";
import JoinUs from "./JoinUs";




const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/quienes-somos",
                element: <AboutUs />
            },
            {
                path: "/soluciones",
                element: <Solutions />
            },
            {
                path: "/miembros",
                element: <Members />
            },
            {
                path: "/noticias",
                element: <News />
            },
            {
                path: "/unete",
                element: <JoinUs />
            }
        ]
    }
])


export default router;