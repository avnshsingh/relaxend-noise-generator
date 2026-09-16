import { NoiseLab } from "@/components/noise-lab";
import { RelaxEndSeoContent } from "@/components/seo-content";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col">
      <NoiseLab color="all" />
      <RelaxEndSeoContent />
    </main>
  );
}
