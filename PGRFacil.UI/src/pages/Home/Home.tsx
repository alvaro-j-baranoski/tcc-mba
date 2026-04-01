import { AppHeader } from "@/components/AppHeader/AppHeader";
import { MatrizDeRisco } from "@/pages/Home/MatrizDeRisco/components/MatrizDeRisco";
import PerigosSection from "./Perigos/components/PerigosSection";
import RiscosSection from "./Riscos/components/RiscosSection";
import GheSection from "./Ghe/components/GheSection";
import { GheSelectedContextProvider } from "./Ghe/context/GheSelectedContext";
import DanosSection from "./Danos/components/DanosSection";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <AppHeader />

            <GheSelectedContextProvider>
                <GheSection />
                <RiscosSection />
            </GheSelectedContextProvider>

            <MatrizDeRisco />

            <PerigosSection />
            <DanosSection />
        </div>
    );
}
