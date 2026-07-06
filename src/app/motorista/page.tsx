export const dynamic = "force-dynamic";

import MotoristaClient from "./MotoristaClient";
import { getSiteContent } from "@/lib/site-content";

export default async function MotoristaPage() {
  const content = await getSiteContent("motorista");

  return <MotoristaClient content={content} />;
}
