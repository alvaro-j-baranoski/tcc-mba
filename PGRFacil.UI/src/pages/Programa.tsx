import { useParams } from "react-router-dom";

export default function Programa() {
    const { programaGuid } = useParams<{ programaGuid: string }>();

    console.log("Programa GUID:", programaGuid);

    return <div>Programa Page</div>;
}