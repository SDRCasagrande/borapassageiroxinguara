import { listarFechamentos, getMesAtual } from "./actions";
import { RelatoriosClient } from "./RelatoriosClient";

export const dynamic = "force-dynamic";

export default async function RelatoriosPage() {
  const fechamentos = await listarFechamentos();
  const mesAtual = await getMesAtual();

  return (
    <RelatoriosClient fechamentos={fechamentos} mesAtual={mesAtual} />
  );
}
